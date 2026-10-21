import React from 'react';
import {
  Home,
  Calendar,
  CheckSquare,
  PlayCircle,
  Cpu,
  Activity,
  Settings,
  HelpCircle
} from 'lucide-react';

export type ScreenId =
  | 'home'
  | 'today'
  | 'tasks'
  | 'scenarios'
  | 'skills'
  | 'activity'
  | 'settings';

interface SidebarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  onOpenOnboarding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenOnboarding
}) => {
  const navItems: Array<{ id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }> = [
    { id: 'home', label: 'Command Hub', icon: Home },
    { id: 'today', label: 'Today Brief', icon: Calendar },
    { id: 'tasks', label: 'Task Matrix', icon: CheckSquare },
    { id: 'scenarios', label: 'Scenarios', icon: PlayCircle },
    { id: 'skills', label: 'Skills Grid', icon: Cpu },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-16 md:w-56 border-r border-surface-border bg-black/50 backdrop-blur-md flex flex-col justify-between py-4 select-none z-10">
      {/* Navigation Links */}
      <nav className="flex flex-col space-y-1.5 px-2">
        <div className="hidden md:block px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold">
          SYSTEM NAV
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-mono tracking-wide transition-all ${
                isActive
                  ? 'bg-primary/15 text-white font-bold border-l-2 border-primary shadow-[0_0_12px_var(--color-glow)]'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-surface'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Help / Guide */}
      <div className="px-2 pt-4 border-t border-surface-border/50">
        <button
          onClick={onOpenOnboarding}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-mono text-gray-400 hover:text-white hover:bg-surface transition-all"
        >
          <HelpCircle className="w-4 h-4 text-primary" />
          <span className="hidden md:inline">Protocol Guide</span>
        </button>
      </div>
    </aside>
  );
};
