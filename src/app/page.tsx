import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { CodeShowcase } from "@/components/CodeShowcase";
import { StatsBar } from "@/components/StatsBar";
import { DashboardPreview } from "@/components/DashboardPreview";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <CodeShowcase />
      <StatsBar />
      <DashboardPreview />
      <HowItWorks />
      <Footer />
    </>
  );
}
