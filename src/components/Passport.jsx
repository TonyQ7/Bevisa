import { SectionWrapper, SectionHeading } from './ui';
import { useInView } from '../hooks/useInView';

/* ─── Inline SVG Icons ─── */

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const LayersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const BuildingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="9" y1="6" x2="9.01" y2="6" />
    <line x1="15" y1="6" x2="15.01" y2="6" />
    <line x1="9" y1="10" x2="9.01" y2="10" />
    <line x1="15" y1="10" x2="15.01" y2="10" />
    <line x1="9" y1="14" x2="9.01" y2="14" />
    <line x1="15" y1="14" x2="15.01" y2="14" />
    <path d="M9 18h6v4H9z" />
  </svg>
);

/* ─── Feature data ─── */

const features = [
  {
    icon: ShieldIcon,
    title: 'VERIFIED SIMULATIONS',
    description: 'Evidence from realistic AI-agent work scenarios, not self-assessment.',
  },
  {
    icon: GridIcon,
    title: 'APPROVED WORKFLOW DOMAINS',
    description: 'Specific work contexts where readiness has been proven.',
  },
  {
    icon: LayersIcon,
    title: 'AUTONOMY LEVEL',
    description: 'The precise level of AI-agent work this person is cleared for.',
  },
  {
    icon: AlertTriangleIcon,
    title: 'RISK JUDGMENT',
    description: 'Demonstrated ability to identify and manage risk in AI outputs.',
  },
  {
    icon: ArrowUpIcon,
    title: 'ESCALATION QUALITY',
    description: 'Measured skill in knowing when and how to escalate decisions.',
  },
  {
    icon: BuildingIcon,
    title: 'EMPLOYER-RECOGNIZED PROOF',
    description: 'Evidence that is legible, portable, and trusted by enterprise buyers.',
  },
];

/* ─── Feature Item ─── */

function FeatureItem({ feature, index }) {
  const [ref, isVisible] = useInView({ threshold: 0.15 });
  const Icon = feature.icon;

  return (
    <div
      ref={ref}
      className={`reveal-left ${isVisible ? 'visible' : ''} flex items-start gap-4 pl-4 border-l-2 border-teal-400/40 hover:border-teal-400 transition-colors duration-300`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-teal-400/10 text-teal-400 flex items-center justify-center">
        <Icon />
      </div>
      <div>
        <h3 className="text-sm font-bold text-white tracking-wide mb-1">
          {feature.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
}

/* ─── Passport Card Visualization ─── */

function PassportCard() {
  const [ref, isVisible] = useInView({ threshold: 0.2 });

  const domains = ['Procurement Automation', 'Vendor Assessment', 'System Integration'];

  return (
    <div
      ref={ref}
      className={`reveal-right ${isVisible ? 'visible' : ''} relative`}
    >
      {/* Glow effect behind the card */}
      <div className="absolute -inset-4 bg-gradient-to-br from-electric-500/20 via-teal-500/10 to-purple-500/15 rounded-3xl blur-2xl animate-pulse-glow" />

      {/* Card with gradient border */}
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-br from-electric-400 via-teal-400 to-purple-500">
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 p-6 md:p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Praxis logo mark */}
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-500 to-teal-500 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <div>
                <span className="block text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Praxis
                </span>
                <span className="block text-xs font-bold tracking-[0.15em] text-white uppercase">
                  AI Work Passport
                </span>
              </div>
            </div>
            {/* Status badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                Verified
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          {/* Person info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-500 to-teal-500 flex items-center justify-center flex-shrink-0 ring-2 ring-white/10 ring-offset-2 ring-offset-navy-900">
              <span className="text-lg font-bold text-white">JM</span>
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                James Mitchell
              </h4>
              <p className="text-xs text-slate-400">Operations Analyst</p>
            </div>
          </div>

          {/* Autonomy Level */}
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Autonomy Level
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/15 text-teal-400 text-sm font-bold border border-teal-500/20">
                  L4
                </span>
              </div>
            </div>
            <p className="text-sm text-white font-medium mt-1.5">
              Supervised Multi-Agent Operation
            </p>
          </div>

          {/* Verified Domains */}
          <div className="mb-4">
            <span className="block text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2.5">
              Verified Domains
            </span>
            <div className="flex flex-wrap gap-2">
              {domains.map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-xs text-slate-300 font-medium"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Risk Judgment Score */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
              <span className="block text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2">
                Risk Judgment
              </span>
              <div className="flex items-end gap-2">
                <span className="text-lg font-bold text-white">87%</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-electric-500 to-teal-400 transition-all duration-1000 ease-out"
                  style={{ width: '87%' }}
                />
              </div>
            </div>

            {/* Escalation Rating */}
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3">
              <span className="block text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-2">
                Escalation Rating
              </span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-electric-500/20 to-teal-500/20 text-xl font-bold text-white border border-white/10">
                  A
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <div>
              <span className="block text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
                Issue Date
              </span>
              <span className="text-xs text-slate-300 font-mono">2025-06-15</span>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-[10px] font-semibold tracking-wider text-teal-400 uppercase">
                Blockchain Secured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent dots */}
      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-electric-500/30 blur-sm animate-float" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-teal-500/30 blur-sm animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
}

/* ─── Main Section ─── */

export default function Passport() {
  return (
    <SectionWrapper id="passport" bg="gradient">
      <SectionHeading
        id="passport"
        badge="AI Work Passport"
        title="The Next Enterprise Credential"
        subtitle="A resume says what someone claims they can do. A certificate says they sat through content. Praxis proves what they can safely do with AI."
        dark
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left column — feature list */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureItem key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Right column — passport card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <PassportCard />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
