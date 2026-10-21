import { CharacterId, VoiceProfile } from '../types/assistant';
import { CHARACTER_PROFILES } from './CharacterConfig';

class VoiceProfileService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private voices: SpeechSynthesisVoice[] = [];
  private amplitudeInterval: number | null = null;
  private cachedProfiles: Record<CharacterId, VoiceProfile> = {
    REX: { ...CHARACTER_PROFILES.REX.defaultVoice },
    NAYA: { ...CHARACTER_PROFILES.NAYA.defaultVoice }
  };

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.initVoices();
      window.speechSynthesis.onvoiceschanged = () => this.initVoices();
    }
  }

  private initVoices() {
    this.voices = window.speechSynthesis.getVoices();
  }

  public getProfile(character: CharacterId): VoiceProfile {
    return this.cachedProfiles[character];
  }

  public updateProfile(character: CharacterId, updates: Partial<VoiceProfile>) {
    this.cachedProfiles[character] = {
      ...this.cachedProfiles[character],
      ...updates
    };
  }

  private selectBestVoice(character: CharacterId): SpeechSynthesisVoice | null {
    if (!this.voices.length) {
      this.voices = window.speechSynthesis.getVoices();
    }
    const isMale = character === 'REX';

    // Look for appropriate voice by gender clues in voice name
    const maleNames = ['david', 'george', 'male', 'guy', 'mark', 'james', 'alex', 'daniel'];
    const femaleNames = ['zira', 'susan', 'female', 'aria', 'jenny', 'samantha', 'victoria', 'karen'];

    const targetList = isMale ? maleNames : femaleNames;

    let matched = this.voices.find(v => {
      const name = v.name.toLowerCase();
      return targetList.some(kw => name.includes(kw));
    });

    if (!matched && this.voices.length > 0) {
      matched = this.voices.find(v => v.lang.startsWith('en')) || this.voices[0];
    }

    return matched || null;
  }

  public speak(
    text: string,
    character: CharacterId,
    callbacks?: {
      onStart?: () => void;
      onEnd?: () => void;
      onAmplitude?: (amp: number) => void;
    }
  ): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      callbacks?.onStart?.();
      setTimeout(() => callbacks?.onEnd?.(), 1500);
      return;
    }

    // Stop current speech before switching or speaking
    this.stop();

    const profile = this.cachedProfiles[character];
    const utterance = new SpeechSynthesisUtterance(text);
    const chosenVoice = this.selectBestVoice(character);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.pitch = profile.pitch;
    utterance.rate = profile.rate;
    utterance.volume = profile.volume;
    utterance.lang = profile.lang;

    this.currentUtterance = utterance;
    this.isSpeaking = true;

    utterance.onstart = () => {
      callbacks?.onStart?.();
      this.startAmplitudeSimulation(callbacks?.onAmplitude);
    };

    const cleanup = () => {
      this.isSpeaking = false;
      this.stopAmplitudeSimulation();
      this.currentUtterance = null;
      callbacks?.onAmplitude?.(0);
      callbacks?.onEnd?.();
    };

    utterance.onend = cleanup;
    utterance.onerror = () => cleanup();

    window.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.stopAmplitudeSimulation();
    this.currentUtterance = null;
  }

  private startAmplitudeSimulation(callback?: (amp: number) => void) {
    this.stopAmplitudeSimulation();
    if (!callback) return;

    let tick = 0;
    this.amplitudeInterval = window.setInterval(() => {
      tick++;
      // Natural speech cadence waveform
      const primary = Math.sin(tick * 0.4) * 0.5 + 0.5;
      const flutter = Math.sin(tick * 1.3) * 0.25;
      const noise = (Math.random() - 0.5) * 0.15;
      const amplitude = Math.max(0.15, Math.min(1.0, primary + flutter + noise));
      callback(amplitude);
    }, 40);
  }

  private stopAmplitudeSimulation() {
    if (this.amplitudeInterval !== null) {
      clearInterval(this.amplitudeInterval);
      this.amplitudeInterval = null;
    }
  }

  public getIsSpeaking(): boolean {
    return this.isSpeaking;
  }
}

export const voiceProfileService = new VoiceProfileService();
