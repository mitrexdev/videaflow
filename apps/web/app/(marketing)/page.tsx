import { SocialProof } from "../../components/marketing/social-proof";
import { Hero } from "../../components/marketing/hero";
import { HowItWorks } from "../../components/marketing/how-it-works";
import { Features } from "../../components/marketing/features";
import { Showcase } from "../../components/marketing/showcase";
import { Testimonials } from "../../components/marketing/testimonials";
import { Pricing } from "../../components/marketing/pricing";
import { Faq } from "../../components/marketing/faq";
import { Cta } from "../../components/marketing/cta";

export default function MarketingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <HowItWorks />
      <Features />
      <Showcase />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
    </>
  );
}
