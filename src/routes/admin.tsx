import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Lock, LogOut, Upload } from "lucide-react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { siteSettingsQuery, useSiteSettings } from "@/hooks/useSiteSettings";
import { CONTACT_FIELDS, IMAGE_FIELDS } from "@/lib/site-content";
import {
  adminLogin,
  adminLogout,
  adminStatus,
  saveSiteSettings,
  uploadSiteImage,
} from "@/lib/settings.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Site Admin | P&K Adventures" },
      {
        name: "description",
        content: "Password-protected area to update P&K Adventures photos and contact details.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Site Admin | P&K Adventures" },
      { property: "og:description", content: "Manage site photos and contact information." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const field =
  "mt-1 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none ring-accent focus:ring-2";
const labelCls = "block text-xs font-bold uppercase tracking-wider text-primary";
const btn =
  "rounded-full bg-accent px-6 py-3 font-display text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60";

function AdminPage() {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const status = useServerFn(adminStatus);

  useEffect(() => {
    status().then((r) => setUnlocked(r.unlocked)).catch(() => setUnlocked(false));
  }, [status]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-pk py-14">
        <h1 className="font-display text-3xl font-extrabold text-primary sm:text-4xl">
          Site admin
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Update the photos used across the site and your public contact information.
        </p>

        {unlocked === null ? (
          <p className="mt-10 text-sm text-muted-foreground">Loading...</p>
        ) : unlocked ? (
          <Editor onLock={() => setUnlocked(false)} />
        ) : (
          <LoginForm onUnlocked={() => setUnlocked(true)} />
        )}
      </main>
      <Footer />
    </div>
  );
}

function LoginForm({ onUnlocked }: { onUnlocked: () => void }) {
  const login = useServerFn(adminLogin);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    if (!password) return;
    setBusy(true);
    try {
      const { ok } = await login({ data: { password } });
      if (ok) onUnlocked();
      else toast.error("Incorrect password");
    } catch {
      toast.error("Could not sign in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center gap-2 text-primary">
        <Lock className="size-5 text-accent" aria-hidden="true" />
        <h2 className="font-display text-lg font-bold">Enter admin password</h2>
      </div>
      <div>
        <label className={labelCls} htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          className={field}
          required
        />
      </div>
      <button type="submit" disabled={busy} className={`${btn} w-full`}>
        {busy ? "Checking..." : "Unlock"}
      </button>
    </form>
  );
}

function Editor({ onLock }: { onLock: () => void }) {
  const settings = useSiteSettings();
  const queryClient = useQueryClient();
  const save = useServerFn(saveSiteSettings);
  const logout = useServerFn(adminLogout);
  const upload = useServerFn(uploadSiteImage);
  const [busy, setBusy] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  async function onSaveContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of CONTACT_FIELDS) next[f.key] = String(fd.get(f.key) ?? "");
    setBusy(true);
    try {
      await save({ data: { settings: next } });
      await queryClient.invalidateQueries({ queryKey: siteSettingsQuery.queryKey });
      toast.success("Contact information saved");
    } catch {
      toast.error("Could not save. Please sign in again.");
    } finally {
      setBusy(false);
    }
  }

  async function onPickImage(key: string, file: File) {
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Please choose an image under 8MB");
      return;
    }
    setUploadingKey(key);
    try {
      const buffer = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buffer);
      for (let i = 0; i < bytes.length; i += 8192) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      }
      await upload({
        data: {
          key,
          filename: file.name,
          contentType: file.type,
          dataBase64: btoa(binary),
        },
      });
      await queryClient.invalidateQueries({ queryKey: siteSettingsQuery.queryKey });
      toast.success("Picture updated");
    } catch {
      toast.error("Upload failed. Use a JPG, PNG or WebP under 8MB.");
    } finally {
      setUploadingKey(null);
    }
  }

  async function onLogout() {
    await logout();
    onLock();
  }

  return (
    <div className="mt-10 space-y-12">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-accent"
        >
          <LogOut className="size-4" aria-hidden="true" /> Lock admin
        </button>
      </div>

      <section>
        <h2 className="font-display text-2xl font-bold text-primary">Contact information</h2>
        <form onSubmit={onSaveContact} className="mt-5 max-w-xl space-y-4 rounded-2xl border border-border bg-card p-6">
          {CONTACT_FIELDS.map((f) => (
            <div key={f.key}>
              <label className={labelCls} htmlFor={`f-${f.key}`}>
                {f.label}
              </label>
              <input
                id={`f-${f.key}`}
                name={f.key}
                type={f.type}
                defaultValue={settings[f.key] ?? ""}
                maxLength={300}
                className={field}
              />
            </div>
          ))}
          <button type="submit" disabled={busy} className={btn}>
            {busy ? "Saving..." : "Save contact info"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold text-primary">Pictures</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Replacing a picture updates it everywhere it appears - homepage, destination cards and trip
          pages.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGE_FIELDS.map((f) => (
            <div key={f.key} className="overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={settings[f.key] ?? f.fallback}
                alt={f.label}
                className="h-40 w-full object-cover"
              />
              <div className="space-y-3 p-4">
                <p className="font-display text-sm font-bold text-primary">{f.label}</p>
                <input
                  ref={(el) => {
                    inputs.current[f.key] = el;
                  }}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void onPickImage(f.key, file);
                    e.target.value = "";
                  }}
                />
                <button
                  type="button"
                  disabled={uploadingKey === f.key}
                  onClick={() => inputs.current[f.key]?.click()}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold text-primary hover:border-accent hover:text-accent disabled:opacity-60"
                >
                  <Upload className="size-4" aria-hidden="true" />
                  {uploadingKey === f.key ? "Uploading..." : "Replace picture"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
