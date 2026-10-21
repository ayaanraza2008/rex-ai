import * as THREE from 'three';
import { QualityLevel } from '../../types/assistant';

export interface SilhouetteData {
  rexPositions: Float32Array;
  nayaPositions: Float32Array;
  swirlOffsets: Float32Array;
  particleCount: number;
}

export class ParticleGeometryFactory {
  public static getParticleCount(quality: QualityLevel): number {
    switch (quality) {
      case 'low':
        return 6000;
      case 'medium':
        return 12000;
      case 'high':
      default:
        return 20000;
    }
  }

  /**
   * Generates volumetric 3D particle positions for REX (masculine silhouette)
   * and NAYA (feminine silhouette) with matching count for smooth 1:1 interpolation.
   */
  public static generateSilhouettes(quality: QualityLevel): SilhouetteData {
    const count = this.getParticleCount(quality);
    const rex = new Float32Array(count * 3);
    const naya = new Float32Array(count * 3);
    const swirl = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // ---------------------------------------------------------------
      // REX GEOMETRY: Masculine, broad-shouldered, chiseled jaw, cybernetic
      // ---------------------------------------------------------------
      const rexZone = Math.random();

      if (rexZone < 0.45) {
        // HEAD / FACE: Angular jaw, flat crown, sharp cheekbones
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.9;
        const rBase = 0.85 + Math.random() * 0.25;

        // Angular jaw shaping
        const yHead = Math.sin(phi) * 1.05 + 1.25;
        let xHead = Math.cos(theta) * Math.cos(phi) * 0.82;
        let zHead = Math.sin(theta) * Math.cos(phi) * 0.82;

        // Flatten sides and emphasize square jaw
        if (yHead < 1.05) {
          xHead *= 0.88;
          zHead *= 1.15; // Prominent chin
        }

        rex[idx] = xHead;
        rex[idx + 1] = yHead;
        rex[idx + 2] = zHead;
      } else if (rexZone < 0.85) {
        // SHOULDERS & CHEST: Broad masculine trapezoid, angular armor lines
        const span = (Math.random() - 0.5) * 4.6; // Wide shoulders
        const yShoulder = -0.1 - Math.abs(span) * 0.35 + (Math.random() - 0.5) * 0.6;
        const zChest = (Math.random() - 0.5) * 1.25 * (1.0 - Math.abs(span) / 3.0);

        rex[idx] = span;
        rex[idx + 1] = yShoulder;
        rex[idx + 2] = zChest;
      } else {
        // NECK & COLLAR / CYBERNETIC FIELD
        const yNeck = 0.35 + Math.random() * 0.6;
        const angle = Math.random() * Math.PI * 2;
        const rNeck = 0.42 + Math.random() * 0.15;

        rex[idx] = Math.cos(angle) * rNeck;
        rex[idx + 1] = yNeck;
        rex[idx + 2] = Math.sin(angle) * rNeck * 0.95;
      }

      // ---------------------------------------------------------------
      // NAYA GEOMETRY: Feminine, soft curves, elegant jaw, flowing hair
      // ---------------------------------------------------------------
      const nayaZone = Math.random();

      if (nayaZone < 0.40) {
        // HEAD & SLENDER JAW: Oval, refined chin, delicate contours
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.95;

        const yHead = Math.sin(phi) * 1.1 + 1.28;
        let xHead = Math.cos(theta) * Math.cos(phi) * 0.72; // Slimmer than REX
        let zHead = Math.sin(theta) * Math.cos(phi) * 0.75;

        // Tapered chin
        if (yHead < 0.95) {
          xHead *= 0.65;
          zHead *= 0.75;
        }

        naya[idx] = xHead;
        naya[idx + 1] = yHead;
        naya[idx + 2] = zHead;
      } else if (nayaZone < 0.70) {
        // FLOWING HAIR / ETHEREAL HALO: Cascading particles framing shoulders
        const hairAngle = Math.random() * Math.PI * 2;
        const hairProgress = Math.random(); // Top to bottom
        const yHair = 1.95 - hairProgress * 2.2;
        const spread = 0.85 + hairProgress * 0.95;
        const xHair = Math.cos(hairAngle) * spread * 1.1;
        const zHair = Math.sin(hairAngle) * spread * 0.75 - hairProgress * 0.4;

        naya[idx] = xHair;
        naya[idx + 1] = yHair;
        naya[idx + 2] = zHair;
      } else {
        // SHOULDERS & NECK: Elegant narrower shoulders, graceful posture
        const span = (Math.random() - 0.5) * 3.3; // Narrower than REX's 4.6
        const yShoulder = -0.2 - Math.abs(span) * 0.4 + (Math.random() - 0.5) * 0.45;
        const zChest = (Math.random() - 0.5) * 0.85;

        naya[idx] = span;
        naya[idx + 1] = yShoulder;
        naya[idx + 2] = zChest;
      }

      // ---------------------------------------------------------------
      // VORTEX SWIRL OFFSETS: 3D rotational curl noise for transformation
      // ---------------------------------------------------------------
      const swirlAngle = Math.random() * Math.PI * 2;
      const swirlDist = 2.0 + Math.random() * 3.5;
      swirl[idx] = Math.cos(swirlAngle) * swirlDist;
      swirl[idx + 1] = (Math.random() - 0.5) * 4.0;
      swirl[idx + 2] = Math.sin(swirlAngle) * swirlDist;
    }

    return {
      rexPositions: rex,
      nayaPositions: naya,
      swirlOffsets: swirl,
      particleCount: count
    };
  }
}
