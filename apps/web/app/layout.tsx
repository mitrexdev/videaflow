import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkConfigured } from "../lib/auth";
import "./globals.css";
import { EB_Garamond, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

// Inter = body. EB Garamond = editorial display serif (Waldenburg substitute).
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Videaflow — Turn ideas into publish-ready videos",
  description:
    "AI-powered video creation platform. Write the script, storyboard scenes, generate visuals and voiceover, add captions and music, export for YouTube, Shorts, Reels and TikTok.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // ClerkProvider is only safe when a publishable key is configured.
  const content = clerkConfigured ? (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: "#292524", colorBackground: "#ffffff" },
      }}
      afterSignOutUrl="/"
    >
      {children}
    </ClerkProvider>
  ) : (
    children
  );

  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, ebGaramond.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {content}
        </ThemeProvider>
      </body>
    </html>
  );
}
