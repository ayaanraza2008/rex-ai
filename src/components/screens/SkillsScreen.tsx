import React, { useState } from 'react';
import { Cpu, Search, Check, Shield, Database, Terminal, Image, Radio } from 'lucide-react';
import { SkillItem } from '../../types/assistant';

export const SkillsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [skills, setSkills] = useState<SkillItem[]>([
    {
      id: 'skill-1',
      name: 'Holographic Particle Synthesizer',
      category: 'System Control',
      description: 'Controls real-time 3D particle distribution, vortex swirling, and dynamic LOD quality.',
      enabled: true,
      version: 'v4.2.0'
    },
    {
      id: 'skill-2',
      name: 'Dual Personality Synchronizer',
      category: 'System Control',
      description: 'Manages authoritative switching between REX (male) and NAYA (female) with zero memory leaks.',
      enabled: true,
      version: 'v2.1.0'
    },
    {
      id: 'skill-3',
      name: 'Web Audio Amplitude Analyzer',
      category: 'Media',
      description: 'Extracts real-time waveform frequencies from assistant audio to drive dynamic particle ripples.',
      enabled: true,
      version: 'v1.8.5'
    },
    {
      id: 'skill-4',
      name: 'Autonomous Task Scheduler',
      category: 'Intelligence',
      description: 'Maintains timeline schedules, Kanban boards, and autonomous background triggers.',
      enabled: true,
      version: 'v3.0.1'
    },
    {
      id: 'skill-5',
      name: 'Cybernetic Security Sentinel',
      category: 'System Control',
      description: 'Monitors inbound directives, sanitizes command input, and prevents invalid transition locks.',
      enabled: true,
      version: 'v2.4.0'
    },
    {
      id: 'skill-6',
      name: 'Quantum Telemetry Streamer',
      category: 'Diagnostics',
      description: 'Streams GPU memory flux, coherence indicators, and frame rates to the Visual Hub dock.',
      enabled: true,
      version: 'v1.4.2'
    }
  ]);

  const toggleSkill = (id: string) => {
    setSkills(prev =>
      prev.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const filtered = skills.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-primary" />
              <span>SKILL MODULE MATRIX</span>
            </h2>
            <p className="text-xs text-gray-400">
              Enable and calibrate modular capability extensions for REX AI.
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search skill modules..."
              className="bg-surface border border-surface-border focus:border-primary rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(skill => (
            <div
              key={skill.id}
              className="p-5 rounded-xl bg-surface border border-surface-border flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-primary tracking-widest">
                    {skill.category}
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {skill.version}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{skill.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="pt-3 border-t border-surface-border/50 flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  Status: {skill.enabled ? 'ACTIVE' : 'DISABLED'}
                </span>

                <button
                  onClick={() => toggleSkill(skill.id)}
                  className={`w-12 h-6 rounded-full p-1 transition-all flex items-center ${
                    skill.enabled ? 'bg-primary justify-end' : 'bg-gray-800 justify-start'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full transition-all ${
                      skill.enabled ? 'bg-black' : 'bg-gray-400'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
