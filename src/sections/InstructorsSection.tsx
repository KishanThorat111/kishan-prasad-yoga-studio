import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instructors = [
  {
    id: 1,
    name: 'Kishan',
    role: 'Lead Yoga Instructor',
    specialization: 'Hatha Yoga, Meditation',
    experience: '15+ years',
    image: '/images/guru_kishan.webp',
    quote: 'Yoga is the journey of the self, through the self, to the self.',
  },
  {
    id: 2,
    name: 'Priya',
    role: 'Power Yoga Instructor',
    specialization: 'Power Yoga, Pranayama',
    experience: '8+ years',
    image: '/images/instructor_priya.webp',
    quote: 'Find your strength on the mat, carry it into the world.',
  },
];

export default function InstructorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current.filter(Boolean);

    if (!section || !heading || cards.length === 0) return;

    // Set initial states - position children for entrance animation
    gsap.set(heading, { y: 40, opacity: 0 });
    cards.forEach((card, index) => {
      gsap.set(card, { y: 80, opacity: 0, rotation: index === 0 ? -3 : 3 });
    });

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
    scrollTl.fromTo(heading,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.15, ease: 'none' },
      0.05
    );

    cards.forEach((card, index) => {
      scrollTl.fromTo(card,
        { y: 80, opacity: 0, rotation: index === 0 ? -3 : 3 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.15, ease: 'none' },
        0.1 + index * 0.03
      );
    });

    // Parallax on images during settle (30% - 70%)
    cards.forEach((card) => {
      const img = card?.querySelector('img');
      if (img) {
        scrollTl.fromTo(img,
          { y: '8%' },
          { y: '-8%', duration: 0.4, ease: 'none' },
          0.3
        );
      }
    });

    // EXIT (70% - 100%)
    scrollTl.to(heading,
      { y: -40, opacity: 0, duration: 0.15, ease: 'power2.in' },
      0.75
    );

    cards.forEach((card, index) => {
      scrollTl.to(card,
        { y: -80, opacity: 0, rotation: index === 0 ? 3 : -3, duration: 0.15, ease: 'power2.in' },
        0.77 + index * 0.02
      );
    });

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
      id="instructors"
      ref={sectionRef}
      className={`${isMobile ? 'py-16' : 'section-pinned'} flex flex-col items-center justify-center relative`}
      style={{ zIndex: 40, background: 'linear-gradient(180deg, #0D0D0D 0%, #111 50%, #0D0D0D 100%)' }}
    >
      {/* Heading */}
      <div ref={headingRef} className="text-center mb-12 px-4">
        <p className="text-[#FF9933] text-sm tracking-[0.2em] uppercase mb-4">
          Meet Our Team
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
          Our <span className="gradient-text">Instructors</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Learn from certified yoga masters with decades of combined experience 
          in traditional and contemporary yoga practices.
        </p>
      </div>

      {/* Instructor Cards */}
      <div className="flex flex-col md:flex-row gap-8 px-8 md:px-16 max-w-5xl w-full">
        {instructors.map((instructor, index) => (
          <div
            key={instructor.id}
            ref={(el) => { cardsRef.current[index] = el; }}
            className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer flex-1"
            style={{ border: '1px solid rgba(255, 153, 51, 0.2)' }}
          >
            {/* Image */}
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(193, 68, 14, 0.4) 0%, transparent 60%)' }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-sm italic mb-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF9933]">
                "{instructor.quote}"
              </p>
              <p className="text-xs tracking-wider uppercase mb-2 text-[#FF9933]">
                {instructor.role}
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-white mb-2">
                {instructor.name}
              </h3>
              <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                <span className="text-xs px-2 py-1 rounded bg-black/50 text-gray-300">
                  {instructor.specialization}
                </span>
                <span className="text-xs px-2 py-1 rounded bg-black/50 text-gray-300">
                  {instructor.experience}
                </span>
              </div>
            </div>

            {/* Hover Border */}
            <div 
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ border: '2px solid #FF9933', boxShadow: '0 0 30px rgba(255, 153, 51, 0.3)' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
