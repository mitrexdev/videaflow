"use client"

import { useEffect, useRef, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Camera, Loader2 } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

/**
 * Popup for updating the current user's profile picture and name.
 * Saves the image via Clerk's setProfileImage and the name via user.update().
 */
export function ProfileEditDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { user } = useUser()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Prefill fresh values every time the dialog opens.
  useEffect(() => {
    if (open && user) {
      setFirstName(user.firstName ?? "")
      setLastName(user.lastName ?? "")
      setImageFile(null)
      setPreviewUrl(null)
      setError(null)
    }
  }, [open, user])

  if (!user) {
    return null
  }

  const name =
    user.fullName || user.username || user.primaryEmailAddress?.emailAddress || "Account"
  const initial =
    user.firstName?.[0] ??
    user.lastName?.[0] ??
    user.username?.[0] ??
    user.primaryEmailAddress?.emailAddress?.[0]?.toUpperCase() ??
    "A"

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) {
      return
    }
    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      if (imageFile) {
        await user.setProfileImage({ file: imageFile })
      }
      await user.update({
        firstName: firstName.trim() || null,
        lastName: lastName.trim() || null,
      })
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update your profile.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>Update your profile picture and name.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Profile picture */}
          <div className="flex items-center gap-4">
            <Avatar size="lg" className="size-16 shrink-0">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt="Profile picture preview" />
              ) : user.hasImage ? (
                <AvatarImage src={user.imageUrl} alt={name} />
              ) : null}
              <AvatarFallback className="text-xl">{initial}</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera />
                Change picture
              </Button>
              {imageFile ? (
                <p className="text-xs text-muted-foreground">
                  New image ready — save to apply.
                </p>
              ) : null}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="first-name">First name</Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last-name">Last name</Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="animate-spin" /> : null}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
