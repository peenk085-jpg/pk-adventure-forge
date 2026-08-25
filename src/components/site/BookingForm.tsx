import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import type { Trip } from "@/data/trips";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z.string().trim().max(30).optional(),
  travellers: z.number().int().min(1).max(30),
  preferred_date: z.string().max(20).optional(),
  message: z.string().trim().max(1000).optional(),
});

const field =
  "w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none ring-accent focus:ring-2";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-primary";

export function BookingForm({ trip }: { trip: Trip }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      travellers: Number(fd.get("travellers") ?? 2),
      preferred_date: String(fd.get("preferred_date") ?? ""),
      message: String(fd.get("message") ?? ""),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setBusy(true);
    const { error } = await supabase.from("booking_requests").insert({
      trip_slug: trip.slug,
      trip_title: trip.title,
      full_name: parsed.data.full_name,
      email: parsed.data.email.toLowerCase(),
      phone: parsed.data.phone || null,
      travellers: parsed.data.travellers,
      preferred_date: parsed.data.preferred_date || null,
      message: parsed.data.message || null,
    });
    setBusy(false);

    if (error) {
      toast.error("We couldn't send your request. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Booking request sent - we'll reply within 24 hours.");
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-display text-lg font-bold text-primary">Request received</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for your interest in {trip.title}. One of our trip specialists will email you
          within 24 hours with availability and next steps.
        </p>
        <button
          onClick={() => setDone(false)}
          className="mt-4 text-sm font-bold text-accent underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
      <h3 className="font-display text-lg font-bold text-primary">Request booking</h3>
      <p className="text-sm text-muted-foreground">
        No payment now - we&apos;ll confirm availability first.
      </p>

      <div>
        <label className={labelCls} htmlFor="full_name">
          Full name
        </label>
        <input id="full_name" name="full_name" required maxLength={100} className={`mt-1 ${field}`} />
      </div>
      <div>
        <label className={labelCls} htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" required maxLength={255} className={`mt-1 ${field}`} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="phone">
            Phone (optional)
          </label>
          <input id="phone" name="phone" maxLength={30} className={`mt-1 ${field}`} />
        </div>
        <div>
          <label className={labelCls} htmlFor="travellers">
            Travellers
          </label>
          <input
            id="travellers"
            name="travellers"
            type="number"
            min={1}
            max={30}
            defaultValue={2}
            className={`mt-1 ${field}`}
          />
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="preferred_date">
          Preferred start date
        </label>
        <input id="preferred_date" name="preferred_date" type="date" className={`mt-1 ${field}`} />
      </div>
      <div>
        <label className={labelCls} htmlFor="message">
          Anything else?
        </label>
        <textarea id="message" name="message" rows={4} maxLength={1000} className={`mt-1 ${field}`} />
      </div>

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-accent px-6 py-3 font-display text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {busy ? "Sending..." : "Request booking"}
      </button>
    </form>
  );
}
