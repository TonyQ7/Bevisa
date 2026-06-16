import { SectionWrapper, SectionHeading, Card, Badge, IconBox } from './ui';
import { useInView } from '../hooks/useInView';

/* ── Icon components ───────────────────────────────────────────── */

function DashboardIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="4" rx="1.5" />
      <rect x="14" y="10" width="7" height="11" rx="1.5" />
      <rect x="3" y="13" width="7" height="8" rx="1.5" />
    </svg>
  );
}

function PassportIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M8 17h8" />
      <path d="M10 14h4" />
    </svg>
  );
}

function MobilityIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v6" />
      <path d="M12 16v6" />
      <path d="M4.93 4.93l4.24 4.24" />
      <path d="M14.83 14.83l4.24 4.24" />
      <path d="M2 12h6" />
      <path d="M16 12h6" />
      <path d="M4.93 19.07l4.24-4.24" />
      <path d="M14.83 9.17l4.24-4.24" />
    </svg>
  );
}

function MatchIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5" />
      <path d="M8 3H3v5" />
      <path d="M21 3l-7 7" />
      <path d="M3 3l7 7" />
      <path d="M16 21h5v-5" />
      <path d="M8 21H3v-5" />
      <path d="M21 21l-7-7" />
      <path d="M3 21l7-7" />
    </svg>
  );
}

function IntelligenceIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.4V11h3a3 3 0 0 1 3 3v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v1.6c1.2.6 2 1.9 2 3.4a4 4 0 0 1-8 0c0-1.5.8-2.8 2-3.4V14a3 3 0 0 1 3-3h3V9.4C7.8 8.8 7 7.5 7 6a4 4 0 0 1 5-3.9" />
    </svg>
  );
}

function BenchmarkIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 17l4-8 4 4 5-10" />
      <circle cx="7" cy="17" r="1.5" />
      <circle cx="11" cy="9" r="1.5" />
      <circle cx="15" cy="13" r="1.5" />
      <circle cx="20" cy="3" r="1.5" />
    </svg>
  );
}

/* ── Phase timeline icons ──────────────────────────────────────── */

function RocketIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function LayoutIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function BuildingIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function GlobeIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* ── Phase data ────────────────────────────────────────────────── */

const phases = [
  {
    label: 'NOW',
    title: 'AI Operator Readiness',
    icon: RocketIcon,
    variant: 'electric',
    active: true,
    items: [
      'Paid cohorts and employer AI-readiness pilots',
      'Simulation-based evidence generation',
      'Individual AI Work Passports',
    ],
  },
  {
    label: 'NEXT',
    title: 'Employer Dashboards',
    icon: LayoutIcon,
    variant: 'teal',
    active: false,
    items: [
      'Workforce AI deployment dashboards',
      'Team readiness mapping',
      'Role matching and gap analysis',
    ],
  },
  {
    label: 'SCALE',
    title: 'Enterprise Work Passport',
    icon: BuildingIcon,
    variant: 'purple',
    active: false,
    items: [
      'Enterprise-wide record of autonomy across teams',
      'Internal mobility and workforce planning',
      'Organizational readiness benchmarks',
    ],
  },
  {
    label: 'PLATFORM',
    title: 'Workforce Intelligence',
    icon: GlobeIcon,
    variant: 'navy',
    active: false,
    items: [
      'Certified talent network',
      'Industry benchmarks and standards',
      'Readiness intelligence across sectors',
    ],
  },
];

/* ── Features grid data ────────────────────────────────────────── */

