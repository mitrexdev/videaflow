import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Inlined at build time. Without keys the app runs in dev mode (no protection).
const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const isProtected = createRouteMatcher(["/dashboard(.*)", "/editor(.*)"]);

const clerkGuard = clerkMiddleware(
  async (auth, req) => {
    if (isProtected(req)) await auth.protect();
    return NextResponse.next();
  },
  // Redirect unauthenticated users to our /login route (not Clerk's /sign-in).
  { signInUrl: "/login" },
);

function passthrough(_req: NextRequest) {
  return NextResponse.next();
}

export default clerkConfigured ? clerkGuard : passthrough;

export const config = {
  matcher: [
    // Skip Next internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
