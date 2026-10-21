import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { HolographicMesh } from './HolographicMesh';
import { HolographicOrb } from './HolographicOrb';
import { CoreFallback } from './CoreFallback';
import { AssistantState, CharacterId, QualityLevel, RenderMode } from '../../types/assistant';
import { Maximize2, RotateCcw, Sparkles, Activity } from 'lucide-react';

interface HolographicParticleCoreProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  transformationProgress: number;
  renderMode: RenderMode;
  quality: QualityLevel;
  audioAmplitude: number;
  onToggleRenderMode?: () => void;
}

export const HolographicParticleCore: React.FC<HolographicParticleCoreProps> = ({
  activeCharacter,
  assistantState,
  transformationProgress,
  renderMode,
  quality,
  audioAmplitude,
  onToggleRenderMode
}) => {
  const [webGlAvailable, setWebGlAvailable] = useState<boolean>(true);
  const [forceFallback, setForceFallback] = useState<boolean>(false);

  // Check WebGL support on mount
  useEffect(() => {
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      setWebGlAvailable(!!gl);
    } catch {
      setWebGlAvailable(false);
    }
  }, []);

  const isRex = activeCharacter === 'REX';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Sci-Fi Center Holographic Grid Floor */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,var(--color-glow)_0%,transparent_70%)] opacity-35" />

      {/* Cybernetic HUD Reticle Overlay */}
      <div className="absolute inset-4 pointer-events-none border border-surface-border rounded-xl">
        {/* Corner HUD Markers */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-primary" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-primary" />

        {/* Top telemetry status in reticle */}
        <div className="absolute top-3 left-4 flex items-center space-x-2 text-[10px] font-mono tracking-wider text-gray-400">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
          <span>CORE FREQ: 142.8 THZ</span>
          <span className="text-gray-600">|</span>
          <span>DENSITY: {quality.toUpperCase()}</span>
          <span className="text-gray-600">|</span>
          <span className="text-primary font-bold">STATE: {assistantState.toUpperCase()}</span>
        </div>

        {/* Reticle Controls */}
        <div className="absolute top-3 right-4 flex items-center space-x-2 pointer-events-auto">
          <button
            onClick={onToggleRenderMode}
            title={`Switch to ${renderMode === 'hologram' ? 'Orb' : 'Hologram'} Mode`}
            className="px-2.5 py-1 text-[11px] font-mono rounded bg-black/60 border border-surface-border hover:border-primary text-gray-300 hover:text-white transition-all flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="capitalize">{renderMode} Mode</span>
          </button>

          <button
            onClick={() => setForceFallback(prev => !prev)}
            title="Toggle WebGL / 2D Fallback view"
            className="p-1 rounded bg-black/60 border border-surface-border hover:border-primary text-gray-400 hover:text-white transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center 3D Hologram / Orb / Fallback */}
      <div className="w-full h-full max-h-[580px] flex items-center justify-center">
        {webGlAvailable && !forceFallback ? (
          <Canvas
            camera={{ position: [0, 0.4, 4.4], fov: 45 }}
            className="w-full h-full"
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[0, 4, 3]} intensity={1.2} color={isRex ? '#22D3EE' : '#F472B6'} />
            <pointLight position={[0, -2, -3]} intensity={0.8} color={isRex ? '#3B82F6' : '#A855F7'} />

            {renderMode === 'hologram' ? (
              <HolographicMesh
                activeCharacter={activeCharacter}
                assistantState={assistantState}
                transformationProgress={transformationProgress}
                quality={quality}
                audioAmplitude={audioAmplitude}
              />
            ) : (
              <HolographicOrb
                activeCharacter={activeCharacter}
                assistantState={assistantState}
                audioAmplitude={audioAmplitude}
              />
            )}
          </Canvas>
        ) : (
          <CoreFallback
            activeCharacter={activeCharacter}
            assistantState={assistantState}
            audioAmplitude={audioAmplitude}
          />
        )}
      </div>

      {/* Bottom Identity & Active Waveform Banner */}
      <div className="absolute bottom-6 flex flex-col items-center pointer-events-none">
        <div className="flex items-center space-x-3 px-4 py-1.5 rounded-full bg-black/80 border border-surface-border backdrop-blur-md">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              backgroundColor: isRex ? '#22D3EE' : '#F472B6',
              boxShadow: `0 0 10px ${isRex ? '#22D3EE' : '#F472B6'}`
            }}
          />
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-white">
            {activeCharacter} • {isRex ? 'Male Tactical Core' : 'Female Companion Core'}
          </span>
          {assistantState === 'speaking' && (
            <span className="text-[10px] font-mono text-primary animate-pulse tracking-wider">
              [AUDIO ACTIVE]
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
