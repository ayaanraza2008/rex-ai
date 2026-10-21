import React from 'react';
import { HolographicParticleCore } from '../core/HolographicParticleCore';
import { AssistantState, CharacterId, QualityLevel, RenderMode } from '../../types/assistant';
import { Cpu, ShieldAlert, Sparkles, Zap, Command } from 'lucide-react';

interface HomeScreenProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  transformationProgress: number;
  renderMode: RenderMode;
  quality: QualityLevel;
  audioAmplitude: number;
  onToggleRenderMode: () => void;
  onQuickCommand: (cmd: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeCharacter,
  assistantState,
  transformationProgress,
  renderMode,
  quality,
  audioAmplitude,
  onToggleRenderMode,
  onQuickCommand
}) => {
  const isRex = activeCharacter === 'REX';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      {/* Living Holographic Core Center Stage */}
      <div className="relative w-full h-full max-w-4xl max-h-[620px] rounded-2xl bg-black/40 border border-surface-border shadow-[0_0_50px_var(--color-glow)] backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center">
        <HolographicParticleCore
          activeCharacter={activeCharacter}
          assistantState={assistantState}
          transformationProgress={transformationProgress}
          renderMode={renderMode}
          quality={quality}
          audioAmplitude={audioAmplitude}
          onToggleRenderMode={onToggleRenderMode}
        />

        {/* Floating Quick Action Pill Buttons */}
        <div className="absolute bottom-16 flex flex-wrap items-center justify-center gap-2 pointer-events-auto px-4">
          <button
            onClick={() => onQuickCommand(isRex ? 'REX TRANSFORM' : 'NAYA TRANSFORM')}
            className="px-3 py-1.5 rounded-full bg-black/70 border border-surface-border hover:border-primary text-gray-200 hover:text-white text-[11px] font-mono tracking-wider flex items-center space-x-1.5 transition-all shadow-lg"
          >
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Say "{isRex ? 'REX TRANSFORM' : 'NAYA TRANSFORM'}"</span>
          </button>

          <button
            onClick={() => onQuickCommand('System Diagnostic')}
            className="px-3 py-1.5 rounded-full bg-black/70 border border-surface-border hover:border-primary text-gray-200 hover:text-white text-[11px] font-mono tracking-wider flex items-center space-x-1.5 transition-all shadow-lg"
          >
            <Zap className="w-3 h-3 text-primary" />
            <span>Run System Diagnostic</span>
          </button>

          <button
            onClick={() => onQuickCommand(isRex ? 'What is your core protocol?' : 'Tell me how you are doing today!')}
            className="px-3 py-1.5 rounded-full bg-black/70 border border-surface-border hover:border-primary text-gray-200 hover:text-white text-[11px] font-mono tracking-wider flex items-center space-x-1.5 transition-all shadow-lg"
          >
            <Command className="w-3 h-3 text-primary" />
            <span>Persona Query</span>
          </button>
        </div>
      </div>
    </div>
  );
};
