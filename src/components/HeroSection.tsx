import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import donkeyHero from '@/assets/donkey-hero.png';

const HeroSection = () => {
  const { toast } = useToast();
  const [animatedText, setAnimatedText] = useState('');
  const fullText = "Straight outta the swamp, the most unstoppable memecoin in existence.";

  const contractAddress = "ALWPdTS8K9KHnjbNmaHXrgS56AfFm8y1wBEBypmB1KS";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setAnimatedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-gradient">$DONKEY</span>
              <br />
              <span className="text-glow">COIN</span>
            </h1>
            
            <div className="text-xl md:text-2xl mb-8 h-16 overflow-hidden">
              <p className="text-muted-foreground">
                {animatedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-hero">
                Buy Now
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <Button className="btn-outline">
                View Chart
              </Button>
            </div>

            {/* Contract Address */}
            <div className="card-premium p-4 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Contract Address:</p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono break-all text-primary">
                  {contractAddress}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <Button variant="ghost" size="sm" className="hover:text-primary">
                Twitter
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                Telegram
              </Button>
              <Button variant="ghost" size="sm" className="hover:text-primary">
                Discord
              </Button>
            </div>
          </div>

          {/* Right Content - Donkey Image */}
          <div className="relative animate-float">
            <div className="relative">
              <img
                src={donkeyHero}
                alt="DONKEY COIN - The Swamp King"
                className="w-full max-w-lg mx-auto animate-pulse-glow rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;