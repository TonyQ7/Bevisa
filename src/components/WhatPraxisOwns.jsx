import { SectionWrapper, SectionHeading } from './ui';
import { useInView } from '../hooks/useInView';

/* ── Icon Components ── */

function UserCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function KeyLicenseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function FlaskIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6M10 3v6.4a1 1 0 01-.2.6L4 18a1 1 0 00.8 1.6h14.4A1 1 0 0020 18l-5.8-8a1 1 0 01-.2-.6V3" />
      <path d="M7.5 14.5h9" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19.07 4.93A10 10 0 004.93 19.07" />
      <path d="M15.54 8.46A5 5 0 008.46 15.54" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <line x1="12" y1="12" x2="19.07" y2="4.93" />
    </svg>
  );
}

/* ── Card Data ── */

const ownershipCards = [
  {
    title: 'Human AI-Readiness',
    description: 'The verified capability standard for humans working with AI agents.',
    Icon: UserCheckIcon,
    accent: 'from-electric-400 to-electric-600',
    glowColor: 'electric',
  },
  {
    title: 'AI Operator Licensing',
    description: 'The permission system that governs who can operate which AI workflows.',
    Icon: KeyLicenseIcon,
    accent: 'from-teal-400 to-teal-600',
    glowColor: 'teal',
  },
  {
    title: 'Simulation-Based Talent Evidence',
    description: 'Real-world task simulation that produces verifiable readiness proof.',
    Icon: FlaskIcon,
    accent: 'from-purple-400 to-purple-600',
    glowColor: 'purple',
  },
  {
    title: 'Autonomy Levels',
    description: 'The standardized framework for AI work permissions from L0 to L5.',
    Icon: LayersIcon,
    accent: 'from-amber-400 to-orange-500',
    glowColor: 'amber',
  },
  {
    title: 'Role & Workflow Clearance',
    description: 'Domain-specific authorization for AI-agent work in defined contexts.',
    Icon: CheckCircleIcon,
    accent: 'from-emerald-400 to-emerald-600',
    glowColor: 'emerald',
  },
  {
    title: 'Workforce Deployment Intelligence',
    description: 'Organizational intelligence on where to deploy, train, or restrict AI work.',
    Icon: RadarIcon,
    accent: 'from-rose-400 to-pink-500',
    glowColor: 'rose',
  },
];

/* ── Ownership Card Component ── */

function OwnershipCard({ title, description, Icon, accent, index, isVisible }) {
  // Stagger rows: first row (0–2) then second row (3–5)
  const delay = index * 100 + 100;

  return (
    <div
      className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-6 md:p-7 transition-all duration-700 hover:bg-white/[0.08] hover:border-white/[0.15] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {/* Subtle gradient glow on hover */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

      {/* Icon */}
      <div className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
        <Icon />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2.5 group-hover:text-electric-200 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Corner accent line */}
      <div className={`absolute top-0 right-0 w-12 h-[2px] rounded-tr-2xl bg-gradient-to-l ${accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
      <div className={`absolute top-0 right-0 h-12 w-[2px] rounded-tr-2xl bg-gradient-to-b ${accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
    </div>
  );
}

/* ── Integration Footer Note ── */

function IntegrationNote({ isVisible }) {
  return (
    <div
      className={`mt-16 md:mt-20 transition-all duration-700 delay-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      }`}
    >
      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-electric-400/50" />
          <span className="h-1.5 w-1.5 rounded-full bg-electric-400/70" />
          <span className="h-1 w-1 rounded-full bg-electric-400/50" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Note box */}
      <div className="relative max-w-4xl mx-auto rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm px-6 py-5 md:px-8 md:py-6">
        {/* Subtle left accent */}
        <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-electric-500/40 via-teal-500/40 to-electric-500/40" />

        <div className="flex items-start gap-4">
          {/* Info icon */}
          <div className="hidden sm:flex shrink-0 mt-0.5 h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Over time, readiness proof connects to{' '}
            <span className="text-slate-300 font-medium">HRIS</span>,{' '}
            <span className="text-slate-300 font-medium">L&D</span>,{' '}
            <span className="text-slate-300 font-medium">IAM</span>,{' '}
            <span className="text-slate-300 font-medium">AI platforms</span>,{' '}
            <span className="text-slate-300 font-medium">compliance</span>,{' '}
            and other enterprise systems — but{' '}
            <span className="text-white font-semibold">
              Praxis is independently valuable
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section Component ── */

export default function WhatPraxisOwns() {
  const [gridRef, gridVisible] = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="what-praxis-owns" bg="gradient">
      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" aria-hidden="true">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric-500/[0.04] blur-[120px] pointer-events-none" aria-hidden="true" />

      <SectionHeading
        id="what-praxis-owns"
        badge="Category"
        title="What Praxis Owns"
        subtitle="The category does not depend on integrations. Praxis is valuable because every AI-native enterprise needs a trusted way to license humans for digital labor."
        dark
      />

      {/* Ownership Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {ownershipCards.map((card, i) => (
          <OwnershipCard
            key={card.title}
            {...card}
            index={i}
            isVisible={gridVisible}
          />
        ))}
      </div>

      {/* Integration Footer */}
      <IntegrationNote isVisible={gridVisible} />
    </SectionWrapper>
  );
}
