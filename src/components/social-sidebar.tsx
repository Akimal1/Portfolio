import type { ComponentType, SVGProps } from "react";
import { socialLinks, type SocialId } from "@/data/social-links";
import {
  GitHubIcon,
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "./ui/social-icons";
import { cn } from "@/lib/cn";

const icons: Record<SocialId, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  github: GitHubIcon,
};

const itemBase =
  "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-[250ms] ease-out sm:h-12 sm:w-12";

export function SocialSidebar() {
  return (
    <aside
      aria-label="Социальные сети"
      className="fixed right-0 top-1/2 z-[100] m-0 flex -translate-y-1/2 flex-col items-end gap-2 p-0 sm:right-[max(0.625rem,env(safe-area-inset-right,0px))] sm:gap-3"
    >
      {socialLinks.map((social) => {
        const Icon = icons[social.id];

        if (!social.url) {
          return (
            <span
              key={social.id}
              aria-disabled="true"
              title={`${social.name} — ссылка появится позже`}
              className={cn(
                itemBase,
                "cursor-not-allowed border-surface-line/60 bg-background/50 text-ink-dim/40"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              <span className="sr-only">{social.name} — ссылка пока недоступна</span>
            </span>
          );
        }

        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={cn(
              itemBase,
              "group border-green/25 bg-background/55 text-ink shadow-[0_0_10px_rgba(73,255,138,0.12)]",
              "hover:border-green hover:text-green hover:shadow-[0_0_18px_rgba(73,255,138,0.5)]",
              "focus-visible:border-green focus-visible:text-green focus-visible:shadow-[0_0_18px_rgba(73,255,138,0.5)]",
              "active:border-green active:text-green",
              "outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            <Icon className="h-[18px] w-[18px] drop-shadow-[0_0_5px_rgba(73,255,138,0.35)] transition-[filter] duration-[250ms] ease-out group-hover:drop-shadow-[0_0_9px_rgba(73,255,138,0.65)] group-focus-visible:drop-shadow-[0_0_9px_rgba(73,255,138,0.65)]" />
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute right-full mr-3 hidden translate-x-1.5 whitespace-nowrap rounded-md border border-green/25 bg-background/90 px-2.5 py-1 text-xs font-medium text-ink opacity-0 shadow-lg backdrop-blur-sm transition-all duration-[220ms] ease-out sm:block",
                "group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              )}
            >
              {social.name}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
