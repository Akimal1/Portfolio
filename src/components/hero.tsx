"use client";

import { useCallback, useRef, type TouchEvent } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { SceneBoundary } from "./scene/scene-boundary";
import { ButtonLink } from "./ui/button-link";
import { useInViewport, useSlideshow } from "@/lib/hooks";
import { heroSlides } from "@/data/hero-slides";
import { getSocialUrl } from "@/data/social-links";
import { cn } from "@/lib/cn";

const discussProjectHref = getSocialUrl("whatsapp") ?? "#contact";

const SLIDE_INTERVAL_MS = 3000;
const SWIPE_THRESHOLD_PX = 40;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideContainer: Variants = {
  enter: {},
  center: {
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
};

const slideItem: Variants = {
  enter: { opacity: 0, y: 28 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -28,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

function PauseIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2" width="3.2" height="12" rx="1" />
      <rect x="9.8" y="2" width="3.2" height="12" rx="1" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
      <path d="M4 2.4v11.2l10-5.6-10-5.6z" />
    </svg>
  );
}

export function Hero() {
  const { ref, inView } = useInViewport<HTMLElement>();
  const reducedMotion = useReducedMotion();
  const autoPlay = !reducedMotion;

  const { index, cycle, paused, isRunning, setPaused, next, select } = useSlideshow(
    heroSlides.length,
    autoPlay
  );
  const slide = heroSlides[index];

  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((event: TouchEvent) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;

      const touch = event.changedTouches[0];
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) return;

      select(dx < 0 ? index + 1 : index - 1);
    },
    [index, select]
  );

  return (
    <section
      id="hero"
      ref={ref}
      // Negative right margin cancels body's sidebar gutter (pr-11/sm:pr-10/lg:pr-5) so the
      // background reaches the viewport edge; extra right padding keeps content in place.
      className="relative -mr-11 flex min-h-[100svh] flex-col justify-center overflow-hidden pl-6 pr-[4.25rem] pt-28 pb-16 sm:-mr-10 sm:pl-10 sm:pr-20 lg:-mr-5 lg:pl-16 lg:pr-[5.25rem]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[100svh] noise-veil" />

      <div className="absolute inset-x-0 top-0 h-[100svh]">
        <SceneBoundary active={inView} variant="hero" className="h-full w-full" presetIndex={index} />
      </div>

      <motion.div
        variants={reducedMotion ? undefined : container}
        initial={reducedMotion ? undefined : "hidden"}
        animate={reducedMotion ? undefined : "show"}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 sm:gap-8"
      >
        <motion.p
          variants={item}
          className="font-display text-xs uppercase tracking-[0.3em] text-green-strong sm:text-sm"
        >
          Akim / Fullstack Developer
        </motion.p>

        <motion.div
          variants={item}
          className="relative grid"
          role="group"
          aria-roledescription="carousel"
          aria-label="Направления работы"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Invisible sizers: reserve height for the tallest slide across all breakpoints
              so text swaps never move the buttons or sections below. */}
          {heroSlides.map((s) => (
            <div
              key={s.id}
              aria-hidden="true"
              className="invisible col-start-1 row-start-1 flex flex-col gap-3 sm:gap-4"
            >
              <h1 className="h1-fluid text-balance font-display font-bold">{s.title}</h1>
              <p className="max-w-2xl text-balance text-base text-ink-dim sm:text-lg lg:text-xl">
                {s.description}
              </p>
            </div>
          ))}

          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={slide.id}
              variants={reducedMotion ? undefined : slideContainer}
              initial={reducedMotion ? { opacity: 0 } : "enter"}
              animate={reducedMotion ? { opacity: 1 } : "center"}
              exit={reducedMotion ? { opacity: 0 } : "exit"}
              transition={reducedMotion ? { duration: 0.25 } : undefined}
              className="col-start-1 row-start-1 flex flex-col gap-3 sm:gap-4"
            >
              <motion.h1
                variants={reducedMotion ? undefined : slideItem}
                className="h1-fluid text-balance font-display font-bold"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                variants={reducedMotion ? undefined : slideItem}
                className="max-w-2xl text-balance text-base text-ink-dim sm:text-lg lg:text-xl"
              >
                {slide.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-4">
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Слайды"
          >
            {heroSlides.map((s, i) => {
              const isActive = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={s.title}
                  onClick={() => select(i)}
                  className={cn(
                    "relative h-1.5 w-8 overflow-hidden rounded-full transition-colors sm:w-10",
                    isActive ? "bg-green-soft" : "bg-surface-line"
                  )}
                >
                  {isActive && autoPlay && (
                    <span
                      key={cycle}
                      onAnimationEnd={next}
                      className="hero-progress-fill absolute inset-0 rounded-full bg-green"
                      style={{
                        animationDuration: `${SLIDE_INTERVAL_MS}ms`,
                        animationPlayState: isRunning ? "running" : "paused",
                      }}
                    />
                  )}
                  {isActive && !autoPlay && (
                    <span className="absolute inset-0 rounded-full bg-green" />
                  )}
                </button>
              );
            })}
          </div>

          {autoPlay && (
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
              aria-label={paused ? "Возобновить смену слайдов" : "Приостановить смену слайдов"}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border border-surface-line text-ink-dim transition-colors",
                "hover:border-green hover:text-green-strong"
              )}
            >
              {paused ? <PlayIcon /> : <PauseIcon />}
            </button>
          )}
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap gap-3">
          <ButtonLink href="#projects" variant="primary">
            Смотреть проекты
          </ButtonLink>
          <ButtonLink href={discussProjectHref} variant="ghost">
            Обсудить проект
          </ButtonLink>
        </motion.div>
      </motion.div>
    </section>
  );
}
