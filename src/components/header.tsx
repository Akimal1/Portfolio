"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getSocialUrl } from "@/data/social-links";

const navItems = [
  { href: "#projects", label: "Проекты" },
  { href: "#about", label: "Обо мне" },
  { href: "#skills", label: "Навыки" },
  { href: "#contact", label: "Контакты" },
];

const discussProjectHref = getSocialUrl("whatsapp") ?? "#contact";

const SCROLL_HIDE_THRESHOLD = 10;
const SCROLL_TOP_OFFSET = 10;

export function Header() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const openRef = useRef(open);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const toggleMenu = () => {
    setOpen((value) => !value);
    setIsVisible(true);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const updateHeaderVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= SCROLL_TOP_OFFSET || openRef.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        ticking = false;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (delta > SCROLL_HIDE_THRESHOLD) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (delta < -SCROLL_HIDE_THRESHOLD) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeaderVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-surface-line/60 bg-background/70 backdrop-blur-md transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="#hero" className="font-display text-lg font-bold tracking-tight">
          Akim<span className="text-green">.dev</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-ink-dim transition-colors hover:text-green-strong"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={discussProjectHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center rounded-full bg-green px-5 py-2.5 text-sm font-semibold text-[#04170c] transition-all hover:bg-green-strong hover:shadow-[0_0_24px_rgba(73,255,138,0.4)] md:inline-flex"
        >
          Обсудить проект
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          onClick={toggleMenu}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-surface-line md:hidden"
        >
          <div className="flex h-4 w-5 flex-col justify-between">
            <span
              className={cn(
                "h-[1.5px] w-full bg-ink transition-transform duration-300",
                open && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-full bg-ink transition-opacity duration-300",
                open && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-[1.5px] w-full bg-ink transition-transform duration-300",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-b border-surface-line/60 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-3 text-base text-ink-dim transition-colors hover:bg-surface hover:text-green-strong"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={discussProjectHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-green px-5 py-3 text-sm font-semibold text-[#04170c]"
              >
                Обсудить проект
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
