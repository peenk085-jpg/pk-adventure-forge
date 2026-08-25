import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

import { TRIPS } from "@/data/trips";

const PLACES = Array.from(new Set(TRIPS.map((t) => t.place))).sort();
const STYLES = ["Group tour", "Safari", "Sail & cruise", "Private tour"];

const selectCls =
  "mt-0.5 w-full bg-transparent text-center text-sm font-bold text-foreground outline-none";

export function SearchBar() {
  const navigate = useNavigate();
  const [place, setPlace] = useState("");
  const [style, setStyle] = useState("");
  const [guests, setGuests] = useState("2");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/trips",
      search: {
        ...(place ? { q: place } : {}),
        ...(style ? { style } : {}),
      },
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 rounded-3xl bg-card p-3 shadow-float md:flex-row md:items-center md:rounded-full md:pl-2"
      aria-label="Search adventures"
    >
      <div className="flex-1 px-4 py-2 text-center">
        <label htmlFor="s-place" className="block text-sm font-bold text-accent">
          Where to?
        </label>
        <select id="s-place" value={place} onChange={(e) => setPlace(e.target.value)} className={selectCls}>
          <option value="">Take me anywhere</option>
          {PLACES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 px-4 py-2 text-center md:border-l md:border-border">
        <label htmlFor="s-style" className="block text-sm font-bold text-accent">
          Trip style
        </label>
        <select id="s-style" value={style} onChange={(e) => setStyle(e.target.value)} className={selectCls}>
          <option value="">Any style</option>
          {STYLES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 px-4 py-2 text-center md:border-l md:border-border">
        <label htmlFor="s-guests" className="block text-sm font-bold text-accent">
          Who&apos;s going?
        </label>
        <select id="s-guests" value={guests} onChange={(e) => setGuests(e.target.value)} className={selectCls}>
          {["1", "2", "3", "4", "5", "6+"].map((g) => (
            <option key={g} value={g}>
              {g} {g === "1" ? "traveller" : "travellers"}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-display text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
      >
        <Search className="size-5" aria-hidden="true" />
        Search
      </button>
    </form>
  );
}
