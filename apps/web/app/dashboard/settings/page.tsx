"use client"

import { Palette, Settings2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
        <Card className="rounded-2xl border-hairline bg-card/40 backdrop-blur-xl shadow-lg">
          <CardContent className="space-y-5 py-8">
            <div>
              <p className="text-base font-semibold text-ink">Theme</p>
              <p className="mt-1 max-w-sm text-sm text-body">
                Videaflow currently uses a forced dark theme for the best viewing experience during video generation.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="mt-4">
        <Card className="rounded-2xl border-hairline bg-card/40 backdrop-blur-xl shadow-lg">
          <CardContent className="flex flex-col items-center justify-center gap-2 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong shadow-inner">
              <Settings2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-lg font-semibold text-ink">General Settings</p>
            <p className="max-w-sm text-sm text-body">
              General workspace settings are coming soon.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
