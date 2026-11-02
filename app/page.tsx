import { HeroSection } from "@/components/hero";
import { ShowcaseSection } from "@/components/showcase";
import { ServicesSection } from "@/components/services";

export default function Home() {
  return (
    <main className="w-full bg-transparent">
      <ShowcaseSection>
        <HeroSection />
      </ShowcaseSection>
      <ServicesSection />
    </main>
  );
}
