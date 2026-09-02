'use client'

import { useState, useEffect } from 'react'
import { Upload, Terminal, Play, Square, Trash2, Package, RefreshCw, Server, FileText, FolderOpen, Info, X, ExternalLink } from 'lucide-react'
import AdminSidebar from '../components/AdminSidebar'

type PythonProcess = {
  id: string | number
  name: string
  status: string
  memory: string
  port?: string
  scriptPath?: string
  restarts?: number
  uptime?: number
}

type UploadedFile = {
  name: string
  size: string | number
  date: string | number
}

export default function PythonManager() {
  const [processes, setProcesses] = useState<PythonProcess[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [currentTime, setCurrentTime] = useState(() => Date.now())
  
  const [file, setFile] = useState<File | null>(null)
  const [library, setLibrary] = useState('')
  const [startConfig, setStartConfig] = useState({ filename: '', name: '', port: '3005' })
  
  // NEW: Popup State
  const [infoModal, setInfoModal] = useState<PythonProcess | null>(null)

  const fetchStatus = async () => {
    try {
      const res = await fetch(`/api/admin/python?t=${new Date().getTime()}`, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' }
      })
      if (!res.ok) return; 
      const data = await res.json()
      if (data.success) {
        setProcesses(data.processes || [])
        setUploadedFiles(data.files || [])
      }
    } catch (error) {
      console.log("Waiting for server response...");
    }
  }

  useEffect(() => {
    const initialFetch = setTimeout(fetchStatus, 0)
    const interval = setInterval(fetchStatus, 5000)
    const clock = setInterval(() => setCurrentTime(Date.now()), 60000)
    return () => {
      clearTimeout(initialFetch)
      clearInterval(interval)
      clearInterval(clock)
    }
  }, [])

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('action', 'upload')
    formData.append('file', file)
    
    const res = await fetch('/api/admin/python', { method: 'POST', body: formData })
    const data = await res.json()
    setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.error}`)
    setFile(null)
    fetchStatus()
    setLoading(false)
  }

  const handleDeleteFile = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename} from the server?`)) return
    setLoading(true)
    const formData = new FormData()
    formData.append('action', 'delete_file')
    formData.append('filename', filename)
    
    const res = await fetch('/api/admin/python', { method: 'POST', body: formData })
    const data = await res.json()
    setMessage(data.success ? `✅ ${data.message}` : `❌ Error: ${data.error}`)
    fetchStatus()
    setLoading(false)
  }

  const handleInstall = async () => {
    if (!library) return
    setLoading(true)
    setMessage('Installing library... Please wait.')
    const formData = new FormData()
    formData.append('action', 'install')
    formData.append('library', library)
    
    const res = await fetch('/api/admin/python', { method: 'POST', body: formData })
    const data = await res.json()
    setMessage(data.success ? `✅ ${data.message}` : `❌ Error: ${data.error}`)
    setLoading(false)
  }

  const handleProcessAction = async (action: 'start' | 'stop' | 'delete_process', name?: string) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('action', action)
    
    if (action === 'start') {
      formData.append('filename', startConfig.filename)
      formData.append('name', startConfig.name)
      formData.append('port', startConfig.port)
    } else if (name) {
      formData.append('name', name)
    }

    const res = await fetch('/api/admin/python', { method: 'POST', body: formData })
    const data = await res.json()
    setMessage(data.success ? `✅ ${data.message}` : `❌ Error: ${data.error}`)
    fetchStatus()
    setLoading(false)
  }

  const populateRunForm = (filename: string) => {
    const defaultName = filename.replace('.py', '').replace(/[^a-zA-Z0-9]/g, '')
    setStartConfig({ ...startConfig, filename, name: defaultName })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatUptime = (timestamp?: number) => {
    if (!timestamp || !currentTime) return 'N/A'
    const diff = currentTime - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ${minutes % 60}m`
    return `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex">
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8 relative">
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Terminal className="text-[#5648FC]" /> Python Server Manager
            </h1>
            <button onClick={fetchStatus} className="p-2 bg-white border shadow-sm rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-semibold">
              <RefreshCw size={16} className="text-gray-600" /> Refresh Data
            </button>
          </div>

          {message && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg font-medium shadow-sm animate-pulse">
              {message}
            </div>
          )}

          {/* TOP ROW: RUN FORM */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Play size={20} className="text-[#5648FC]"/> Run & Deploy Module</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="Filename (e.g. calc.py)" value={startConfig.filename} onChange={(e) => setStartConfig({...startConfig, filename: e.target.value})} className="flex-1 p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#5648FC] outline-none" />
              <input type="text" placeholder="App Name (e.g. CalcV1)" value={startConfig.name} onChange={(e) => setStartConfig({...startConfig, name: e.target.value})} className="flex-1 p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#5648FC] outline-none" />
              <input type="number" placeholder="Port (e.g. 3005)" value={startConfig.port} onChange={(e) => setStartConfig({...startConfig, port: e.target.value})} className="w-32 p-2.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#5648FC] outline-none" />
              <button onClick={() => handleProcessAction('start')} disabled={loading || !startConfig.filename} className="bg-[#1E1B4B] text-white px-8 py-2.5 rounded-lg font-bold hover:bg-[#5648FC] transition-colors disabled:opacity-50">
                Deploy & Run
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel 1: Upload File */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Upload size={18}/> Upload New Module</h2>
                <input 
                  type="file" 
                  accept=".py"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <button onClick={handleUpload} disabled={!file || loading} className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 hover:bg-gray-800">
                Upload to Server
              </button>
            </div>

            {/* Panel 2: Install Library */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Package size={18}/> Install Global PIP Package</h2>
                <input 
                  type="text" 
                  placeholder="e.g. pandas, requests, numpy" 
                  value={library}
                  onChange={(e) => setLibrary(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border rounded-lg mb-4 focus:ring-2 focus:ring-[#5648FC] outline-none"
                />
              </div>
              <button onClick={handleInstall} disabled={!library || loading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-lg font-bold disabled:opacity-50 transition-colors">
                Install via Pip3
              </button>
            </div>
          </div>

          {/* SERVER FILE MANAGER */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FolderOpen size={20} className="text-amber-500"/> Uploaded Scripts (File Manager)</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                    <th className="p-3">File Name</th>
                    <th className="p-3">Size</th>
                    <th className="p-3">Last Modified</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedFiles.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-gray-500">No python scripts uploaded yet.</td></tr>
                  ) : uploadedFiles.map((f, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-700 flex items-center gap-2">
                        <FileText size={16} className="text-blue-500" /> {f.name}
                      </td>
                      <td className="p-3 text-sm text-gray-500">{f.size}</td>
                      <td className="p-3 text-sm text-gray-500">{new Date(f.date).toLocaleString()}</td>
                      <td className="p-3 flex justify-end gap-2">
                        <button onClick={() => populateRunForm(f.name)} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded text-sm font-semibold hover:bg-indigo-100 flex items-center gap-1">
                          <Play size={14}/> Setup
                        </button>
                        <button onClick={() => handleDeleteFile(f.name)} className="p-1.5 bg-red-50 text-red-600 rounded hover:bg-red-100" title="Delete File">
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVE PROCESSES MONITOR */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Server size={20} className="text-emerald-500"/> Live Running Processes (PM2)</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-sm border-b">
                    <th className="p-3">App Name</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Memory</th>
                    <th className="p-3 text-right">Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {processes.length === 0 ? (
                    <tr><td colSpan={4} className="p-6 text-center text-gray-500">No Python modules are currently running.</td></tr>
                  ) : processes.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-3 font-bold text-gray-800">{p.name}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${p.status === 'online' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm font-mono text-gray-600">{p.memory}</td>
                      <td className="p-3 flex justify-end gap-2">
                        
                        {/* View Details Button */}
                        <button onClick={() => setInfoModal(p)} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100" title="View Process Info">
                          <Info size={16}/>
                        </button>

                        {p.status === 'online' ? (
                          <button onClick={() => handleProcessAction('stop', p.name)} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded text-sm font-semibold hover:bg-amber-200 flex items-center gap-1" title="Stop">
                            <Square size={14}/> Stop
                          </button>
                        ) : (
                          <button onClick={() => handleProcessAction('start', p.name)} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded text-sm font-semibold hover:bg-emerald-200 flex items-center gap-1" title="Restart">
                            <Play size={14}/> Start
                          </button>
                        )}
                        <button onClick={() => handleProcessAction('delete_process', p.name)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200" title="Kill Process">
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PROCESS INFO POPUP MODAL */}
          {infoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                
                {/* Modal Header */}
                <div className="px-6 py-4 bg-[#1E1B4B] text-white flex justify-between items-center">
                  <h3 className="font-bold flex items-center gap-2 text-lg">
                    <Server size={20} className="text-[#5648FC]"/> Process: py-{infoModal.name}
                  </h3>
                  <button onClick={() => setInfoModal(null)} className="text-gray-300 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5">
                  
                  {/* Highlighted Local URL Box */}
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <p className="text-xs font-bold text-emerald-600 uppercase mb-1">Local Network URL</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-emerald-900 font-bold text-lg tracking-tight">
                        http://127.0.0.1:{infoModal.port}
                      </span>
                      <a href={`http://127.0.0.1:${infoModal.port}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-800">
                        <ExternalLink size={20}/>
                      </a>
                    </div>
                  </div>

                  {/* Grid Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 border rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Status</p>
                      <p className={`font-bold capitalize ${infoModal.status === 'online' ? 'text-emerald-600' : 'text-red-500'}`}>
                        {infoModal.status}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 border rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Memory Assigned</p>
                      <p className="font-bold text-gray-800">{infoModal.memory}</p>
                    </div>
                    <div className="p-3 bg-gray-50 border rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Uptime</p>
                      <p className="font-bold text-gray-800">{formatUptime(infoModal.uptime)}</p>
                    </div>
                    <div className="p-3 bg-gray-50 border rounded-lg">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Restarts (Crash count)</p>
                      <p className="font-bold text-gray-800">{infoModal.restarts}</p>
                    </div>
                  </div>

                  {/* Script Path File Location */}
                  <div className="p-3 bg-gray-50 border rounded-lg">
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-1">Script Path Location</p>
                    <p className="font-mono text-xs text-gray-600 break-all">{infoModal.scriptPath}</p>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}