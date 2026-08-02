/**
 * Whether Clerk is wired up. NEXT_PUBLIC vars are inlined at build time, so
 * this is constant per build. Without keys, the app runs in dev mode
 * (API falls back to its DEV identity) and auth pages show a setup card.
 */
export const clerkConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
