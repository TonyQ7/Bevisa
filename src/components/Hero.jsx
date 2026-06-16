import { Button, Badge } from './ui';
import { useInView } from '../hooks/useInView';

function PassportCard() {
  return (
    <div className="animate-float relative">
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-electric-500/20 via-teal-500/15 to-purple-500/20 rounded-3xl blur-2xl" />

      {/* Card */}
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-2xl shadow-navy-900/10">
        {/* Gradient border top */}
        <div className="h-1 bg-gradient-to-r from-electric-500 via-teal-400 to-purple-500" />

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-electric-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-sm font-bold tracking-wider uppercase text-navy-900">
                AI Work Passport
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className="text-xs font-semibold text-emerald-600">Verified</span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-electric-500 to-teal-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">SA</span>
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div>
              <h4 className="text-base font-bold text-navy-900">Sarah Anderson</h4>
              <p className="text-sm text-slate-500">Financial Analyst</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

          {/* Autonomy Level */}
          <div className="mb-5">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Autonomy Level</p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-teal-50 border border-teal-200">
                <span className="text-base font-extrabold text-teal-600">L3</span>
              </span>
              <div>
                <p className="text-sm font-semibold text-navy-800">Independent Low-Risk Execution</p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-1.5 rounded-full bg-teal-400" />
                  ))}
                  {[4, 5].map((i) => (
                    <div key={i} className="w-6 h-1.5 rounded-full bg-slate-100" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-5" />

          {/* Domain Badges */}
          <div>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2.5">Verified Domains</p>
            <div className="flex flex-wrap gap-2">
              {['Financial Analysis', 'Risk Assessment', 'Client Reports'].map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-navy-700"
                >
                  <svg className="w-3 h-3 text-electric-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="px-6 md:px-8 py-3 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Praxis Protocol v2.1</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-medium text-slate-400">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [ref, isVisible] = useInView({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background pattern - subtle dots */}
      <div className="absolute inset-0 pattern-dots opacity-40" />

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-electric-50/30 to-white" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-electric-200/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-teal-200/15 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Copy */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="mb-6">
              <Badge variant="default" className="gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-electric-500 animate-pulse" />
                AI Workforce Readiness Infrastructure
              </Badge>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="gradient-text-navy">License Humans</span>
              <br />
              <span className="text-navy-900">for the Age of</span>
              <br />
              <span className="text-navy-900">Digital Labor</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              Praxis is the AI workforce readiness infrastructure that proves
              which humans can safely operate AI-agent workflows — at what
              autonomy level, in which work context, with verified evidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="#contact" size="lg">
                Request a Demo
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Button>
              <Button href="#passport" variant="secondary" size="lg">
                Explore the AI Work Passport
              </Button>
            </div>

            {/* Social proof hint */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['bg-electric-500', 'bg-teal-500', 'bg-purple-500', 'bg-navy-600'].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full ${bg} border-2 border-white flex items-center justify-center`}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {['JM', 'KL', 'RN', 'TS'][i]}
                      </span>
                    </div>
                  )
                )}
              </div>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-navy-800">2,400+</span> professionals certified
              </p>
            </div>
          </div>

          {/* Right column - Passport Card */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="w-full max-w-md">
              <PassportCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
