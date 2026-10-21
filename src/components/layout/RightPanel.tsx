import React, { useState, useRef, useEffect } from 'react';
import { CharacterId, ChatMessage, AssistantState } from '../../types/assistant';
import { commandProcessor } from '../../services/CommandProcessor';
import { characterStateService } from '../../services/CharacterStateService';
import { voiceProfileService } from '../../services/VoiceProfileService';
import { Send, Mic, MicOff, Terminal, Bot } from 'lucide-react';

interface RightPanelProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  messages: ChatMessage[];
  audioAmplitude: number;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  activeCharacter,
  assistantState,
  messages,
  audioAmplitude
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat feed
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          characterStateService.setAssistantState('listening');
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          handleUserSubmission(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          characterStateService.setAssistantState('idle');
        };

        recognition.onend = () => {
          setIsListening(false);
          if (assistantState === 'listening') {
            characterStateService.setAssistantState('idle');
          }
        };

        recognitionRef.current = recognition;
      }
    }
  }, [activeCharacter, assistantState]);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech Recognition is not supported in this browser. Please use keyboard input.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      characterStateService.setAssistantState('idle');
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error('Mic start error', err);
      }
    }
  };

  const handleUserSubmission = (text: string) => {
    if (!text.trim()) return;

    // Check debounce
    if (!commandProcessor.canExecute(text)) return;

    // Add user message to state
    characterStateService.addMessage({
      sender: 'user',
      text: text.trim()
    });

    // Parse with strict REX AI command processor
    const parseResult = commandProcessor.parse(text, activeCharacter);

    if (parseResult.isCommand && parseResult.type === 'TRANSFORM' && parseResult.targetCharacter) {
      // Execute transformation
      characterStateService.transformTo(parseResult.targetCharacter);
    } else if (parseResult.feedbackMessage) {
      // Direct command feedback
      characterStateService.addMessage({
        sender: 'system',
        text: parseResult.feedbackMessage
      });
    } else {
      // Generate intelligent contextual response
      simulateAssistantResponse(text);
    }

    setInputText('');
  };

  const simulateAssistantResponse = (userPrompt: string) => {
    characterStateService.setAssistantState('thinking');

    setTimeout(() => {
      let reply = '';
      if (activeCharacter === 'REX') {
        reply = `Tactical query received: "${userPrompt}". All systems nominal. Computational coherence at 100%. Ready for your next directive.`;
      } else {
        reply = `I heard you! Regarding "${userPrompt}" — everything is working beautifully! Let me know if you need any tasks organized or scenarios run.`;
      }

      characterStateService.addMessage({
        sender: activeCharacter,
        text: reply
      });

      // Speak response using active character's dedicated voice profile
      voiceProfileService.speak(reply, activeCharacter, {
        onStart: () => characterStateService.setAssistantState('speaking'),
        onEnd: () => characterStateService.setAssistantState('idle'),
        onAmplitude: amp => characterStateService.setAudioAmplitude(amp)
      });
    }, 750);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserSubmission(inputText);
  };

  const isRex = activeCharacter === 'REX';

  return (
    <aside className="w-80 md:w-96 border-l border-surface-border bg-black/50 backdrop-blur-md flex flex-col justify-between select-none z-10">
      {/* Panel Header */}
      <div className="h-12 border-b border-surface-border px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-mono text-gray-200">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-bold tracking-wider">COMMAND & SPEECH MATRIX</span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/30">
          {activeCharacter} VOCAL
        </span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scrollbar-thin">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          const isSystem = msg.sender === 'system';
          const msgSender = msg.sender;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center space-x-1.5 mb-1 text-[10px] font-mono text-gray-400">
                {!isUser && !isSystem && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: msgSender === 'REX' ? '#22D3EE' : '#F472B6' }}
                  />
                )}
                <span className="font-bold">{msgSender}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] p-3 rounded-xl text-xs font-mono leading-relaxed border ${
                  isUser
                    ? 'bg-primary/20 text-white border-primary/40 rounded-tr-none'
                    : isSystem
                    ? 'bg-gray-900/80 text-gray-300 border-gray-700/60 rounded-tl-none italic'
                    : 'bg-surface text-gray-100 border-surface-border rounded-tl-none shadow-[0_0_10px_rgba(0,0,0,0.5)]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Audio Reactive Live Bar */}
      <div className="px-4 py-2 bg-black/60 border-t border-surface-border flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center space-x-2">
          <Bot className="w-3.5 h-3.5 text-primary" />
          <span className="text-gray-400">STATE:</span>
          <span className="text-white font-bold uppercase">{assistantState}</span>
        </div>
        {/* Real-time Amplitude Indicator */}
        <div className="flex items-center space-x-1 w-24 h-2 bg-gray-900 rounded overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-75"
            style={{ width: `${Math.round(audioAmplitude * 100)}%` }}
          />
        </div>
      </div>

      {/* Input Console */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-surface-border bg-black/80 flex items-center space-x-2">
        <button
          type="button"
          onClick={toggleMic}
          className={`p-2.5 rounded-lg border transition-all ${
            isListening
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
              : 'bg-surface border-surface-border text-gray-300 hover:text-white hover:border-primary'
          }`}
          title={isListening ? 'Stop listening' : 'Start microphone speech input'}
        >
          {isListening ? <Mic className="w-4 h-4 text-red-400" /> : <MicOff className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={
            isRex
              ? 'Enter command or say "REX TRANSFORM"...'
              : 'Enter command or say "NAYA TRANSFORM"...'
          }
          className="flex-1 bg-surface border border-surface-border focus:border-primary rounded-lg px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none transition-all"
        />

        <button
          type="submit"
          className="p-2.5 rounded-lg bg-primary text-black hover:opacity-90 font-bold transition-all"
          title="Send Command"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </aside>
  );
};
