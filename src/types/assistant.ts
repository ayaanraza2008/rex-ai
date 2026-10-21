export type CharacterId = 'REX' | 'NAYA';

export type AssistantState =
  | 'idle'
  | 'listening'
  | 'thinking'
  | 'speaking'
  | 'transforming'
  | 'quiet'
  | 'error';

export type TransformationStatus =
  | 'idle'
  | 'running'
  | 'completed'
  | 'cancelled';

export type RenderMode = 'hologram' | 'orb';

export type QualityLevel = 'low' | 'medium' | 'high';

export interface VoiceProfile {
  id: string;
  name: string;
  gender: 'male' | 'female';
  pitch: number;
  rate: number;
  volume: number;
  lang: string;
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  type: string;
  theme: string;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  glowColor: string;
  voiceDescription: string;
  avatarDescription: string;
  defaultVoice: VoiceProfile;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | CharacterId | 'system';
  text: string;
  timestamp: string;
  isCommand?: boolean;
  status?: 'delivered' | 'processing' | 'error';
}

export interface TaskItem {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  dueDate: string;
}

export interface ScenarioRoutine {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'idle' | 'running' | 'completed';
  lastRun?: string;
  category: 'maintenance' | 'security' | 'workflow' | 'diagnostics';
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'System Control' | 'Intelligence' | 'Code' | 'Media' | 'Diagnostics';
  description: string;
  enabled: boolean;
  version: string;
}

export interface ActivityEvent {
  id: string;
  type: 'character_changed' | 'transform' | 'voice' | 'command' | 'system' | 'state_changed';
  description: string;
  timestamp: string;
  character: CharacterId;
  level: 'info' | 'warn' | 'success' | 'error';
}

export interface SystemTelemetry {
  quantumCoherence: number;
  coreTemperature: number;
  memoryFlux: number;
  fps: number;
  particleCount: number;
  audioAmplitude: number;
  webGlSupported: boolean;
}
