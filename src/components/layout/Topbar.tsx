import React from 'react';
import { CharacterId, QualityLevel, TransformationStatus } from '../../types/assistant';
import { Cpu, RefreshCw, Volume2, Shield, Zap } from 'lucide-react';

interface TopbarProps {
  activeCharacter: CharacterId;
  transformationStatus: TransformationStatus;
  quality: QualityLevel;
  onTransformClick: () => void;
  onQualityChange: (q: QualityLevel) => void;
  onOpenSettings: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  activeCharacter,
  transformationStatus,
  quality,
  onTransformClick,
  onQualityChange,
  onOpenSettings
}) => {
  const isRex = activeCharacter === 'REX';
  const targetChar = isRex ? 'NAYA' : 'REX';
  const isTransforming = transformationStatus === 'running';

  return (
    <header className="h-14 border-b border-surface-border bg-black/60 backdrop-blur-md px-5 flex items-center justify-between z-20 select-none">
      {/* Brand & Project Identity */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-lg bg-surface border border-surface-border flex items-center justify-center shadow-[0_0_15px_var(--color-glow)]">
          <Cpu className="w-5 h-5 text-primary" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <span className="font-sans text-lg font-bold tracking-wider text-white">
              REX AI
            </span>
            <span className="px-1.5 py-0.2 text-[9px] font-mono tracking-widest uppercase bg-primary/20 text-primary border border-primary/40 rounded">
              v4.8 CORE
            </span>
          </div>
          <span className="text-[10px] font-mono text-gray-400">
            Holographic Command Architecture
          </span>
        </div>
      </div>

      {/* Central Quick Transformation Trigger */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onTransformClick}
          disabled={isTransforming}
          className={`flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all shadow-md ${
            isTransforming
              ? 'bg-primary/20 border-primary text-white animate-pulse'
              : 'bg-surface hover:bg-surface-border border-surface-border hover:border-primary text-gray-200'
          }`}
          title={`Transform to ${targetChar} (Exact command: ${isRex ? 'REX TRANSFORM' : 'NAYA TRANSFORM'})`}
        >
          <RefreshCw className={`w-3.5 h-3.5 text-primary ${isTransforming ? 'animate-spin' : ''}`} />
          <span>
            {isTransforming ? 'MIGRATING PARTICLES...' : `TRANSFORM ➔ ${targetChar}`}
          </span>
        </button>
      </div>

      {/* Right Controls: Quality, Telemetry & Profile */}
      <div className="flex items-center space-x-4">
        {/* Quality Selector */}
        <div className="flex items-center space-x-1 bg-surface px-2 py-1 rounded-md border border-surface-border text-[11px] font-mono">
          <span className="text-gray-400 mr-1 text-[10px]">LOD:</span>
          {(['low', 'medium', 'high'] as QualityLevel[]).map(q => (
            <button
              key={q}
              onClick={() => onQualityChange(q)}
              className={`px-2 py-0.5 rounded uppercase ${
                quality === q
                  ? 'bg-primary text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {q[0]}
            </button>
          ))}
        </div>

        {/* Coherence Status */}
        <div className="hidden md:flex items-center space-x-2 text-xs font-mono text-gray-300">
          <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>COHERENCE: 100%</span>
        </div>

        {/* Active Character Status Indicator */}
        <div
          onClick={onOpenSettings}
          className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-surface border border-surface-border cursor-pointer hover:border-primary transition-all"
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: isRex ? '#22D3EE' : '#F472B6' }}
          />
          <span className="font-mono text-xs font-bold text-white">
            {activeCharacter}
          </span>
        </div>
      </div>
    </header>
  );
};
