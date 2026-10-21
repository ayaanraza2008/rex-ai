import React, { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ParticleGeometryFactory } from './ParticleGeometryFactory';
import { HolographicParticleShader } from './CoreShaderMaterial';
import { AssistantState, CharacterId, QualityLevel } from '../../types/assistant';

interface HolographicMeshProps {
  activeCharacter: CharacterId;
  assistantState: AssistantState;
  transformationProgress: number;
  quality: QualityLevel;
  audioAmplitude: number;
}

export const HolographicMesh: React.FC<HolographicMeshProps> = ({
  activeCharacter,
  assistantState,
  transformationProgress,
  quality,
  audioAmplitude
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate deterministic point cloud geometries
  const silhouetteData = useMemo(() => {
    return ParticleGeometryFactory.generateSilhouettes(quality);
  }, [quality]);

  // Create Three BufferGeometry with custom vertex attributes
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(silhouetteData.rexPositions, 3));
    geom.setAttribute('aNayaPosition', new THREE.BufferAttribute(silhouetteData.nayaPositions, 3));
    geom.setAttribute('aSwirlOffset', new THREE.BufferAttribute(silhouetteData.swirlOffsets, 3));
    return geom;
  }, [silhouetteData]);

  // Clean up geometry on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  // Create ShaderMaterial
  const shaderMaterial = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(HolographicParticleShader.uniforms),
      vertexShader: HolographicParticleShader.vertexShader,
      fragmentShader: HolographicParticleShader.fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    return mat;
  }, []);

  // Map state to integer for shader
  const stateCode = useMemo(() => {
    switch (assistantState) {
      case 'listening':
        return 1;
      case 'thinking':
        return 2;
      case 'speaking':
        return 3;
      case 'transforming':
        return 4;
      case 'quiet':
        return 5;
      case 'error':
        return 6;
      case 'idle':
      default:
        return 0;
    }
  }, [assistantState]);

  // Frame animation loop
  useFrame((_, delta) => {
    if (materialRef.current) {
      const uniforms = materialRef.current.uniforms;
      uniforms.uTime.value += delta;
      uniforms.uMorphProgress.value =
        activeCharacter === 'REX'
          ? 1.0 - transformationProgress // If currently REX, progress moves toward 0 or 1
          : transformationProgress;
      uniforms.uState.value = stateCode;
      uniforms.uAmplitude.value = audioAmplitude;

      // Adjust particle point size by quality
      uniforms.uPointSize.value = quality === 'high' ? 16.0 : quality === 'medium' ? 19.0 : 23.0;
    }

    if (pointsRef.current) {
      // Gentle floating yaw rotation
      pointsRef.current.rotation.y = Math.sin(Date.now() * 0.0006) * 0.12;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <primitive object={shaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
};
