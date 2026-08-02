import { Composition } from "remotion";
import { ProjectVideo } from "./scenes/ProjectVideo";
import { SceneVideo } from "./scenes/SceneVideo";

const DEFAULT_SCENE = {
  id: "00000000-0000-0000-0000-000000000000",
  projectId: "00000000-0000-0000-0000-000000000000",
  position: 0,
  narration: "This is a preview scene. Connect a real project to render it.",
  visualPrompt: "",
  shotType: null,
  cameraInstruction: null,
  transition: "cut",
  durationMs: 5000,
  voiceoverAssetId: null,
  visualAssetId: null,
  status: "ready",
  meta: {},
} as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Scene"
        component={SceneVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ scene: DEFAULT_SCENE }}
      />
      <Composition
        id="Project"
        component={ProjectVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ scenes: [DEFAULT_SCENE] }}
      />
    </>
  );
};
