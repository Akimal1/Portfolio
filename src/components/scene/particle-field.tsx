"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { heroScenePresets, type HeroScenePreset } from "./hero-presets";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  reducedMotion?: boolean;
  /** Index into heroScenePresets to morph toward; omit for the default preset. */
  presetIndex?: number;
}

const defaultPreset: HeroScenePreset = {
  rotationYBias: 0,
  rotationXBias: 0,
  ampMultiplier: 1,
  glowIntensity: 1,
  sizeMultiplier: 1,
};

function buildBlob(count: number, radius: number) {
  const noise3D = createNoise3D();
  const positions = new Float32Array(count * 3);
  const base = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);

  const coreColor = new THREE.Color("#49ff8a");
  const brightColor = new THREE.Color("#d4ffe6");
  const deepColor = new THREE.Color("#12592f");

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const dx = Math.sin(phi) * Math.cos(theta);
    const dy = Math.sin(phi) * Math.sin(theta);
    const dz = Math.cos(phi);

    const lobed =
      1 +
      noise3D(dx * 1.4, dy * 1.4, dz * 1.4) * 0.3 +
      noise3D(dx * 3.2 + 9, dy * 3.2 + 9, dz * 3.2 + 9) * 0.08;

    const r = radius * lobed * Math.cbrt(Math.random());

    const idx = i * 3;
    positions[idx] = dx * r;
    positions[idx + 1] = dy * r;
    positions[idx + 2] = dz * r;
    base[idx] = positions[idx];
    base[idx + 1] = positions[idx + 1];
    base[idx + 2] = positions[idx + 2];

    normals[idx] = dx;
    normals[idx + 1] = dy;
    normals[idx + 2] = dz;

    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.35 + Math.random() * 0.55;

    const mix = Math.random();
    const source = mix < 0.12 ? brightColor : mix > 0.82 ? deepColor : coreColor;
    const brightness = 0.7 + Math.random() * 0.55;
    colors[idx] = source.r * brightness;
    colors[idx + 1] = source.g * brightness;
    colors[idx + 2] = source.b * brightness;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return { geometry, base, normals, phases, speeds };
}

export function ParticleField({
  count = 4200,
  radius = 1.6,
  reducedMotion = false,
  presetIndex,
}: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const { geometry, base, normals, phases, speeds } = useMemo(
    () => buildBlob(count, radius),
    [count, radius]
  );

  const spinRef = useRef(0);
  const currentRef = useRef<HeroScenePreset>({ ...defaultPreset });
  const targetPreset =
    presetIndex === undefined
      ? defaultPreset
      : heroScenePresets[((presetIndex % heroScenePresets.length) + heroScenePresets.length) % heroScenePresets.length];
  const baseSize = radius > 1.3 ? 0.024 : 0.02;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || reducedMotion) return;

    const t = state.clock.elapsedTime;
    const current = currentRef.current;
    const lambda = 1.6;
    current.rotationYBias = THREE.MathUtils.damp(current.rotationYBias, targetPreset.rotationYBias, lambda, delta);
    current.rotationXBias = THREE.MathUtils.damp(current.rotationXBias, targetPreset.rotationXBias, lambda, delta);
    current.ampMultiplier = THREE.MathUtils.damp(current.ampMultiplier, targetPreset.ampMultiplier, lambda, delta);
    current.glowIntensity = THREE.MathUtils.damp(current.glowIntensity, targetPreset.glowIntensity, lambda, delta);
    current.sizeMultiplier = THREE.MathUtils.damp(current.sizeMultiplier, targetPreset.sizeMultiplier, lambda, delta);

    spinRef.current += delta * 0.06;
    group.rotation.y = spinRef.current + current.rotationYBias;
    const breathe = 1 + Math.sin(t * 0.5) * 0.035;
    group.scale.setScalar(breathe);

    group.rotation.x = THREE.MathUtils.lerp(
      group.rotation.x,
      state.pointer.y * 0.14 + current.rotationXBias,
      0.03
    );
    group.rotation.z = THREE.MathUtils.lerp(
      group.rotation.z,
      -state.pointer.x * 0.08,
      0.03
    );

    const posAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const amp = radius * 0.035 * current.ampMultiplier;

    for (let i = 0; i < phases.length; i++) {
      const idx = i * 3;
      const d = Math.sin(t * speeds[i] * 0.6 + phases[i]) * amp;
      arr[idx] = base[idx] + normals[idx] * d;
      arr[idx + 1] = base[idx + 1] + normals[idx + 1] * d;
      arr[idx + 2] = base[idx + 2] + normals[idx + 2] * d;
    }
    posAttr.needsUpdate = true;

    const material = materialRef.current;
    if (material) {
      material.size = baseSize * current.sizeMultiplier;
      material.opacity = Math.min(1, 0.9 * current.glowIntensity);
      material.color.setScalar(Math.min(1.35, current.glowIntensity));
    }
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <pointsMaterial
          ref={materialRef}
          size={baseSize}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}
