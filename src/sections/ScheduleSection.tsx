import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const schedule = [
  {
    day: 'Monday - Friday',
    sessions: [
      { time: '6:00 AM - 7:00 AM', class: 'Morning Hatha Yoga', level: 'All Levels' },
      { time: '7:30 AM - 8:30 AM', class: 'Power Yoga', level: 'Intermediate' },
      { time: '5:30 PM - 6:30 PM', class: 'Evening Hatha Yoga', level: 'All Levels' },
      { time: '7:00 PM - 8:00 PM', class: 'Meditation & Pranayama', level: 'All Levels' },
    ],
  },
  {
    day: 'Saturday',
    sessions: [
      { time: '7:00 AM - 8:30 AM', class: 'Weekend Power Yoga', level: 'All Levels' },
      { time: '9:00 AM - 10:00 AM', class: 'Kids Yoga', level: 'Ages 5-12' },
      { time: '5:00 PM - 6:30 PM', class: 'Special Workshop', level: 'All Levels' },
    ],
  },
  {
    day: 'Sunday',
    sessions: [
      { time: '7:00 AM - 8:30 AM', class: 'Sunrise Yoga', level: 'All Levels' },
      { time: '9:00 AM - 10:30 AM', class: 'Meditation Session', level: 'All Levels' },
    ],
  },
];

export default function ScheduleSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [isMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Set initial states - position children for entrance animation
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
    scrollTl.fromTo(content.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.2, ease: 'none' },
      0.05
    );

    // SETTLE (30% - 70%) - content stays visible

    // EXIT (70% - 100%)
    scrollTl.to(content.children,
      { y: -30, opacity: 0, stagger: 0.02, duration: 0.15, ease: 'power2.in' },
      0.75
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
      id="schedule"
      ref={sectionRef}
      className={`${isMobile ? 'py-16' : 'section-pinned'} flex items-center relative`}
      style={{ zIndex: 50, background: 'linear-gradient(135deg, #111 0%, #0D0D0D 100%)' }}
    >
      <div ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#FF9933] text-sm tracking-[0.2em] uppercase mb-4">
            Class Timings
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Weekly <span className="gradient-text">Schedule</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join us at a time that works for you. We offer morning and evening 
            batches to fit your busy lifestyle.
          </p>
        </div>

        {/* Schedule */}
        <div className="space-y-6">
          {schedule.map((daySchedule) => (
            <div key={daySchedule.day} className="glass-card p-6 md:p-8">
              <h3 className="font-display text-xl text-[#FF9933] mb-6 pb-4 border-b border-white/10">
                {daySchedule.day}
              </h3>
              <div className="space-y-3">
                {daySchedule.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <div className="w-2 h-2 rounded-full bg-[#FF9933]" />
                      <span className="text-white font-medium">{session.class}</span>
                    </div>
                    <div className="flex items-center gap-6 ml-6 md:ml-0">
                      <span className="text-gray-400 text-sm">{session.time}</span>
                      <span className="text-xs px-3 py-1 rounded-full bg-[#FF9933]/20 text-[#FF9933]">
                        {session.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            * Schedule may vary on holidays. Please call{' '}
            <a href="tel:+919538665107" className="text-[#FF9933] hover:underline">
              +91 95386 65107
            </a>{' '}
            to confirm.
          </p>
        </div>
      </div>
    </section>
  );
}
