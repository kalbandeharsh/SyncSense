# SyncSense AI 🌾

> **Offline-First Agricultural Intelligence with Local Decision Preservation**
> *Theme: Innovation | Domain: Agriculture for Rural India*

---

## 1. Project Overview

Farmers in rural India often experience unreliable, intermittent, or absent internet connectivity. Traditional cloud-based agricultural advisory systems completely fail when connectivity drops. 

**SyncSense AI** solves this by delivering an **offline-first decision support system** that:
1. **Runs 100% offline** on local devices using a deterministic JavaScript rule engine.
2. **Generates immediate preliminary evaluations** for cotton crop conditions.
3. **Persists cases locally** using browser IndexedDB and Service Worker caching.
4. **Syncs upon reconnection**.
5. **Reconciles local heuristics with cloud AI reasoning**.
6. **Detects and flags conflicting diagnoses** without blindly overwriting the farmer's initial local decision.

### 💡 The Core Innovation

> **SyncSense does not just synchronize data. It synchronizes intelligence while preserving decision history.**

When a cloud AI suggests an alternate diagnosis (e.g., foliar fungal disease vs. water stress), SyncSense never overwrites the local decision. Instead, it places both assessments side-by-side, flags the conflict, alerts the user, and maintains an immutable audit trail for expert verification.

---

## 2. Technology Stack

Lightweight, high-performance, and framework-free for low-bandwidth environments:

- **Frontend:** HTML5, Modern Vanilla CSS3, Modular Vanilla ES JavaScript (No React, Vue, or heavy libraries).
- **Offline Persistence:** Client-side IndexedDB (`SyncSenseDB`) storing cases, local decisions, cloud reviews, and sync audit records.
- **Offline Caching:** Service Worker (`sw.js`) pre-caching the application shell for instantaneous offline startup.
- **Backend:** Node.js & Express.js server providing static asset hosting, active health checks, deduplication, and cloud AI review endpoints.
- **AI Intelligence Tier:**
  - *Intelligent Mock Mode (Default):* Zero-latency, deterministic agronomic modeling designed for 100% reliable hackathon judging.
  - *Live Gemini API Mode:* Optional cloud model integration enabled with `GEMINI_API_KEY` in `.env`.

---

## 3. Architecture & File Structure

```text
syncsense-ai/
├── index.html                 # Complete 5-screen single page web application
├── style.css                  # Modern agricultural design system (responsive, glassmorphic)
├── app.js                     # Main UI controller, screen router, and event orchestrator
├── sw.js                      # PWA Service Worker for offline shell caching
├── package.json               # Backend dependencies (Express, CORS, dotenv)
├── .env.example               # Environment variables configuration
├── README.md                  # Project documentation & demo guide
│
├── js/
│   ├── rule-engine.js         # Offline rule engine with versioning (R001 - R005)
│   ├── storage.js             # IndexedDB wrapper (cases, decisions, sync queue)
│   ├── sync-manager.js        # Network detector, active health ping, queue processor
│   └── reconciliation.js     # Decision comparator (Match, Conflict, Insight)
│
├── backend/
│   ├── server.js              # Express app (health check, /sync, duplicate protection)
│   └── cloud-ai.js            # Simulated cloud AI & Gemini integration
│
└── test/
    ├── test-engine.js         # Unit tests for rule engine & reconciliation
    ├── test-server.js         # End-to-end scenario validation tests
    └── test-api.js            # Express API & idempotency tests
```

---

## 4. Multi-Crop Local Rule Engine

Deterministic, client-side diagnostic models tailored for 5 major Indian crops:
- **🌱 Cotton:** Water deficit stress, nutrient chlorosis, and Alternaria fungal leaf spot.
- **🌿 Soybean:** Critical pod-fill drought, Yellow Mosaic Virus, and Soybean Rust.
- **🌾 Wheat:** CRI stage moisture deficit, nitrogen chlorosis, and Stripe (Yellow) Rust.
- **🌾 Rice / Paddy:** Aerobic moisture stress, Zinc deficiency (Khaira), and Rice Blast / BLB.
- **🌽 Maize:** Tasseling drought stress, V-pattern nitrogen deficiency, and Turcicum blight.

> **Safety Notice:** Preliminary rule-based heuristics only. All local decisions are preserved with an immutable audit trail.

---

## 5. The 5 Application Screens

1. **Screen 1: Dashboard:** Live network status pill, metrics counters (Total, Pending, Conflicts, Synced), and 1-click Hackathon Demo Scenario pre-loaders.
2. **Screen 2: Observation Form:** Mobile-friendly dropdowns for Cotton soil condition, leaf color, leaf spots, plant condition, and field notes.
3. **Screen 3: Preliminary Assessment:** Real-time on-device evaluation showing matched rules, evidence citations, rule version, heuristic field advice, and safety disclaimer.
4. **Screen 4: Cases Explorer:** Filterable list of all locally saved cases with badges for sync and reconciliation states.
5. **Screen 5: Reconciliation View:** Side-by-side comparative layout contrasting **Local Decision** against **Cloud Decision**, high-visibility conflict alert banner, and decision preservation audit log.

