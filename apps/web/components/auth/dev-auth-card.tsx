import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";
import { Logo } from "@/components/logo";

/**
 * Shown on /login and /signup when Clerk isn't configured (no publishable
 * key at build time). The API runs in dev mode with a DEV identity, so the
 * dashboard still works locally — real auth activates once keys are set.
 */
export function DevAuthCard({ mode }: { mode: "login" | "signup" }) {
  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-hairline bg-card shadow-[0_8px_40px_rgba(12,10,9,0.08)]">
      <div className="p-8 sm:p-10">
        <Link href="/" className="mb-8 flex items-center">
          <Logo className="h-7 w-auto" />
        </Link>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <KeyRound className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-ink">Development mode</h1>
        <p className="mt-2 text-sm leading-relaxed text-body">
          Authentication isn&apos;t active yet — Clerk keys aren&apos;t configured in this
          build. The API is running with a DEV identity so you can keep building locally.
        </p>

        <div className="mt-6 rounded-xl border border-hairline bg-surface-strong/50 p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-body">
            To enable real {mode === "login" ? "sign in" : "sign up"}
          </p>
          <ol className="mt-3 space-y-2 text-sm text-body">
            <li>1. Create an app at clerk.com</li>
            <li>2. Copy the keys into your <code className="text-ink">.env</code></li>
            <li>3. Rebuild with <code className="text-ink">pnpm build</code></li>
          </ol>
        </div>

        <Link
          href="/dashboard"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Continue to dashboard (dev)
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
