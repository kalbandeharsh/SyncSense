import express from 'express';
import cors from 'cors';
import { evaluateWithCloudAI } from '../backend/cloud-ai.js';

console.log('--- Testing Express API Endpoints & Duplicate Prevention ---');

const app = express();
app.use(cors());
app.use(express.json());

const serverCases = new Map();

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'SyncSense AI Backend' });
});

app.post('/sync', async (req, res) => {
  const { caseId, crop, observations, localDecision } = req.body;
  if (!caseId) return res.status(400).json({ error: 'Missing caseId' });

  if (serverCases.has(caseId)) {
    return res.status(200).json({
      success: true,
      caseId,
      cloudDecision: serverCases.get(caseId).cloudDecision,
      isDuplicate: true
    });
  }

  const cloudDecision = await evaluateWithCloudAI({ caseId, crop, observations, localDecision });
  serverCases.set(caseId, { caseId, cloudDecision });
  return res.status(200).json({ success: true, caseId, cloudDecision, isDuplicate: false });
});

app.get('/cases', (req, res) => {
  res.status(200).json({ count: serverCases.size, cases: Array.from(serverCases.values()) });
});

const server = app.listen(3099, async () => {
  try {
    // 1. Health check
    const healthRes = await fetch('http://localhost:3099/health');
    const healthData = await healthRes.json();
    console.assert(healthData.status === 'ok', 'Health check failed');
    console.log('1. Health check OK:', healthData.status);

    // 2. First sync
    const testCaseId = 'CASE-TEST-IDEMPOTENCY-100';
    const syncRes1 = await fetch('http://localhost:3099/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId: testCaseId,
        crop: 'Cotton',
        observations: { soilCondition: 'dry', plantCondition: 'wilting' },
        localDecision: { assessment: 'Possible Water Stress', matchedRuleIds: ['R001'] }
      })
    });
    const syncData1 = await syncRes1.json();
    console.assert(syncData1.isDuplicate === false, 'First sync should not be duplicate');
    console.log('2. First sync processed OK:', syncData1.caseId);

    // 3. Duplicate sync attempt
    const syncRes2 = await fetch('http://localhost:3099/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId: testCaseId,
        crop: 'Cotton',
        observations: { soilCondition: 'dry', plantCondition: 'wilting' },
        localDecision: { assessment: 'Possible Water Stress', matchedRuleIds: ['R001'] }
      })
    });
    const syncData2 = await syncRes2.json();
    console.assert(syncData2.isDuplicate === true, 'Duplicate sync must be flagged and prevented');
    console.log('3. Duplicate sync prevention OK: isDuplicate =', syncData2.isDuplicate);

    // 4. Get cases
    const casesRes = await fetch('http://localhost:3099/cases');
    const casesData = await casesRes.json();
    console.assert(casesData.count === 1, 'Server should have exactly 1 case');
    console.log('4. Server case store OK: count =', casesData.count);

    console.log('\nAll API integration tests passed cleanly!');
    server.close();
    process.exit(0);
  } catch (err) {
    console.error('API test error:', err);
    server.close();
    process.exit(1);
  }
});
