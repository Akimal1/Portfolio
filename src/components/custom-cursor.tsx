"use client";

import { useEffect, useRef } from "react";

// The ring's own box is rendered at the "hover" size; the resting 30px look
// comes from scaling it down, so growth/shrink is a single transform (no
// width/height transition fighting the position transform).
const BOX_SIZE = 46;
const REST_SIZE = 30;
const REST_SCALE = REST_SIZE / BOX_SIZE;
const HOVER_SCALE = 1;
const PRESS_SCALE_MULT = 0.86;

const POSITION_LERP = 0.2;
const SCALE_LERP = 0.25;

const HOVER_SELECTOR =
  "a, button, [role='button'], [role='tab'], summary, label, input[type='checkbox'], input[type='radio'], [data-cursor-hover]";
const TEXT_SELECTOR = "input, textarea, select, [contenteditable='true'], [contenteditable='']";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reducedMotion) return;

    const ring = ringRef.current;
    if (!ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let currentScale = REST_SCALE;
    let targetScale = REST_SCALE;
    let hovering = false;
    let pressed = false;
    let snapToTarget = true; // first paint: appear at the real position, no fly-in

    const applyTargetScale = () => {
      const base = hovering ? HOVER_SCALE : REST_SCALE;
      targetScale = pressed ? base * PRESS_SCALE_MULT : base;
    };

    const isTextTarget = (el: Element | null) => {
      if (!el) return false;
      if (el.closest(TEXT_SELECTOR)) return true;
      return window.getComputedStyle(el).cursor === "text";
    };

    const isHoverTarget = (el: Element | null) => {
      if (!el) return false;
      if (el.closest(HOVER_SELECTOR)) return true;
      return window.getComputedStyle(el).cursor === "pointer";
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      ring.dataset.visible = "true";
      if (snapToTarget) {
        x = targetX;
        y = targetY;
        snapToTarget = false;
      }
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element | null;
      ring.dataset.textMode = isTextTarget(target) ? "true" : "false";
      hovering = isHoverTarget(target);
      ring.dataset.hover = hovering ? "true" : "false";
      applyTargetScale();
    };

    const handleMouseDown = () => {
      pressed = true;
      applyTargetScale();
    };

    const handleMouseUp = () => {
      pressed = false;
      applyTargetScale();
    };

    const handleWindowLeave = () => {
      ring.dataset.visible = "false";
    };

    const handleWindowEnter = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      snapToTarget = true;
      ring.dataset.visible = "true";
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleWindowLeave);
    document.documentElement.addEventListener("mouseenter", handleWindowEnter);

    let rafId = requestAnimationFrame(function tick() {
      const positionLerp = snapToTarget ? 1 : POSITION_LERP;
      x += (targetX - x) * positionLerp;
      y += (targetY - y) * positionLerp;
      snapToTarget = false;
      currentScale += (targetScale - currentScale) * SCALE_LERP;
      ring.style.transform = `translate3d(${x - BOX_SIZE / 2}px, ${y - BOX_SIZE / 2}px, 0) scale(${currentScale})`;
      rafId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleWindowLeave);
      document.documentElement.removeEventListener("mouseenter", handleWindowEnter);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      data-visible="false"
      data-hover="false"
      data-text-mode="false"
      aria-hidden="true"
    />
  );
}
