import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ── Robust Environment Variable Loading ────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
dotenv.config();

import { testDbConnection, logDatabaseConfig, pool } from './config/database.js';
import { RowDataPacket } from 'mysql2/promise';

// Routes
import authRoutes from './routes/authRoutes.js';
import notificationsRoutes from './routes/notificationsRoutes.js';
import admissionsRoutes from './routes/admissionsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import documentsRoutes from './routes/documentsRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// ── CORS Configuration ─────────────────────────────────────────
const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const defaultAllowed = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  'http://127.0.0.1:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        defaultAllowed.includes(origin) ||
        envOrigins.includes(origin) ||
        envOrigins.includes('*') ||
        /\.onrender\.com$/.test(new URL(origin).hostname) ||
        /\.vercel\.app$/.test(new URL(origin).hostname);

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Root Endpoint ──────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'VINS College Backend API is running',
  });
});

// ── Health Check Endpoint (Validates MySQL with SELECT 1) ───────
app.get(['/api/health', '/health'], async (_req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('SELECT 1');
    connection.release();

    return res.status(200).json({
      success: true,
      message: 'Backend is running',
      database: {
        type: 'MySQL',
        connected: true,
      },
    });
  } catch (error: any) {
    return res.status(503).json({
      success: false,
      message: 'Backend is running but MySQL is disconnected',
      database: {
        type: 'MySQL',
        connected: false,
      },
      error: error.message,
    });
  }
});

// ── Database Verification / Test Endpoint ───────────────────────
app.get('/api/test-db', async (_req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>('SHOW TABLES');
    connection.release();

    const tables = rows.map((r) => Object.values(r)[0]);

    return res.status(200).json({
      success: true,
      message: 'MySQL connection and query test successful',
      database: process.env.DB_NAME || 'vins_college',
      tablesCount: tables.length,
      tables,
    });
  } catch (error: any) {
    return res.status(503).json({
      success: false,
      message: 'MySQL test query failed',
      error: error.message,
    });
  }
});

// ── API Routes ─────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/admissions', admissionsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);

// ── 404 Fallback Middleware ────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── Global Error Handler ───────────────────────────────────────
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Backend Global Error]:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred',
  });
});

// ── Start Server ───────────────────────────────────────────────
async function startServer() {
  logDatabaseConfig();
  await testDbConnection();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌐 Root Endpoint → http://localhost:${PORT}/`);
    console.log(`📋 Health Check → http://localhost:${PORT}/api/health\n`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

export default app;
