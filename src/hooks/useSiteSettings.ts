import { queryOptions, useQuery } from "@tanstack/react-query";

import { getSiteSettings } from "@/lib/settings.functions";
import { DEFAULT_SETTINGS, type SiteSettings } from "@/lib/site-content";

export const siteSettingsQuery = queryOptions({
  queryKey: ["site-settings"],
  queryFn: () => getSiteSettings(),
  staleTime: 60_000,
});

export function useSiteSettings(): SiteSettings {
  const { data } = useQuery(siteSettingsQuery);
  return data ?? DEFAULT_SETTINGS;
}
