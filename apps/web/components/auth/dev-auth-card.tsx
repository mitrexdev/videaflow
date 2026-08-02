import Link from "next/link";
import { ArrowRight, KeyRound, Play } from "lucide-react";

/**
 * Shown on /login and /signup when Clerk isn't configured (no publishable
 * key at build time). The API runs in dev mode with a DEV identity, so the
 * dashboard still works locally — real auth activates once keys are set.
 */
export function DevAuthCard({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 shadow-2xl shadow-black/50 backdrop-blur">
      <div className="p-8 sm:p-10">
        <Link href="/" className="mb-8 flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
            <Play className="h-4 w-4 fill-white text-white" />
          </span>
          <span className="text-lg font-bold tracking-tight text-white">Videaflow</span>
        </Link>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15">
          <KeyRound className="h-6 w-6 text-amber-400" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-white">Development mode</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Authentication isn&apos;t active yet — Clerk keys aren&apos;t configured in this
          build. The API is running with a DEV identity so you can keep building locally.
        </p>

        <div className="mt-6 rounded-2xl border border-white/5 bg-slate-800/40 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            To enable real {mode === "login" ? "sign in" : "sign up"}
          </p>
          <ol className="mt-3 space-y-2 text-sm text-slate-300">
            <li>1. Create an app at clerk.com</li>
            <li>2. Copy the keys into your <code className="text-indigo-300">.env</code></li>
            <li>3. Rebuild with <code className="text-indigo-300">pnpm build</code></li>
          </ol>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          Continue to dashboard (dev)
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
