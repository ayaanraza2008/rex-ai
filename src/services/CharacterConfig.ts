import { CharacterConfig, CharacterId } from '../types/assistant';

export const CHARACTER_PROFILES: Record<CharacterId, CharacterConfig> = {
  REX: {
    id: 'REX',
    name: 'REX',
    type: 'Male AI Assistant',
    theme: 'Cyan & Electric Blue',
    primaryColor: '#22D3EE',
    accentColor: '#3B82F6',
    backgroundColor: '#050B14',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    voiceDescription: 'Deep, confident, authoritative male voice',
    avatarDescription: 'Masculine head-and-shoulders holographic particle silhouette with sharp cybernetic contours',
    defaultVoice: {
      id: 'rex-voice-male',
      name: 'REX Authority Matrix',
      gender: 'male',
      pitch: 0.85,
      rate: 1.0,
      volume: 1.0,
      lang: 'en-US'
    }
  },
  NAYA: {
    id: 'NAYA',
    name: 'NAYA',
    type: 'Female AI Companion',
    theme: 'Pink, Magenta & Violet',
    primaryColor: '#F472B6',
    accentColor: '#A855F7',
    backgroundColor: '#12060F',
    glowColor: 'rgba(244, 114, 182, 0.45)',
    voiceDescription: 'Soft, cute, friendly, expressive female voice',
    avatarDescription: 'Feminine head-and-shoulders holographic particle silhouette with flowing ethereal contours',
    defaultVoice: {
      id: 'naya-voice-female',
      name: 'NAYA Ethereal Harmony',
      gender: 'female',
      pitch: 1.25,
      rate: 1.05,
      volume: 1.0,
      lang: 'en-US'
    }
  }
};
