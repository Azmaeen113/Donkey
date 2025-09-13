import { useEffect, useRef, useState } from 'react';

const AboutSection = () => {
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

  return (
    <section ref={sectionRef} id="about" className="py-20 relative bg-background/95 overflow-hidden">
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-6xl font-black mb-12 text-gradient transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Meet the Swamp King
          </h2>

          <div className={`grid md:grid-cols-3 gap-8 mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="card-glow text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">🐕</div>
              <h3 className="text-xl font-bold mb-2">Dogs had their run</h3>
              <p className="text-muted-foreground">The era of dog coins dominated crypto</p>
            </div>
            
            <div className="card-glow text-center p-6">
              <div className="text-3xl font-bold text-primary mb-2">🐸</div>
              <h3 className="text-xl font-bold mb-2">Frogs had their crown</h3>
              <p className="text-muted-foreground">Pepe ruled the meme kingdom</p>
            </div>
            
            <div className="card-premium text-center p-6 border-primary/50">
              <div className="text-3xl font-bold text-gold mb-2">👑</div>
              <h3 className="text-xl font-bold mb-2 text-gradient">Now it's DONKEY's time</h3>
              <p className="text-muted-foreground">The loudest voice rises</p>
            </div>
          </div>

          <div className={`card-premium p-8 md:p-12 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              The swamp has a new king — and he won't shut up about it. <span className="text-gradient font-bold">Donkey Coin</span> isn't just another memecoin; it's the voice of the people, the loudest sidekick in crypto, and the most loveable character to ever touch the blockchain.
            </p>
            <br />
            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              Dogs had their run. Frogs had their crown. But now it's <span className="text-gradient font-bold">Donkey's time to shine</span> — loud, funny, unstoppable, and built to moon.
            </p>
          </div>

          {/* Stats Section */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Community Owned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">0%</div>
              <div className="text-muted-foreground">Taxes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Memes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-primary mb-2">🌙</div>
              <div className="text-muted-foreground">Destination</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default AboutSection;