import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AssistantState, CharacterId } from '../../types/assistant';

interface HolographicOrbProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  audioAmplitude: number;
}

export const HolographicOrb: React.FC<HolographicOrbProps> = ({
  activeCharacter,
  assistantState,
  audioAmplitude
}) => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);

  const isRex = activeCharacter === 'REX';
  const primaryColor = isRex ? '#22D3EE' : '#F472B6';
  const accentColor = isRex ? '#3B82F6' : '#A855F7';

  useFrame((_, delta) => {
    const time = Date.now() * 0.001;

    if (coreRef.current) {
      const pulse = 1.0 + Math.sin(time * 2.5) * 0.05 + audioAmplitude * 0.3;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y += delta * 0.4;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.x = time * 0.8;
      ringRef1.current.rotation.y = time * 0.5;
      const s = 1.0 + audioAmplitude * 0.2;
      ringRef1.current.scale.set(s, s, s);
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.y = -time * 0.9;
      ringRef2.current.rotation.z = time * 0.6;
      const s = 1.15 + audioAmplitude * 0.25;
      ringRef2.current.scale.set(s, s, s);
    }

    if (ringRef3.current) {
      ringRef3.current.rotation.x = -time * 0.4;
      ringRef3.current.rotation.z = -time * 0.7;
      const s = 1.35 + audioAmplitude * 0.35;
      ringRef3.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      {/* Central Pulsing Plasma Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshBasicMaterial
          color={primaryColor}
          wireframe
          transparent
          opacity={0.75 + audioAmplitude * 0.2}
        />
      </mesh>

      {/* Internal Core Glow */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Rotating Waveform Rings */}
      <mesh ref={ringRef1}>
        <torusGeometry args={[1.7, 0.025, 16, 100]} />
        <meshBasicMaterial color={primaryColor} transparent opacity={0.8} />
      </mesh>

      <mesh ref={ringRef2}>
        <torusGeometry args={[2.0, 0.02, 16, 100]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.65} />
      </mesh>

      <mesh ref={ringRef3}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshBasicMaterial color={primaryColor} transparent opacity={0.5} />
      </mesh>
    </group>
  );
};
