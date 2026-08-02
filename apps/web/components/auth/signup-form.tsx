"use client";

import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "./clerk-appearance";

/** Clerk's prebuilt sign-up, themed to match the Videaflow brand. */
export function SignupForm() {
  return (
    <SignUp
      path="/signup"
      routing="path"
      signInUrl="/login"
      fallbackRedirectUrl="/dashboard"
      appearance={clerkAppearance}
    />
  );
}
