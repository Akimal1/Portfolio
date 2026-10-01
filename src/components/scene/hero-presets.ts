export interface HeroScenePreset {
  /** Extra rotation offset (radians) layered on top of the continuous idle spin. */
  rotationYBias: number;
  rotationXBias: number;
  /** Multiplier on the blob's surface-noise displacement, i.e. its "shape". */
  ampMultiplier: number;
  /** Multiplier on material brightness/opacity, i.e. the green glow strength. */
  glowIntensity: number;
  sizeMultiplier: number;
}

// One preset per hero slide — sites / web apps / AI / automation / ideas.
// Values are intentionally subtle so slide changes read as a continuous
// drift rather than a jump cut.
export const heroScenePresets: HeroScenePreset[] = [
  { rotationYBias: 0, rotationXBias: 0, ampMultiplier: 1, glowIntensity: 1, sizeMultiplier: 1 },
  { rotationYBias: 0.18, rotationXBias: -0.04, ampMultiplier: 0.82, glowIntensity: 1.08, sizeMultiplier: 0.96 },
  { rotationYBias: -0.22, rotationXBias: 0.05, ampMultiplier: 1.4, glowIntensity: 1.35, sizeMultiplier: 1.1 },
  { rotationYBias: 0.28, rotationXBias: -0.06, ampMultiplier: 1.15, glowIntensity: 1.2, sizeMultiplier: 1.05 },
  { rotationYBias: -0.1, rotationXBias: 0.03, ampMultiplier: 0.9, glowIntensity: 1.15, sizeMultiplier: 1 },
];
