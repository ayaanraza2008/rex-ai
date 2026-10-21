# REX AI — Master Holographic Core & Assistant

![REX AI Status](https://img.shields.io/badge/Status-Operational-22D3EE?style=for-the-badge)
![Core Engine](https://img.shields.io/badge/Core-3D%20Particle%20Hologram-F472B6?style=for-the-badge)
![Platform](https://img.shields.io/badge/Deploy-Render%20Ready-3B82F6?style=for-the-badge)

**REX AI** is a dual-personality, voice-enabled, desktop-grade AI assistant featuring a living, transformable, real-time 3D holographic particle avatar core.

---

## 🌟 Dual Character Identities

| Attribute | **REX** | **NAYA** |
| :--- | :--- | :--- |
| **Persona Type** | Male Tactical Assistant | Female Intuitive Companion |
| **Theme & Lighting** | Cyan & Electric Blue (`#22D3EE`, `#3B82F6`) | Pink, Magenta & Violet (`#F472B6`, `#A855F7`) |
| **Background Matrix** | Obsidian Blue (`#050B14`) | Deep Violet (`#12060F`) |
| **Voice Profile** | Deep, authoritative, confident baritone | Soft, expressive, melodic, friendly |
| **3D Avatar Geometry** | Masculine head-and-shoulders cybernetic silhouette | Feminine head-and-shoulders ethereal contour silhouette |

---

## ⚡ Authoritative Transformation Commands

Transformation is driven by a centralized command processor with strict priority rules:

- **`REX TRANSFORM`** ➔ Transforms from **REX** into **NAYA**
- **`NAYA TRANSFORM`** ➔ Transforms from **NAYA** into **REX**

### Natural Language Aliases
- *"Transform to Naya"* / *"Transform Naya"* ➔ Targets **NAYA**
- *"Transform to Rex"* / *"Transform Rex"* ➔ Targets **REX**

During transformation, particles dissolve from the source silhouette into an energetic 3D vortex swirl, dynamically migrating across 3D coordinates toward the destination silhouette while the interface theme smoothly cross-fades over 400ms.

---

## 🔮 Core Architecture & Features

1. **Procedural 3D Holographic Particle Core**:
   - Generates up to **20,480 dynamic particles** with volumetric depth and layered distribution.
   - Distinct procedural geometry for REX (sharp masculine jaw, broad cybernetic shoulders) and NAYA (slender jaw, flowing hair particle cloud).
   - Custom GLSL Shaders featuring organic breathing, listening pulses, circulating thinking arcs, and audio-reactive amplitude displacement.
   - Dual rendering modes: **Hologram** (primary) and **Orb** (secondary plasma sphere with rotating rings).
   - Graceful 2D canvas/CSS holographic fallback if WebGL is unavailable.

2. **Synchronized Dual Vocal Synthesis**:
   - Web Speech API integration with separated pitch/rate/volume profiles.
   - Real-time speech amplitude analysis driving particle ripple waves.
   - Guaranteed single source of truth: REX never speaks with NAYA's voice, and NAYA never speaks with REX's voice.

3. **Sci-Fi HUD Command Center**:
   - **Command Hub (Home)**: Central stage with reticle overlays and particle visualization.
   - **Today Brief**: Morning schedule, weather data, and quick routines.
   - **Task Matrix**: Interactive 3-column Kanban board (To Do, In Progress, Completed).
   - **Autonomous Scenarios**: Actionable routine cards (Quantum Diagnostics, Night Sentinel, Deep Focus).
   - **Skill Module Matrix**: Modular extensions with search and enable/disable toggles.
   - **System Activity Log**: Real-time event log with filtering.
   - **Preferences**: Fine-grained pitch calibration, transformation speed (1.2s - 2.0s), and LOD quality levels (Low, Medium, High).
   - **Visual Hub (Bottom Dock)**: Telemetry monitors (Core Load, Quantum Coherence, Memory Bandwidth, Latency).

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ or 20+
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/ayaanraza2008/rex-ai.git
cd rex-ai

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

### Production Build & Local Server
```bash
# Build the TypeScript & Vite application
npm run build

# Start the Express production server
npm start
```
The application will be live at `http://localhost:10000` (or `http://localhost:3000` in dev).

---

## 🌐 Deploying on Render

REX AI includes a ready-to-use `render.yaml` blueprint.

### Option 1: Automatic Blueprint (Recommended)
1. Go to your **[Render Dashboard](https://dashboard.render.com/)**.
2. Click **New +** ➔ **Blueprint**.
3. Select your `rex-ai` GitHub repository (`ayaanraza2008/rex-ai`).
4. Click **Apply**. Render will automatically detect `render.yaml`, run `npm install && npm run build`, and launch `npm start` on port `10000`.

### Option 2: Manual Web Service
1. Click **New +** ➔ **Web Service**.
2. Connect your `ayaanraza2008/rex-ai` repository.
3. Configure settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Click **Deploy Web Service**.

---

## 🛡️ License
MIT License. Built for the REX AI Ecosystem.
