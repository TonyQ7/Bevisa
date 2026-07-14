import { EvidenceHealth } from './EvidenceHealth'
import { HowItWorks } from './HowItWorks'
import { Offer } from './Offer'
import { Problem } from './Problem'
import { Sovereignty } from './Sovereignty'
import { Stack } from './Stack'

export function Narrative(): JSX.Element {
  return (
    <>
      <Problem />
      <HowItWorks />
      <EvidenceHealth />
      <Sovereignty />
      <Stack />
      <Offer />
    </>
  )
}
