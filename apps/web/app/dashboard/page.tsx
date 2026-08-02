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
      className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
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
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="mt-1 text-slate-400">Everything you&apos;re creating.</p>
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
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={create.isPending}
              className="rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:opacity-50"
            >
              {create.isPending ? "Creating…" : "New project"}
            </button>
          </form>
          {showAccount ? <SignOutButton /> : null}
        </div>
      </header>

      {projects.isLoading && <p className="mt-12 text-slate-500">Loading projects…</p>}
      {projects.isError && (
        <p className="mt-12 text-rose-400">
          Could not reach the API. Is the backend running on :8000?
        </p>
      )}

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.data?.map((project) => (
          <li
            key={project.id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{project.name}</span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-300">
                {project.status}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
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
