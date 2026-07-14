import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { useLocale } from '../components/LocaleProvider'

export function Stack(): JSX.Element {
  const { copy } = useLocale()

  return (
    <SectionShell labelledBy="stack-title">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">{copy.stack.eyebrow}</p>
            <h2 id="stack-title" className="section-heading">
              {copy.stack.title}
            </h2>
            <p className="lede">{copy.stack.body}</p>
          </div>
          <div className="border border-graphite/25 p-5 sm:p-8">
            <svg className="h-auto w-full" viewBox="0 0 760 300" role="img" aria-labelledby="stack-diagram-title stack-diagram-desc">
              <title id="stack-diagram-title">{copy.stack.title}</title>
              <desc id="stack-diagram-desc">{copy.stack.body}</desc>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0,0 L8,4 L0,8" fill="var(--sigill)" />
                </marker>
              </defs>
              <g fill="none" stroke="var(--paper-line)" strokeWidth="1">
                <rect x="20" y="55" width="190" height="62" />
                <rect x="20" y="182" width="190" height="62" />
                <rect x="285" y="89" width="190" height="122" stroke="var(--sigill)" strokeWidth="2" />
                <rect x="550" y="55" width="190" height="62" />
                <rect x="550" y="182" width="190" height="62" />
                <path d="M210 86 H278" stroke="var(--sigill)" markerEnd="url(#arrow)" />
                <path d="M210 213 H278" stroke="var(--sigill)" markerEnd="url(#arrow)" />
                <path d="M475 120 H543" stroke="var(--sigill)" markerEnd="url(#arrow)" />
                <path d="M475 181 H543" stroke="var(--sigill)" markerEnd="url(#arrow)" />
              </g>
              <g fill="var(--graphite)" fontFamily="Spline Sans Mono" fontSize="11" letterSpacing="1">
                <text x="20" y="34">{copy.stack.inputLabel}</text>
                <text x="550" y="34">{copy.stack.outputLabel}</text>
                <text x="115" y="90" textAnchor="middle">{copy.stack.inputs[0]}</text>
                <text x="115" y="217" textAnchor="middle">{copy.stack.inputs[1]}</text>
                <text x="645" y="90" textAnchor="middle">{copy.stack.outputs[0]}</text>
                <text x="645" y="217" textAnchor="middle">{copy.stack.outputs[1]}</text>
              </g>
              <g fill="var(--ink)" fontFamily="Familjen Grotesk" fontWeight="700">
                <text x="380" y="143" textAnchor="middle" fontSize="24">BEVISA</text>
                <text x="380" y="169" textAnchor="middle" fontFamily="Spline Sans Mono" fontSize="10" fontWeight="400" letterSpacing="1">{copy.stack.center}</text>
              </g>
            </svg>
            <p className="mono mt-5 border-t hairline pt-5 text-center text-[0.68rem] tracking-[0.06em] text-graphite">
              {copy.stack.conclusion}
            </p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}
