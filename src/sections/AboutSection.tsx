import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Set initial state - position children for entrance animation
    gsap.set(image, { x: -80, opacity: 0 });
    gsap.set(content.children, { y: 40, opacity: 0 });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // ENTRANCE (0% - 30%)
    scrollTl.fromTo(image,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.2, ease: 'none' },
      0.05
    );

    scrollTl.fromTo(content.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.15, ease: 'none' },
      0.1
    );

    // SETTLE (30% - 70%) - content stays visible

    // EXIT (70% - 100%)
    scrollTl.to(image,
      { x: -60, opacity: 0, duration: 0.2, ease: 'power2.in' },
      0.7
    );

    scrollTl.to(content.children,
      { y: -30, opacity: 0, stagger: 0.02, duration: 0.15, ease: 'power2.in' },
      0.7
    );

    // Store trigger reference
    if (scrollTl.scrollTrigger) {
      triggerRef.current = scrollTl.scrollTrigger;
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, [isMobile]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${isMobile ? 'py-16' : 'section-pinned'} flex items-center relative`}
      style={{ zIndex: 20, background: 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/yoga_primary.webp"
                alt="Yoga Practice"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/50 to-transparent" />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-xs">
              <p className="text-[#FF9933] text-3xl font-bold mb-1">10+</p>
              <p className="text-gray-400 text-sm">Years of Teaching Excellence</p>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <p className="text-[#FF9933] text-sm tracking-[0.2em] uppercase mb-4">
              About Our Studio
            </p>

            <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
              Your Journey to
              <span className="gradient-text block">Inner Peace</span>
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Nestled in the serene Muralidhar Colony of Hanuman Nagar, Belagavi, 
              Kishan & Prasad Yoga Studio has been a sanctuary for yoga enthusiasts 
              for over a decade. Our approach combines traditional yogic wisdom with 
              modern understanding of body mechanics.
            </p>

            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you are a beginner taking your first steps on the mat or an 
              experienced practitioner seeking deeper knowledge, our certified 
              instructors guide you through a transformative journey of self-discovery.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: '🧘', title: 'Traditional Yoga', desc: 'Authentic Hatha & Ashtanga' },
                { icon: '✨', title: 'Expert Guidance', desc: 'Certified Instructors' },
                { icon: '🏠', title: 'Peaceful Space', desc: 'Serene Studio Environment' },
                { icon: '📅', title: 'Flexible Timing', desc: 'Morning & Evening Batches' },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="yantra" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#FF9933" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="#C1440E" strokeWidth="0.5" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#FF9933" strokeWidth="0.3" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#FF9933" strokeWidth="0.3" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#yantra)" />
        </svg>
      </div>
    </section>
  );
}
