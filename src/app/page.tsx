import { Hero } from "@/components/Hero";
import { HeroPromoVideo } from "@/components/HeroPromoVideo";
import { StoryProofSection } from "@/components/StoryProofSection";
import { HowItWorks } from "@/components/HowItWorks";
import { XaiProofSection } from "@/components/XaiProofSection";
import { BenchmarksSection } from "@/components/BenchmarksSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CodeShowcase } from "@/components/CodeShowcase";
import { DashboardPreview } from "@/components/DashboardPreview";
import { AugmentationStrip } from "@/components/AugmentationStrip";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroPromoVideo />
      <StoryProofSection />
      <XaiProofSection />
      <BenchmarksSection />
      <HowItWorks />
      <FeaturesSection />
      <CodeShowcase />
      <DashboardPreview />
      <AugmentationStrip />
      <StatsBar />
    </>
  );
}
