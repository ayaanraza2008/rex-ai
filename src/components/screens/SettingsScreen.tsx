import React, { useState } from 'react';
import { Settings, Volume2, Shield, Eye, Sliders, RefreshCw, Check } from 'lucide-react';
import { CharacterId, QualityLevel } from '../../types/assistant';
import { characterStateService } from '../../services/CharacterStateService';
import { voiceProfileService } from '../../services/VoiceProfileService';

interface SettingsScreenProps {
  activeCharacter: CharacterId;
  quality: QualityLevel;
  onQualityChange: (q: QualityLevel) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  activeCharacter,
  quality,
  onQualityChange
}) => {
  const [duration, setDuration] = useState(characterStateService.getTransformationDuration());
  const [rexPitch, setRexPitch] = useState(voiceProfileService.getProfile('REX').pitch);
  const [nayaPitch, setNayaPitch] = useState(voiceProfileService.getProfile('NAYA').pitch);
  const [language, setLanguage] = useState('English');
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = () => {
    characterStateService.setTransformationDuration(duration);
    voiceProfileService.updateProfile('REX', { pitch: rexPitch });
    voiceProfileService.updateProfile('NAYA', { pitch: nayaPitch });
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 2000);
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider flex items-center space-x-2">
              <Settings className="w-5 h-5 text-primary" />
              <span>CORE SYSTEM PREFERENCES</span>
            </h2>
            <p className="text-xs text-gray-400">
              Configure holographic particle density, voice synthesis profiles, and transformation timings.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary text-black font-bold text-xs flex items-center space-x-1.5 hover:opacity-90 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{savedAlert ? 'SAVED!' : 'APPLY CHANGES'}</span>
          </button>
        </div>

        {/* Holographic Particle Quality */}
        <div className="p-5 rounded-xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Eye className="w-4 h-4 text-primary" />
            <span>HOLOGRAPHIC PARTICLE FIDELITY</span>
          </div>

          <p className="text-xs text-gray-400">
            Dynamically scales the procedural 3D head-and-shoulders point cloud density for performance.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'low', name: 'Low Quality', count: '~6,000 Particles', desc: 'Optimized for mobile & low-tier GPUs' },
              { id: 'medium', name: 'Medium Quality', count: '~12,000 Particles', desc: 'Balanced lighting & scanline effects' },
              { id: 'high', name: 'High Quality', count: '~20,000 Particles', desc: 'Maximum volumetric depth & glow' }
            ].map(lvl => (
              <div
                key={lvl.id}
                onClick={() => onQualityChange(lvl.id as QualityLevel)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  quality === lvl.id
                    ? 'bg-primary/20 border-primary text-white shadow-[0_0_15px_var(--color-glow)]'
                    : 'bg-black/40 border-surface-border text-gray-400 hover:border-gray-500'
                }`}
              >
                <div className="text-xs font-bold text-white">{lvl.name}</div>
                <div className="text-[10px] text-primary font-bold mt-0.5">{lvl.count}</div>
                <div className="text-[10px] text-gray-400 mt-1">{lvl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Timing */}
        <div className="p-5 rounded-xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>TRANSFORMATION MIGRATION TIMING</span>
          </div>

          <p className="text-xs text-gray-400">
            Set the duration of the 3D vortex swirling and theme cross-fade during character switches (1.2s - 2.0s).
          </p>

          <div className="flex items-center space-x-4">
            <input
              type="range"
              min={1200}
              max={2000}
              step={100}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="flex-1 accent-primary"
            />
            <span className="text-sm font-bold text-primary w-16 text-right">
              {(duration / 1000).toFixed(1)}s
            </span>
          </div>
        </div>

        {/* Dual Voice Profiles Configuration */}
        <div className="p-5 rounded-xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Volume2 className="w-4 h-4 text-primary" />
            <span>DUAL VOCAL SYNTHESIS CALIBRATION</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* REX Male Voice */}
            <div className="p-4 rounded-lg bg-black/40 border border-hud-cyan/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-hud-cyan">
                <span>REX (Male Voice Profile)</span>
                <span className="text-[10px] uppercase">Authoritative</span>
              </div>
              <div className="text-xs text-gray-400">Pitch Frequency</div>
              <input
                type="range"
                min={0.5}
                max={1.2}
                step={0.05}
                value={rexPitch}
                onChange={e => setRexPitch(Number(e.target.value))}
                className="w-full accent-hud-cyan"
              />
              <div className="text-[11px] text-gray-300 flex justify-between">
                <span>Current: {rexPitch.toFixed(2)}</span>
                <span className="text-hud-cyan">Target: Deep Male Baritone</span>
              </div>
            </div>

            {/* NAYA Female Voice */}
            <div className="p-4 rounded-lg bg-black/40 border border-hud-pink/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-hud-pink">
                <span>NAYA (Female Voice Profile)</span>
                <span className="text-[10px] uppercase">Expressive</span>
              </div>
              <div className="text-xs text-gray-400">Pitch Frequency</div>
              <input
                type="range"
                min={1.0}
                max={1.8}
                step={0.05}
                value={nayaPitch}
                onChange={e => setNayaPitch(Number(e.target.value))}
                className="w-full accent-hud-pink"
              />
              <div className="text-[11px] text-gray-300 flex justify-between">
                <span>Current: {nayaPitch.toFixed(2)}</span>
                <span className="text-hud-pink">Target: Soft Melodic Female</span>
              </div>
            </div>
          </div>
        </div>

        {/* Localization & Language */}
        <div className="p-5 rounded-xl bg-surface border border-surface-border space-y-4">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <Sliders className="w-4 h-4 text-primary" />
            <span>LOCALIZATION & SYSTEM LANGUAGE</span>
          </div>

          <div className="flex items-center space-x-3">
            {['English', 'Hindi', 'Hinglish'].map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                  language === lang
                    ? 'bg-primary/20 border-primary text-white'
                    : 'bg-black/40 border-surface-border text-gray-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
