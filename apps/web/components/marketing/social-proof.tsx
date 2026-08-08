import { MotionReveal } from "./motion-reveal";

const brands = ["CreatorCo", "Streamly", "Loop Media", "HypeHaus", "Pixelfeed", "VoxTalks"];

export function SocialProof() {
  return (
    <section className="border-y border-hairline py-12">
      <MotionReveal className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-body">
          Trusted by solo creators and content teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-lg font-semibold tracking-tight text-body transition hover:text-ink"
            >
              {brand}
            </span>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
