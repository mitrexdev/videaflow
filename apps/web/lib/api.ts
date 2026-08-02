import { createApiClient } from "@videaflow/api-client";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Dev-mode client (no auth token) — used when Clerk isn't configured, because
 * the backend falls back to its DEV identity.
 * Production path: use the `useApi()` hook in hooks/use-api.ts.
 */
export const api = createApiClient({ baseUrl: API_BASE_URL });
