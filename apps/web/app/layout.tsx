import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkConfigured } from "../lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "Videaflow — Turn ideas into publish-ready videos",
  description:
    "AI-powered video creation platform. Write the script, storyboard scenes, generate visuals and voiceover, add captions and music, export for YouTube, Shorts, Reels and TikTok.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ClerkProvider is only safe when a publishable key is configured.
  const content = clerkConfigured ? (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#6366f1", colorBackground: "#0b0f19" },
      }}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  ) : (
    children
  );

  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{content}</body>
    </html>
  );
}
