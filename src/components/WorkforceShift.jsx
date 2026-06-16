import { SectionWrapper, SectionHeading, Card, Badge, IconBox } from './ui';
import { useInView } from '../hooks/useInView';

const MonitorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
  </svg>
);

const NetworkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2.5" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="19" cy="19" r="2.5" />
    <line x1="12" y1="7.5" x2="5" y2="16.5" />
    <line x1="12" y1="7.5" x2="19" y2="16.5" />
    <line x1="7.5" y1="19" x2="16.5" y2="19" />
  </svg>
);

const ArrowConnector = () => (
  <div className="hidden md:flex items-center justify-center flex-shrink-0 w-16 lg:w-20 self-center">
    <svg width="100%" height="24" viewBox="0 0 80 24" fill="none" className="text-slate-300">
      <line x1="0" y1="12" x2="64" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M62 6L74 12L62 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const ArrowConnectorVertical = () => (
  <div className="flex md:hidden items-center justify-center py-4">
    <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="text-slate-300">
      <line x1="12" y1="0" x2="12" y2="36" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M6 34L12 46L18 34" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const steps = [
  {
    era: '2015–2020',
    label: 'Software User',
    icon: MonitorIcon,
    description: 'Employees use software tools to execute work manually.',
    iconVariant: 'navy',
    accentColor: 'slate',
    borderColor: 'border-slate-200',
    badgeVariant: 'navy',
    number: '01',
  },
  {
    era: '2020–2025',
    label: 'AI Assistant User',
    icon: SparkleIcon,
    description: 'Employees prompt AI assistants to accelerate tasks.',
    iconVariant: 'purple',
    accentColor: 'purple',
    borderColor: 'border-purple-200',
    badgeVariant: 'purple',
    number: '02',
  },
  {
    era: '2025–2030',
    label: 'AI Workflow Operator',
    icon: NetworkIcon,
    description: 'Employees direct, verify, constrain, and escalate AI-agent work.',
    iconVariant: 'gradient',
    accentColor: 'electric',
    borderColor: 'border-electric-300',
    badgeVariant: 'default',
    highlighted: true,
    number: '03',
  },
];

function StepCard({ step, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  const Icon = step.icon;

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card
        hover={true}
        gradient={step.highlighted}
        className={`relative flex-1 ${step.highlighted
          ? 'ring-2 ring-electric-400/30 shadow-lg shadow-electric-500/10 scale-[1.02] md:scale-105'
          : ''
        }`}
      >
        {/* Highlighted badge */}
        {step.highlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-gradient-to-r from-electric-500 to-teal-500 text-white shadow-md shadow-electric-500/25">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              The Future
            </span>
          </div>
        )}

        {/* Step number */}
        <span className={`text-xs font-mono font-bold tracking-wider ${
          step.highlighted ? 'text-electric-500' : 'text-slate-400'
        }`}>
          {step.number}
        </span>

        {/* Icon */}
        <div className="mt-4 mb-5">
          <IconBox variant={step.iconVariant} size="lg">
            <Icon />
          </IconBox>
        </div>

        {/* Era badge */}
        <Badge variant={step.badgeVariant} className="mb-3">
          {step.era}
        </Badge>

        {/* Label */}
        <h3 className={`text-lg font-bold tracking-tight mb-2 ${
          step.highlighted ? 'gradient-text' : 'text-navy-900'
        }`}>
          {step.label}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {step.description}
        </p>

        {/* Bottom accent bar */}
        <div className={`mt-6 h-1 rounded-full ${
          step.highlighted
            ? 'bg-gradient-to-r from-electric-500 to-teal-500'
            : step.accentColor === 'purple'
              ? 'bg-purple-200'
              : 'bg-slate-200'
        }`} />
      </Card>
    </div>
  );
}

export default function WorkforceShift() {
  const [progressRef, progressVisible] = useInView({ threshold: 0.3 });

  return (
    <SectionWrapper id="workforce-shift" bg="light">
      <SectionHeading
        id="workforce-shift"
        badge="The Shift"
        title="The Next Enterprise Credential Is Not the Resume"
        subtitle="By 2028, high-performing employees will supervise workflows carried out by AI agents. That creates a new class of worker — the AI-native operator."
      />

      {/* Progress bar – desktop */}
      <div
        ref={progressRef}
        className="hidden md:block max-w-2xl mx-auto mb-12"
      >
        <div className="relative h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-slate-400 via-purple-400 to-electric-500 transition-all duration-1000 ease-out"
            style={{ width: progressVisible ? '100%' : '0%' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[11px] font-medium text-slate-500">Past</span>
          <span className="text-[11px] font-medium text-slate-500">Present</span>
          <span className="text-[11px] font-semibold text-electric-500">Future</span>
        </div>
      </div>

      {/* Timeline cards */}
      <div className="flex flex-col md:flex-row items-stretch justify-center gap-0 md:gap-0">
        {steps.map((step, index) => (
          <div key={step.label} className="flex flex-col md:flex-row items-stretch">
            {/* Card */}
            <div className="flex-1 min-w-0 md:max-w-xs lg:max-w-sm">
              <StepCard step={step} index={index} />
            </div>

            {/* Arrow connector (not after last card) */}
            {index < steps.length - 1 && (
              <>
                <ArrowConnector />
                <ArrowConnectorVertical />
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom callout */}
      <div className="mt-16 text-center">
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Praxis certifies professionals for the <span className="font-semibold text-navy-800">third era</span> — turning AI-curious employees into verified AI-native operators.
        </p>
      </div>
    </SectionWrapper>
  );
}
