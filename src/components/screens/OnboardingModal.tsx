import React from 'react';
import { CharacterId } from '../../types/assistant';
import { Cpu, X, Sparkles, Check, Mic, Command } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCharacter: (char: CharacterId) => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onSelectCharacter
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none">
      <div className="relative w-full max-w-2xl bg-surface border border-surface-border rounded-2xl shadow-[0_0_60px_var(--color-glow)] p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-black/50 border border-primary">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                WELCOME TO REX AI
              </h2>
              <p className="text-xs text-gray-400">
                Master Living Holographic Dual-Personality System
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-black/40 border border-transparent hover:border-surface-border transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Selection Cards */}
        <div>
          <h3 className="text-xs uppercase font-bold text-gray-400 mb-3 tracking-widest">
            SELECT ACTIVE PRIMARY CORE
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* REX Card */}
            <div
              onClick={() => {
                onSelectCharacter('REX');
                onClose();
              }}
              className="p-5 rounded-xl bg-black/50 border border-hud-cyan/50 hover:border-hud-cyan cursor-pointer transition-all space-y-3 group hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-hud-cyan group-hover:scale-105 transition-transform">
                  REX
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-hud-cyan/20 text-hud-cyan border border-hud-cyan/40">
                  MALE CORE
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Tactical command assistant with deep authoritative baritone voice and sharp masculine cybernetic particle silhouette.
              </p>
              <div className="text-[10px] text-hud-cyan font-bold flex items-center space-x-1">
                <span>Color: Cyan & Electric Blue</span>
              </div>
            </div>

            {/* NAYA Card */}
            <div
              onClick={() => {
                onSelectCharacter('NAYA');
                onClose();
              }}
              className="p-5 rounded-xl bg-black/50 border border-hud-pink/50 hover:border-hud-pink cursor-pointer transition-all space-y-3 group hover:shadow-[0_0_20px_rgba(244,114,182,0.3)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-hud-pink group-hover:scale-105 transition-transform">
                  NAYA
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-hud-pink/20 text-hud-pink border border-hud-pink/40">
                  FEMALE CORE
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Intuitive companion AI with soft, melodic female voice and graceful ethereal flowing particle silhouette.
              </p>
              <div className="text-[10px] text-hud-pink font-bold flex items-center space-x-1">
                <span>Color: Pink, Magenta & Violet</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Rules & Transformation Directives */}
        <div className="p-4 rounded-xl bg-black/40 border border-surface-border text-xs space-y-2">
          <div className="text-primary font-bold flex items-center space-x-1.5">
            <Command className="w-4 h-4" />
            <span>AUTHORITATIVE VOICE & COMMAND RULES</span>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-1 text-[11px] leading-relaxed">
            <li>
              Say or type <span className="text-hud-pink font-bold">"REX TRANSFORM"</span> to transform from REX into NAYA.
            </li>
            <li>
              Say or type <span className="text-hud-cyan font-bold">"NAYA TRANSFORM"</span> to transform from NAYA into REX.
            </li>
            <li>
              Spoken audio drives real-time volumetric particle ripples across the 3D hologram.
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-primary text-black font-bold text-xs hover:opacity-90 transition-all"
          >
            INITIALIZE COMMAND CONSOLE
          </button>
        </div>
      </div>
    </div>
  );
};
