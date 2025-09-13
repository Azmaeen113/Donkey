import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border bg-card/50 backdrop-blur-sm overflow-hidden relative">
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
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="text-3xl font-bold text-gradient mb-4">
                $DONKEY
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Straight outta the swamp, the most unstoppable memecoin in existence. 
                Join the loudest community in crypto!
              </p>
              <div className="flex gap-4">
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Telegram
                </button>
                <button className="text-muted-foreground hover:text-primary transition-colors">
                  Discord
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => document.getElementById('how-to-buy')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  How to Buy
                </button>
                <button 
                  onClick={() => document.getElementById('photo-reaction')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Photo Reactions
                </button>
                <button 
                  onClick={() => document.getElementById('tokenomics')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Tokenomics
                </button>
                <button 
                  onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Roadmap
                </button>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <div className="space-y-2">
                <button className="block text-muted-foreground hover:text-primary transition-colors">
                  Chart
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors">
                  Buy on Raydium
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors">
                  Buy on Jupiter
                </button>
                <button className="block text-muted-foreground hover:text-primary transition-colors">
                  Community
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-muted-foreground text-sm">
                © {currentYear} DONKEY COIN. All rights reserved.
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>by the swamp community</span>
              </div>
            </div>
            
            <div className="mt-4 text-center text-xs text-muted-foreground">
              Contract: ALWPdTS8K9KHnjbNmaHXrgS56AfFm8y1wBEBypmB1KS
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;