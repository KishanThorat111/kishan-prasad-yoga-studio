import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    // Set initial state
    gsap.set(content, { y: 60, opacity: 0 });

    const animation = gsap.fromTo(content,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 0.5,
        },
      }
    );

    // Store trigger reference
    if (animation.scrollTrigger) {
      triggerRef.current = animation.scrollTrigger;
    }

    return () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const phone = formData.phone.trim();
    const msg = formData.message.trim();
    if (!name || !phone) return;
    const message = encodeURIComponent(
      `Name: ${name}\nPhone: ${phone}\nMessage: ${msg}`
    );
    window.open(`https://wa.me/919538665107?text=${message}`, '_blank', 'noopener');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#0D0D0D]"
    >
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FF9933] text-sm tracking-[0.2em] uppercase mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
            Start Your <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to begin your yoga journey? Reach out to us and take the first 
            step towards a healthier, more peaceful life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF9933]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Visit Us</h4>
                  <p className="text-gray-400">
                    Muralidhar Colony<br />
                    Hanuman Nagar, Belagavi<br />
                    Karnataka 590019
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF9933]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Call Us</h4>
                  <a href="tel:+919538665107" className="text-[#FF9933] hover:underline text-lg">
                    +91 95386 65107
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF9933]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Follow Us</h4>
                  <a 
                    href="https://instagram.com/kishan_prasad_yoga_dance_class" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#FF9933] hover:underline break-all"
                  >
                    @kishan_prasad_yoga_dance_class
                  </a>
                </div>
              </div>
            </div>

            {/* Timings */}
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF9933]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#FF9933]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-medium mb-2">Timings</h4>
                  <p className="text-gray-400">
                    Morning: 6:00 AM - 9:00 AM<br />
                    Evening: 5:00 PM - 9:00 PM<br />
                    Sunday: Special Batches
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="glass-card p-8">
              <h3 className="text-xl text-white font-medium mb-6">Send us a Message</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FF9933] focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9+\-\s]{7,15}"
                    title="Enter a valid phone number (7-15 digits)"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FF9933] focus:outline-none transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-[#FF9933] focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your interest..."
                  />
                </div>

                <button type="submit" className="magnetic-btn primary w-full">
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-display text-xl text-white">
                KISHAN <span className="text-[#FF9933]">&</span> PRASAD
              </p>
              <p className="text-gray-500 text-sm">Yoga Studio</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>★ 4.6 Google Rating</span>
              <span>|</span>
              <span>10+ Years Experience</span>
            </div>
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
