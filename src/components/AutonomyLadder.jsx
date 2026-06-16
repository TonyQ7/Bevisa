import { useState } from 'react';
import { SectionWrapper, SectionHeading } from './ui';
import { useInView } from '../hooks/useInView';

const levels = [
  {
    id: 0,
    label: 'PERSONAL AI USE',
    description:
      'Individual exploration of AI tools for personal productivity. No organizational oversight required.',
    color: 'slate-400',
    tag: 'Unmanaged',
    tagClasses: 'bg-slate-100 text-slate-600 border-slate-200',
    barBg: 'bg-slate-400',
    ringColor: 'ring-slate-400/30',
    dotBg: 'bg-slate-400',
    selectedBg: 'bg-slate-50',
    selectedBorder: 'border-slate-300',
  },
  {
    id: 1,
    label: 'CONTROLLED INTERNAL USE',
    description:
      'AI use within defined internal boundaries. Output reviewed before any external exposure.',
    color: 'blue-400',
    tag: 'Supervised',
    tagClasses: 'bg-blue-50 text-blue-600 border-blue-200',
    barBg: 'bg-blue-400',
    ringColor: 'ring-blue-400/30',
    dotBg: 'bg-blue-400',
    selectedBg: 'bg-blue-50/50',
    selectedBorder: 'border-blue-300',
  },
  {
    id: 2,
    label: 'DRAFT-FOR-APPROVAL',
    description:
      'AI-generated work products submitted for human review before deployment. Structured approval workflows.',
    color: 'purple-400',
    tag: 'Review Required',
    tagClasses: 'bg-purple-50 text-purple-600 border-purple-200',
    barBg: 'bg-purple-400',
    ringColor: 'ring-purple-400/30',
    dotBg: 'bg-purple-400',
    selectedBg: 'bg-purple-50/50',
    selectedBorder: 'border-purple-300',
  },
  {
    id: 3,
    label: 'INDEPENDENT LOW-RISK EXECUTION',
    description:
      'Autonomous execution of AI workflows in low-risk domains. Judgment verified through simulation evidence.',
    color: 'teal-400',
    tag: 'Verified',
    tagClasses: 'bg-teal-50 text-teal-600 border-teal-200',
    barBg: 'bg-teal-400',
    ringColor: 'ring-teal-400/30',
    dotBg: 'bg-teal-400',
    selectedBg: 'bg-teal-50/50',
    selectedBorder: 'border-teal-300',
  },
  {
    id: 4,
    label: 'SUPERVISED MULTI-AGENT OPERATION',
    description:
      'Management of multiple AI agents across workflows. Requires proven risk judgment and escalation capability.',
    color: 'electric-400',
    tag: 'Advanced',
    tagClasses: 'bg-electric-50 text-electric-600 border-electric-200',
    barBg: 'bg-electric-400',
    ringColor: 'ring-electric-400/30',
    dotBg: 'bg-electric-400',
    selectedBg: 'bg-electric-50/50',
    selectedBorder: 'border-electric-300',
  },
  {
    id: 5,
    label: 'AI WORKFLOW LEAD',
    description:
      'Full ownership of AI-agent workflow design, deployment, and optimization. Strategic AI workforce leadership.',
    color: 'gradient',
    tag: 'Leadership',
    tagClasses:
      'bg-gradient-to-r from-electric-500 to-teal-500 text-white border-transparent',
    barBg: 'bg-gradient-to-r from-electric-500 to-teal-500',
    ringColor: 'ring-electric-400/30',
    dotBg: 'bg-gradient-to-r from-electric-500 to-teal-500',
    selectedBg: 'bg-gradient-to-br from-electric-50/60 to-teal-50/60',
    selectedBorder: 'border-electric-300',
  },
];

/* Width percentages for the pyramid effect — smallest at L0, widest at L5 */
const barWidths = ['40%', '52%', '64%', '76%', '88%', '100%'];

