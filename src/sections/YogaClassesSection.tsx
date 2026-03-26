import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const yogaClasses = [
  {
    id: 1,
    name: 'Hatha Yoga',
    description: 'The foundation of all yoga styles. Focus on basic postures, breathing techniques, and relaxation.',
    duration: '60 min',
    level: 'All Levels',
    benefits: ['Improves flexibility', 'Reduces stress', 'Builds strength'],
    image: '/images/yoga_primary.webp',
  },
  {
    id: 2,
    name: 'Power Yoga',
    description: 'A dynamic, fitness-based approach to vinyasa yoga. Build strength, flexibility, and endurance.',
    duration: '75 min',
    level: 'Intermediate',
    benefits: ['Burns calories', 'Builds muscle', 'Increases stamina'],
    image: '/images/yoga_warrior.webp',
  },
  {
    id: 3,
    name: 'Meditation & Pranayama',
    description: 'Learn ancient breathing techniques and meditation practices to calm the mind.',
    duration: '45 min',
    level: 'All Levels',
    benefits: ['Mental clarity', 'Stress relief', 'Better sleep'],
    image: '/images/yoga_secondary.webp',
  },
  {
    id: 4,
    name: 'Kids Yoga',
    description: 'Fun and engaging yoga sessions designed specifically for children.',
    duration: '45 min',
    level: 'Ages 5-12',
    benefits: ['Improves focus', 'Builds confidence', 'Fun activity'],
    image: '/images/instructor_priya.webp',
  },
];

const otherActivities = [
  { name: 'Acrobatics', desc: 'Advanced tumbling & aerial arts' },
  { name: 'Dance', desc: 'Contemporary & classical fusion' },
];

export default function YogaClassesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const heading = headingRef.current;

    if (!section || !track || !heading) return;

    // Calculate scroll distance
    const trackWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = trackWidth - viewportWidth;

    // Set initial states - position children for entrance animation
    gsap.set(heading, { y: -40, opacity: 0 });
    gsap.set(track, { x: 0 });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${Math.max(scrollDistance * 1.2, 800)}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
      },
    });

    // ENTRANCE (0% - 15%)
    scrollTl.fromTo(heading,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.1, ease: 'none' },
      0.05
    );

    // HORIZONTAL SCROLL (15% - 75%)
    scrollTl.fromTo(track,
      { x: 0 },
      { x: -scrollDistance, duration: 0.6, ease: 'none' },
      0.15
    );

    // EXIT (75% - 100%)
    scrollTl.to(heading,
      { opacity: 0, y: -20, duration: 0.1, ease: 'power2.in' },
      0.8
    );

    scrollTl.to(track,
      { opacity: 0, scale: 0.98, duration: 0.1, ease: 'power2.in' },
      0.82
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
      id="classes"
      ref={sectionRef}
      className={`${isMobile ? 'py-16' : 'section-pinned overflow-hidden'} flex flex-col relative`}
      style={{ zIndex: 30, background: '#0D0D0D' }}
    >
      {/* Heading */}
      <div
        ref={headingRef}
        className={isMobile ? 'px-4 mb-8' : 'absolute top-12 left-8 md:left-16 z-20'}
      >
        <p className="text-[#FF9933] text-sm tracking-[0.2em] uppercase mb-2">
          Our Offerings
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white">
          Yoga <span className="gradient-text">Classes</span>
        </h2>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className={isMobile
          ? 'flex flex-col gap-6 px-4'
          : 'horizontal-scroll-track absolute top-0 left-0 h-full flex items-center pt-24'}
        style={isMobile ? undefined : { display: 'flex', gap: '5vw', padding: '0 10vw', height: '100%', alignItems: 'center' }}
      >
        {yogaClasses.map((yogaClass, index) => (
          <div
            key={yogaClass.id}
            className={`${isMobile ? 'w-full' : 'flex-shrink-0 w-[80vw] md:w-[50vw] h-[70vh]'} relative rounded-2xl overflow-hidden group`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {isMobile ? (
              /* Mobile: stacked layout */
              <>
                {/* Header row */}
                <div className="flex items-center justify-between p-4 pb-0">
                  <div className="text-white/20 text-4xl font-light">0{index + 1}</div>
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: 'rgba(255, 153, 51, 0.2)', color: '#FF9933', border: '1px solid rgba(255, 153, 51, 0.3)' }}
                  >
                    {yogaClass.level}
                  </div>
                </div>

                {/* Image */}
                <div className="w-full h-48 flex items-center justify-center p-4">
                  <img
                    src={yogaClass.image}
                    alt={yogaClass.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-lg"
                  />
                </div>

                {/* Content */}
                <div className="p-4 pt-0">
                  <span className="text-xs text-gray-500 tracking-wider uppercase">{yogaClass.duration}</span>
                  <h3 className="font-display text-2xl text-white mt-2 mb-2">{yogaClass.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{yogaClass.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {yogaClass.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400">{benefit}</span>
                    ))}
                  </div>
                  <a
                    href="https://wa.me/919538665107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9933] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Enquire Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              /* Desktop: absolute positioned layout */
              <>
                {/* Number */}
                <div className="absolute top-6 left-6 text-white/20 text-5xl font-light">
                  0{index + 1}
                </div>

                {/* Level Badge */}
                <div 
                  className="absolute top-6 right-6 px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(255, 153, 51, 0.2)', color: '#FF9933', border: '1px solid rgba(255, 153, 51, 0.3)' }}
                >
                  {yogaClass.level}
                </div>

                {/* Image */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[80%] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <img
                    src={yogaClass.image}
                    alt={yogaClass.name}
                    className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-8 w-1/2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs text-gray-500 tracking-wider uppercase">
                      {yogaClass.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-white mb-3">
                    {yogaClass.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {yogaClass.description}
                  </p>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {yogaClass.benefits.map((benefit, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <a
                    href="https://wa.me/919538665107"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF9933] text-sm font-medium hover:underline inline-flex items-center gap-1"
                  >
                    Enquire Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255, 153, 51, 0.1) 0%, transparent 70%)' }}
                />
              </>
            )}
          </div>
        ))}

        {/* Other Activities Card */}
        <div
          className={`${isMobile ? 'w-full py-8' : 'flex-shrink-0 w-[80vw] md:w-[35vw] h-[70vh]'} flex flex-col items-center justify-center p-12`}
        >
          <p className="text-gray-400 text-center mb-8">Also offering</p>
          <div className="space-y-4 w-full">
            {otherActivities.map((activity, index) => (
              <div key={index} className="glass-card p-4 text-center">
                <span className="text-white font-medium">{activity.name}</span>
                <span className="text-gray-500 text-sm ml-2">- {activity.desc}</span>
              </div>
            ))}
          </div>
          <a href="tel:+919538665107" className="magnetic-btn primary mt-8">
            Call to Know More
          </a>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className={`absolute bottom-8 left-8 md:left-16 z-20 ${isMobile ? 'hidden' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">01</span>
          <div className="w-24 h-[2px] bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: '20%', background: 'linear-gradient(90deg, #FF9933, #C1440E)' }} />
          </div>
          <span className="text-gray-500 text-sm">05</span>
        </div>
      </div>
    </section>
  );
}