const features = [
  {
    title: 'Employer Dashboards',
    description: 'Real-time visibility into workforce AI readiness across teams and departments.',
    icon: DashboardIcon,
    variant: 'electric',
  },
  {
    title: 'Enterprise Work Passport',
    description: 'Organization-wide credentialing that records verified AI autonomy levels.',
    icon: PassportIcon,
    variant: 'teal',
  },
  {
    title: 'Internal Mobility',
    description: 'Map readiness to roles and enable talent movement based on proven capability.',
    icon: MobilityIcon,
    variant: 'purple',
  },
  {
    title: 'Role Matching',
    description: 'Algorithmically match verified skill profiles to AI-augmented role requirements.',
    icon: MatchIcon,
    variant: 'electric',
  },
  {
    title: 'Workforce Intelligence',
    description: 'Cross-sector analytics on readiness trends, deployment gaps, and benchmarks.',
    icon: IntelligenceIcon,
    variant: 'teal',
  },
  {
    title: 'Readiness Benchmarks',
    description: 'Industry-standard scoring that compares teams and organizations at scale.',
    icon: BenchmarkIcon,
    variant: 'purple',
  },
];

/* ── Variant color mappings ────────────────────────────────────── */

const dotColors = {
  electric: 'bg-electric-500',
  teal: 'bg-teal-500',
  purple: 'bg-purple-500',
  navy: 'bg-navy-600',
};

const ringColors = {
  electric: 'ring-electric-200',
  teal: 'ring-teal-200',
  purple: 'ring-purple-200',
  navy: 'ring-navy-200',
};

const labelColors = {
  electric: 'text-electric-600 bg-electric-50 border-electric-200',
  teal: 'text-teal-600 bg-teal-50 border-teal-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  navy: 'text-navy-600 bg-navy-50 border-navy-200',
};

/* ── Phase card (timeline node) ────────────────────────────────── */

function PhaseCard({ phase, index, isVisible }) {
  const Icon = phase.icon;

  return (
    <div
      className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card
        hover
        className={`h-full ${phase.active ? 'ring-2 ring-electric-200 shadow-lg shadow-electric-500/5' : 'opacity-80 hover:opacity-100'}`}
      >
        {/* Phase badge */}
        <div className="flex items-start justify-between mb-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-[0.15em] uppercase border ${labelColors[phase.variant]}`}>
            Phase {index + 1}  ·  {phase.label}
          </span>
          {phase.active && (
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-electric-500" />
            </span>
          )}
        </div>

        {/* Icon + title */}
        <div className="flex items-center gap-3 mb-4">
          <IconBox variant={phase.variant} size="md">
            <Icon className="w-5 h-5" />
          </IconBox>
          <h3 className="text-lg font-bold tracking-tight text-navy-900">{phase.title}</h3>
        </div>

        {/* Bullet points */}
        <ul className="space-y-2">
          {phase.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600 leading-relaxed">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[phase.variant]}`} />
              {item}
            </li>
          ))}
        </ul>

        {/* Bottom accent */}
        <div className={`mt-6 h-0.5 rounded-full ${phase.active ? 'w-full bg-gradient-to-r from-electric-400 to-teal-400' : `w-12 ${dotColors[phase.variant]}`}`} />
      </Card>
    </div>
  );
}

/* ── Timeline connector ────────────────────────────────────────── */

function TimelineConnector({ isVisible }) {
  return (
    <>
      {/* ── Desktop: horizontal line behind the cards ────────── */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 px-12 pointer-events-none" aria-hidden="true">
        {/* Track */}
        <div className="h-1 rounded-full bg-slate-200 w-full relative overflow-hidden">
          {/* Animated gradient fill */}
          <div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-electric-500 via-teal-400 to-purple-400 transition-all duration-1000 ease-out ${isVisible ? 'w-full' : 'w-0'}`}
            style={{ transitionDelay: '400ms' }}
          />
        </div>
        {/* Dots at each phase */}
        {phases.map((phase, i) => (
          <div
            key={phase.label}
            className="absolute top-1/2 -translate-y-1/2"
            style={{ left: `${12 + (i / (phases.length - 1)) * 76}%` }}
          >
            <div className={`w-4 h-4 rounded-full border-[3px] border-white shadow-sm ${dotColors[phase.variant]} ring-4 ${ringColors[phase.variant]} transition-all duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}
              style={{ transitionDelay: `${500 + i * 200}ms` }}
            />
          </div>
        ))}
      </div>

      {/* ── Mobile/Tablet: vertical line on the left ────────── */}
      <div className="lg:hidden absolute top-0 bottom-0 left-6 w-1 pointer-events-none" aria-hidden="true">
        <div className="w-full h-full rounded-full bg-slate-200 relative overflow-hidden">
          <div
            className={`absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-electric-500 via-teal-400 to-purple-400 transition-all duration-1000 ease-out ${isVisible ? 'h-full' : 'h-0'}`}
            style={{ transitionDelay: '400ms' }}
          />
        </div>
      </div>
    </>
  );
}

