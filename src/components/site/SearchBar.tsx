import { Search } from "lucide-react";

const FIELDS = [
  { label: "Where to?", value: "Take me to..." },
  { label: "When?", value: "Anytime" },
  { label: "How long for?", value: "Choose duration" },
  { label: "Who's going?", value: "2 Adults, 0 Child" },
];

export function SearchBar() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 rounded-3xl bg-card p-3 shadow-float md:flex-row md:items-center md:rounded-full md:pl-2"
      aria-label="Search adventures"
    >
      {FIELDS.map((field, i) => (
        <div
          key={field.label}
          className={`flex-1 px-4 py-2 text-center ${
            i > 0 ? "md:border-l md:border-border" : ""
          }`}
        >
          <span className="block text-sm font-bold text-accent">{field.label}</span>
          <span className="block text-sm font-bold text-foreground">{field.value}</span>
        </div>
      ))}
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