function LevelBar({ level, isSelected, onClick, index, isVisible }) {
  const selected = isSelected;

  return (
    <button
      onClick={() => onClick(level.id)}
      className={`
        group relative flex items-center gap-3 md:gap-4 w-full text-left
        rounded-xl px-3 py-2.5 md:px-4 md:py-3
        transition-all duration-300 ease-out cursor-pointer
        ${selected
          ? `${level.selectedBg} ${level.selectedBorder} border-2 shadow-md ring-2 ${level.ringColor}`
          : 'border-2 border-transparent hover:bg-slate-50 hover:border-slate-200'
        }
      `}
      style={{
        transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out, background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
      }}
      aria-pressed={selected}
    >
      {/* Level number */}
      <span
        className={`
          flex-shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center
          text-xs font-bold font-mono transition-colors duration-300
          ${selected
            ? level.color === 'gradient'
              ? 'bg-gradient-to-br from-electric-500 to-teal-500 text-white'
              : `${level.barBg} text-white`
            : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
          }
        `}
      >
        L{level.id}
      </span>

      {/* Bar visualization */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-[11px] md:text-xs font-semibold tracking-wide truncate transition-colors duration-300 ${
              selected ? 'text-navy-900' : 'text-slate-600 group-hover:text-navy-800'
            }`}
          >
            {level.label}
          </span>
          {/* Tag — shown inline on the bar, visible on lg+ */}
          <span
            className={`hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all duration-300 ${level.tagClasses}`}
          >
            {level.tag}
          </span>
        </div>
        {/* Visual bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${level.barBg} ${
              selected ? 'opacity-100' : 'opacity-50 group-hover:opacity-75'
            }`}
            style={{ width: barWidths[level.id] }}
          />
        </div>
      </div>

      {/* Selection indicator */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${
          selected ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-electric-500"
        >
          <path
            d="M7 10L9 12L13 8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  );
}

function DetailPanel({ level }) {
  return (
    <div
      key={level.id}
      className="h-full flex flex-col justify-center animate-fade-in"
    >
      {/* Header */}
      <div className="mb-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border mb-4 ${level.tagClasses}`}
        >
          {level.tag}
        </span>
        <div className="flex items-baseline gap-3 mb-2">
          <span
            className={`text-4xl md:text-5xl font-black font-mono tracking-tighter ${
              level.color === 'gradient' ? 'gradient-text' : 'text-navy-900'
            }`}
          >
            L{level.id}
          </span>
          <div
            className={`h-1 flex-1 rounded-full ${level.barBg} opacity-30`}
          />
        </div>
        <h3
          className={`text-xl md:text-2xl font-bold tracking-tight ${
            level.color === 'gradient' ? 'gradient-text' : 'text-navy-900'
          }`}
        >
          {level.label}
        </h3>
      </div>

      {/* Description */}
      <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
        {level.description}
      </p>

      {/* Autonomy meter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-slate-500 uppercase tracking-wider">
            Autonomy Level
          </span>
          <span className="text-navy-800 font-bold">
            {Math.round((level.id / 5) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${level.barBg}`}
            style={{ width: `${Math.max((level.id / 5) * 100, 5)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 font-medium">
          <span>Manual</span>
          <span>Fully Autonomous</span>
        </div>
      </div>

      {/* Context row */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
          <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Oversight
          </span>
          <span className="text-sm font-semibold text-navy-800">
            {level.id <= 1
              ? 'Full supervision'
              : level.id <= 3
              ? 'Structured review'
              : 'Exception-based'}
          </span>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
          <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Evidence
          </span>
          <span className="text-sm font-semibold text-navy-800">
            {level.id <= 1
              ? 'Not required'
              : level.id <= 3
              ? 'Simulation-based'
              : 'Portfolio proven'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AutonomyLadder() {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [ladderRef, ladderVisible] = useInView({ threshold: 0.1 });

  const activeLevel = levels.find((l) => l.id === selectedLevel);

  return (
    <SectionWrapper id="autonomy-ladder" bg="white">
      <SectionHeading
        id="autonomy-ladder"
        badge="Autonomy Ladder"
        title="Autonomy Is a Workforce Capability, Not a Tool Permission"
        subtitle="Earned through evidence, not granted because a tool exists. The Autonomy Ladder makes the category concrete."
      />

      <div
        ref={ladderRef}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
      >
        {/* Left: Ladder */}
        <div className="space-y-2 order-2 lg:order-1">
          {/* Render levels in reverse (L5 at top, L0 at bottom) for ascending visual */}
          {[...levels].reverse().map((level, index) => (
            <LevelBar
              key={level.id}
              level={level}
              isSelected={selectedLevel === level.id}
              onClick={setSelectedLevel}
              index={index}
              isVisible={ladderVisible}
            />
          ))}

          {/* Scale label */}
          <div className="flex items-center justify-between pt-2 px-4">
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              ↑ Higher autonomy
            </span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
              Lower autonomy ↓
            </span>
          </div>
        </div>

        {/* Right: Detail panel */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-28">
          <div
            className={`rounded-2xl border border-slate-200 bg-white p-6 md:p-8 lg:p-10 shadow-sm transition-all duration-500 ${
              ladderVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            {activeLevel && <DetailPanel level={activeLevel} />}
          </div>
        </div>
      </div>

      {/* Bottom callout */}
      <div className="mt-16 text-center">
        <p className="text-sm text-slate-500 max-w-xl mx-auto">
          Each level is{' '}
          <span className="font-semibold text-navy-800">earned through evidence</span>,
          not assumed from tool access. Praxis certifies where each professional
          stands — and where they're ready to go.
        </p>
      </div>
    </SectionWrapper>
  );
}
