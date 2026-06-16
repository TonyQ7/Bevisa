import { useState, useEffect, useCallback } from 'react';
import { Button } from './ui';

const NAV_LINKS = [
  { label: 'Problem', href: '#problem' },
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Autonomy Ladder', href: '#autonomy-ladder' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Platform', href: '#platform' },
  { label: 'Contact', href: '#contact' },
];

function PraxisLogo() {
  return (
    <a
      href="#"
      className="flex items-center gap-2.5 group"
      aria-label="Praxis — Back to top"
    >
      {/* Gradient H icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="praxis-logo-gradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--color-electric-500)" />
            <stop offset="1" stopColor="var(--color-teal-500)" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#praxis-logo-gradient)" />
        {/* H letter */}
        <path
          d="M10 8h4v8h8V8h4v20h-4v-8H14v8h-4V8z"
          fill="white"
        />
      </svg>

      <span className="text-xl font-extrabold tracking-tight text-navy-900 transition-colors duration-300 group-hover:text-navy-700">
        PRAXIS
      </span>
    </a>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 16 : false
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // ── Scroll shadow & active section tracking ──────────────────────────
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 16);

    // Determine which section is currently in view
    const scrollY = window.scrollY + 120; // offset for sticky nav
    let current = '';

    for (const link of NAV_LINKS) {
      const id = link.href.replace('#', '');
      const section = document.getElementById(id);
      if (section) {
        const { offsetTop, offsetHeight } = section;
        if (scrollY >= offsetTop && scrollY < offsetTop + offsetHeight) {
          current = link.href;
        }
      }
    }

    setActiveSection(current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // ── Lock body scroll when mobile menu open ───────────────────────────
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  // ── Close mobile menu on Escape key ──────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(10,14,26,0.06)] border-b border-slate-200/60'
          : 'bg-white/70 backdrop-blur-md'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-[72px]"
        aria-label="Primary navigation"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <PraxisLogo />

        {/* ── Desktop links ─────────────────────────────────────────── */}
        <ul className="hidden xl:flex items-center gap-1" role="menubar">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href} role="none">
              <a
                href={href}
                role="menuitem"
                className={`relative px-3 py-2 text-[13px] font-medium rounded-lg transition-colors duration-200 ${
                  activeSection === href
                    ? 'text-electric-600'
                    : 'text-slate-600 hover:text-navy-900 hover:bg-slate-50'
                }`}
              >
                {label}

                {/* Active indicator dot */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[3px] w-5 rounded-full bg-electric-500 transition-all duration-300 ${
                    activeSection === href ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTA ───────────────────────────────────────────── */}
        <div className="hidden xl:flex items-center gap-3">
          <Button href="#contact" size="sm">
            Request a Demo
          </Button>
        </div>

        {/* ── Mobile hamburger button ───────────────────────────────── */}
        <button
          type="button"
          className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg text-navy-800 hover:bg-slate-100 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric-500 cursor-pointer"
          onClick={() => setIsMobileOpen((o) => !o)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {/* Animated hamburger → X */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line
              x1="3" y1="6" x2="21" y2="6"
              className={`origin-center transition-all duration-300 ${
                isMobileOpen ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <line
              x1="3" y1="12" x2="21" y2="12"
              className={`transition-opacity duration-200 ${
                isMobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <line
              x1="3" y1="18" x2="21" y2="18"
              className={`origin-center transition-all duration-300 ${
                isMobileOpen ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </svg>
        </button>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={`xl:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(.4,0,.2,1)] ${
          isMobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileOpen}
      >
        <div className="bg-white border-t border-slate-200/60 px-6 pb-6 pt-2">
          <ul className="flex flex-col gap-1" role="menu">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} role="none">
                <a
                  href={href}
                  role="menuitem"
                  onClick={closeMobile}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200 ${
                    activeSection === href
                      ? 'bg-electric-50 text-electric-600'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-navy-900'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <Button href="#contact" size="md" className="w-full" onClick={closeMobile}>
              Request a Demo
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
