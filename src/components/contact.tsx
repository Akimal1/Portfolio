"use client";

import { SceneBoundary } from "./scene/scene-boundary";
import { Reveal } from "./reveal";
import { contact } from "@/data/contact";
import { useInViewport } from "@/lib/hooks";

export function Contact() {
  const { ref, inView } = useInViewport<HTMLElement>();

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-6 py-28 sm:px-10 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 noise-veil" />
      <div className="pointer-events-none absolute right-0 top-1/2 h-105 w-105 -translate-y-1/2 opacity-70">
        <SceneBoundary active={inView} variant="compact" className="h-full w-full" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-5">
        <Reveal>
          <span className="font-display text-xs uppercase tracking-[0.3em] text-green-strong">
            Контакты
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="h2-fluid text-balance font-display font-bold">Обсудим ваш проект?</h2>
        </Reveal>

        <Reveal delay={0.16} className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-7 py-4 text-base font-semibold text-[#04170c] transition-all hover:bg-green-strong hover:shadow-[0_0_30px_rgba(73,255,138,0.45)]"
          >
            {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
