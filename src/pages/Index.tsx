import EditorialNav from "@/components/EditorialNav";
import HeroSection from "@/components/HeroSection";
import BrandMarquee from "@/components/BrandMarquee";
import EditorialGrid from "@/components/EditorialGrid";
import ZineFooter from "@/components/ZineFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <EditorialNav />
      <HeroSection />
      <BrandMarquee />
      <EditorialGrid />
      <ZineFooter />
    </div>
  );
};

export default Index;
