import { CharacterId } from '../types/assistant';

export interface CommandParseResult {
  isCommand: boolean;
  type: 'TRANSFORM' | 'STATE_CHANGE' | 'QUERY' | 'UNKNOWN';
  targetCharacter?: CharacterId;
  rawText: string;
  feedbackMessage?: string;
}

class CommandProcessor {
  private lastExecutedCommandTime = 0;
  private lastExecutedPhrase = '';
  private readonly DEBOUNCE_MS = 1200;

  /**
   * Parse and validate commands according to strict REX AI rules:
   * "NAYA TRANSFORM" -> Targets REX (transforms from Naya to Rex)
   * "REX TRANSFORM" -> Targets NAYA (transforms from Rex to Naya)
   * Aliases: "Transform to Naya", "Transform Naya", "Transform to Rex", "Transform Rex"
   */
  public parse(input: string, currentCharacter: CharacterId): CommandParseResult {
    const raw = input.trim();
    const clean = raw.toLowerCase().replace(/[.,!?;:]+$/, '').trim();

    // Check for exact authoritative commands
    if (clean === 'naya transform') {
      return {
        isCommand: true,
        type: 'TRANSFORM',
        targetCharacter: 'REX',
        rawText: raw,
        feedbackMessage: 'Authoritative command received: Initiating transformation to REX core matrix.'
      };
    }

    if (clean === 'rex transform') {
      return {
        isCommand: true,
        type: 'TRANSFORM',
        targetCharacter: 'NAYA',
        rawText: raw,
        feedbackMessage: 'Authoritative command received: Initiating transformation to NAYA core matrix.'
      };
    }

    // Natural Language Aliases targeting NAYA
    if (clean === 'transform to naya' || clean === 'transform naya') {
      return {
        isCommand: true,
        type: 'TRANSFORM',
        targetCharacter: 'NAYA',
        rawText: raw,
        feedbackMessage: 'Transformation sequence initiated: Reorganizing particle field to NAYA.'
      };
    }

    // Natural Language Aliases targeting REX
    if (clean === 'transform to rex' || clean === 'transform rex') {
      return {
        isCommand: true,
        type: 'TRANSFORM',
        targetCharacter: 'REX',
        rawText: raw,
        feedbackMessage: 'Transformation sequence initiated: Reorganizing particle field to REX.'
      };
    }

    // Check for obsolete/disallowed commands
    if (clean === 'naya aao' || clean === 'rex wapas aao') {
      return {
        isCommand: false,
        type: 'UNKNOWN',
        rawText: raw,
        feedbackMessage: 'Note: Legacy triggers "Naya aao" / "Rex wapas aao" are obsolete. Use "NAYA TRANSFORM" or "REX TRANSFORM".'
      };
    }

    // Mode or status commands
    if (clean === 'system diagnostic' || clean === 'run diagnostic') {
      return {
        isCommand: true,
        type: 'QUERY',
        rawText: raw,
        feedbackMessage: 'Diagnostic scan complete: All quantum matrices and particle buffers stable at 100% coherence.'
      };
    }

    return {
      isCommand: false,
      type: 'QUERY',
      rawText: raw
    };
  }

  /**
   * Prevents repeated triggers from ongoing speech transcripts
   */
  public canExecute(phrase: string): boolean {
    const now = Date.now();
    const normalized = phrase.trim().toLowerCase();
    if (
      normalized === this.lastExecutedPhrase &&
      now - this.lastExecutedCommandTime < this.DEBOUNCE_MS
    ) {
      return false;
    }
    this.lastExecutedCommandTime = now;
    this.lastExecutedPhrase = normalized;
    return true;
  }
}

export const commandProcessor = new CommandProcessor();
