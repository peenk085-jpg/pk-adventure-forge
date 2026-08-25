import { ChevronDown, Award, Headphones, Globe2, Map, Users } from "lucide-react";

const NAV = ["Tours", "Safaris", "Sail & Cruise", "Vacations", "Offers", "About"];

const STRIP = [
  { icon: Map, label: "1,200+ Adventures" },
  { icon: Award, label: "Award-winning" },
  { icon: Headphones, label: "24/7 Support" },
  { icon: Globe2, label: "80+ Destinations" },
  { icon: Users, label: "Expert local guides" },
];

export function Header() {
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
          <a href="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-extrabold tracking-tight">P&amp;K</span>
            <span className="font-display text-sm font-semibold tracking-[0.32em] text-accent">
              ADVENTURES
            </span>
          </a>

          <nav className="hidden flex-1 items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#tours"
                className="flex items-center gap-1 text-sm font-bold transition-colors hover:text-accent"
              >
                {item}
                <ChevronDown className="size-4 opacity-70" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#contact"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <div className="bg-deal py-3 text-center">
        <p className="container-pk text-sm font-bold text-primary-foreground sm:text-base">
          Island Getaways 2026: Up To 40% Off - Limited Availability, Book Today!
        </p>
      </div>
    </header>
  );
}
