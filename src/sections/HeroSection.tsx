import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const kishanRef = useRef<HTMLSpanElement>(null);
  const ampersandRef = useRef<HTMLSpanElement>(null);
  const prasadRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);
  const trustBarRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const kishan = kishanRef.current;
    const ampersand = ampersandRef.current;
    const prasad = prasadRef.current;
    const subtitle = subtitleRef.current;
    const location = locationRef.current;
    const trustBar = trustBarRef.current;
    const cta = ctaRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!section || !kishan || !ampersand || !prasad || !subtitle || !location || !trustBar || !cta || !scrollIndicator) return;

    // Scroll-driven exit animation (content is visible by default via CSS)
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=80%',
        pin: true,
        scrub: 0.8,
        onLeaveBack: () => {
          gsap.to([kishan, ampersand, prasad, subtitle, location, trustBar, cta, scrollIndicator], { 
            opacity: 1, y: 0, scale: 1, duration: 0.3 
          });
        },
      },
    });

    scrollTl
      .to([kishan, ampersand, prasad], {
        opacity: 0,
        y: -60,
        ease: 'power2.in',
      })
      .to(subtitle, { opacity: 0, y: -30, ease: 'power2.in' }, '<')
      .to(location, { opacity: 0, ease: 'power2.in' }, '<')
      .to(trustBar, { opacity: 0, y: 30, ease: 'power2.in' }, '<')
      .to(cta, { opacity: 0, y: 20, ease: 'power2.in' }, '<')
      .to(scrollIndicator, { opacity: 0, ease: 'power2.in' }, '<');

    // Store trigger reference for cleanup
    if (scrollTl.scrollTrigger) {
      triggersRef.current.push(scrollTl.scrollTrigger);
    }

    return () => {
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="section-pinned flex flex-col items-center justify-center relative"
      style={{ zIndex: 10 }}
    >
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          <span 
            ref={kishanRef}
            className="inline-block gradient-text"
          >
            KISHAN
          </span>
          <span 
            ref={ampersandRef}
            className="inline-block mx-2 md:mx-4"
            style={{ color: '#B87333' }}
          >
            &
          </span>
          <span 
            ref={prasadRef}
            className="inline-block gradient-text"
          >
            PRASAD
          </span>
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-4">
          <p className="text-xl md:text-2xl tracking-[0.3em] uppercase" style={{ color: '#FF9933' }}>
            Yoga Studio
          </p>
        </div>

        {/* Location */}
        <p 
          ref={locationRef}
          className="text-sm md:text-base tracking-wider mb-8"
          style={{ color: '#888' }}
        >
          Muralidhar Colony, Hanuman Nagar, Belagavi, Karnataka
        </p>

        {/* Trust Bar */}
        <div ref={trustBarRef} className="trust-bar mb-8">
          <span style={{ color: '#FF9933' }}>★ 4.6 Google Reviews</span>
          <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
          <span>10+ Years Experience</span>
          <span className="w-1 h-1 rounded-full bg-[#FF9933]" />
          <span style={{ color: '#C1440E' }}>+91 95386 65107</span>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#classes" 
            className="magnetic-btn primary"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector('#classes');
              if (element) {
                const trigger = ScrollTrigger.getAll().find(st => st.trigger === element);
                if (trigger) {
                  window.scrollTo({ top: trigger.start, behavior: 'smooth' });
                } else {
                  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
              }
            }}
          >
            Explore Classes
          </a>
          <a href="tel:+919538665107" className="magnetic-btn">
            Call Now
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#666' }}>
          Scroll
        </span>
        <div className="w-[1px] h-12 relative overflow-hidden" style={{ background: '#333' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '30%',
              background: 'linear-gradient(180deg, #FF9933, #C1440E)',
              animation: 'scrollLine 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-white/[0.03]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-white/[0.02]" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(250%); }
          100% { transform: translateY(250%); }
        }
      `}</style>
    </section>
  );
}
