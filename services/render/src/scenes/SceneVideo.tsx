import type { Scene } from "@videaflow/video-schema";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * One scene: clean typographic treatment on a dark gradient with a subtle
 * zoom-in. Image/video backdrops + animated captions land in Phase 2.
 */
export const SceneVideo: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, 12, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.04]);

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0b0f19", justifyContent: "center", alignItems: "center" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 30%, #1e293b 0%, #0b0f19 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          opacity,
          transform: `scale(${scale})`,
          padding: 80,
          maxWidth: 1500,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#f8fafc",
            fontSize: 54,
            lineHeight: 1.35,
            fontFamily: "system-ui, sans-serif",
            margin: 0,
            textShadow: "0 2px 24px rgba(0,0,0,0.6)",
          }}
        >
          {scene.narration}
        </p>
      </div>
    </AbsoluteFill>
  );
};
