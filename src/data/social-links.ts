export type SocialId =
  | "instagram"
  | "whatsapp"
  | "telegram"
  | "github";

export interface SocialLink {
  id: SocialId;
  name: string;
  url: string | null;
}

export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/turgunbaewv_/",
  },
  { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/996227329129" },
  { id: "telegram", name: "Telegram", url: "https://t.me/Akima1i" },
  { id: "github", name: "GitHub", url: "https://github.com/Akimal1" },
];

export function getSocialUrl(id: SocialId): string | null {
  return socialLinks.find((link) => link.id === id)?.url ?? null;
}
