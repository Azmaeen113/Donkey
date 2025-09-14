import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Using public/main.jpg instead of imported asset

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
    <section id="hero" className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
              <span className="text-gradient">$DONKEY</span>
              <br />
              <span className="text-glow">COIN</span>
            </h1>
            
            <div className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 h-12 sm:h-16 overflow-hidden">
              <p className="text-muted-foreground">
                {animatedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button 
                className="btn-hero text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                onClick={() => window.open('https://raydium.io/swap/?inputMint=sol&outputMint=ALWPdTS8K9KHnjbNmaHXrgS56AfFm8y1wBEBypmB1KS', '_blank')}
              >
                Buy Now
                <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                className="btn-outline text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                onClick={() => window.open('https://dexscreener.com/solana/9fyq5tznx33ay6epr6dscpksxtzdjzwtye4csxpczlgl', '_blank')}
              >
                View Chart
              </Button>
            </div>

            {/* Contract Address */}
            <div className="card-premium p-3 sm:p-4 mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">Contract Address:</p>
              <div className="flex items-center gap-2">
                <code className="text-xs sm:text-sm font-mono break-all text-primary">
                  {contractAddress}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyToClipboard}
                  className="shrink-0 h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
                onClick={() => window.open('https://t.me/enterdonkey', '_blank')}
              >
                Telegram
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hover:text-primary text-xs sm:text-sm px-2 sm:px-3"
                onClick={() => window.open('https://jup.ag/', '_blank')}
              >
                Jupiter
              </Button>
            </div>
          </div>

          {/* Right Content - Donkey Image */}
          <div className="relative animate-float">
            <div className="relative">
              <img
                src="/main.jpg"
                alt="DONKEY COIN - The Swamp King"
                className="w-full max-w-lg mx-auto animate-pulse-glow rounded-2xl h-[70%] object-cover scale-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;