"use client";

import dynamic from "next/dynamic";
import { useWebglSupport } from "@/lib/hooks";
import { SceneFallback } from "./scene-fallback";

const ParticleScene = dynamic(
  () => import("./particle-scene").then((mod) => mod.ParticleScene),
  { ssr: false, loading: () => null }
);

interface SceneBoundaryProps {
  active: boolean;
  variant?: "hero" | "compact";
  className?: string;
  presetIndex?: number;
}

export function SceneBoundary({ active, variant = "hero", className, presetIndex }: SceneBoundaryProps) {
  const webglSupported = useWebglSupport();

  if (webglSupported === false) {
    return <SceneFallback className={className} />;
  }

  return (
    <div className={className}>
      <ParticleScene active={active} variant={variant} presetIndex={presetIndex} />
    </div>
  );
}
