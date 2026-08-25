import { Link } from "@tanstack/react-router";

type FooterLink = { label: string; to: string; search?: Record<string, string> };

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Adventures",
    links: [
      { label: "Group tours", to: "/trips", search: { style: "Group tour" } },
      { label: "Private tours", to: "/trips", search: { style: "Private tour" } },
      { label: "Safaris", to: "/trips", search: { style: "Safari" } },
      { label: "Sailing trips", to: "/trips", search: { style: "Sail & cruise" } },
      { label: "All adventures", to: "/trips" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Egypt", to: "/trips", search: { q: "Egypt" } },
      { label: "Morocco", to: "/trips", search: { q: "Morocco" } },
      { label: "Tanzania", to: "/trips", search: { q: "Tanzania" } },
      { label: "Vietnam", to: "/trips", search: { q: "Vietnam" } },
      { label: "Sri Lanka", to: "/trips", search: { q: "Sri Lanka" } },
    ],
  },
  {
    title: "About P&K",
    links: [
      { label: "Why book with us", to: "/" },
      { label: "Traveller reviews", to: "/" },
      { label: "Contact us", to: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact us", to: "/contact" },
      { label: "Request a booking", to: "/trips" },
      { label: "Browse trips", to: "/trips" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact-info" className="bg-primary text-primary-foreground">
      <div className="container-pk grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <span className="font-display text-2xl font-extrabold">P&amp;K</span>
          <span className="block font-display text-sm font-semibold tracking-[0.32em] text-accent">
            ADVENTURES
          </span>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Small-group and tailor-made journeys led by local guides since 2009.
          </p>
          <a
            href="mailto:hello@pkadventures.com"
            className="mt-4 inline-block text-sm font-bold text-accent"
          >
            hello@pkadventures.com
          </a>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={`${col.title}-${link.label}`}>
                  <Link
                    to={link.to}
                    search={link.search ?? {}}
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-primary-foreground/15 py-6">
        <p className="container-pk text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} P&amp;K Adventures. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
