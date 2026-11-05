import { SiteFooter } from "@/components/shared/site-footer";
import { AboutSection } from "@/modules/about/components/about-section";
import { ActivitiesSection } from "@/modules/catalog/components/activities-section";
import { ProductsSection } from "@/modules/catalog/components/products-section";
import { HeroSection } from "@/modules/landing/components/hero-section";
import { RentalStepsSection } from "@/modules/landing/components/rental-steps-section";

export default function HomePage() {
  return (
    <div className="site">
      <main>
        <HeroSection />
        <ProductsSection />
        <ActivitiesSection />
        <RentalStepsSection />
        <AboutSection />
      </main>
      <SiteFooter />
    </div>
  );
}
