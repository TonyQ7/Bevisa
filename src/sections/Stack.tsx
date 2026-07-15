import { Reveal } from '../components/Reveal'
import { SectionShell } from '../components/SectionShell'
import { useLocale } from '../components/LocaleProvider'

export function Stack(): JSX.Element {
  const { copy } = useLocale()

  return (
    <SectionShell compact id="stack" labelledBy="stack-title">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow">{copy.stack.eyebrow}</p>
            <h2 id="stack-title" className="section-heading">
              {copy.stack.title}
            </h2>
            <p className="lede">{copy.stack.body}</p>
          </div>
          <div className="border hairline-strong bg-[var(--paper-raised)] p-5 sm:p-8">
            <svg className="h-auto w-full" viewBox="0 0 760 320" role="img" aria-labelledby="stack-diagram-title stack-diagram-desc">
              <title id="stack-diagram-title">{copy.stack.title}</title>
              <desc id="stack-diagram-desc">{copy.stack.body}</desc>
              <defs>
                <marker id="arrow" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                  <path d="M0,0 L9,4.5 L0,9" fill="var(--sigill)" />
                </marker>
              </defs>
              <g fill="var(--arkiv)" stroke="var(--paper-line-strong)" strokeWidth="1.5">
                <rect x="16" y="58" width="196" height="64" />
                <rect x="16" y="190" width="196" height="64" />
                <rect x="548" y="58" width="196" height="64" />
                <rect x="548" y="190" width="196" height="64" />
              </g>
              <g fill="none" stroke="var(--sigill)" strokeWidth="2.5">
                <path d="M212 90 C258 90 258 128 296 132" markerEnd="url(#arrow)" />
                <path d="M212 222 C258 222 258 184 296 180" markerEnd="url(#arrow)" />
                <path d="M464 132 C502 128 502 90 540 90" markerEnd="url(#arrow)" />
                <path d="M464 180 C502 184 502 222 540 222" markerEnd="url(#arrow)" />
              </g>
              <g aria-hidden="true">
                <rect x="232" y="82" width="12" height="12" fill="var(--sigill)" />
                <rect x="252" y="96" width="12" height="12" fill="var(--expiry)" />
                <rect x="232" y="214" width="12" height="12" fill="var(--sigill)" />
                <rect x="252" y="200" width="12" height="12" fill="var(--saknas)" />
              </g>
              <rect x="296" y="86" width="168" height="140" fill="var(--ink)" />
              <g aria-hidden="true">
                <rect x="316" y="176" width="30" height="20" fill="var(--sigill-light)" />
                <rect x="352" y="176" width="30" height="20" fill="var(--sigill-light)" />
                <rect x="388" y="176" width="30" height="20" fill="var(--expiry-light)" />
                <rect x="424" y="176" width="20" height="20" fill="var(--saknas-light)" />
              </g>
              <g fill="var(--graphite)" fontFamily="Spline Sans Mono" fontSize="12" letterSpacing="1">
                <text x="16" y="36">{copy.stack.inputLabel}</text>
                <text x="548" y="36">{copy.stack.outputLabel}</text>
                <text x="114" y="95" textAnchor="middle">{copy.stack.inputs[0]}</text>
                <text x="114" y="227" textAnchor="middle">{copy.stack.inputs[1]}</text>
                <text x="646" y="95" textAnchor="middle">{copy.stack.outputs[0]}</text>
                <text x="646" y="227" textAnchor="middle">{copy.stack.outputs[1]}</text>
                <text x="232" y="66" fontSize="10">{copy.stack.evidence}</text>
              </g>
              <g fill="var(--arkiv)" fontFamily="Familjen Grotesk" fontWeight="700">
                <text x="380" y="128" textAnchor="middle" fontSize="26">BEVISA</text>
                <text x="380" y="152" textAnchor="middle" fontFamily="Spline Sans Mono" fontSize="10" fontWeight="400" letterSpacing="1.5">{copy.stack.center}</text>
              </g>
            </svg>
            <p className="mono mt-5 border-t hairline-strong pt-5 text-center text-[0.68rem] tracking-[0.06em] text-graphite">
              {copy.stack.conclusion}
            </p>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}
