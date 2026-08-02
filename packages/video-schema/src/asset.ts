import { z } from "zod";

export const AssetKind = z.enum([
  "image",
  "video",
  "audio",
  "voiceover",
  "music",
  "sfx",
  "subtitle",
  "thumbnail",
  "font",
]);
export type AssetKind = z.infer<typeof AssetKind>;

export const AssetOwnerType = z.enum(["user", "ai", "music", "template"]);
export type AssetOwnerType = z.infer<typeof AssetOwnerType>;

export const AssetStatus = z.enum(["pending", "processing", "ready", "failed"]);
export type AssetStatus = z.infer<typeof AssetStatus>;

/**
 * Unified asset record — AI outputs and user uploads share this model,
 * which is what makes the media library cross-project reuse trivial.
 */
export const Asset = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid().nullable().default(null),
  ownerType: AssetOwnerType.default("ai"),
  kind: AssetKind,
  storageKey: z.string().nullable().default(null),
  url: z.string().url().nullable().default(null),
  mime: z.string().nullable().default(null),
  sizeBytes: z.number().int().nonnegative().nullable().default(null),
  width: z.number().int().nullable().default(null),
  height: z.number().int().nullable().default(null),
  durationMs: z.number().int().nullable().default(null),
  checksum: z.string().nullable().default(null),
  aiParams: z.record(z.string(), z.unknown()).default({}),
  provider: z.string().nullable().default(null),
  status: AssetStatus.default("pending"),
  createdAt: z.string().datetime(),
});
export type Asset = z.infer<typeof Asset>;

export const AssetCreate = Asset.pick({
  projectId: true,
  ownerType: true,
  kind: true,
}).partial();
export type AssetCreate = z.infer<typeof AssetCreate>;
