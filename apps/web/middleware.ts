import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Inlined at build time. Without keys the app runs in dev mode (no protection).
const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/** Routes that require authentication. */
const PROTECTED_PREFIXES = ["/dashboard", "/editor"];

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

const clerkGuard = clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req.nextUrl.pathname)) {
    const { userId } = await auth();
    if (!userId) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect_url", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
});

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
