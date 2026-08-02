import { use } from "react";

export default function EditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold text-white">Editor</h1>
      <p className="mt-2 text-slate-400">
        Project <code className="text-slate-300">{projectId}</code> — the
        scene-based editor lands in the next phase.
      </p>
    </main>
  );
}
