import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, MapPin, Star } from "lucide-react";
import { z } from "zod";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { TRIPS } from "@/data/trips";

const searchSchema = z.object({
  q: z.string().optional(),
  style: z.string().optional(),
});

export const Route = createFileRoute("/trips/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Adventures | P&K Adventures Tours, Safaris & Sailing" },
      {
        name: "description",
        content:
          "Browse every P&K Adventures trip - small-group tours, safaris and sailing holidays with itineraries, prices and instant booking requests.",
      },
      { property: "og:title", content: "All Adventures | P&K Adventures" },
      {
        property: "og:description",
        content: "Compare P&K Adventures trips by destination, style and duration, then request your booking.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TripsIndex,
});

const STYLES = ["All", "Group tour", "Safari", "Sail & cruise", "Private tour"];

function TripsIndex() {
  const { q, style } = Route.useSearch();
  const term = (q ?? "").toLowerCase().trim();
  const activeStyle = style ?? "All";

  const trips = TRIPS.filter((t) => {
    const matchesTerm =
      !term ||
      t.title.toLowerCase().includes(term) ||
      t.place.toLowerCase().includes(term) ||
      t.summary.toLowerCase().includes(term);
    const matchesStyle = activeStyle === "All" || t.style === activeStyle;
    return matchesTerm && matchesStyle;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-pk py-14">
        <h1 className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
          All adventures
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {term ? `Showing trips matching "${q}".` : "Every P&K departure, with full itineraries and live booking requests."}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <Link
              key={s}
              to="/trips"
              search={(prev) => ({ ...prev, style: s === "All" ? undefined : s })}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                activeStyle === s
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-primary hover:border-accent"
              }`}
            >
              {s}
            </Link>
          ))}
          {term ? (
            <Link
              to="/trips"
              search={{ style: style }}
              className="rounded-full border border-border px-4 py-2 text-sm font-bold text-muted-foreground hover:border-accent"
            >
              Clear search
            </Link>
          ) : null}
        </div>

        {trips.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-border p-8 text-center text-muted-foreground">
            No trips match that search yet. Try another destination or{" "}
            <Link to="/contact" className="font-bold text-accent underline">
              ask us to plan one
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <article
                key={trip.slug}
                className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-float"
              >
                <Link to="/trips/$slug" params={{ slug: trip.slug }} className="group relative block">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-deal px-3 py-1 text-xs font-bold text-primary-foreground">
                    {trip.style}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {trip.place}
                  </span>
                  <h2 className="mt-2 font-display text-lg font-bold text-primary">
                    <Link to="/trips/$slug" params={{ slug: trip.slug }} className="hover:text-accent">
                      {trip.title}
                    </Link>
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{trip.summary}</p>
                  <p className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="size-4" aria-hidden="true" />
                      {trip.days}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
                      {trip.rating}
                    </span>
                  </p>
                  <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
                    <span>
                      <span className="block text-xs text-muted-foreground line-through">
                        {trip.was}
                      </span>
                      <span className="font-display text-xl font-extrabold text-primary">
                        {trip.price}
                      </span>
                    </span>
                    <Link
                      to="/trips/$slug"
                      params={{ slug: trip.slug }}
                      className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
                    >
                      View trip
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
