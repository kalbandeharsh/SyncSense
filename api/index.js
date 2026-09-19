/**
 * SyncSense AI - Vercel Serverless Function Handler
 * 
 * Routes incoming API requests (/health, /sync, /cases, /review) 
 * directly through the Express application on Vercel.
 */

import app from '../backend/server.js';

export default app;
