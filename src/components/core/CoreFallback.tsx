import React, { useEffect, useRef } from 'react';
import { AssistantState, CharacterId } from '../../types/assistant';

interface CoreFallbackProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  audioAmplitude: number;
}

export const CoreFallback: React.FC<CoreFallbackProps> = ({
  activeCharacter,
  assistantState,
  audioAmplitude
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isRex = activeCharacter === 'REX';
  const primaryColor = isRex ? '#22D3EE' : '#F472B6';
  const accentColor = isRex ? '#3B82F6' : '#A855F7';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Generate 2D fallback particle points
    const points: Array<{ x: number; y: number; r: number; speed: number; alpha: number }> = [];
    const count = 180;
    for (let i = 0; i < count; i++) {
      points.push({
        x: Math.random(),
        y: Math.random(),
        r: Math.random() * 2 + 1,
        speed: Math.random() * 0.002 + 0.001,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Glow backdrop
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180 + audioAmplitude * 50);
      grad.addColorStop(0, isRex ? 'rgba(34, 211, 238, 0.25)' : 'rgba(244, 114, 182, 0.25)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw silhouette contours based on character
      ctx.save();
      ctx.translate(cx, cy);

      const breath = Math.sin(time) * 4;
      const ampExpand = audioAmplitude * 18;

      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 12 + audioAmplitude * 15;

      ctx.beginPath();
      if (isRex) {
        // Masculine Head & Shoulders Silhouette Contour
        // Broad shoulders
        ctx.moveTo(-110 - ampExpand, 90 + breath);
        ctx.lineTo(-65, 45); // Left collar
        ctx.lineTo(-32, 40); // Left neck
        ctx.lineTo(-30, 0);  // Left jaw
        ctx.lineTo(-40, -45); // Left temple
        ctx.lineTo(0, -75 - ampExpand); // Top of head
        ctx.lineTo(40, -45);  // Right temple
        ctx.lineTo(30, 0);   // Right jaw
        ctx.lineTo(32, 40);  // Right neck
        ctx.lineTo(65, 45);  // Right collar
        ctx.lineTo(110 + ampExpand, 90 + breath); // Right shoulder
      } else {
        // Feminine Head & Shoulders Contour
        // Narrower shoulders, curved head, hair volume
        ctx.moveTo(-85 - ampExpand, 95 + breath);
        ctx.quadraticCurveTo(-55, 55, -24, 45); // Soft shoulder to neck
        ctx.lineTo(-22, 10);  // Slender neck
        ctx.quadraticCurveTo(-45, -30, -32, -60); // Flowing hair contour
        ctx.quadraticCurveTo(0, -85 - ampExpand, 32, -60); // Crown
        ctx.quadraticCurveTo(45, -30, 22, 10); // Right hair
        ctx.lineTo(24, 45);
        ctx.quadraticCurveTo(55, 55, 85 + ampExpand, 95 + breath);
      }
      ctx.stroke();

      // Draw floating particle constellation
      points.forEach(p => {
        p.y -= p.speed;
        if (p.y < 0) p.y = 1;

        const px = (p.x - 0.5) * 220;
        const py = (p.y - 0.5) * 220;

        ctx.fillStyle = accentColor;
        ctx.globalAlpha = p.alpha * (0.6 + audioAmplitude * 0.4);
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Holographic scanlines
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = primaryColor;
      for (let y = 0; y < canvas.height; y += 8) {
        ctx.fillRect(-cx, y - cy, canvas.width, 1.5);
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeCharacter, assistantState, audioAmplitude, isRex, primaryColor, accentColor]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={420}
        height={420}
        className="w-full max-w-[420px] aspect-square"
      />
      <div className="absolute bottom-2 text-xs font-mono uppercase tracking-widest text-gray-400 bg-black/60 px-3 py-1 rounded border border-gray-700">
        WebGL Fallback Active • {activeCharacter} 2D Matrix
      </div>
    </div>
  );
};
