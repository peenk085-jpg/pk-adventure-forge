const COLUMNS = [
  { title: "Adventures", links: ["Group tours", "Private tours", "Safaris", "Sailing trips", "Day trips"] },
  { title: "Destinations", links: ["Egypt", "Morocco", "Tanzania", "Vietnam", "Sri Lanka"] },
  { title: "About P&K", links: ["Our story", "Why book with us", "Responsible travel", "Careers", "Reviews"] },
  { title: "Help", links: ["Contact us", "Booking conditions", "Travel insurance", "Visas", "FAQs"] },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground">
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
                <li key={link}>
                  <a
                    href="#tours"
                    className="text-sm text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                  >
                    {link}
                  </a>
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
