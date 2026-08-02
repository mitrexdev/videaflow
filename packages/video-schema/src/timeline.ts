import { z } from "zod";

export const LayerType = z.enum(["video", "audio", "text", "image", "subtitle", "music"]);
export type LayerType = z.infer<typeof LayerType>;

export const TimelineLayer = z.object({
  id: z.string().uuid(),
  track: z.number().int().min(0),
  layerType: LayerType,
  startMs: z.number().int().min(0),
  endMs: z.number().int().min(0),
  assetId: z.string().uuid().nullable().default(null),
  text: z.string().nullable().default(null),
  effects: z.record(z.string(), z.unknown()).default({}),
  locked: z.boolean().default(false),
});
export type TimelineLayer = z.infer<typeof TimelineLayer>;

export const Timeline = z.object({
  projectId: z.string().uuid(),
  durationMs: z.number().int().nonnegative().default(0),
  layers: z.array(TimelineLayer).default([]),
});
export type Timeline = z.infer<typeof Timeline>;
