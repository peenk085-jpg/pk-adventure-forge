import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { DEFAULT_SETTINGS, EDITABLE_KEYS, type SiteSettings } from "./site-content";

export const getSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    const { createClient } = await import("@supabase/supabase-js");
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const client = createClient(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input: RequestInfo | URL, init?: RequestInit) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data } = await client.from("site_settings").select("key, value");
    const stored: SiteSettings = {};
    for (const row of data ?? []) {
      if (row.value) stored[row.key] = row.value;
    }
    return { ...DEFAULT_SETTINGS, ...stored };
  },
);

export const adminStatus = createServerFn({ method: "GET" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  return { unlocked: session.data.unlocked === true };
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) =>
    z.object({ password: z.string().min(1).max(200) }).parse(data),
  )
  .handler(async ({ data }) => {
    const { getAdminSession, passwordMatches } = await import("./admin-session.server");
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) return { ok: false as const };
    if (!passwordMatches(data.password, expected)) return { ok: false as const };
    const session = await getAdminSession();
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const { getAdminSession } = await import("./admin-session.server");
  const session = await getAdminSession();
  await session.clear();
  return { ok: true as const };
});

const settingsSchema = z.object({
  settings: z.record(z.string(), z.string().max(2000)),
});

export const saveSiteSettings = createServerFn({ method: "POST" })
  .inputValidator((data: { settings: Record<string, string> }) => settingsSchema.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const rows = Object.entries(data.settings)
      .filter(([key]) => EDITABLE_KEYS.includes(key))
      .map(([key, value]) => ({ key, value: value.trim() }));

    if (rows.length === 0) return { ok: true as const };

    const { error } = await supabaseAdmin.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) throw new Error("Could not save settings");
    return { ok: true as const };
  });

const uploadSchema = z.object({
  key: z.string().min(1).max(60),
  filename: z.string().min(1).max(200),
  contentType: z.string().regex(/^image\/(png|jpeg|jpg|webp|avif|gif)$/),
  dataBase64: z.string().min(10).max(14_000_000),
});

export const uploadSiteImage = createServerFn({ method: "POST" })
  .inputValidator((data: z.input<typeof uploadSchema>) => uploadSchema.parse(data))
  .handler(async ({ data }) => {
    const { requireAdmin } = await import("./admin-session.server");
    await requireAdmin();
    if (!EDITABLE_KEYS.includes(data.key)) throw new Error("Unknown image");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ext = (data.filename.split(".").pop() ?? "jpg").toLowerCase().slice(0, 5);
    const path = `${data.key}-${Date.now()}.${ext}`;
    const bytes = Buffer.from(data.dataBase64, "base64");

    const { error } = await supabaseAdmin.storage
      .from("site-images")
      .upload(path, bytes, { contentType: data.contentType, upsert: true });
    if (error) throw new Error("Upload failed");

    const url = `/api/public/site-image/${path}`;
    const { error: saveError } = await supabaseAdmin
      .from("site_settings")
      .upsert([{ key: data.key, value: url }], { onConflict: "key" });
    if (saveError) throw new Error("Could not save image");

    return { ok: true as const, url };
  });
