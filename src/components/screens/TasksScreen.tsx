import React, { useState } from 'react';
import { TaskItem } from '../../types/assistant';
import { CheckSquare, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const TasksScreen: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: 'task-1',
      title: 'Integrate living 3D holographic particle core',
      category: 'Core System',
      priority: 'high',
      status: 'completed',
      dueDate: 'Today'
    },
    {
      id: 'task-2',
      title: 'Implement authoritative NAYA TRANSFORM / REX TRANSFORM controller',
      category: 'Command Matrix',
      priority: 'high',
      status: 'completed',
      dueDate: 'Today'
    },
    {
      id: 'task-3',
      title: 'Synchronize male/female voice profiles with Web Speech synthesis',
      category: 'Voice Matrix',
      priority: 'medium',
      status: 'in_progress',
      dueDate: 'Tomorrow'
    },
    {
      id: 'task-4',
      title: 'Prepare Render Blueprint render.yaml deployment configuration',
      category: 'Deployment',
      priority: 'high',
      status: 'in_progress',
      dueDate: 'Tomorrow'
    },
    {
      id: 'task-5',
      title: 'Calibrate quantum coherence and memory flux telemetry',
      category: 'Diagnostics',
      priority: 'low',
      status: 'todo',
      dueDate: 'Oct 24'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: 'General Directive',
      priority: 'medium',
      status: 'todo',
      dueDate: 'Upcoming'
    };

    setTasks([...tasks, newTask]);
    setNewTitle('');
  };

  const toggleStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus =
            t.status === 'todo'
              ? 'in_progress'
              : t.status === 'in_progress'
              ? 'completed'
              : 'todo';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const columns = [
    { id: 'todo', title: 'TO DO', icon: AlertCircle, color: 'text-yellow-400' },
    { id: 'in_progress', title: 'IN PROGRESS', icon: Clock, color: 'text-primary' },
    { id: 'completed', title: 'COMPLETED', icon: CheckCircle, color: 'text-green-400' }
  ];

  return (
    <div className="w-full h-full p-6 overflow-y-auto font-mono text-gray-200">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white tracking-wider flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              <span>TASK DIRECTIVE MATRIX</span>
            </h2>
            <p className="text-xs text-gray-400">
              Directives categorized by real-time execution stage.
            </p>
          </div>

          <form onSubmit={addTask} className="flex items-center space-x-2">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="Add new directive..."
              className="bg-surface border border-surface-border focus:border-primary rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-primary text-black font-bold text-xs flex items-center space-x-1 hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>ADD</span>
            </button>
          </form>
        </div>

        {/* 3-Column Kanban Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(col => {
            const ColIcon = col.icon;
            const colTasks = tasks.filter(t => t.status === col.id);

            return (
              <div
                key={col.id}
                className="p-4 rounded-xl bg-surface border border-surface-border flex flex-col space-y-3"
              >
                <div className="flex items-center justify-between border-b border-surface-border pb-2 text-xs font-bold">
                  <div className="flex items-center space-x-2">
                    <ColIcon className={`w-4 h-4 ${col.color}`} />
                    <span className="text-white">{col.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-black/40 text-[10px] text-gray-400 border border-surface-border">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 flex-1 min-h-[220px]">
                  {colTasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => toggleStatus(task.id)}
                      className="p-3 rounded-lg bg-black/50 border border-surface-border hover:border-primary cursor-pointer transition-all space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-primary font-bold">{task.category}</span>
                        <span className="text-gray-400">{task.dueDate}</span>
                      </div>
                      <p className="text-xs text-gray-200 group-hover:text-white leading-snug">
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-surface-border/40">
                        <span className="text-gray-400 uppercase">PRIORITY: {task.priority}</span>
                        <span className="text-primary group-hover:underline">Click to advance</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
