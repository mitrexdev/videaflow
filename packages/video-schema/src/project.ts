import { z } from "zod";

/**
 * Project-level contract.
 * Mirrors the `projects` row in Postgres (services/api/app/models/content.py).
 * IDs are UUID strings; datetimes are ISO-8601 UTC strings.
 */
export const AspectRatio = z.enum(["16:9", "9:16", "1:1", "4:5"]);
export type AspectRatio = z.infer<typeof AspectRatio>;

export const ProjectStatus = z.enum([
  "draft",
  "scripting",
  "storyboard",
  "generating",
  "ready",
  "exporting",
  "published",
  "failed",
]);
export type ProjectStatus = z.infer<typeof ProjectStatus>;

export const Project = z.object({
  id: z.string().uuid(),
  orgId: z.string().uuid(),
  ownerUserId: z.string().uuid(),
  name: z.string().min(1).max(255),
  status: ProjectStatus.default("draft"),
  aspectRatio: AspectRatio.default("16:9"),
  fps: z.number().int().positive().default(30),
  durationMs: z.number().int().nonnegative().default(0),
  previewUrl: z.string().url().nullable().default(null),
  coverUrl: z.string().url().nullable().default(null),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Project = z.infer<typeof Project>;

export const ProjectCreate = Project.pick({
  name: true,
}).extend({
  aspectRatio: AspectRatio.optional(),
  status: ProjectStatus.optional(),
});
export type ProjectCreate = z.infer<typeof ProjectCreate>;

export const ProjectUpdate = Project.partial().omit({
  id: true,
  orgId: true,
  ownerUserId: true,
  createdAt: true,
  updatedAt: true,
});
export type ProjectUpdate = z.infer<typeof ProjectUpdate>;
