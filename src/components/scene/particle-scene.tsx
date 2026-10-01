"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./particle-field";
import { useDocumentVisible, useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

interface ParticleSceneProps {
  active: boolean;
  variant?: "hero" | "compact";
  presetIndex?: number;
}

export function ParticleScene({ active, variant = "hero", presetIndex }: ParticleSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const documentVisible = useDocumentVisible();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const isHero = variant === "hero";
  const count = isHero ? (isMobile ? 1500 : 4200) : isMobile ? 650 : 1300;
  const radius = isHero ? 1.6 : 1;
  const shouldRender = active && documentVisible;
  const frameloop = !shouldRender ? "never" : reducedMotion ? "demand" : "always";

  return (
    <Canvas
      dpr={[1, isMobile ? 1.3 : 1.6]}
      camera={{ position: [0, 0, isHero ? 4.4 : 3.2], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={frameloop}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ParticleField
          count={count}
          radius={radius}
          reducedMotion={reducedMotion}
          presetIndex={isHero ? presetIndex : undefined}
        />
      </Suspense>
    </Canvas>
  );
}
