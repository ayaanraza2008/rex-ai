import React, { useState, useEffect } from 'react';
import { characterStateService, StateSnapshot } from './services/CharacterStateService';
import { commandProcessor } from './services/CommandProcessor';
import { Topbar } from './components/layout/Topbar';
import { Sidebar, ScreenId } from './components/layout/Sidebar';
import { RightPanel } from './components/layout/RightPanel';
import { BottomDock } from './components/layout/BottomDock';
import { HomeScreen } from './components/screens/HomeScreen';
import { TodayScreen } from './components/screens/TodayScreen';
import { TasksScreen } from './components/screens/TasksScreen';
import { ScenariosScreen } from './components/screens/ScenariosScreen';
import { SkillsScreen } from './components/screens/SkillsScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { OnboardingModal } from './components/screens/OnboardingModal';
import { QualityLevel } from './types/assistant';

export const App: React.FC = () => {
  const [state, setState] = useState<StateSnapshot>(characterStateService.getSnapshot());
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Subscribe to authoritative CharacterStateService
  useEffect(() => {
    const unsubscribe = characterStateService.subscribe(newState => {
      setState(newState);
    });
    return () => unsubscribe();
  }, []);

  const handleTransformClick = () => {
    const nextChar = state.activeCharacter === 'REX' ? 'NAYA' : 'REX';
    characterStateService.transformTo(nextChar);
  };

  const handleQuickCommand = (cmd: string) => {
    characterStateService.addMessage({
      sender: 'user',
      text: cmd
    });

    const res = commandProcessor.parse(cmd, state.activeCharacter);
    if (res.isCommand && res.type === 'TRANSFORM' && res.targetCharacter) {
      characterStateService.transformTo(res.targetCharacter);
    } else if (res.feedbackMessage) {
      characterStateService.addMessage({
        sender: 'system',
        text: res.feedbackMessage
      });
    }
  };

  const handleQualityChange = (q: QualityLevel) => {
    characterStateService.setQuality(q);
  };

  const handleToggleRenderMode = () => {
    characterStateService.setRenderMode(
      state.renderMode === 'hologram' ? 'orb' : 'hologram'
    );
  };

  return (
    <div className="relative w-screen h-screen flex flex-col bg-background text-gray-100 overflow-hidden font-mono hud-grid-pattern">
      {/* Scanline CRT overlay */}
      <div className="scanline-overlay" />

      {/* Topbar */}
      <Topbar
        activeCharacter={state.activeCharacter}
        transformationStatus={state.transformationStatus}
        quality={state.quality}
        onTransformClick={handleTransformClick}
        onQualityChange={handleQualityChange}
        onOpenSettings={() => setCurrentScreen('settings')}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Navigation Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={screen => setCurrentScreen(screen)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />

        {/* Dynamic Center Work Area */}
        <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-black/20">
          {currentScreen === 'home' && (
            <HomeScreen
              activeCharacter={state.activeCharacter}
              assistantState={state.assistantState}
              transformationProgress={state.transformationProgress}
              renderMode={state.renderMode}
              quality={state.quality}
              audioAmplitude={state.audioAmplitude}
              onToggleRenderMode={handleToggleRenderMode}
              onQuickCommand={handleQuickCommand}
            />
          )}

          {currentScreen === 'today' && (
            <TodayScreen activeCharacter={state.activeCharacter} />
          )}

          {currentScreen === 'tasks' && <TasksScreen />}

          {currentScreen === 'scenarios' && <ScenariosScreen />}

          {currentScreen === 'skills' && <SkillsScreen />}

          {currentScreen === 'activity' && <ActivityScreen />}

          {currentScreen === 'settings' && (
            <SettingsScreen
              activeCharacter={state.activeCharacter}
              quality={state.quality}
              onQualityChange={handleQualityChange}
            />
          )}
        </main>

        {/* Right Command & Speech Console */}
        <RightPanel
          activeCharacter={state.activeCharacter}
          assistantState={state.assistantState}
          messages={state.messages}
          audioAmplitude={state.audioAmplitude}
        />
      </div>

      {/* Bottom Visual Hub Dock */}
      <BottomDock />

      {/* Onboarding Guide Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSelectCharacter={char => characterStateService.transformTo(char)}
      />
    </div>
  );
};
