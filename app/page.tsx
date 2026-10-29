import { HeroSection } from "@/components/home/HeroSection";
import { ProductPortfolio } from "@/components/home/ProductPortfolio";
import { FeaturedProductShowcase } from "@/components/home/FeaturedProductShowcase";
import { SolutionsSection } from "@/components/home/SolutionsSection";
import { DifferentiatorsSection } from "@/components/home/DifferentiatorsSection";
import { ContactCTA } from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductPortfolio />
      <FeaturedProductShowcase />
      <SolutionsSection />
      <DifferentiatorsSection />
      <ContactCTA />
    </>
  );
}
