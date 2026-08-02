import type { Scene } from "@videaflow/video-schema";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { SceneVideo } from "./SceneVideo";

/**
 * Renders a list of scenes back-to-back on one timeline.
 * Scene frame counts are derived from scene.durationMs — the source of truth
 * is the actual voiceover audio length, set server-side after TTS.
 */
export const ProjectVideo: React.FC<{ scenes: Scene[] }> = ({ scenes }) => {
  const { fps } = useVideoConfig();

  const segments = scenes.map((scene) => ({
    scene,
    frames: Math.max(1, Math.round(((scene.durationMs ?? 4000) / 1000) * fps)),
  }));

  let cursor = 0;

  return (
    <AbsoluteFill>
      {segments.map((segment, index) => {
        const start = cursor;
        cursor += segment.frames;
        return (
          <Sequence
            key={segment.scene.id ?? index}
            from={start}
            durationInFrames={segment.frames}
            name={`Scene ${index + 1}`}
          >
            <SceneVideo scene={segment.scene} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
