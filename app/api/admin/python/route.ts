import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import net from 'net';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const execAsync = promisify(exec);
const SCRIPTS_DIR = path.join(process.cwd(), 'python_modules');

// HELPER: Safely run PM2 avoiding the Linux `npx` bash wrapper bug
async function runPM2(command: string) {
  const localPm2Path = path.join(process.cwd(), 'node_modules', 'pm2', 'bin', 'pm2');
  try {
    // 1st priority: Use exact Node binary path (Fixes the /usr/bin/bash bug on Hostinger)
    await fs.access(localPm2Path);
    return await execAsync(`node "${localPm2Path}" ${command}`);
  } catch {
    // 2nd priority: Fallback if local pm2 isn't found
    return await execAsync(`npx pm2 ${command}`);
  }
}

interface PM2Process {
  name: string;
  pm_id: number;
  pm2_env: {
    args?: string[];
    status: string;
    pm_uptime?: number;
    restart_time?: number;
    pm_exec_path?: string;
  };
  monit: { memory: number };
}

interface PythonProcess {
  id: number;
  name: string;
  status: string;
  memory: string;
  uptime?: number;
  restarts: number;
  scriptPath: string;
  port: string;
}

async function ensureDir() {
  try { await fs.access(SCRIPTS_DIR); } 
  catch { await fs.mkdir(SCRIPTS_DIR, { recursive: true }); }
}

async function checkPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err: any) => {
      if (err.code === 'EADDRINUSE') resolve(false);
      else resolve(false);
    });
    server.once('listening', () => {
      server.close();
      resolve(true); 
    });
    server.listen(port);
  });
}

async function getPythonEnv(): Promise<{ python: string, pip: string }> {
  try {
    await execAsync('python3 --version');
    return { python: 'python3', pip: 'pip3' };
  } catch (err3) {
    try {
      await execAsync('python --version');
      return { python: 'python', pip: 'pip' };
    } catch (err) {
      throw new Error('Neither python3 nor python is available on this VPS.');
    }
  }
}

export async function GET() {
  try {
    await ensureDir();
    let pythonProcesses: PythonProcess[] = [];
    let fileDetails: { name: string; size: string; date: Date }[] = [];

    try {
      // Replaced npx with our safe runner
      const { stdout } = await runPM2('jlist');
      const processes = JSON.parse(stdout) as PM2Process[];
      
      pythonProcesses = processes
        .filter((p: PM2Process) => p.name.startsWith('py-'))
        .map((p: PM2Process) => {
          const args = p.pm2_env.args || [];
          const portIndex = args.indexOf('--port');
          const port = (portIndex !== -1 && args.length > portIndex + 1) ? args[portIndex + 1] : 'Unknown';

          return {
            id: p.pm_id,
            name: p.name.replace('py-', ''),
            status: p.pm2_env.status,
            memory: Math.round(p.monit.memory / 1024 / 1024) + ' MB',
            uptime: p.pm2_env.pm_uptime,
            restarts: p.pm2_env.restart_time || 0,
            scriptPath: p.pm2_env.pm_exec_path || 'N/A',
            port: port
          };
        });
    } catch (pm2Error) { }

    try {
      const dirFiles = await fs.readdir(SCRIPTS_DIR);
      fileDetails = await Promise.all(dirFiles.map(async (file) => {
        const filePath = path.join(SCRIPTS_DIR, file);
        const stat = await fs.stat(filePath);
        return {
          name: file,
          size: (stat.size / 1024).toFixed(2) + ' KB',
          date: stat.mtime
        };
      }));
    } catch (fileError) {}

    return NextResponse.json({ success: true, processes: pythonProcesses, files: fileDetails });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) });
  }
}

export async function POST(req: NextRequest) {
  await ensureDir();
  const formData = await req.formData();
  const action = formData.get('action');

  try {
    if (action === 'upload') {
      const file = formData.get('file') as File;
      if (!file) throw new Error("No file uploaded");
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(SCRIPTS_DIR, file.name);
      await fs.writeFile(filePath, buffer);
      return NextResponse.json({ success: true, message: `${file.name} uploaded successfully` });
    }

    if (action === 'delete_file') {
      const filename = formData.get('filename') as string;
      const filePath = path.join(SCRIPTS_DIR, filename);
      await fs.unlink(filePath); 
      return NextResponse.json({ success: true, message: `File ${filename} deleted permanently` });
    }

    if (action === 'install') {
      const lib = formData.get('library') as string;
      if (!/^[a-zA-Z0-9\-_=.]+$/.test(lib)) throw new Error("Invalid library name");
      
      const env = await getPythonEnv();
      const { stdout, stderr } = await execAsync(`${env.pip} install ${lib}`);
      return NextResponse.json({ success: true, message: `Installed ${lib}`, log: stdout || stderr });
    }

    if (action === 'start') {
      const filename = formData.get('filename') as string;
      const portString = formData.get('port') as string;
      const name = formData.get('name') as string; 
      
      if (!portString) throw new Error("Port is required.");
      const port = parseInt(portString, 10);
      if (isNaN(port)) throw new Error("Invalid port number format.");

      const isAvailable = await checkPortAvailable(port);
      if (!isAvailable) {
        throw new Error(`Port ${port} is currently in use. Please select a different port.`);
      }

      const env = await getPythonEnv();
      const filePath = path.join(SCRIPTS_DIR, filename);
      
      // Replaced npx with safe runner
      await runPM2(`start "${filePath}" --name py-${name} --interpreter ${env.python} -- --port ${port}`);
      await runPM2('save'); 
      
      return NextResponse.json({ success: true, message: `Started ${filename} on port ${port} using ${env.python}` });
    }

    if (action === 'stop' || action === 'delete_process') {
      const name = formData.get('name') as string;
      const pm2Action = action === 'delete_process' ? 'delete' : 'stop';
      
      // Replaced npx with safe runner
      await runPM2(`${pm2Action} py-${name}`);
      if (action === 'delete_process') await runPM2('save');
      
      return NextResponse.json({ success: true, message: `Process py-${name} ${pm2Action}d` });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) });
  }
}