import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Wallet, ArrowRight, ExternalLink, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const HowToBuySection = () => {
  const { toast } = useToast();
  const [copiedStep, setCopiedStep] = useState<number | null>(null);
  
  const contractAddress = "ALWPdTS8K9KHnjbNmaHXrgS56AfFm8y1wBEBypmB1KS";

  const copyToClipboard = async (text: string, stepNumber: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepNumber);
      setTimeout(() => setCopiedStep(null), 2000);
      toast({
        title: "Copied!",
        description: "Address copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const steps = [
    {
      number: 1,
      title: "Get a Solana Wallet",
      description: "Download Phantom, Solflare, or any Solana-compatible wallet",
      action: "Download Phantom",
      link: "https://phantom.app",
      icon: <Wallet className="w-8 h-8" />
    },
    {
      number: 2,
      title: "Get Some SOL",
      description: "Buy SOL from an exchange and transfer to your wallet",
      action: "Buy SOL",
      icon: <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">S</div>
    },
    {
      number: 3,
      title: "Go to Raydium or Jupiter",
      description: "Open a Solana DEX in your browser",
      action: "Open Raydium",
      link: "https://raydium.io/swap",
      icon: <ExternalLink className="w-8 h-8" />
    },
    {
      number: 4,
      title: "Paste DONKEY Contract",
      description: "Use our contract address to find $DONKEY token",
      action: contractAddress,
      copyable: true,
      icon: <Copy className="w-8 h-8" />
    },
    {
      number: 5,
      title: "Swap SOL for $DONKEY",
      description: "Enter the amount and confirm the transaction",
      action: "Start Trading",
      icon: <ArrowRight className="w-8 h-8" />
    }
  ];

  return (
    <section id="how-to-buy" className="py-20 relative bg-card/30 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/energy.mp4" type="video/mp4" />
      </video>
      
      {/* Content Overlay */}
      <div className="relative z-10">
        <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6 text-gradient">
              How to Buy $DONKEY
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the swamp kingdom in just 5 simple steps. It's easier than you think!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={step.number} className="card-premium hover:card-glow transition-all duration-300 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>
                    
                    {step.copyable ? (
                      <Button
                        onClick={() => copyToClipboard(step.action, step.number)}
                        className="w-full justify-between text-left p-3 h-auto font-mono text-xs break-all"
                        variant="outline"
                      >
                        <span className="truncate">{step.action}</span>
                        {copiedStep === step.number ? (
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                        ) : (
                          <Copy className="w-4 h-4 shrink-0" />
                        )}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full btn-secondary"
                        {...(step.link && {
                          onClick: () => window.open(step.link, '_blank')
                        })}
                      >
                        {step.action}
                        {step.link && <ExternalLink className="ml-2 w-4 h-4" />}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Buy Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero text-lg px-8 py-4">
                Buy on Raydium
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
              <Button className="btn-outline text-lg px-8 py-4">
                Buy on Jupiter
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Always verify the contract address before trading
            </p>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default HowToBuySection;