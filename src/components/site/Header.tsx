import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Headphones, Globe2, Map, Users, Menu, X } from "lucide-react";

const NAV: { label: string; to: string; search?: Record<string, string> }[] = [
  { label: "Tours", to: "/trips", search: { style: "Group tour" } },
  { label: "Safaris", to: "/trips", search: { style: "Safari" } },
  { label: "Sail & Cruise", to: "/trips", search: { style: "Sail & cruise" } },
  { label: "All adventures", to: "/trips" },
  { label: "Contact", to: "/contact" },
];

const STRIP = [
  { icon: Map, label: "1,200+ Adventures" },
  { icon: Award, label: "Award-winning" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: Globe2, label: "80+ Destinations" },
  { icon: Users, label: "Expert local guides" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="hidden border-b border-border bg-background md:block">
        <div className="container-pk flex items-center justify-center gap-8 py-2.5">
          {STRIP.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 text-xs font-semibold text-foreground"
            >
              <Icon className="size-4 text-accent" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="container-pk flex h-[70px] items-center gap-8">
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-extrabold tracking-tight">P&amp;K</span>
            <span className="font-display text-sm font-semibold tracking-[0.32em] text-accent">
              ADVENTURES
            </span>
          </Link>

          <nav className="hidden flex-1 items-center gap-6 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search ?? {}}
                className="text-sm font-bold transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="lg:hidden"
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav className="container-pk flex flex-col gap-1 pb-4 lg:hidden" aria-label="Mobile">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                search={item.search ?? {}}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-bold hover:bg-primary-foreground/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="bg-deal py-3 text-center">
        <p className="container-pk text-sm font-bold text-primary-foreground sm:text-base">
          Island Getaways 2026: Up To 40% Off - Limited Availability, Book Today!
        </p>
      </div>
    </header>
  );
}
