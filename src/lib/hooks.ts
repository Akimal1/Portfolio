"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

let cachedWebglSupport: boolean | null = null;

function computeWebglSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebglSupport(): boolean | null {
  const subscribe = useCallback(() => () => {}, []);
  const getSnapshot = useCallback(() => {
    if (cachedWebglSupport === null) {
      cachedWebglSupport = computeWebglSupport();
    }
    return cachedWebglSupport;
  }, []);
  const getServerSnapshot = useCallback(() => null, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useInViewport<T extends HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options ?? { rootMargin: "10% 0px", threshold: 0.05 });

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
}

export function useDocumentVisible(): boolean {
  const subscribe = useCallback((callback: () => void) => {
    document.addEventListener("visibilitychange", callback);
    return () => document.removeEventListener("visibilitychange", callback);
  }, []);
  const getSnapshot = useCallback(() => !document.hidden, []);
  const getServerSnapshot = useCallback(() => true, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export interface Slideshow {
  index: number;
  cycle: number;
  paused: boolean;
  isRunning: boolean;
  setPaused: (paused: boolean) => void;
  next: () => void;
  prev: () => void;
  select: (index: number) => void;
}

/**
 * Index/cycle state for an auto-advancing slideshow. Does not own a timer —
 * the caller drives advancement (e.g. a CSS animation's onAnimationEnd)
 * and this hook only tracks position, manual-pause and tab-visibility.
 */
export function useSlideshow(length: number, autoPlay: boolean): Slideshow {
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);
  const documentVisible = useDocumentVisible();

  const advance = useCallback(
    (getNext: (current: number) => number) => {
      setIndex((current) => ((getNext(current) % length) + length) % length);
      setCycle((c) => c + 1);
    },
    [length]
  );

  const next = useCallback(() => advance((i) => i + 1), [advance]);
  const prev = useCallback(() => advance((i) => i - 1), [advance]);
  const select = useCallback((target: number) => advance(() => target), [advance]);

  return {
    index,
    cycle,
    paused,
    isRunning: autoPlay && !paused && documentVisible,
    setPaused,
    next,
    prev,
    select,
  };
}
