import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CodeShowcase } from "@/components/CodeShowcase";
import { DashboardPreview } from "@/components/DashboardPreview";
import { AugmentationStrip } from "@/components/AugmentationStrip";
import { StatsBar } from "@/components/StatsBar";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <FeaturesSection />
      <CodeShowcase />
      <DashboardPreview />
      <AugmentationStrip />
      <StatsBar />
    </>
  );
}
