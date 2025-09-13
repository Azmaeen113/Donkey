import { useEffect, useRef, useState } from 'react';
import { Shield, Lock, Users, Zap } from 'lucide-react';

const TokenomicsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    supply: 0,
    burned: 0,
    holders: 0
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counters
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const targets = {
      supply: 1000000000,
      burned: 0,
      holders: 0
    };

    Object.keys(targets).forEach((key) => {
      let start = 0;
      const target = targets[key as keyof typeof targets];
      const increment = target / 100;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: Math.floor(start)
        }));
      }, 20);
    });
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Taxes",
      description: "0% buy/sell taxes - pure community token",
      highlight: "0%"
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: "Ownership Renounced",
      description: "Contract ownership completely renounced",
      highlight: "100%"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Mint Frozen",
      description: "Token supply can never be increased",
      highlight: "FROZEN"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Fully community owned and operated",
      highlight: "COMMUNITY"
    }
  ];

  return (
    <section ref={sectionRef} id="tokenomics" className="py-20 relative bg-background/95 overflow-hidden">
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
            <h2 className={`text-4xl md:text-6xl font-black mb-6 text-gradient transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Tokenomics
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Simple, fair, and completely transparent tokenomics built for the community
            </p>
          </div>

          {/* Main Stats */}
          <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="card-glow text-center p-8">
              <div className="text-4xl md:text-5xl font-black text-primary mb-4">
                {counters.supply.toLocaleString()}
              </div>
              <h3 className="text-xl font-bold mb-2">Total Supply</h3>
              <p className="text-muted-foreground">1 Billion $DONKEY tokens</p>
            </div>
            
            <div className="card-premium text-center p-8 border-primary/50">
              <div className="text-4xl md:text-5xl font-black text-gold mb-4">
                100%
              </div>
              <h3 className="text-xl font-bold mb-2 text-gradient">Fair Launch</h3>
              <p className="text-muted-foreground">No pre-sale, no team allocation</p>
            </div>
            
            <div className="card-glow text-center p-8">
              <div className="text-4xl md:text-5xl font-black text-primary mb-4">
                0%
              </div>
              <h3 className="text-xl font-bold mb-2">Transaction Tax</h3>
              <p className="text-muted-foreground">Pure trading experience</p>
            </div>
          </div>

          {/* Security Features */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {features.map((feature, index) => (
              <div key={index} className="card-premium text-center p-6 hover:card-glow transition-all duration-300 group">
                <div className="text-primary mb-4 group-hover:text-gold transition-colors mx-auto w-fit">
                  {feature.icon}
                </div>
                <div className="text-lg font-bold text-primary mb-2">
                  {feature.highlight}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Distribution Chart */}
          <div className={`card-premium p-8 mt-16 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-2xl font-bold text-center mb-8 text-gradient">
              Token Distribution
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">100%</span>
                </div>
                <h4 className="font-bold mb-2">Public Supply</h4>
                <p className="text-muted-foreground text-sm">Available for trading on DEX</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">0%</span>
                </div>
                <h4 className="font-bold mb-2">Team Tokens</h4>
                <p className="text-muted-foreground text-sm">No team allocation whatsoever</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">0%</span>
                </div>
                <h4 className="font-bold mb-2">Marketing</h4>
                <p className="text-muted-foreground text-sm">Community-driven marketing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default TokenomicsSection;