---

## 6. How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- Modern web browser (Chrome, Edge, Safari, Firefox)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment (Optional)
```bash
cp .env.example .env
```
*(Leave `GEMINI_API_KEY` blank to run in 100% deterministic simulated cloud AI mode for pitch demos).*

### Step 3: Run the Application
```bash
npm start
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### Step 4: Run Automated Tests
```bash
npm test
node test/test-server.js
node test/test-api.js
```

---

## 7. 3-Minute Hackathon Demo Script

For hackathon judges, use the 1-Click Demo Scenarios on the dashboard:

### Demo 1: Matching Consensus (Local & Cloud Agree)
1. On the Dashboard, click **Scenario 1: Matching Consensus**.
2. Click **Run Local Assessment** — note how it generates instantly without network latency.
3. Click **Save to Local Cases**.
4. The case syncs and reconciliation displays: **Match / Confirmed** (both systems agree on moisture deficit stress).

### Demo 2: Conflict & Decision Preservation (The Core Innovation)
1. On the Dashboard, click **Scenario 2: Conflict & Preservation**.
2. Run local assessment: Local rule engine flags **Water & Nutrient Stress** based on dry soil and wilting.
3. Click **Save to Local Cases**.
4. When cloud synchronization runs, Cloud AI detects evidence pointing to **Alternaria Fungal Infection**.
5. Click **View Reconciliation**:
   - High-visibility amber/red banner:  
     > *"Conflict detected. The original local decision has been preserved. Additional review is required."*
   - Side-by-side cards prove that **Local Decision was NOT erased or overwritten**.

### Demo 3: Insufficient Evidence & Cloud Insight
1. Click **Scenario 3: Insufficient Evidence**.
2. Local rule engine safely outputs: *"Insufficient Evidence for Local Pattern Matching"*.
3. Upon cloud sync, reconciliation labels it as *"Requires Review"*, offering guidance on missing symptom indicators.

---

## 9. Mobile & Phone Optimization 📱

SyncSense AI is engineered with a **mobile-first progressive web design** tailored for rural farmers and agronomists using Android and iOS smartphones:

- **100% Responsive Viewport:** Dynamic 2x2 dashboard KPI grid, single-column observation forms, and stacked comparison cards on mobile viewports (360px – 430px).
- **iOS Auto-Zoom Prevention:** All input, select, and textarea controls are sized at a strict minimum of 16px to prevent iOS Safari auto-zooming on focus.
- **Thumb-Friendly Touch Targets:** 44px–52px minimum touch target heights for all buttons, scenario selectors, and audio TTS toggles.
- **Horizontal Swipe Filter Tabs:** Category filters in the Saved Cases Explorer support touch swipe navigation without awkward vertical wrapping.
- **Notch & Safe Area Support:** Native padding using `env(safe-area-inset-bottom)` for iPhone dynamic islands, notches, and home indicator bars.
- **PWA Homescreen Installability:** Complete [`manifest.json`](file:///Users/harsh/Documents/BFC%202.0.1/manifest.json) enabling full-screen standalone PWA installation.

---

## 10. Vercel Deployment Guide 🚀

SyncSense AI is ready for 1-click deployment on **Vercel**:

### Option A: Via Vercel CLI
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Deploy directly from workspace root
vercel
```

### Option B: Via GitHub / Vercel Web Dashboard
1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Other** (Root directory: `./`).
4. (Optional) Set Environment Variables:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (if omitted, the robust built-in deterministic Cloud AI simulator is used automatically).
5. Click **Deploy**.

### Architecture on Vercel:
- **Serverless API:** [`api/index.js`](file:///Users/harsh/Documents/BFC%202.0.1/api/index.js) routes `/health`, `/sync`, `/cases`, and `/review` through Vercel Node.js Serverless Functions.
- **Edge Static Hosting:** Frontend assets (`index.html`, `style.css`, `app.js`, `manifest.json`, `sw.js`, and `js/*`) are served via Vercel's global CDN Edge network.
- **Vercel Configuration:** Pre-configured in [`vercel.json`](file:///Users/harsh/Documents/BFC%202.0.1/vercel.json).

---

## 11. Safety, Limitations & Ethical AI

- **Preliminary Support Only:** SyncSense is explicitly designed as a first-line screening tool, not a replacement for certified agronomists.
- **No Unsafe Chemical Prescriptions:** The system never provides unverified chemical/pesticide dosage instructions.
- **Explicit Cloud Simulation Disclosures:** All mock responses clearly specify `isSimulated: true`.
- **Zero Data Overwrite:** Preserves local user observations and heuristics against cloud hallucination or divergence.
