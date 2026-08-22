"use client"

import { usePathname } from "next/navigation"



const sectionTitles: Record<string, string> = {
  "/dashboard": "Projects",
  "/dashboard/templates": "Templates",
  "/dashboard/assets": "Assets",
  "/dashboard/voices": "Voices",
  "/dashboard/settings": "Settings",
  "/dashboard/profile": "Profile",
}

/** Top bar above the page content: collapse trigger + current section name. */
export function DashboardHeader() {
  const pathname = usePathname()
  const title = sectionTitles[pathname] ?? "Dashboard"

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 px-4 bg-transparent" />
  )
}
