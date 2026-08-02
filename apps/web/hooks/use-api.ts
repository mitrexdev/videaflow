"use client";

import { useAuth } from "@clerk/nextjs";
import { createApiClient, type ApiClient } from "@videaflow/api-client";
import { API_BASE_URL } from "../lib/api";

/**
 * Production API client bound to the current Clerk session.
 * getAccessToken() returns the live session token, sent as Bearer to FastAPI.
 */
export function useApi(): ApiClient {
  const { getToken } = useAuth();
  return createApiClient({
    baseUrl: API_BASE_URL,
    getAccessToken: () => getToken(),
  });
}
