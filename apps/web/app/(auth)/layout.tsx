import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[640px] -translate-x-1/2 rounded-full bg-gradient-mint/50 blur-[120px]" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-lavender/40 blur-[100px]" />
        <div className="absolute top-40 left-[-120px] h-[300px] w-[300px] rounded-full bg-gradient-peach/40 blur-[100px]" />
      </div>
      <div className="relative flex min-h-screen items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
