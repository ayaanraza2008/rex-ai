import React from 'react';
import { Sun, CloudRain, Clock, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { CharacterId } from '../../types/assistant';

interface TodayScreenProps {
  activeCharacter: CharacterId;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({ activeCharacter }) => {
  const isRex = activeCharacter === 'REX';

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Morning Brief Card */}
        <div className="p-6 rounded-xl bg-surface border border-surface-border shadow-[0_0_20px_var(--color-glow)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Sun className="w-6 h-6 text-yellow-400 animate-spin-slow" />
              <div>
                <h2 className="text-lg font-bold text-white tracking-wide">
                  {isRex ? 'TACTICAL MORNING BRIEF' : 'TODAY WITH NAYA'}
                </h2>
                <p className="text-xs text-gray-400">
                  Wednesday, October 21 • Core Status: Fully Operational
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-primary/20 text-primary border border-primary/40 text-xs font-bold">
              OPTIMAL
            </span>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed mb-4">
            {isRex
              ? 'Directive summary: 4 high-priority tasks in queue, 2 automated scenarios scheduled for deployment, memory buffer operating at peak throughput. No security intrusions detected.'
              : 'Good morning! Everything is looking bright and organized. You have a productive schedule lined up, and I am here right by your side to help you accomplish all of it.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-black/40 border border-surface-border">
              <span className="text-[10px] text-gray-400 block">WEATHER FORECAST (SIMULATED)</span>
              <span className="text-sm font-bold text-white">22°C Clear Skies</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Humidity 45% • Wind 8 km/h</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-surface-border">
              <span className="text-[10px] text-gray-400 block">SCHEDULED SESSIONS</span>
              <span className="text-sm font-bold text-primary">3 Strategic Blocks</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Next block at 14:00</span>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-surface-border">
              <span className="text-[10px] text-gray-400 block">SYSTEM READINESS</span>
              <span className="text-sm font-bold text-green-400">100% Coherent</span>
              <span className="text-[10px] text-gray-400 block mt-0.5">Voice Matrix Synced</span>
            </div>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="p-6 rounded-xl bg-surface border border-surface-border">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span>DAY TIMELINE</span>
          </h3>

          <div className="space-y-3">
            {[
              { time: '09:00', title: 'System Boot & Neural Diagnostics', status: 'completed' },
              { time: '11:30', title: 'Codebase Verification & Hologram Integration', status: 'completed' },
              { time: '14:00', title: 'Deep Focus Work: Quantum Shader Tuning', status: 'upcoming' },
              { time: '17:30', title: 'Night Sentinel Protocol Activation', status: 'upcoming' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-surface-border"
              >
                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-primary font-bold">{item.time}</span>
                  <span className="text-gray-200">{item.title}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                    item.status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
