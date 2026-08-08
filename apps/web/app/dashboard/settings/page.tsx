"use client"

import { Palette, Settings2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function SettingsPage() {
  return (
    <Tabs defaultValue="appearance" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="appearance">
          <Palette />
          Appearance
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings2 />
          Settings
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appearance" className="mt-4">
        <Card>
          <CardContent className="space-y-5 py-6">
            <div>
              <p className="text-base font-medium">Theme</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Choose how Videaflow looks. System follows your device&apos;s
                light or dark preference.
              </p>
            </div>
            <ThemeToggle />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-14 text-center">
            <Settings2 className="size-8 text-muted-foreground" />
            <p className="text-base font-medium">Settings</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              General workspace settings are coming soon.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
