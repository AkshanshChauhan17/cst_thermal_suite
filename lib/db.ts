import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Akshansh',
  password: process.env.DB_PASSWORD || 'akshansh',
  database: process.env.DB_NAME || 'thermal_suite',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// 1. Users table
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

// 2. Token ledger table
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

// 3. Calculators table
const CREATE_CALCULATORS_TABLE = `
  CREATE TABLE IF NOT EXISTS calculators (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    price INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

// 4. User calculators table
const CREATE_USER_CALCULATORS_TABLE = `
  CREATE TABLE IF NOT EXISTS user_calculators (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    calculator_id VARCHAR(36) NOT NULL,
    purchased_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE CASCADE,

    FOREIGN KEY (calculator_id)
      REFERENCES calculators(id)
      ON DELETE CASCADE,

    UNIQUE(user_id, calculator_id)
  );
`;

// 5. Auto-initialization function
async function initializeDatabase() {
  let connection;

  try {
    connection = await db.getConnection();

    // Create users first
    await connection.query(CREATE_USERS_TABLE);

    // Then token ledger
    await connection.query(CREATE_LEDGER_TABLE);

    // Then calculators
    await connection.query(CREATE_CALCULATORS_TABLE);

    // Finally user-calculator relationship
    await connection.query(CREATE_USER_CALCULATORS_TABLE);

    console.log('✅ Database tables initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize database tables:', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// Run initialization
initializeDatabase();