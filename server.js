import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'REX AI — Master Holographic Core',
    version: '4.8.0',
    characters: ['REX', 'NAYA'],
    coherence: '99.8%',
    timestamp: new Date().toISOString()
  });
});

// Serve Vite production build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA catch-all fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[REX AI] Holographic Command Server online on port ${PORT}`);
});
