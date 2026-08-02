import { z } from "zod";

export const ScriptSource = z.enum(["user", "ai", "repurposed"]);
export type ScriptSource = z.infer<typeof ScriptSource>;

export const ScriptRevision = z.object({
  content: z.string(),
  createdAt: z.string().datetime(),
});
export type ScriptRevision = z.infer<typeof ScriptRevision>;

export const Script = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  source: ScriptSource.default("user"),
  content: z.string(),
  revisions: z.array(ScriptRevision).default([]),
  modelUsed: z.string().nullable().default(null),
  createdAt: z.string().datetime(),
});
export type Script = z.infer<typeof Script>;

export const ScriptCreate = Script.pick({
  projectId: true,
  source: true,
  content: true,
});
export type ScriptCreate = z.infer<typeof ScriptCreate>;
