import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Clock, MapPin, Star, X } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { BookingForm } from "@/components/site/BookingForm";
import { getTrip, TRIPS } from "@/data/trips";

export const Route = createFileRoute("/trips/$slug")({
  loader: ({ params }) => {
    const trip = getTrip(params.slug);
    if (!trip) throw notFound();
    return { trip };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Trip not found | P&K Adventures" }, { name: "robots", content: "noindex" }],
      };
    }
    const { trip } = loaderData;
    const title = `${trip.title} - ${trip.days} in ${trip.place} | P&K Adventures`;
    return {
      meta: [
        { title },
        { name: "description", content: trip.summary.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: trip.summary.slice(0, 155) },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: TripNotFound,
  component: TripDetail,
});

function TripNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-pk py-24 text-center">
        <h1 className="font-display text-3xl font-extrabold text-primary">Trip not found</h1>
        <p className="mt-3 text-muted-foreground">
          That adventure isn&apos;t available. Browse all of our trips instead.
        </p>
        <Link
          to="/trips"
          className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground"
        >
          All adventures
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function TripDetail() {
  const settings = useSiteSettings();
  const { trip } = Route.useLoaderData();
  const others = TRIPS.filter((t) => t.slug !== trip.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative">
          <img
            src={settings[trip.imageKey]}
            alt={`${trip.title} in ${trip.place}`}
            width={1920}
            height={800}
            className="h-[380px] w-full object-cover md:h-[460px]"
          />
          <div className="absolute inset-0 bg-primary/50" />
          <div className="container-pk absolute inset-0 flex flex-col justify-end pb-10">
            <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent">
              <MapPin className="size-4" aria-hidden="true" />
              {trip.place} · {trip.style}
            </span>
            <h1 className="mt-2 max-w-3xl font-display text-3xl font-extrabold text-primary-foreground sm:text-5xl">
              {trip.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-4 text-sm font-bold text-primary-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-4" aria-hidden="true" />
                {trip.days}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
                {trip.rating} traveller rating
              </span>
              <span>
                <span className="line-through opacity-70">{trip.was}</span>{" "}
                <span className="text-accent">from {trip.price}</span>
              </span>
            </p>
          </div>
        </section>

        <div className="container-pk grid gap-12 py-14 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-lg text-muted-foreground">{trip.summary}</p>

            <h2 className="mt-10 font-display text-2xl font-extrabold text-primary">
              Itinerary highlights
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {trip.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-extrabold text-primary">
              Day-by-day itinerary
            </h2>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {trip.itinerary.map((day) => (
                <li key={day.day} className="relative">
                  <span
                    className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {day.day}
                  </span>
                  <h3 className="font-display text-base font-bold text-primary">{day.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{day.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="font-display text-lg font-bold text-primary">What&apos;s included</h2>
                <ul className="mt-3 space-y-2">
                  {trip.included.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-primary">Not included</h2>
                <ul className="mt-3 space-y-2">
                  {trip.notIncluded.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-deal" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside id="book" className="lg:sticky lg:top-6 lg:self-start">
            <BookingForm trip={trip} />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Prefer to talk?{" "}
              <Link to="/contact" className="font-bold text-accent underline">
                Contact our team
              </Link>
            </p>
          </aside>
        </div>

        <section className="bg-muted py-16">
          <div className="container-pk">
            <h2 className="font-display text-2xl font-extrabold text-primary">
              You might also like
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {others.map((t) => (
                <Link
                  key={t.slug}
                  to="/trips/$slug"
                  params={{ slug: t.slug }}
                  className="group overflow-hidden rounded-2xl bg-card shadow-float"
                >
                  <img
                    src={settings[t.imageKey]}
                    alt={t.title}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-primary">{t.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.days} · from {t.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
