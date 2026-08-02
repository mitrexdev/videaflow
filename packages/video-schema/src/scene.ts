import { z } from "zod";

export const SceneStatus = z.enum(["pending", "generating", "ready", "failed"]);
export type SceneStatus = z.infer<typeof SceneStatus>;

/**
 * A single visual scene.
 * Addressable row: per-scene regenerate/reorder/trim all target this record.
 */
export const Scene = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  position: z.number().int().min(0),
  narration: z.string().min(1),
  visualPrompt: z.string(),
  shotType: z.string().nullable().default(null),
  cameraInstruction: z.string().nullable().default(null),
  transition: z.string().default("cut"),
  durationMs: z.number().int().nonnegative().default(0),
  voiceoverAssetId: z.string().uuid().nullable().default(null),
  visualAssetId: z.string().uuid().nullable().default(null),
  status: SceneStatus.default("pending"),
  meta: z.record(z.string(), z.unknown()).default({}),
});
export type Scene = z.infer<typeof Scene>;

export const SceneCreate = Scene.pick({
  projectId: true,
  position: true,
  narration: true,
  visualPrompt: true,
});
export type SceneCreate = z.infer<typeof SceneCreate>;

export const SceneUpdate = Scene.partial().omit({
  id: true,
  projectId: true,
});
export type SceneUpdate = z.infer<typeof SceneUpdate>;
