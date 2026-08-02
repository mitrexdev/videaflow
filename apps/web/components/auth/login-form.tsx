"use client";

import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "./clerk-appearance";

/** Clerk's prebuilt sign-in, themed to match the Videaflow brand. */
export function LoginForm() {
  return (
    <SignIn
      path="/login"
      routing="path"
      signUpUrl="/signup"
      fallbackRedirectUrl="/dashboard"
      appearance={clerkAppearance}
    />
  );
}
