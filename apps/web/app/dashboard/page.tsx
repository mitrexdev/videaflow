"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { ApiClient } from "@videaflow/api-client";
import { clerkConfigured } from "../../lib/auth";
import { api as devApi } from "../../lib/api";
import { useApi } from "../../hooks/use-api";

function SignOutButton() {
  const { signOut } = useAuth();
  return (
    <button
      type="button"
      onClick={() => signOut({ redirectUrl: "/" })}
      className="rounded-full border border-hairline-strong px-4 py-2 text-sm font-medium text-body transition hover:bg-surface-strong"
    >
      Sign out
    </button>
  );
}

function DashboardInner({
  api,
  showAccount,
}: {
  api: ApiClient;
  showAccount: boolean;
}) {
  const [name, setName] = useState("My first video");

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.listProjects(),
  });

  const create = useMutation({
    mutationFn: () => api.createProject({ name }),
    onSuccess: () => projects.refetch(),
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-normal text-ink">Projects</h1>
          <p className="mt-1 text-body">Everything you&apos;re creating.</p>
        </div>
        <div className="flex items-center gap-3">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) create.mutate();
            }}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project name"
              className="rounded-xl border border-hairline-strong bg-card px-4 py-2 text-sm text-ink outline-none placeholder:text-muted-foreground focus:border-ink"
            />
            <button
              type="submit"
              disabled={create.isPending}
              className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            >
              {create.isPending ? "Creating…" : "New project"}
            </button>
          </form>
          {showAccount ? <SignOutButton /> : null}
        </div>
      </header>

      {projects.isLoading && <p className="mt-12 text-body">Loading projects…</p>}
      {projects.isError && (
        <p className="mt-12 text-destructive">
          Could not reach the API. Is the backend running on :8000?
        </p>
      )}

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.data?.map((project) => (
          <li
            key={project.id}
            className="rounded-xl border border-hairline bg-card p-5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition hover:border-hairline-strong"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{project.name}</span>
              <span className="rounded-full bg-surface-strong px-2 py-0.5 text-xs text-body">
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-body">
              {project.aspectRatio} · {project.fps}fps
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

function WithQueryClient({ api, showAccount }: { api: ApiClient; showAccount: boolean }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <DashboardInner api={api} showAccount={showAccount} />
    </QueryClientProvider>
  );
}

function ClerkDashboard() {
  const api = useApi();
  return <WithQueryClient api={api} showAccount />;
}

function DevDashboard() {
  return <WithQueryClient api={devApi} showAccount={false} />;
}

export default function DashboardPage() {
  // Split avoids calling useAuth() (and requiring ClerkProvider) in dev mode.
  return clerkConfigured ? <ClerkDashboard /> : <DevDashboard />;
}
