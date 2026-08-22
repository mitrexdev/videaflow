import type { ReactNode } from "react"
import { cookies } from "next/headers"

import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset className="relative overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-1 flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
