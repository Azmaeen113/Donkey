import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gradient">
            $DONKEY
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('how-to-buy')}
              className="text-foreground hover:text-primary transition-colors"
            >
              How to Buy
            </button>
            <button
              onClick={() => scrollToSection('photo-reaction')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Photo Reactions
            </button>
            <button
              onClick={() => scrollToSection('tokenomics')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Tokenomics
            </button>
            <button
              onClick={() => scrollToSection('roadmap')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Roadmap
            </button>
          </div>

          <Button className="btn-hero">
            Buy $DONKEY
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;