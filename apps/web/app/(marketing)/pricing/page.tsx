import { Pricing } from "../../../components/marketing/pricing";
import { Faq } from "../../../components/marketing/faq";
import { Cta } from "../../../components/marketing/cta";
import { SectionHeading } from "../../../components/marketing/section-heading";

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-8 sm:pt-40">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Pricing"
            title="Simple, usage-aware plans"
            description="Credits meter real AI usage — scripts cost a few credits, renders more. No surprise invoices, ever."
          />
        </div>
      </section>

      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
