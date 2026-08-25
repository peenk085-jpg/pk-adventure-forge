import { createFileRoute } from "@tanstack/react-router";
import {
  Star,
  ShieldCheck,
  Users,
  Headphones,
  MapPin,
  Clock,
  ArrowRight,
  Quote,
} from "lucide-react";

import { Header } from "@/components/site/Header";
import { SearchBar } from "@/components/site/SearchBar";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero.jpg";
import egypt from "@/assets/dest-egypt.jpg";
import morocco from "@/assets/dest-morocco.jpg";
import safari from "@/assets/dest-safari.jpg";
import srilanka from "@/assets/dest-srilanka.jpg";
import sailing from "@/assets/dest-sailing.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "P&K Adventures | Small-Group Tours, Safaris & Sailing Trips" },
      {
        name: "description",
        content:
          "Award-winning small-group tours, private adventures, safaris and sailing trips across 80+ destinations with expert local guides and 24/7 support.",
      },
      { property: "og:title", content: "P&K Adventures | Tours, Safaris & Sailing Trips" },
      {
        property: "og:description",
        content:
          "Discover the world your way with P&K Adventures - group tours, safaris and sailing trips led by expert local guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const USPS = [
  { icon: MapPin, title: "1,200+ adventures", text: "Group tours, private trips, safaris & sailing" },
  { icon: Users, title: "Expert local guides", text: "Guides who bring each place to life" },
  { icon: ShieldCheck, title: "Best price promise", text: "Unbeatable value on every departure" },
  { icon: Headphones, title: "24/7 support", text: "Before, during and after your trip" },
];

const DEALS = [
  { name: "Egypt", image: egypt },
  { name: "Morocco", image: morocco },
  { name: "Tanzania", image: safari },
  { name: "Sri Lanka", image: srilanka },
  { name: "Turkey", image: sailing },
  { name: "Vietnam", image: hero },
];

const DESTINATIONS = [
  {
    name: "Egypt tours",
    image: egypt,
    text: "Stand beneath the Pyramids of Giza, cruise the Nile between Luxor and Aswan and dive the Red Sea reefs.",
  },
  {
    name: "Morocco tours",
    image: morocco,
    text: "Get lost in the souks of Marrakech, sleep under Sahara stars and wander the blue lanes of Chefchaouen.",
  },
  {
    name: "Tanzania safaris",
    image: safari,
    text: "Track the Great Migration across the Serengeti, then unwind on the white sands of Zanzibar.",
  },
  {
    name: "Sri Lanka tours",
    image: srilanka,
    text: "Ride the hill-country train through tea plantations, climb Sigiriya and spot leopards in Yala.",
  },
];

const TOURS = [
  {
    title: "Pharaohs & Felucca",
    place: "Egypt",
    days: "9 days",
    price: "$1,395",
    was: "$1,690",
    image: egypt,
    rating: 4.8,
  },
  {
    title: "Serengeti Big Five",
    place: "Tanzania",
    days: "8 days",
    price: "$2,450",
    was: "$2,890",
    image: safari,
    rating: 4.9,
  },
  {
    title: "Kasbahs & Sahara Nights",
    place: "Morocco",
    days: "10 days",
    price: "$1,180",
    was: "$1,420",
    image: morocco,
    rating: 4.7,
  },
  {
    title: "Turquoise Coast Sail",
    place: "Turkey",
    days: "7 days",
    price: "$990",
    was: "$1,240",
    image: sailing,
    rating: 4.8,
  },
];

