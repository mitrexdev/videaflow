"use client"

import { usePathname } from "next/navigation"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

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
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-sm font-medium">{title}</h1>
    </header>
  )
}
