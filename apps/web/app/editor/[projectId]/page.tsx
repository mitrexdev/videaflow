import { use } from "react";

export default function EditorPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = use(params);
  return (
    <main className="p-8">
      <h1 className="font-heading text-2xl font-normal text-ink">Editor</h1>
      <p className="mt-2 text-body">
        Project <code className="text-ink">{projectId}</code> — the
        scene-based editor lands in the next phase.
      </p>
    </main>
  );
}
