import mysql from 'mysql2/promise';

// 1. TypeScript ko batane ke liye ki global variable exist karta hai
declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

// 2. Optimized Connection Pool Function
function createConnectionPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'akshansh',
    database: process.env.DB_NAME || 'thermal_suite',
    waitForConnections: true,
    connectionLimit: 15,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
  });
}

// 3. Next.js Hot Reload Fix (Connection Leak Prevention)
export const db = globalThis._mysqlPool || createConnectionPool();

if (process.env.NODE_ENV !== 'production') {
  globalThis._mysqlPool = db;
}

// --- DATABASE SCHEMAS ---

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('CLIENT', 'ADMIN') DEFAULT 'CLIENT',
    token_balance INT DEFAULT 100,
    reset_token VARCHAR(255) UNIQUE NULL,
    reset_token_expiry DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

const CREATE_LEDGER_TABLE = `
  CREATE TABLE IF NOT EXISTS token_ledger (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    amount INT NOT NULL,
    reason VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;

const CREATE_CALCULATORS_TABLE = `
  CREATE TABLE IF NOT EXISTS calculators (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    api_url VARCHAR(255) NOT NULL, -- Added missing api_url field
    price INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

const CREATE_USER_CALCULATORS_TABLE = `
  CREATE TABLE IF NOT EXISTS user_calculators (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    calculator_id VARCHAR(36) NOT NULL,
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (calculator_id) REFERENCES calculators(id) ON DELETE CASCADE,
    UNIQUE(user_id, calculator_id)
  );
`;

// New table for pre-paid session tracking and analytics
const CREATE_USAGE_LOGS_TABLE = `
  CREATE TABLE IF NOT EXISTS usage_logs (
    session_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    calculator_id VARCHAR(36) NOT NULL,
    tokens_spent INT DEFAULT 0,
    minutes_used INT DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_ping_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`;

// --- AUTO INITIALIZATION ---

async function initializeDatabase() {
  let connection;

  try {
    connection = await db.getConnection();

    await connection.query(CREATE_USERS_TABLE);
    await connection.query(CREATE_LEDGER_TABLE);
    await connection.query(CREATE_CALCULATORS_TABLE);
    await connection.query(CREATE_USER_CALCULATORS_TABLE);
    await connection.query(CREATE_USAGE_LOGS_TABLE); // Added new logs table

    console.log('Database tables initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize database tables:', error);
  } finally {
    if (connection) {
      connection.release(); // Pushes the connection back to the pool safely
    }
  }
}

// Run initialization
initializeDatabase();