import { AlertTriangle } from 'lucide-react';

const DisclaimerSection = () => {
  return (
    <section id="disclaimer" className="py-20 border-t border-border bg-background/95 overflow-hidden relative">
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
        <div className="max-w-4xl mx-auto">
          <div className="card-premium p-8 md:p-12">
            <div className="flex items-center gap-4 mb-8">
              <AlertTriangle className="w-8 h-8 text-gold" />
              <h2 className="text-3xl font-bold text-gradient">
                Important Disclaimer
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="mb-6 leading-relaxed">
                <strong className="text-foreground">$DONKEY</strong> has no association with DreamWorks, Shrek, or the character Donkey. This token is simply paying homage to one of the most beloved and hilarious sidekicks in meme culture.
              </p>
              
              <p className="mb-6 leading-relaxed">
                <strong className="text-foreground">$DONKEY</strong> is a meme coin with no intrinsic value or expectation of financial return. There is no formal team, no roadmap promises, and no guarantees. The coin exists purely for entertainment and community fun.
              </p>
              
              <p className="mb-6 leading-relaxed">
                Cryptocurrency investments are highly speculative and volatile. You should never invest more than you can afford to lose. Always do your own research and consult with financial advisors before making any investment decisions.
              </p>
              
              <p className="leading-relaxed">
                By purchasing <strong className="text-foreground">$DONKEY</strong>, you acknowledge that you understand the risks involved and that this is purely a community-driven meme token created for entertainment purposes.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">🎭</div>
                  <div className="font-bold mb-1">Entertainment Only</div>
                  <div className="text-sm text-muted-foreground">Pure meme culture</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">⚠️</div>
                  <div className="font-bold mb-1">High Risk</div>
                  <div className="text-sm text-muted-foreground">Invest responsibly</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">🤝</div>
                  <div className="font-bold mb-1">Community Driven</div>
                  <div className="text-sm text-muted-foreground">No official team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;