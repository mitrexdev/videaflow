import { MotionReveal } from "./motion-reveal";

const brands = ["CreatorCo", "Streamly", "Loop Media", "HypeHaus", "Pixelfeed", "VoxTalks"];

export function SocialProof() {
  return (
    <section className="border-y border-white/5 py-12">
      <MotionReveal className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-slate-500">
          Trusted by solo creators and content teams at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-lg font-semibold tracking-tight text-slate-600 transition hover:text-slate-400"
            >
              {brand}
            </span>
          ))}
        </div>
      </MotionReveal>
    </section>
  );
}
