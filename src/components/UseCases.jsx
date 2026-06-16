import { SectionWrapper, SectionHeading, Card, IconBox, Badge } from './ui';
import { useInView } from '../hooks/useInView';

/* ── Icon components ───────────────────────────────────────────── */

function GraduationCapIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

function UsersIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function MegaphoneIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M3 17h4l2 4h6l2-4h4" />
      <path d="M21 5l-3 3" />
      <path d="M21 12h-4" />
      <path d="M18 2l-1 4" />
      <line x1="9" y1="21" x2="15" y2="21" />
    </svg>
  );
}

function CalculatorIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="14" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="14" y1="14" x2="16" y2="14" />
      <line x1="8" y1="18" x2="10" y2="18" />
      <line x1="14" y1="18" x2="16" y2="18" />
    </svg>
  );
}

function CogIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/* ── Use-case data ─────────────────────────────────────────────── */

const useCases = [
  {
    title: 'Graduate Programs & Internships',
    description:
      'New talent entering AI-native roles needs verified readiness before enterprise deployment. Praxis replaces guesswork with evidence.',
    icon: GraduationCapIcon,
    variant: 'electric',
    tag: 'Early Career',
  },
  {
    title: 'Recruiting & HR',
    description:
      'Recruiting teams touching candidate data through AI-automated pipelines need proven judgment and domain readiness.',
    icon: UsersIcon,
    variant: 'teal',
    tag: 'Talent Operations',
  },
  {
    title: 'Sales & Customer Teams',
    description:
      'Customer-facing teams using AI for communication, outreach, and engagement require clearance for external-facing work.',
    icon: MegaphoneIcon,
    variant: 'purple',
    tag: 'Revenue Teams',
  },
  {
    title: 'Finance Operations',
    description:
      'Financial analysts working with AI in reporting, forecasting, and compliance need verified autonomy levels.',
    icon: CalculatorIcon,
    variant: 'navy',
    tag: 'Finance & Risk',
  },
  {
    title: 'Business Operations',
    description:
      'Operations teams automating processes with AI agents need readiness proof before systems access.',
    icon: CogIcon,
    variant: 'electric',
    tag: 'Operations',
  },
];

/* ── Accent colors for the "Learn more" links ──────────────────── */

const linkColors = {
  electric: 'text-electric-500 hover:text-electric-600',
  teal: 'text-teal-500 hover:text-teal-600',
  purple: 'text-purple-500 hover:text-purple-600',
  navy: 'text-navy-600 hover:text-navy-700',
};

/* ── Use-case card ─────────────────────────────────────────────── */

function UseCaseCard({ useCase, index, isVisible }) {
  const Icon = useCase.icon;

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <Card hover className="h-full flex flex-col">
        {/* Top row: icon + tag */}
        <div className="flex items-start justify-between mb-5">
          <IconBox variant={useCase.variant} size="md">
            <Icon className="w-6 h-6" />
          </IconBox>
          <Badge variant={useCase.variant === 'electric' ? 'default' : useCase.variant}>
            {useCase.tag}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg tracking-tight text-navy-900 mb-3">
          {useCase.title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-slate-600 mb-6 flex-1">
          {useCase.description}
        </p>

        {/* Arrow link */}
        <a
          href={`#${useCase.title.toLowerCase().replace(/\s+/g, '-')}`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group ${linkColors[useCase.variant]}`}
        >
          Learn more
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </a>
      </Card>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────────── */

export default function UseCases() {
  const [cardsRef, cardsVisible] = useInView({ threshold: 0.05 });

  const topRow = useCases.slice(0, 3);
  const bottomRow = useCases.slice(3);

  return (
    <SectionWrapper id="use-cases" bg="white">
      <SectionHeading
        id="use-cases"
        badge="Use Cases"
        title="Built for AI-Native Early-Career and Professional Talent"
        subtitle="Every team deploying AI agents has the same problem: they want leverage from AI, but they cannot tell who can use it safely."
      />

      <div ref={cardsRef}>
        {/* Top row — 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {topRow.map((useCase, i) => (
            <UseCaseCard
              key={useCase.title}
              useCase={useCase}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>

        {/* Bottom row — 2 cards, centered */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 mt-5 lg:mt-6 max-w-3xl mx-auto">
          {bottomRow.map((useCase, i) => (
            <UseCaseCard
              key={useCase.title}
              useCase={useCase}
              index={i + 3}
              isVisible={cardsVisible}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
