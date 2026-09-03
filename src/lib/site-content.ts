import hero from "@/assets/hero.jpg";
import egypt from "@/assets/dest-egypt.jpg";
import morocco from "@/assets/dest-morocco.jpg";
import safari from "@/assets/dest-safari.jpg";
import srilanka from "@/assets/dest-srilanka.jpg";
import sailing from "@/assets/dest-sailing.jpg";
import kenya from "@/assets/dest-kenya.jpg";

export type SiteSettings = Record<string, string>;

export const IMAGE_FIELDS = [
  { key: "img_hero", label: "Homepage hero / Vietnam", fallback: hero },
  { key: "img_egypt", label: "Egypt", fallback: egypt },
  { key: "img_morocco", label: "Morocco", fallback: morocco },
  { key: "img_safari", label: "Tanzania / safari", fallback: safari },
  { key: "img_kenya", label: "Kenya", fallback: kenya },
  { key: "img_srilanka", label: "Sri Lanka", fallback: srilanka },
  { key: "img_sailing", label: "Turkey / sailing", fallback: sailing },
] as const;

export const CONTACT_FIELDS = [
  { key: "contact_email", label: "Email address", type: "email" as const },
  { key: "contact_phone", label: "Phone number", type: "text" as const },
  { key: "contact_hours", label: "Opening hours line", type: "text" as const },
  { key: "footer_tagline", label: "Footer tagline", type: "text" as const },
  { key: "promo_banner", label: "Promo banner text", type: "text" as const },
] as const;

export const DEFAULT_SETTINGS: SiteSettings = {
  contact_email: "hello@pkadventures.com",
  contact_phone: "+44 20 3808 8000",
  contact_hours: "Open 7 days · 24/7 support while you travel",
  footer_tagline: "Small-group and tailor-made journeys led by local guides since 2009.",
  promo_banner: "Island Getaways 2026: Up To 40% Off - Limited Availability, Book Today!",
  ...Object.fromEntries(IMAGE_FIELDS.map((f) => [f.key, f.fallback])),
};

export const EDITABLE_KEYS: string[] = [
  ...CONTACT_FIELDS.map((f) => f.key),
  ...IMAGE_FIELDS.map((f) => f.key),
];
