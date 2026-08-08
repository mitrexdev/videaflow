"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { BadgeCheck, CircleAlert, Pencil, Video } from "lucide-react"

import { ProfileEditDialog } from "@/components/dashboard/profile-edit-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProfilePage() {
  const { user } = useUser()
  const [editOpen, setEditOpen] = useState(false)

  // Route is protected by middleware, so `user` is set once signed in.
  if (!user) {
    return null
  }

  const name =
    user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Account"
  const email = user.primaryEmailAddress?.emailAddress ?? ""
  const initial =
    user.firstName?.[0] ??
    user.lastName?.[0] ??
    user.username?.[0] ??
    email?.[0]?.toUpperCase() ??
    "A"

  const isVerified = user.primaryEmailAddress?.verification.status === "verified"

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* Profile header */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Avatar size="lg" className="size-16 shrink-0">
              {user.hasImage ? <AvatarImage src={user.imageUrl} alt={name} /> : null}
              <AvatarFallback className="text-xl">{initial}</AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold">{name}</h1>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                <span className="truncate">{email}</span>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <BadgeCheck className="size-4 shrink-0" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-400">
                    <CircleAlert className="size-4 shrink-0" />
                    Not verified
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setEditOpen(true)}
            className="self-start sm:self-center"
          >
            <Pencil />
            Edit
          </Button>
        </CardContent>
      </Card>

      {/* Generated videos */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Your videos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-16 text-center">
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Video className="size-5 text-muted-foreground" />
            </div>
            <p className="text-base font-medium">No videos yet</p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Videos you generate will show up here. Start with a new project in the
              editor.
            </p>
          </div>
        </CardContent>
      </Card>

      <ProfileEditDialog open={editOpen} onOpenChange={setEditOpen} />
    </div>
  )
}
