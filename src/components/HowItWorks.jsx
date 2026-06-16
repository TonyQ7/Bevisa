import { SectionWrapper, SectionHeading, Card, IconBox } from './ui';
import { useInView } from '../hooks/useInView';

/* ─── Icons ─────────────────────────────────────────────────────── */

const PlayCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10,8 16,12 10,16" />
  </svg>
);

const ClipboardCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <path d="M9 14l2 2 4-4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const GitMergeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <path d="M6 21V9a9 9 0 009 9" />
  </svg>
);

const RocketIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

/* ─── Connectors ────────────────────────────────────────────────── */

const ArrowConnectorH = () => (
  <div className="hidden lg:flex items-center justify-center flex-shrink-0 w-10 xl:w-14 self-center">
    <svg width="100%" height="24" viewBox="0 0 56 24" fill="none" className="text-slate-300">
      <line x1="0" y1="12" x2="42" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M40 6L52 12L40 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const ArrowConnectorV = () => (
  <div className="flex lg:hidden items-center justify-center py-3">
    <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-slate-300">
      <line x1="12" y1="0" x2="12" y2="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M6 26L12 38L18 26" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

/* ─── Step data ─────────────────────────────────────────────────── */

const steps = [
  {
    number: '01',
    title: 'Simulation',
    icon: PlayCircleIcon,
    description: 'A person enters simulations that resemble real AI-agent work scenarios.',
    color: 'electric',
  },
  {
    number: '02',
    title: 'Readiness Scorecard',
    icon: ClipboardCheckIcon,
    description: 'Praxis scores judgment, verification, escalation, and domain fit.',
    color: 'teal',
  },
  {
    number: '03',
    title: 'AI Work Passport',
    icon: ShieldCheckIcon,
    description: 'Results become a verified, portable AI Work Passport credential.',
    color: 'purple',
  },
  {
    number: '04',
    title: 'Role Match',
    icon: GitMergeIcon,
    description: 'Employers match passport data to roles and workflow requirements.',
    color: 'electric',
  },
  {
    number: '05',
    title: 'Employer Deployment Plan',
    icon: RocketIcon,
    description: 'Deploy, train, approve, or restrict AI work based on evidence.',
    color: 'teal',
  },
];

/* ─── Accent colour map ─────────────────────────────────────────── */

const accentBar = {
  electric: 'bg-gradient-to-r from-electric-400 to-electric-500',
  teal: 'bg-gradient-to-r from-teal-400 to-teal-500',
  purple: 'bg-gradient-to-r from-purple-400 to-purple-500',
};

const numberColor = {
  electric: 'text-electric-500/[0.07]',
  teal: 'text-teal-500/[0.07]',
  purple: 'text-purple-500/[0.07]',
};

/* ─── Step Card ─────────────────────────────────────────────────── */

function StepCard({ step, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <Card hover className="relative overflow-hidden h-full flex flex-col">
        {/* Large faded step number */}
        <span
          className={`absolute -top-4 -right-2 text-[5.5rem] font-black leading-none select-none pointer-events-none ${numberColor[step.color]}`}
          aria-hidden="true"
        >
          {step.number}
        </span>

        {/* Icon */}
        <div className="mb-5 relative z-10">
          <IconBox variant={step.color} size="lg">
            <Icon />
          </IconBox>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-navy-900 tracking-tight mb-2 relative z-10">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed relative z-10 flex-1">
          {step.description}
        </p>

        {/* Bottom accent bar */}
        <div className={`mt-6 h-1 rounded-full ${accentBar[step.color]}`} />
      </Card>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */

export default function HowItWorks() {
  const [summaryRef, summaryVisible] = useInView({ threshold: 0.4 });

  return (
    <SectionWrapper id="how-it-works" bg="light">
      <SectionHeading
        id="how-it-works"
        badge="How It Works"
        title="Simple Enough for HR, Rigorous Enough for Enterprise"
        subtitle="From simulation to deployment in five clear steps."
      />

      {/* Flow – horizontal on lg+, vertical on smaller */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex flex-col lg:flex-row items-stretch"
          >
            {/* Card */}
            <div className="flex-1 min-w-0 lg:max-w-[13rem] xl:max-w-[14.5rem]">
              <StepCard step={step} index={index} />
            </div>

            {/* Arrow connector (not after the last card) */}
            {index < steps.length - 1 && (
              <>
                <ArrowConnectorH />
                <ArrowConnectorV />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Summary tagline */}
      <div
        ref={summaryRef}
        className={`mt-16 text-center transition-all duration-700 ${
          summaryVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }`}
      >
        <p className="text-sm italic text-slate-500 max-w-2xl mx-auto">
          Readiness travels with the person, and deployment evidence improves
          the system.
        </p>
      </div>
    </SectionWrapper>
  );
}
