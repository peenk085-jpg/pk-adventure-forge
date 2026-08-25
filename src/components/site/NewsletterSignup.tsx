import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";

const schema = z.string().trim().email("Enter a valid email address").max(255);

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(email);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setBusy(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: parsed.data.toLowerCase() });
    setBusy(false);

    if (error) {
      if (error.code === "23505" || error.message.includes("duplicate")) {
        toast.success("You're already on the list - thanks!");
        setEmail("");
        return;
      }
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("You're subscribed. Deals are on the way!");
    setEmail("");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        maxLength={255}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 rounded-full bg-card px-5 py-3 text-sm text-foreground outline-none ring-accent focus:ring-2"
      />
      <button
        type="submit"
        disabled={busy}
        className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {busy ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}
