"use client";

import { useState } from "react";
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
import { Loader2, Video, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

function DashboardInner({
  api,
}: {
  api: ApiClient;
}) {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const projects = useQuery({
    queryKey: ["projects"],
    queryFn: () => api.listProjects(),
  });

  const create = useMutation({
    mutationFn: () => api.createProject({ name: name || "Untitled Video" }),
    onSuccess: () => {
      projects.refetch();
      setOpen(false);
      setName("");
    },
  });

  return (
    <div className="w-full max-w-none">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="font-heading text-3xl font-normal text-ink">Projects</h1>
          <p className="mt-1 text-body">Everything you're creating.</p>
        </div>
        <div className="flex items-center justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger suppressHydrationWarning className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:scale-105 hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              New Project
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-sidebar border-hairline backdrop-blur-xl">
              <DialogHeader>
                <DialogTitle className="text-ink font-heading text-xl">Create a new project</DialogTitle>
              </DialogHeader>
              <form
                className="mt-4 flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  create.mutate();
                }}
              >
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-body">
                    Project Name
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. My first video"
                    className="mt-2 w-full rounded-lg border border-hairline bg-surface-strong/30 px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted-foreground transition-all hover:bg-surface-strong focus:border-primary focus:bg-transparent"
                    autoFocus
                  />
                </div>
                <DialogFooter className="mt-4">
                  <button
                    type="submit"
                    disabled={create.isPending}
                    className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {create.isPending ? "Creating…" : "Generate"}
                  </button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {projects.isLoading && (
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-hairline bg-card/20 p-4 shadow-sm backdrop-blur-md">
              <Skeleton className="aspect-video w-full rounded-xl bg-surface-strong/30" />
              <div className="mt-4 flex flex-1 flex-col justify-between gap-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-1/2 bg-surface-strong/50" />
                  <Skeleton className="h-4 w-12 rounded-full bg-surface-strong/30" />
                </div>
                <Skeleton className="h-3 w-1/3 bg-surface-strong/30" />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {projects.isError && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-destructive/50 bg-destructive/10 backdrop-blur-xl p-12 text-center shadow-[0_0_30px_rgba(220,38,38,0.1)]">
          <AlertCircle className="h-8 w-8 text-destructive mb-3" />
          <p className="text-sm font-semibold text-destructive">
            Could not reach the API. Is the backend running on :8000?
          </p>
        </div>
      )}

      {!projects.isLoading && !projects.isError && projects.data?.length === 0 && (
        <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-hairline bg-card/20 backdrop-blur-xl p-20 text-center shadow-lg">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong shadow-inner">
            <Video className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mt-6 text-lg font-semibold text-ink">No projects yet</h3>
          <p className="mt-2 text-sm text-body max-w-sm">
            Start your first video by typing a prompt in the command bar above.
          </p>
        </div>
      )}

      <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {projects.data?.map((project) => (
          <li
            key={project.id}
            className="group relative overflow-hidden rounded-2xl border border-hairline bg-card/40 shadow-lg backdrop-blur-md transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]"
          >
            <Link href={`/dashboard/projects/${project.id}`} className="flex h-full w-full flex-col p-4">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
              
              {/* Thumbnail Placeholder */}
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black/50 border border-hairline mb-4 flex items-center justify-center shadow-inner group-hover:border-primary/30 transition-colors">
                {/* Fake Video Content (Gradient) */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-gradient-sky/10" />
                <Video className="h-8 w-8 text-white/20 transition-transform group-hover:scale-110 group-hover:text-white/40" />
                <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                  {/* @ts-ignore: backend returns aspect_ratio */}
                  {project.aspectRatio || project.aspect_ratio || "16:9"}
                </div>
              </div>

              <div className="relative flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-semibold text-ink group-hover:text-primary transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <span className="shrink-0 flex items-center gap-1.5 rounded-full border border-hairline bg-surface-strong/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-body shadow-sm">
                    {["scripting", "storyboard", "generating", "exporting"].includes(
                      project.status
                    ) ? (
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-semantic-success" />
                    )}
                    {project.status}
                  </span>
                </div>
                <p className="mt-auto pt-4 text-xs font-medium uppercase tracking-wider text-body/50">
                  {project.fps}fps • Created today
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WithQueryClient({ api }: { api: ApiClient }) {
  const [client] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <DashboardInner api={api} />
    </QueryClientProvider>
  );
}

function ClerkDashboard() {
  const api = useApi();
  return <WithQueryClient api={api} />;
}

function DevDashboard() {
  return <WithQueryClient api={devApi} />;
}

export default function DashboardPage() {
  return clerkConfigured ? <ClerkDashboard /> : <DevDashboard />;
}
