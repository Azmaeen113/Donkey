import { useEffect, useRef, useState } from 'react';
import { Check, Target, Rocket } from 'lucide-react';

const RoadmapSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const phases = [
    {
      phase: 1,
      title: "Meme",
      status: "completed",
      description: "Launch the loudest memecoin in existence",
      details: [
        "Create the DONKEY character",
        "Launch on Solana",
        "Build initial community",
        "Establish social presence"
      ],
      icon: <Check className="w-6 h-6" />
    },
    {
      phase: 2,
      title: "Vibe and HODL",
      status: "current",
      description: "Build the strongest diamond-handed community",
      details: [
        "Grow community to 10k+ holders",
        "Develop meme culture",
        "Create viral content",
        "Establish as top Solana meme"
      ],
      icon: <Target className="w-6 h-6" />
    },
    {
      phase: 3,
      title: "DONKEY Takeover",
      status: "future",
      description: "Become the undisputed king of memecoins",
      details: [
        "Major exchange listings",
        "Celebrity endorsements",
        "Global meme domination",
        "Moon mission complete"
      ],
      icon: <Rocket className="w-6 h-6" />
    }
  ];

  const getPhaseStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-primary bg-primary/10';
      case 'current':
        return 'border-gold bg-gold/10 animate-pulse-glow';
      case 'future':
        return 'border-muted bg-muted/10';
      default:
        return 'border-muted';
    }
  };

  const getIconStyle = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-primary text-primary-foreground';
      case 'current':
        return 'bg-gold text-primary-foreground';
      case 'future':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted';
    }
  };

  return (
    <section ref={sectionRef} id="roadmap" className="py-20 relative bg-card/30 overflow-hidden">
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
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-6xl font-black mb-6 text-gradient transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Roadmap
            </h2>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Three simple phases to total memecoin domination
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-gold to-muted transform -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {phases.map((phase, index) => (
                <div
                  key={phase.phase}
                  className={`transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 300}ms` }}
                >
                  <div className={`card-premium p-8 ${getPhaseStyle(phase.status)} transition-all duration-300 hover:scale-105`}>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      {/* Phase Number & Icon */}
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full ${getIconStyle(phase.status)} flex items-center justify-center transition-all duration-300`}>
                          {phase.icon}
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-sm font-bold text-muted-foreground">
                            Phase {phase.phase}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl font-black mb-2 text-gradient">
                          {phase.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-4">
                          {phase.description}
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-2">
                          {phase.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex items-center gap-2 text-sm"
                            >
                              <div className={`w-2 h-2 rounded-full ${
                                phase.status === 'completed' ? 'bg-primary' :
                                phase.status === 'current' ? 'bg-gold' : 'bg-muted'
                              }`} />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex-shrink-0">
                        <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                          phase.status === 'completed' ? 'bg-primary text-primary-foreground' :
                          phase.status === 'current' ? 'bg-gold text-primary-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {phase.status === 'completed' ? 'Completed' :
                           phase.status === 'current' ? 'In Progress' : 'Coming Soon'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="card-glow p-8">
              <h3 className="text-2xl font-bold mb-4 text-gradient">
                Ready to Join the Swamp Revolution?
              </h3>
              <p className="text-muted-foreground mb-6">
                The journey to the moon starts with a single hop... or in our case, a single bray!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-hero">
                  Buy $DONKEY Now
                </button>
                <button className="btn-outline">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default RoadmapSection;