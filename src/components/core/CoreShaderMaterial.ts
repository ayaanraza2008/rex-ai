import * as THREE from 'three';

export const HolographicParticleShader = {
  uniforms: {
    uTime: { value: 0 },
    uMorphProgress: { value: 0.0 }, // 0 = REX, 1 = NAYA
    uMorphDirection: { value: 1.0 }, // 1 = REX to NAYA, -1 = NAYA to REX
    uColorRexPrimary: { value: new THREE.Color('#22D3EE') }, // Cyan
    uColorRexAccent: { value: new THREE.Color('#3B82F6') }, // Electric blue
    uColorNayaPrimary: { value: new THREE.Color('#F472B6') }, // Pink
    uColorNayaAccent: { value: new THREE.Color('#A855F7') }, // Violet
    uAmplitude: { value: 0.0 },
    uState: { value: 0 }, // 0: idle, 1: listening, 2: thinking, 3: speaking, 4: transforming, 5: quiet, 6: error
    uPointSize: { value: 18.0 },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uMorphProgress;
    uniform float uAmplitude;
    uniform int uState;
    uniform float uPointSize;

    attribute vec3 aNayaPosition;
    attribute vec3 aSwirlOffset;

    varying vec3 vPosition;
    varying float vAlpha;
    varying float vScanline;
    varying float vMixFactor;

    void main() {
      // Base positions
      vec3 rexPos = position;
      vec3 nayaPos = aNayaPosition;

      // Morphing progress with smooth non-linear interpolation
      float p = clamp(uMorphProgress, 0.0, 1.0);
      float smoothP = smoothstep(0.0, 1.0, p);

      // Add swirl vortex displacement during transformation
      float vortexFactor = sin(smoothP * 3.14159265);
      vec3 vortex = aSwirlOffset * vortexFactor * 0.85;

      // Rotational twist during swirl
      float angle = vortexFactor * 2.5;
      float cosA = cos(angle);
      float sinA = sin(angle);
      vec3 rotatedVortex = vec3(
        vortex.x * cosA - vortex.z * sinA,
        vortex.y,
        vortex.x * sinA + vortex.z * cosA
      );

      // Interpolate between REX and NAYA
      vec3 morphedPos = mix(rexPos, nayaPos, smoothP) + rotatedVortex;

      // State-specific procedural animation
      // 0: idle (gentle organic breathing)
      float breath = sin(uTime * 1.5 + morphedPos.y * 2.0) * 0.04;
      morphedPos.x += breath * (morphedPos.x * 0.15);
      morphedPos.y += breath * 0.5;

      // 1: listening (inward focus pulse)
      if (uState == 1) {
        float listenPulse = sin(uTime * 4.0) * 0.08;
        morphedPos *= (1.0 - listenPulse * 0.15);
      }
      // 2: thinking (circulating energy arcs)
      else if (uState == 2) {
        float thinkSpin = sin(uTime * 3.0 + morphedPos.y * 3.0) * 0.12;
        morphedPos.x += cos(uTime * 4.0 + morphedPos.y) * 0.1;
        morphedPos.z += sin(uTime * 4.0 + morphedPos.y) * 0.1;
      }
      // 3: speaking (audio reactive ripple and expansion)
      else if (uState == 3) {
        float wave = sin(uTime * 8.0 - morphedPos.y * 4.0) * uAmplitude * 0.22;
        morphedPos.x += (morphedPos.x > 0.0 ? 1.0 : -1.0) * wave * 0.5;
        morphedPos.y += wave * 0.4;
        morphedPos.z += cos(uTime * 6.0) * uAmplitude * 0.15;
      }
      // 5: quiet (minimal motion)
      else if (uState == 5) {
        morphedPos *= 0.95;
      }
      // 6: error (distorted jitter)
      else if (uState == 6) {
        float jitter = (fract(sin(dot(morphedPos.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.15;
        morphedPos.x += jitter;
      }

      vec4 mvPosition = modelViewMatrix * vec4(morphedPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      // Point size attenuation with camera distance and audio reactivity
      float dynamicSize = uPointSize * (1.0 + uAmplitude * 0.4);
      gl_PointSize = dynamicSize * (15.0 / -mvPosition.z);

      // Varying parameters for fragment shader
      vPosition = morphedPos;
      vMixFactor = smoothP;
      vScanline = sin(morphedPos.y * 18.0 - uTime * 4.0);
      vAlpha = clamp(1.2 - (-mvPosition.z / 9.0), 0.35, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorRexPrimary;
    uniform vec3 uColorRexAccent;
    uniform vec3 uColorNayaPrimary;
    uniform vec3 uColorNayaAccent;
    uniform float uAmplitude;
    uniform int uState;

    varying vec3 vPosition;
    varying float vAlpha;
    varying float vScanline;
    varying float vMixFactor;

    void main() {
      // Circular soft particle disk
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft gaussian glow falloff
      float glow = smoothstep(0.5, 0.05, dist);

      // REX color gradient (cyan to electric blue)
      vec3 rexCol = mix(uColorRexPrimary, uColorRexAccent, clamp(vPosition.y * 0.4 + 0.5, 0.0, 1.0));

      // NAYA color gradient (pink to violet)
      vec3 nayaCol = mix(uColorNayaPrimary, uColorNayaAccent, clamp(vPosition.y * 0.4 + 0.5, 0.0, 1.0));

      // Interpolate color based on transformation progress
      vec3 baseColor = mix(rexCol, nayaCol, vMixFactor);

      // Holographic scanline interference
      float scan = (vScanline * 0.5 + 0.5) * 0.25;
      baseColor += scan;

      // Audio amplitude brightness boost
      baseColor += uAmplitude * 0.35;

      // State based color adjustments
      if (uState == 6) { // Error
        baseColor = mix(baseColor, vec3(1.0, 0.2, 0.2), 0.75);
      } else if (uState == 5) { // Quiet
        baseColor *= 0.55;
      }

      gl_FragColor = vec4(baseColor, glow * vAlpha * 0.85);
    }
  `
};
