import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import HowToBuySection from '@/components/HowToBuySection';
import PhotoReactionSection from '@/components/PhotoReactionSection';
import TokenomicsSection from '@/components/TokenomicsSection';
import RoadmapSection from '@/components/RoadmapSection';
import DisclaimerSection from '@/components/DisclaimerSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <HowToBuySection />
        <PhotoReactionSection />
        <TokenomicsSection />
        <RoadmapSection />
        <DisclaimerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
