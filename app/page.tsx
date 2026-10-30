import { HeroSection } from "@/components/home/HeroSection";
import { ProductPortfolio } from "@/components/home/ProductPortfolio";
import { RetailHighlightsSection } from "@/components/home/RetailHighlightsSection";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductPortfolio />
      <RetailHighlightsSection />
      <ContactCTA />
    </>
  );
}
