/**
 * SyncSense AI - Express Backend Server
 * 
 * Provides offline-sync endpoints, cloud AI reviews, and static frontend hosting.
 */

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';
import { evaluateWithCloudAI } from './cloud-ai.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store for backend duplicate prevention & audit
const serverCases = new Map();

// Middleware
app.use(cors());
app.use(express.json());

// Normalize URL if rewritten by Vercel to /api or /api/*
app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    req.url = req.url.replace('/api', '');
  } else if (req.url === '/api') {
    req.url = '/';
  }
  next();
});

// Log incoming requests
app.use((req, res, next) => {
  if (!req.path.startsWith('/health')) {
    console.log(`[Server] ${req.method} ${req.path}`);
  }
  next();
});

// Serve static frontend assets
app.use(express.static(ROOT_DIR, {
  setHeaders: (res, filePath) => {
    // Avoid stale caching during active development & evaluation
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

/**
 * GET /health
 * Lightweight ping endpoint for sync manager connectivity validation
 */
app.get(['/health', '/api/health'], (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'SyncSense AI Backend',
    version: '1.0.0',
    mode: process.env.GEMINI_API_KEY ? 'gemini_cloud_ai' : 'simulated_mock_ai'
  });
});

/**
 * POST /sync
 * Ingests offline cases with duplicate prevention and returns Cloud AI review
 */
app.post(['/sync', '/api/sync'], async (req, res) => {
  try {
    const { caseId, crop, observations, localDecision, createdAt } = req.body;

    if (!caseId) {
      return res.status(400).json({
        error: 'Missing required field: caseId'
      });
    }

    // Idempotency: Duplicate check
    if (serverCases.has(caseId)) {
      const existing = serverCases.get(caseId);
      console.log(`[Server] Duplicate sync prevented for caseId: ${caseId}`);
      return res.status(200).json({
        success: true,
        caseId,
        cloudDecision: existing.cloudDecision,
        message: 'Duplicate submission prevented. Returned existing cloud decision.',
        isDuplicate: true,
        syncedAt: existing.syncedAt
      });
    }

    // Generate cloud assessment
    const cloudDecision = await evaluateWithCloudAI({
      caseId,
      crop: crop || 'Cotton',
      observations: observations || {},
      localDecision: localDecision || {}
    });

    const record = {
      caseId,
      crop: crop || 'Cotton',
      observations: observations || {},
      localDecision: localDecision || null,
      cloudDecision,
      createdAt: createdAt || new Date().toISOString(),
      syncedAt: new Date().toISOString()
    };

    serverCases.set(caseId, record);

    console.log(`[Server] Case ${caseId} synced successfully. Decision ID: ${cloudDecision.decisionId}`);

    return res.status(200).json({
      success: true,
      caseId,
      cloudDecision,
      syncedAt: record.syncedAt
    });
  } catch (err) {
    console.error('[Server] Error processing /sync:', err);
    return res.status(500).json({
      error: 'Failed to process sync request',
      message: err.message
    });
  }
});

/**
 * POST /review
 * Standalone direct review endpoint without persistence
 */
app.post(['/review', '/api/review'], async (req, res) => {
  try {
    const cloudDecision = await evaluateWithCloudAI(req.body);
    return res.status(200).json({
      success: true,
      cloudDecision
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Review failed',
      message: err.message
    });
  }
});

/**
 * GET /cases
 * Lists all synchronized server-side cases
 */
app.get(['/cases', '/api/cases'], (req, res) => {
  const casesArray = Array.from(serverCases.values());
  res.status(200).json({
    count: casesArray.length,
    cases: casesArray
  });
});

/**
 * GET /cases/:id
 * Retrieves specific server-side case
 */
app.get(['/cases/:id', '/api/cases/:id'], (req, res) => {
  const item = serverCases.get(req.params.id);
  if (!item) {
    return res.status(404).json({ error: 'Case not found on server' });
  }
  res.status(200).json(item);
});

// Export Express App for Vercel Serverless Function & Testing
export default app;

// Start Server locally only when executed directly (node backend/server.js)
const isDirectRun = process.argv[1] && (
  import.meta.url === pathToFileURL(process.argv[1]).href ||
  process.argv[1].endsWith('backend/server.js')
);

if (isDirectRun && !process.env.VERCEL && process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌾 SyncSense AI Server running at http://localhost:${PORT}`);
    console.log(`📡 Offline-First Agricultural Intelligence Ready`);
    console.log(`⚙️  AI Review Mode: ${process.env.GEMINI_API_KEY ? 'Gemini Live' : 'Deterministic Mock'}`);
    console.log(`====================================================`);
  });
}
