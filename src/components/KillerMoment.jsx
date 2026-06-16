import { SectionWrapper, SectionHeading } from './ui';
import { useInView } from '../hooks/useInView';

const outcomes = [
  {
    status: 'READY NOW',
    color: 'emerald',
    bgClass: 'bg-emerald-500/10 border-emerald-500/30',
    glowClass: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    labelClass: 'text-emerald-400',
    dotClass: 'bg-emerald-400',
    iconBg: 'bg-emerald-500/20',
    description: 'Full autonomous execution cleared for this workflow.',
    selected: true,
    icon: (
      <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
  },
  {
    status: 'NEEDS APPROVAL',
    color: 'blue',
    bgClass: 'bg-blue-500/10 border-blue-500/20',
    glowClass: '',
    labelClass: 'text-blue-400',
    dotClass: 'bg-blue-400',
    iconBg: 'bg-blue-500/20',
    description: 'Capable but requires supervisor sign-off before deployment.',
    selected: false,
    icon: (
      <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    status: 'DRAFT-ONLY',
    color: 'yellow',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
    glowClass: '',
    labelClass: 'text-amber-400',
    dotClass: 'bg-amber-400',
    iconBg: 'bg-amber-500/20',
    description: 'Can produce draft outputs. All work must be reviewed.',
    selected: false,
    icon: (
      <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
  },
  {
    status: 'NEEDS TRAINING',
    color: 'orange',
    bgClass: 'bg-orange-500/10 border-orange-500/20',
    glowClass: '',
    labelClass: 'text-orange-400',
    dotClass: 'bg-orange-400',
    iconBg: 'bg-orange-500/20',
    description: 'Skill gaps identified. Targeted simulation path required.',
    selected: false,
    icon: (
      <svg className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    status: 'NOT CLEARED',
    color: 'red',
    bgClass: 'bg-red-500/10 border-red-500/20',
    glowClass: '',
    labelClass: 'text-red-400',
    dotClass: 'bg-red-400',
    iconBg: 'bg-red-500/20',
    description: 'Not ready for this workflow. Access restricted.',
    selected: false,
    icon: (
      <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
];

function ScenarioCard({ isVisible }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/5 p-5 md:p-6 backdrop-blur-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Person info */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric-400 to-teal-400 text-lg font-bold text-white">
            EC
          </div>
          <div>
            <p className="text-base font-semibold text-white">Emma Chen</p>
            <p className="text-sm text-slate-400">Graduate Analyst</p>
          </div>
        </div>

        {/* Workflow */}
        <div className="flex flex-col gap-2 sm:items-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-500">Workflow</span>
          </div>
          <p className="text-sm font-semibold text-electric-300">Customer-Facing Financial Analysis</p>
        </div>
      </div>

      {/* Tools row */}
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-white/5 pt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500 mr-1">Current Tools</span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
          <svg className="h-3 w-3 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
          </svg>
          AI Financial Assistant
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300">
          <svg className="h-3 w-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Report Generator
        </span>
      </div>
    </div>
  );
}

function DecisionDivider({ isVisible }) {
  return (
    <div
      className={`relative flex items-center gap-4 py-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />
      <div className="flex items-center gap-2 rounded-full border border-electric-500/30 bg-electric-500/10 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-electric-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-electric-300 font-mono">
          Praxis Decision
        </span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />
    </div>
  );
}

function OutcomeCard({ outcome, index }) {
  const { status, bgClass, glowClass, labelClass, dotClass, iconBg, description, selected, icon } = outcome;

  return (
    <div
      className={`
        relative flex flex-col rounded-xl border p-4 transition-all duration-500
        ${bgClass}
        ${selected ? `${glowClass} ring-1 ring-emerald-500/40 scale-[1.03]` : 'hover:bg-white/5'}
      `}
      style={{ transitionDelay: `${300 + index * 100}ms` }}
    >
      {/* Selected indicator */}
      {selected && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/30">
            <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Selected
          </span>
        </div>
      )}

      {/* Icon + Status */}
      <div className="flex items-center gap-3 mb-3 mt-1">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`h-1.5 w-1.5 rounded-full ${dotClass} ${selected ? 'animate-pulse' : ''}`} />
          <span className={`text-xs font-bold uppercase tracking-wider font-mono ${labelClass}`}>
            {status}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs leading-relaxed text-slate-400 flex-1">
        {description}
      </p>
    </div>
  );
}

export default function KillerMoment() {
  const [panelRef, panelVisible] = useInView({ threshold: 0.1 });

  return (
    <SectionWrapper id="killer-moment" bg="gradient">
      <SectionHeading
        id="killer-moment"
        badge="The Decision Point"
        title="The Control Point for the AI-Native Workforce"
        subtitle="A graduate analyst wants to use an AI workflow for customer-facing financial analysis. The old answer is binary access: does she have the tool or not?"
        dark
      />

      {/* Product mock panel */}
      <div
        ref={panelRef}
        className={`relative mx-auto max-w-5xl transition-all duration-700 ${panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Outer glow */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-electric-500/20 via-transparent to-teal-500/20 blur-xl" />

        {/* Panel container */}
        <div className="relative rounded-2xl border border-white/10 bg-navy-950/80 backdrop-blur-xl shadow-2xl shadow-black/30 overflow-hidden">
          {/* Top bar – simulated window chrome */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
            <span className="ml-4 text-[11px] font-mono text-slate-500 tracking-wide">
              praxis / workforce-readiness / decision-engine
            </span>
          </div>

          {/* Panel body */}
          <div className="p-5 md:p-8">
            {/* Question prompt */}
            <div className={`mb-6 flex items-center gap-3 transition-all duration-500 ${panelVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric-500/15">
                <svg className="h-4 w-4 text-electric-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-slate-300">
                <span className="text-white">Can this person</span>{' '}
                operate this AI workflow?
              </p>
            </div>

            {/* Scenario card */}
            <ScenarioCard isVisible={panelVisible} />

            {/* Decision divider */}
            <DecisionDivider isVisible={panelVisible} />

            {/* Outcome cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {outcomes.map((outcome, i) => (
                <OutcomeCard
                  key={outcome.status}
                  outcome={outcome}
                  index={i}
                  isVisible={panelVisible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concluding line */}
      <p className="mt-14 text-center text-xl md:text-2xl font-bold text-white max-w-3xl mx-auto leading-snug">
        That decision becomes the control point for the AI-native workforce.
      </p>
    </SectionWrapper>
  );
}