/* ── Feature card ──────────────────────────────────────────────── */

function FeatureCard({ feature, index, isVisible }) {
  const Icon = feature.icon;

  return (
    <div
      className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card hover className="h-full">
        <div className="flex items-start gap-4">
          <IconBox variant={feature.variant} size="sm">
            <Icon className="w-5 h-5" />
          </IconBox>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-navy-900 mb-1">{feature.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────────── */

export default function Platform() {
  const [timelineRef, timelineVisible] = useInView({ threshold: 0.05 });
  const [featuresRef, featuresVisible] = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="platform" bg="light">
      <SectionHeading
        id="platform"
        badge="Platform"
        title="From Readiness to Workforce Infrastructure"
        subtitle="Praxis starts where budgets are already forming and expands into the operating system for AI workforce deployment."
      />

      {/* ── Expansion Timeline ────────────────────────────────── */}
      <div ref={timelineRef} className="relative mb-20 md:mb-28">
        {/* ── Desktop: horizontal 4-column grid ──────────────── */}
        <div className="hidden lg:block relative">
          {/* Connector line sits in the gap between heading and cards */}
          <div className="relative h-10 mb-6">
            <TimelineConnector isVisible={timelineVisible} />
          </div>

          <div className="grid grid-cols-4 gap-5">
            {phases.map((phase, i) => (
              <PhaseCard key={phase.label} phase={phase} index={i} isVisible={timelineVisible} />
            ))}
          </div>
        </div>

        {/* ── Mobile / Tablet: vertical stack ────────────────── */}
        <div className="lg:hidden relative">
          {/* Vertical gradient line */}
          <div className="absolute top-0 bottom-0 left-[23px] w-1 pointer-events-none" aria-hidden="true">
            <div className="w-full h-full rounded-full bg-slate-200 relative overflow-hidden">
              <div
                className={`absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-electric-500 via-teal-400 to-purple-400 transition-all duration-1000 ease-out ${timelineVisible ? 'h-full' : 'h-0'}`}
                style={{ transitionDelay: '400ms' }}
              />
            </div>
          </div>

          <div className="space-y-6">
            {phases.map((phase, i) => (
              <div key={phase.label} className="relative flex gap-5">
                {/* Timeline node */}
                <div className="relative z-10 flex-shrink-0 mt-6">
                  <div className={`w-[14px] h-[14px] rounded-full border-[3px] border-white shadow-sm ${dotColors[phase.variant]} ring-4 ${ringColors[phase.variant]} transition-all duration-500 ${timelineVisible ? 'scale-100' : 'scale-0'}`}
                    style={{ transitionDelay: `${500 + i * 200}ms`, marginLeft: '9px' }}
                  />
                </div>

                {/* Card */}
                <div className="flex-1 min-w-0">
                  <PhaseCard phase={phase} index={i} isVisible={timelineVisible} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Features Grid ─────────────────────────────────────── */}
      <div ref={featuresRef}>
        <div className="text-center mb-10">
          <Badge variant="teal">Capabilities</Badge>
          <h3 className="text-2xl md:text-3xl font-bold text-navy-900 mt-4">
            Key Platform Capabilities
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} isVisible={featuresVisible} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
