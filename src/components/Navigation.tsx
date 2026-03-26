import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Classes', href: '#classes' },
  { name: 'Instructors', href: '#instructors' },
  { name: 'Schedule', href: '#schedule' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > window.innerHeight * 0.5) {
        setIsScrolled(true);
        setIsVisible(true);
      } else {
        setIsScrolled(false);
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // For GSAP-pinned sections, use ScrollTrigger's start position
      const trigger = ScrollTrigger.getAll().find(st => st.trigger === element);
      if (trigger) {
        window.scrollTo({ top: trigger.start, behavior: 'smooth' });
      } else {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`nav-fixed transition-all duration-500 ${
        isScrolled ? 'scrolled' : ''
      } ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      {/* Logo */}
      <a
        href="#home"
        onClick={(e) => scrollToSection(e, '#home')}
        className="flex items-center gap-2"
      >
        <span className="font-display text-xl tracking-wider text-white">
          KISHAN <span style={{ color: '#FF9933' }}>&</span> PRASAD
        </span>
      </a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => scrollToSection(e, link.href)}
            className="text-sm text-gray-300 hover:text-[#FF9933] transition-colors tracking-wide"
          >
            {link.name}
          </a>
        ))}
        <a
          href="tel:+919538665107"
          className="magnetic-btn text-xs"
        >
          Call Now
        </a>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden text-white p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0D0D0D]/98 backdrop-blur-lg border-t border-white/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block text-lg text-gray-300 hover:text-[#FF9933] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:+919538665107"
              className="magnetic-btn primary w-full text-center mt-4"
            >
              Call: +91 95386 65107
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
