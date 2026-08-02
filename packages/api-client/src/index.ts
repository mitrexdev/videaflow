import type { Project, ProjectCreate } from "@videaflow/video-schema";

export interface ApiClientOptions {
  baseUrl: string;
  /** Clerk's getToken() is async — sync strings are also fine. */
  getAccessToken?: () => string | null | Promise<string | null>;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly detail: unknown,
  ) {
    super(`API error ${status}`);
    this.name = "ApiError";
  }
}

/**
 * Typed client for the FastAPI backend.
 *
 * Phase 2: generated from the backend's OpenAPI schema (openapi-typescript)
 * so endpoints stay in lockstep with the API. Auth token comes from Clerk.
 */
export class ApiClient {
  constructor(private readonly opts: ApiClientOptions) {}

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = await this.opts.getAccessToken?.();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(`${this.opts.baseUrl}${path}`, {
      method,
      headers,
      // null (not undefined) so exactOptionalPropertyTypes is happy.
      body: body === undefined ? null : JSON.stringify(body),
    });

    if (!res.ok) {
      const detail = await res.json().catch(() => null);
      throw new ApiError(res.status, detail);
    }
    return res.json() as Promise<T>;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  post<T>(path: string, body?: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  // --- Projects ---
  listProjects(): Promise<Project[]> {
    return this.get<Project[]>("/v1/projects");
  }

  createProject(input: ProjectCreate): Promise<Project> {
    return this.post<Project>("/v1/projects", input);
  }
}

export function createApiClient(opts: ApiClientOptions): ApiClient {
  return new ApiClient(opts);
}
