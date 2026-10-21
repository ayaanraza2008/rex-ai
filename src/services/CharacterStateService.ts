import {
  AssistantState,
  CharacterConfig,
  CharacterId,
  ChatMessage,
  QualityLevel,
  RenderMode,
  TransformationStatus
} from '../types/assistant';
import { CHARACTER_PROFILES } from './CharacterConfig';
import { voiceProfileService } from './VoiceProfileService';

export interface StateSnapshot {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  transformationStatus: TransformationStatus;
  transformationProgress: number; // 0 to 1
  renderMode: RenderMode;
  quality: QualityLevel;
  audioAmplitude: number;
  messages: ChatMessage[];
  characterConfig: CharacterConfig;
}

type Listener = (state: StateSnapshot) => void;

class CharacterStateService {
  private activeCharacter: CharacterId = 'REX';
  private assistantState: AssistantState = 'idle';
  private transformationStatus: TransformationStatus = 'idle';
  private transformationProgress = 0;
  private renderMode: RenderMode = 'hologram';
  private quality: QualityLevel = 'high';
  private audioAmplitude = 0;
  private messages: ChatMessage[] = [
    {
      id: 'welcome-1',
      sender: 'system',
      text: 'REX AI Quantum Operating System v4.8 initialized. Holographic particle matrix online.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      id: 'welcome-2',
      sender: 'REX',
      text: 'Greetings. I am REX, your tactical AI command assistant. System is ready for instructions. You can say or type "REX TRANSFORM" to switch to NAYA.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  private listeners: Set<Listener> = new Set();
  private transformationAnimationId: number | null = null;
  private transformationDuration = 1600; // ms

  constructor() {
    this.applyTheme(this.activeCharacter);
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const snap = this.getSnapshot();
    this.listeners.forEach(fn => fn(snap));
  }

  public getSnapshot(): StateSnapshot {
    return {
      activeCharacter: this.activeCharacter,
      assistantState: this.assistantState,
      transformationStatus: this.transformationStatus,
      transformationProgress: this.transformationProgress,
      renderMode: this.renderMode,
      quality: this.quality,
      audioAmplitude: this.audioAmplitude,
      messages: [...this.messages],
      characterConfig: CHARACTER_PROFILES[this.activeCharacter]
    };
  }

  public setAssistantState(state: AssistantState) {
    if (this.assistantState === state) return;
    this.assistantState = state;
    this.notify();
  }

  public setRenderMode(mode: RenderMode) {
    this.renderMode = mode;
    this.notify();
  }

  public setQuality(quality: QualityLevel) {
    this.quality = quality;
    this.notify();
  }

  public setAudioAmplitude(amp: number) {
    this.audioAmplitude = Math.max(0, Math.min(1, amp));
    this.notify();
  }

  public addMessage(message: Omit<ChatMessage, 'id' | 'timestamp'>) {
    const newMsg: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages = [...this.messages, newMsg];
    this.notify();
  }

  public applyTheme(charId: CharacterId) {
    if (typeof document === 'undefined') return;
    const config = CHARACTER_PROFILES[charId];
    const root = document.documentElement;

    root.style.setProperty('--color-bg', config.backgroundColor);
    root.style.setProperty('--color-primary', config.primaryColor);
    root.style.setProperty('--color-accent', config.accentColor);
    root.style.setProperty('--color-glow', config.glowColor);
    root.style.setProperty(
      '--color-surface',
      charId === 'REX' ? 'rgba(7, 21, 38, 0.75)' : 'rgba(28, 10, 24, 0.75)'
    );
    root.style.setProperty(
      '--color-border',
      charId === 'REX' ? 'rgba(34, 211, 238, 0.25)' : 'rgba(244, 114, 182, 0.25)'
    );
  }

  /**
   * Initiates continuous particle migration and lighting cross-fade
   */
  public transformTo(target: CharacterId, customDuration?: number): Promise<boolean> {
    return new Promise(resolve => {
      // If already the target and not currently transforming, no-op
      if (this.activeCharacter === target && this.transformationStatus === 'idle') {
        this.addMessage({
          sender: 'system',
          text: `Core matrix is already aligned to ${target}.`
        });
        resolve(false);
        return;
      }

      // Stop ongoing voice output to prevent persona voice mismatch
      voiceProfileService.stop();

      // Cancel any ongoing transformation animation
      if (this.transformationAnimationId !== null) {
        cancelAnimationFrame(this.transformationAnimationId);
        this.transformationAnimationId = null;
      }

      const duration = customDuration || this.transformationDuration;
      const startTime = performance.now();
      const fromChar = this.activeCharacter;

      this.assistantState = 'transforming';
      this.transformationStatus = 'running';
      this.transformationProgress = 0;
      this.notify();

      this.addMessage({
        sender: 'system',
        text: `Transformation sequence initiated: ${fromChar} ➔ ${target}. Swirling particle field...`
      });

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1.0, elapsed / duration);
        this.transformationProgress = progress;

        // Smooth cubic ease-in-out
        // At 50% mark, crossfade character theme and authoritative state
        if (progress >= 0.5 && this.activeCharacter !== target) {
          this.activeCharacter = target;
          this.applyTheme(target);
        }

        this.notify();

        if (progress < 1.0) {
          this.transformationAnimationId = requestAnimationFrame(tick);
        } else {
          // Completed
          this.transformationAnimationId = null;
          this.transformationProgress = 1.0;
          this.activeCharacter = target;
          this.applyTheme(target);
          this.transformationStatus = 'completed';
          this.assistantState = 'idle';

          this.addMessage({
            sender: target,
            text:
              target === 'REX'
                ? 'REX matrix restored and calibrated. Command protocols online.'
                : 'Hi there! NAYA is now active and ready to assist you!'
          });

          // Play brief greeting with target voice
          voiceProfileService.speak(
            target === 'REX' ? 'REX matrix online.' : 'NAYA is ready!',
            target,
            {
              onStart: () => this.setAssistantState('speaking'),
              onEnd: () => this.setAssistantState('idle'),
              onAmplitude: amp => this.setAudioAmplitude(amp)
            }
          );

          this.notify();

          // Reset status to idle after brief pause
          setTimeout(() => {
            this.transformationStatus = 'idle';
            this.transformationProgress = 0;
            this.notify();
          }, 300);

          resolve(true);
        }
      };

      this.transformationAnimationId = requestAnimationFrame(tick);
    });
  }

  public setTransformationDuration(durationMs: number) {
    this.transformationDuration = Math.max(1200, Math.min(2500, durationMs));
  }

  public getTransformationDuration(): number {
    return this.transformationDuration;
  }
}

export const characterStateService = new CharacterStateService();
