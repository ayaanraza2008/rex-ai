import React, { useState } from 'react';
import { Activity, RefreshCw, Volume2, ShieldCheck, Terminal, Filter } from 'lucide-react';
import { ActivityEvent } from '../../types/assistant';

export const ActivityScreen: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'transform' | 'voice' | 'system'>('all');

  const events: ActivityEvent[] = [
    {
      id: 'ev-1',
      type: 'system',
      description: 'Quantum Kernel initialized. Procedural 3D silhouette vertex buffers created.',
      timestamp: '16:48:10',
      character: 'REX',
      level: 'info'
    },
    {
      id: 'ev-2',
      type: 'character_changed',
      description: 'Active character calibrated to REX (male). Theme tokens bound to cyan/blue (#22D3EE).',
      timestamp: '16:48:15',
      character: 'REX',
      level: 'success'
    },
    {
      id: 'ev-3',
      type: 'transform',
      description: 'Exact command "REX TRANSFORM" evaluated. Particle migration sequence dispatched to NAYA.',
      timestamp: '16:50:02',
      character: 'NAYA',
      level: 'info'
    },
    {
      id: 'ev-4',
      type: 'voice',
      description: 'Speech synthesis pipeline bound to female vocal profile. Audio reactivity frequency synced.',
      timestamp: '16:50:05',
      character: 'NAYA',
      level: 'success'
    },
    {
      id: 'ev-5',
      type: 'system',
      description: 'Core memory flux stable at 99.8% coherence. 20,480 point cloud vertices rendering at 60 FPS.',
      timestamp: '16:52:19',
      character: 'NAYA',
      level: 'info'
    }
  ];

  const filtered = events.filter(e => {
    if (filter === 'all') return true;
    if (filter === 'transform') return e.type === 'transform' || e.type === 'character_changed';
    if (filter === 'voice') return e.type === 'voice';
    if (filter === 'system') return e.type === 'system';
    return true;
  });

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider flex items-center space-x-2">
              <Activity className="w-5 h-5 text-primary" />
              <span>SYSTEM ACTIVITY TIMELINE</span>
            </h2>
            <p className="text-xs text-gray-400">
              Deterministic log of transformations, voice outputs, and kernel events.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-surface p-1 rounded-lg border border-surface-border text-xs">
            {(['all', 'transform', 'voice', 'system'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1 rounded capitalize ${
                  filter === tab ? 'bg-primary text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Event List */}
        <div className="space-y-3">
          {filtered.map(evt => (
            <div
              key={evt.id}
              className="p-4 rounded-xl bg-surface border border-surface-border flex items-start justify-between space-x-4"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-black/50 border border-surface-border mt-0.5">
                  {evt.type === 'transform' || evt.type === 'character_changed' ? (
                    <RefreshCw className="w-4 h-4 text-primary" />
                  ) : evt.type === 'voice' ? (
                    <Volume2 className="w-4 h-4 text-primary" />
                  ) : (
                    <Terminal className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                      {evt.type.replace('_', ' ')}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-[10px] text-gray-400 font-bold">
                      CORE: {evt.character}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200">{evt.description}</p>
                </div>
              </div>

              <span className="text-[11px] text-gray-400 font-mono whitespace-nowrap">
                {evt.timestamp}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