const REVIEWS = [
  {
    name: "Amelia R.",
    trip: "Serengeti Big Five",
    text: "Our guide knew every corner of the park. We saw all of the Big Five in three days and never felt rushed.",
  },
  {
    name: "Daniel K.",
    trip: "Pharaohs & Felucca",
    text: "Superbly organised from airport pickup to the last temple. The felucca night on the Nile was pure magic.",
  },
  {
    name: "Priya S.",
    trip: "Kasbahs & Sahara Nights",
    text: "Small group, brilliant riads and a desert camp we still talk about. Booking with P&K was effortless.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="relative">
          <img
            src={hero}
            alt="Turquoise lagoon framed by jungle-covered karst cliffs at sunset"
            width={1920}
            height={1088}
            className="h-[560px] w-full object-cover md:h-[640px]"
          />
          <div className="absolute inset-0 bg-primary/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
            <h1 className="max-w-3xl font-display text-4xl font-extrabold text-primary-foreground drop-shadow-md sm:text-5xl md:text-6xl">
              Amazing adventures await
            </h1>
            <p className="mt-4 text-base font-bold text-primary-foreground/90 md:text-lg">
              Award-winning trips, expert local guides & 24/7 customer support
            </p>
            <div className="mt-10 w-full">
              <SearchBar />
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary-foreground">
              <span className="flex" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </span>
              4.8 out of 5 from 1,940 traveller reviews
            </p>
          </div>
        </section>

        {/* Intro + USPs */}
        <section className="relative -mt-8 rounded-t-[2.5rem] bg-background pt-16 pb-20">
          <div className="container-pk">
            <h2 className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
              It&apos;s time to discover
            </h2>
            <p className="mt-3 max-w-2xl font-display text-lg font-bold text-accent">
              From cultural tours to safaris, private adventures and sailing trips.
            </p>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Travel the world your way with P&amp;K Adventures - on a small-group tour, a private
              journey, a safari or a sailing trip. From ancient wonders to wild landscapes and
              sun-soaked coasts, our local guides help you uncover the real story of over 80
              destinations.
            </p>

            <div className="mt-10 grid gap-8 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {USPS.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-primary">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2-for-1 deals */}
        <section className="bg-sand py-16">
          <div className="container-pk">
            <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
              2-for-1 deals
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {DEALS.map((deal) => (
                <a
                  key={deal.name}
                  href="#tours"
                  className="group relative overflow-hidden rounded-2xl shadow-float"
                >
                  <img
                    src={deal.image}
                    alt={`${deal.name} adventures`}
                    loading="lazy"
                    width={900}
                    height={700}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-primary/70 p-3 text-center text-sm font-bold text-primary-foreground">
                    {deal.name}
                    <span className="mt-0.5 block text-xs font-bold text-accent">2-for-1</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="py-20">
          <div className="container-pk">
            <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
              Most popular destinations
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              These are the places our travellers love most - where will you go next?
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {DESTINATIONS.map((dest) => (
                <a key={dest.name} href="#tours" className="group">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      loading="lazy"
                      width={900}
                      height={700}
                      className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 flex items-center gap-1 font-display text-lg font-bold text-primary">
                    {dest.name}
                    <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{dest.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Featured tours */}
        <section id="tours" className="bg-muted py-20">
          <div className="container-pk">
            <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
              Trending adventures
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TOURS.map((tour) => (
                <article
                  key={tour.title}
                  className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-float"
                >
                  <div className="relative">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      loading="lazy"
                      width={900}
                      height={700}
                      className="h-44 w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-deal px-3 py-1 text-xs font-bold text-primary-foreground">
                      Save {tour.was}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
                      <MapPin className="size-3.5" aria-hidden="true" />
                      {tour.place}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-primary">
                      {tour.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" aria-hidden="true" />
                        {tour.days}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="size-4 fill-accent text-accent" aria-hidden="true" />
                        {tour.rating}
                      </span>
                    </p>
                    <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                      <span>
                        <span className="block text-xs text-muted-foreground line-through">
                          {tour.was}
                        </span>
                        <span className="font-display text-xl font-extrabold text-primary">
                          {tour.price}
                        </span>
                      </span>
                      <a
                        href="#contact"
                        className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
                      >
                        View trip
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="py-20">
          <div className="container-pk">
            <h2 className="font-display text-2xl font-extrabold text-primary sm:text-3xl">
              What our travellers say
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <figure key={review.name} className="rounded-2xl border border-border p-6">
                  <Quote className="size-7 text-accent" aria-hidden="true" />
                  <blockquote className="mt-4 text-sm text-foreground">{review.text}</blockquote>
                  <figcaption className="mt-5 text-sm font-bold text-primary">
                    {review.name}
                    <span className="block text-xs font-semibold text-muted-foreground">
                      {review.trip}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-primary py-16">
          <div className="container-pk flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-2xl font-display text-2xl font-extrabold text-primary-foreground sm:text-3xl">
              Get our best trip deals before anyone else
            </h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@email.com"
                className="flex-1 rounded-full bg-card px-5 py-3 text-sm text-foreground outline-none ring-accent focus:ring-2"
              />
              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
