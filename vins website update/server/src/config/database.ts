import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ── Robust Environment Variable Loading ────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Candidates for .env location depending on launch directory
const envPaths = [
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), 'server/.env'),
  path.resolve(process.cwd(), '.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}
dotenv.config(); // fallback to default

// ── Diagnostic Config Summary (Safe — Never prints password) ───
export function logDatabaseConfig(): void {
  const isPasswordConfigured = Boolean(
    process.env.DB_PASSWORD !== undefined &&
    process.env.DB_PASSWORD !== null &&
    process.env.DB_PASSWORD.trim().length > 0
  );

  console.log('\nMySQL Config:');
  console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
  console.log(`Port: ${Number(process.env.DB_PORT) || 3306}`);
  console.log(`User: ${process.env.DB_USER || 'root'}`);
  console.log(`Database: ${process.env.DB_NAME || 'vins_college'}`);
  console.log(`Password configured: ${isPasswordConfigured ? 'YES' : 'NO'}\n`);
}

// ── Create Connection Pool ─────────────────────────────────────
export const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  database: process.env.DB_NAME || 'vins_college',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  enableKeepAlive: true,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
  charset: 'utf8mb4',
});

/**
 * Execute a parameterized SQL query safely using connection pooling
 */
export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
  const [results] = await pool.execute(sql, params);
  return results as T;
}

/**
 * Verify MySQL database connectivity with a safe SELECT 1 probe
 */
export async function testDbConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();
    console.log('🟢 MySQL Connected Successfully');
    return true;
  } catch (error: any) {
    console.error(`🔴 MySQL Connection Error: ${error.message}`);
    return false;
  }
}

export default pool;
