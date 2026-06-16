import { SectionWrapper, SectionHeading } from './ui';
import { useInView } from '../hooks/useInView';

const existingSystems = [
  { label: 'HRIS', desc: 'Who is employed' },
  { label: 'ATS', desc: 'Who might be hired' },
  { label: 'LMS', desc: 'What was assigned' },
  { label: 'IAM', desc: 'Which apps someone can access' },
  { label: 'L&D', desc: 'Skills that were trained' },
  { label: 'HR Analytics', desc: 'Workforce metrics' },
];

const praxisCapabilities = [
  { text: 'Which humans are ready', icon: '✓' },
  { text: 'At what autonomy level', icon: '◎' },
  { text: 'In which work context', icon: '⬡' },
  { text: 'With what proof', icon: '✦' },
];

function ExistingSystemCard({ label, desc, index }) {
  return (
    <div
      className="group relative flex items-start gap-3 rounded-xl border border-slate-200 bg-white/70 p-4 transition-all duration-300 hover:border-slate-300 hover:bg-white"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400 transition-colors group-hover:bg-slate-200 group-hover:text-slate-500">
        {label.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-500">{label}</p>
        <p className="text-xs leading-snug text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function GapIndicator() {
  return (
    <div className="relative flex flex-col items-center justify-center py-8 lg:py-0">
      {/* Vertical dashed line - mobile */}
      <svg className="block lg:hidden" width="2" height="48" aria-hidden="true">
        <line
          x1="1" y1="0" x2="1" y2="48"
          stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4"
        />
      </svg>

      {/* Gap circle */}
      <div className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
        {/* Outer ring pulse */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300 animate-[spin_20s_linear_infinite]" />
        {/* Inner background */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-100 to-slate-200" />
        {/* Question mark */}
        <span className="relative z-10 text-3xl font-black text-slate-400 md:text-4xl select-none">?</span>
      </div>

      {/* Label */}
      <p className="mt-3 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
        No System<br />Answers This
      </p>

      {/* Vertical dashed line - mobile */}
      <svg className="mt-4 block lg:hidden" width="2" height="48" aria-hidden="true">
        <line
          x1="1" y1="0" x2="1" y2="48"
          stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4"
        />
      </svg>
    </div>
  );
}

function PraxisCard() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  return (
    <div ref={ref} className="flex flex-col items-center lg:items-start">
      {/* Header label */}
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-electric-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-widest text-electric-500">
          Praxis
        </span>
      </div>

      {/* Card with gradient border */}
      <div className={`relative w-full max-w-sm rounded-2xl p-[2px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-electric-400 via-teal-400 to-electric-500 opacity-90" />

        {/* Inner content */}
        <div className="relative rounded-[14px] bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-6 md:p-7">
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-[14px] bg-gradient-to-br from-electric-500/10 via-transparent to-teal-500/10" />

          {/* Content */}
          <div className="relative z-10">
            <h4 className="mb-5 text-base font-bold text-white">
              The Missing Readiness Layer
            </h4>

            <div className="space-y-3">
              {praxisCapabilities.map((cap, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
                  style={{ transitionDelay: `${300 + i * 120}ms` }}
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-electric-500/20 text-sm text-electric-300">
                    {cap.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-200">
                    {cap.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-electric-500/10 border border-electric-500/20 px-3 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-semibold text-teal-300">
                AI Workforce Readiness — Solved
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* SVG arrows connecting sections on desktop */
function ConnectingArrows() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {/* Left arrow: Existing Systems → Gap */}
      <svg
        className="absolute left-[31%] top-1/2 -translate-y-1/2"
        width="80" height="40"
        viewBox="0 0 80 40"
        fill="none"
      >
        <path
          d="M0 20 H60"
          stroke="#cbd5e1"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M55 12 L67 20 L55 28"
          stroke="#94a3b8"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Right arrow: Gap → Praxis */}
      <svg
        className="absolute right-[31%] top-1/2 -translate-y-1/2"
        width="80" height="40"
        viewBox="0 0 80 40"
        fill="none"
      >
        <defs>
          <linearGradient id="arrow-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#3b6eff" />
          </linearGradient>
        </defs>
        <path
          d="M0 20 H60"
          stroke="url(#arrow-gradient)"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        <path
          d="M55 12 L67 20 L55 28"
          stroke="#3b6eff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function MissingLayer() {
  const [diagramRef, diagramVisible] = useInView({ threshold: 0.15 });

  return (
    <SectionWrapper id="missing-layer" bg="light">
      <SectionHeading
        id="missing-layer"
        badge="The Gap"
        title="The Existing Stack Was Built for the Old Workforce"
        subtitle="None of the current enterprise systems answer the new workforce question: what AI autonomy level is this person ready for?"
      />

      {/* Diagram container */}
      <div
        ref={diagramRef}
        className={`relative transition-all duration-700 ${diagramVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Desktop connecting arrows */}
        <ConnectingArrows />

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* ── Left: Existing Systems ── */}
          <div>
            <div className="mb-4 flex items-center gap-2 justify-center lg:justify-start">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Existing Systems
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {existingSystems.map((sys, i) => (
                <ExistingSystemCard key={sys.label} {...sys} index={i} />
              ))}
            </div>
            {/* "Insufficient" label */}
            <p className="mt-4 text-center text-xs font-medium text-slate-400 lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 border border-slate-200">
                <svg className="h-3 w-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                None measure AI readiness
              </span>
            </p>
          </div>

          {/* ── Center: Gap ── */}
          <GapIndicator />

          {/* ── Right: Praxis ── */}
          <PraxisCard />
        </div>
      </div>
    </SectionWrapper>
  );
}
