"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { HugeiconsIcon } from "@hugeicons/react"
import { LogOut, Settings2, UserRound, PanelLeftOpen } from "lucide-react"
import {
  AiMicIcon,
  Folder01Icon,
  Image01Icon,
  Layout01Icon,
} from "@hugeicons/core-free-icons"

import { SidebarCredits } from "@/components/dashboard/sidebar-credits"
import { SignOutDialog } from "@/components/dashboard/sign-out-dialog"
import { Logo } from "@/components/logo"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const workspaceItems = [
  { title: "Projects", href: "/dashboard", icon: Folder01Icon },
  { title: "Templates", href: "/dashboard/templates", icon: Layout01Icon },
  { title: "Assets", href: "/dashboard/assets", icon: Image01Icon },
  { title: "Voices", href: "/dashboard/voices", icon: AiMicIcon },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const { state, toggleSidebar } = useSidebar()
  const [signOutOpen, setSignOutOpen] = useState(false)

  const initial =
    user?.firstName?.[0] ??
    user?.primaryEmailAddress?.emailAddress?.[0]?.toUpperCase() ??
    "V"

  return (
    <Sidebar collapsible="icon" variant="floating" className="shadow-lg backdrop-blur-xl bg-sidebar/50 border-hairline mt-6 ml-4 h-[calc(100svh-48px)]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            {state === "collapsed" ? (
              <button 
                onClick={toggleSidebar}
                title="Expand sidebar"
                className="group relative flex aspect-square size-8 items-center justify-center overflow-hidden rounded-lg bg-sidebar-accent p-1.5 transition-colors hover:bg-sidebar-accent/80"
              >
                <Logo className="h-full w-full object-contain transition-opacity group-hover:opacity-0" />
                <PanelLeftOpen className="absolute h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 text-sidebar-foreground" />
              </button>
            ) : (
              <>
                <SidebarMenuButton size="lg" render={<Link href="/" />} className="w-auto hover:bg-transparent hover:text-inherit">
                  <Logo className="h-6 w-auto shrink-0" />
                </SidebarMenuButton>
                <SidebarTrigger className="-mr-1" />
              </>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspaceItems.map((item) => {
                const active = pathname === item.href
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      render={<Link href={item.href} />}
                    >
                      <HugeiconsIcon icon={item.icon} />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {user ? (
          <>
            <SidebarCredits />

            <SidebarSeparator />

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="w-full cursor-pointer"
                    aria-label="Account menu"
                  />
                }
              >
                <div className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0">
                  <Avatar className="size-9 shrink-0">
                    {user.hasImage ? (
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName ?? "Account"}
                      />
                    ) : null}
                    <AvatarFallback className="bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
                      {initial}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate text-sm font-medium">
                      {user.firstName || "Account"}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/60">
                      {user.primaryEmailAddress?.emailAddress ?? user.username}
                    </span>
                  </div>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="start" className="w-60">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <span className="block truncate">{user.fullName || "Account"}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress ?? user.username}
                    </span>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
                  <UserRound />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem render={<Link href="/dashboard/settings" />}>
                  <Settings2 />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => setSignOutOpen(true)}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
          </>
        ) : null}
      </SidebarFooter>
    </Sidebar>
  )
}
