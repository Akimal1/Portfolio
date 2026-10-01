import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-green text-[#04170c] hover:bg-green-strong hover:shadow-[0_0_30px_rgba(73,255,138,0.45)]"
      : "border border-surface-line text-ink hover:border-green hover:text-green-strong";

  return (
    <Link
      href={href}
      className={cn(base, styles, className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  );
}
