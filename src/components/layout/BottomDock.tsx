import React, { useState } from 'react';
import { Activity, Radio, Cpu, HardDrive, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';

export const BottomDock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'telemetry' | 'audio' | 'quantum' | 'diagnostics'>('telemetry');

  return (
    <footer className="border-t border-surface-border bg-black/70 backdrop-blur-md select-none transition-all z-10">
      {/* Header bar / Mini metrics bar */}
      <div className="h-9 px-5 flex items-center justify-between text-[11px] font-mono text-gray-400">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1.5 text-white font-bold">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span>VISUAL HUB</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1">
            <span>CORE LOAD:</span>
            <span className="text-primary font-bold">14.2%</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <span>QUANTUM COHERENCE:</span>
            <span className="text-green-400 font-bold">99.8%</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            <span>MEM BANDWIDTH:</span>
            <span className="text-gray-200">1.2 TB/S</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1">
            <span>LATENCY:</span>
            <span className="text-green-400">12ms</span>
          </div>
        </div>

        {/* Toggle Expand Button */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-all bg-surface px-2 py-0.5 rounded border border-surface-border"
        >
          <span>{isExpanded ? 'COLLAPSE HUB' : 'EXPAND HUB'}</span>
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Metrics Drawer */}
      {isExpanded && (
        <div className="p-4 border-t border-surface-border/50 bg-black/90">
          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-3 border-b border-surface-border pb-2 text-xs font-mono">
            <button
              onClick={() => setActiveTab('telemetry')}
              className={`px-3 py-1 rounded ${
                activeTab === 'telemetry' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              System Telemetry
            </button>
            <button
              onClick={() => setActiveTab('audio')}
              className={`px-3 py-1 rounded ${
                activeTab === 'audio' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Audio Matrix
            </button>
            <button
              onClick={() => setActiveTab('quantum')}
              className={`px-3 py-1 rounded ${
                activeTab === 'quantum' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Quantum Memory
            </button>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`px-3 py-1 rounded ${
                activeTab === 'diagnostics' ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Diagnostic Subsystems
            </button>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-lg bg-surface border border-surface-border">
              <div className="text-gray-400 text-[10px] uppercase">Neural Engine Sync</div>
              <div className="text-base font-bold text-white mt-1">ONLINE</div>
              <div className="text-[10px] text-green-400 mt-0.5">Dual Matrix Balanced</div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-surface-border">
              <div className="text-gray-400 text-[10px] uppercase">Particle Vertex Density</div>
              <div className="text-base font-bold text-primary mt-1">20,480 PTS</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Shader 3.0 Additive</div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-surface-border">
              <div className="text-gray-400 text-[10px] uppercase">Audio Pipeline</div>
              <div className="text-base font-bold text-white mt-1">Web Audio 48kHz</div>
              <div className="text-[10px] text-green-400 mt-0.5">Speech Synthesis Active</div>
            </div>

            <div className="p-3 rounded-lg bg-surface border border-surface-border">
              <div className="text-gray-400 text-[10px] uppercase">Hologram Engine</div>
              <div className="text-base font-bold text-primary mt-1">60 FPS Target</div>
              <div className="text-[10px] text-gray-400 mt-0.5">Zero GPU Memory Leaks</div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
