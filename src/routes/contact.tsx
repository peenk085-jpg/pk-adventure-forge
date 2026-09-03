import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact P&K Adventures | Talk To A Trip Specialist" },
      {
        name: "description",
        content:
          "Questions about a tour, safari or sailing trip? Message the P&K Adventures team and get a reply from a trip specialist within 24 hours.",
      },
      { property: "og:title", content: "Contact P&K Adventures" },
      {
        property: "og:description",
        content: "Message our trip specialists about any P&K Adventures tour, safari or sailing holiday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email address").max(255),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5, "Please tell us a little more").max(1000),
});

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none ring-accent focus:ring-2";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-primary";

function ContactPage() {
  const settings = useSiteSettings();
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("contact_messages").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email.toLowerCase(),
      subject: parsed.data.subject || null,
      message: parsed.data.message,
    });
    setBusy(false);
    if (error) {
      toast.error("We couldn't send your message. Please try again.");
      return;
    }
    setSent(true);
    toast.success("Message sent - we'll be in touch shortly.");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-pk grid gap-12 py-14 lg:grid-cols-[1fr_1fr]">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tell us where you want to go and what matters most - our specialists answer every
            message personally, usually within 24 hours.
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
              <Mail className="size-5 text-accent" aria-hidden="true" />
              <a href={`mailto:${settings["contact_email"]}`} className="hover:text-accent">
                {settings["contact_email"]}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
              <Phone className="size-5 text-accent" aria-hidden="true" />
              <a
                href={`tel:${settings["contact_phone"].replace(/[^+\d]/g, "")}`}
                className="hover:text-accent"
              >
                {settings["contact_phone"]}
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm font-semibold text-foreground">
              <MapPin className="size-5 text-accent" aria-hidden="true" />
              {settings["contact_hours"]}
            </li>
          </ul>
        </div>

        {sent ? (
          <div className="rounded-2xl border border-border bg-card p-8">
            <h2 className="font-display text-xl font-bold text-primary">Thanks for reaching out</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your message is with our team. We reply to every enquiry within 24 hours.
            </p>
            <button onClick={() => setSent(false)} className="mt-4 text-sm font-bold text-accent underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div>
              <label className={labelCls} htmlFor="c-name">
                Full name
              </label>
              <input id="c-name" name="full_name" required maxLength={100} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="c-email">
                Email
              </label>
              <input id="c-email" name="email" type="email" required maxLength={255} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="c-subject">
                Subject
              </label>
              <input id="c-subject" name="subject" maxLength={150} className={field} />
            </div>
            <div>
              <label className={labelCls} htmlFor="c-message">
                Message
              </label>
              <textarea id="c-message" name="message" rows={6} required maxLength={1000} className={field} />
            </div>
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-accent px-6 py-3 font-display text-base font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {busy ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
