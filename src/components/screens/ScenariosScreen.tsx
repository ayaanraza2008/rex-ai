import React, { useState } from 'react';
import { PlayCircle, ShieldCheck, Moon, Brain, RefreshCw, CheckCircle2 } from 'lucide-react';
import { characterStateService } from '../../services/CharacterStateService';

export const ScenariosScreen: React.FC = () => {
  const [runningRoutineId, setRunningRoutineId] = useState<string | null>(null);

  const routines = [
    {
      id: 'routine-1',
      title: 'Full Quantum Core Diagnostic',
      category: 'Diagnostics',
      description: 'Comprehensive integrity check of the 20,000 particle vertex cloud, GLSL shader compilation, and Web Audio pipelines.',
      icon: RefreshCw,
      duration: '4.2s'
    },
    {
      id: 'routine-2',
      title: 'Night Sentinel Perimeter',
      category: 'Security',
      description: 'Locks external ingress channels, switches particle core to low-emission idle state, and activates background telemetry logging.',
      icon: Moon,
      duration: '1.5s'
    },
    {
      id: 'routine-3',
      title: 'Deep Focus Cognitive Matrix',
      category: 'Workflow',
      description: 'Suppresses non-essential notifications, prioritizes voice response rate, and sets particle lighting to subdued cybernetic cyan.',
      icon: Brain,
      duration: '2.0s'
    },
    {
      id: 'routine-4',
      title: 'Holographic Particle Calibration',
      category: 'Maintenance',
      description: 'Refreshes 3D head-and-shoulders point cloud vertices for both REX and NAYA silhouettes, clearing GPU buffer drift.',
      icon: ShieldCheck,
      duration: '3.1s'
    }
  ];

  const handleRun = (id: string, title: string) => {
    setRunningRoutineId(id);
    characterStateService.setAssistantState('thinking');
    characterStateService.addMessage({
      sender: 'system',
      text: `Routine activated: "${title}". Executing procedural subroutines...`
    });

    setTimeout(() => {
      setRunningRoutineId(null);
      characterStateService.setAssistantState('idle');
      characterStateService.addMessage({
        sender: 'system',
        text: `Routine completed successfully: "${title}". All subsystems calibrated.`
      });
    }, 2500);
  };

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white tracking-wider flex items-center space-x-2">
            <PlayCircle className="w-5 h-5 text-primary" />
            <span>AUTONOMOUS SCENARIOS</span>
          </h2>
          <p className="text-xs text-gray-400">
            Execute automated tactical and diagnostic routines across the REX AI framework.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {routines.map(routine => {
            const Icon = routine.icon;
            const isRunning = runningRoutineId === routine.id;

            return (
              <div
                key={routine.id}
                className="p-5 rounded-xl bg-surface border border-surface-border flex flex-col justify-between space-y-4 hover:border-primary/60 transition-all shadow-[0_0_15px_rgba(0,0,0,0.4)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-black/50 border border-surface-border">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                        {routine.category}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400">EST: {routine.duration}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white tracking-wide mb-1">
                    {routine.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {routine.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-surface-border/50 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">
                    Status: {isRunning ? 'EXECUTING...' : 'READY'}
                  </span>
                  <button
                    onClick={() => handleRun(routine.id, routine.title)}
                    disabled={isRunning}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all ${
                      isRunning
                        ? 'bg-primary/30 text-white animate-pulse'
                        : 'bg-primary text-black hover:opacity-90'
                    }`}
                  >
                    <PlayCircle className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
                    <span>{isRunning ? 'RUNNING' : 'RUN SCENARIO'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
