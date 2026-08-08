"use client"

import { Sparkles } from "lucide-react"

import { Progress } from "@/components/ui/progress"

/**
 * Credit balance card shown above the user menu in the sidebar.
 * Numbers are a placeholder until real billing/quota data is wired up.
 */
export function SidebarCredits() {
  const total = 1000
  const used = 250
  const remaining = total - used
  const percent = Math.round((used / total) * 100)

  return (
    <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3 group-data-[collapsible=icon]:hidden">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs font-medium text-sidebar-foreground/70">
          <Sparkles className="size-3.5 text-ink" />
          Credits
        </span>
        <span className="text-xs font-semibold text-sidebar-foreground tabular-nums">
          {remaining.toLocaleString()}
        </span>
      </div>

      <Progress
        value={percent}
        className="mt-2.5 [&_[data-slot=progress-track]]:h-1.5"
      />

      <p className="mt-2 text-[11px] text-sidebar-foreground/50">
        {used.toLocaleString()} of {total.toLocaleString()} used
      </p>
    </div>
  )
}
