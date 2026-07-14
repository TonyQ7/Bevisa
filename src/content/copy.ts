export const SITE_NAME = 'Bevisa'
export const CANONICAL_URL = 'https://tonyq7.github.io/Bevisa/'
export const PLANNED_CONTACT_EMAIL = 'founders@bevisa.se'

export const SOURCES = {
  bidders2024:
    'https://www.upphandlingsmyndigheten.se/statistik/upphandlingsstatistik/statistik-om-annonserade-upphandlingar-2024/46-anbud-per-upphandling-2024/',
  supplierSurvey2025:
    'https://www.upphandlingsmyndigheten.se/statistik/nationella-upphandlingsenkaten/nationella-upphandlingsenkaten-riktad-mot-leverantorer/en-mangfald-av-leverantorer-och-en-valfungerande-konkurrens-2025/',
  procurementValue2025:
    'https://www.upphandlingsmyndigheten.se/statistik/upphandlingsstatistik/statistik-om-annonserade-upphandlingar-2025/annonserade-upphandlingar-for-982-miljarder-kronor-2025/',
  cloudPolicy2026:
    'https://www.regeringen.se/pressmeddelanden/2026/05/ny-molnpolicy-ska-bidra-till-okad-digital-suveranitet-i-offentlig-forvaltning/',
} as const

export const LEGAL_NOTICE =
  'Bevisa provides decision support for private bidders. Our assessments are limited to the defined scope and evidence period, are not legal advice, not a compliance certification, and not a guarantee of contract award.'

export type Locale = 'en' | 'sv'

export interface StatCopy {
  id: 'bidders' | 'bids' | 'complexity'
  value: string
  label: string
  sourceLabel: string
  sourceUrl: string
}

export interface PipelineBeat {
  id: 'ingest' | 'extract' | 'map' | 'draft' | 'approve'
  number: string
  title: string
  body: string
  signal: string
}

export interface LocalizedCopy {
  locale: Locale
  meta: { title: string; description: string }
  common: {
    skip: string
    source: string
    pending: string
    copied: string
    copyEmail: string
    externalLink: string
    languageLabel: string
    english: string
    swedish: string
  }
  nav: {
    label: string
    problem: string
    process: string
    health: string
    sovereignty: string
    offer: string
    book: string
    openMenu: string
    closeMenu: string
  }
  hero: {
    eyebrow: string
    title: string
    body: string
    book: string
    sample: string
    scrollPrefix: string
    sceneDescription: string
    interactionHint: string
  }
  problem: {
    eyebrow: string
    title: string
    body: string
    stats: readonly StatCopy[]
    context: string
    contextQualifier: string
  }
  pipeline: {
    eyebrow: string
    title: string
    intro: string
    steps: readonly PipelineBeat[]
    sceneDescription: string
    requirementCount: string
    ambiguous: string
    owner: string
    draft: string
    citationOne: string
    citationTwo: string
    approval: string
    export: string
  }
  health: {
    eyebrow: string
    title: string
    body: string
    filterLabel: string
    filters: { all: string; urgent: string; quarter: string }
    columns: { evidence: string; owner: string; status: string }
    scoreLabel: string
    digest: string
  }
  sovereignty: {
    eyebrow: string
    title: string
    body: string
    commitment: string
    badges: readonly string[]
    sourceLabel: string
  }
  stack: {
    eyebrow: string
    title: string
    body: string
    inputLabel: string
    outputLabel: string
    inputs: readonly string[]
    outputs: readonly string[]
    evidence: string
    center: string
    conclusion: string
  }
  offer: {
    eyebrow: string
    title: string
    body: string
    terms: readonly string[]
    qualifiersTitle: string
    qualifiers: readonly string[]
    book: string
    bookingPending: string
    plannedEmail: string
    emailPending: string
    report: string
    reportPending: string
    legal: string
  }
  footer: {
    tagline: string
    privacy: string
    copyright: string
    legal: string
  }
  notFound: { eyebrow: string; title: string; body: string; home: string }
}

export const EN_COPY: LocalizedCopy = {
  locale: 'en',
  meta: {
    title: 'Bevisa — Evidence & compliance OS for public tenders',
    description:
      "Bevisa maps every mandatory requirement to dated, approved evidence — and refuses to draft a claim it can't cite.",
  },
  common: {
    skip: 'Skip to content',
    source: 'Source',
    pending: 'Setup pending',
    copied: 'Copied',
    copyEmail: 'Copy email address',
    externalLink: 'Opens in a new tab',
    languageLabel: 'Language',
    english: 'English',
    swedish: 'Svenska',
  },
  nav: {
    label: 'Primary navigation',
    problem: 'The problem',
    process: 'How it works',
    health: 'Evidence health',
    sovereignty: 'Sovereignty',
    offer: 'Design partner',
    book: 'Book a discovery call',
    openMenu: 'Open navigation',
    closeMenu: 'Close navigation',
  },
  hero: {
    eyebrow: 'FOR TEAMS THAT BID ON PUBLIC TENDERS',
    title: 'Win the tender before you write it.',
    body:
      "Bevisa maps every mandatory requirement to dated, approved evidence — and refuses to draft a claim it can't cite.",
    book: 'Book a discovery call',
    sample: 'Get the sample report',
    scrollPrefix: 'SKALL-KRAV',
    sceneDescription:
      'A field of approved, expiring and missing evidence objects connected by traceable lineage.',
    interactionHint: 'Move your pointer through the evidence field',
  },
  problem: {
    eyebrow: 'THE PROOF GAP',
    title: 'The hard part is not writing. It is proving.',
    body:
      'The certificate that expired last Tuesday. The reference case only one colleague can find. The mandatory requirement nobody mapped. Bid teams lose time reconstructing proof under deadline pressure.',
    stats: [
      {
        id: 'bidders',
        value: '13,067',
        label: 'unique companies bid on Swedish public tenders in 2024',
        sourceLabel: 'Upphandlingsmyndigheten, official statistics',
        sourceUrl: SOURCES.bidders2024,
      },
      {
        id: 'bids',
        value: '71,128',
        label: 'classified bids were submitted in 2024',
        sourceLabel: 'Upphandlingsmyndigheten, official statistics',
        sourceUrl: SOURCES.bidders2024,
      },
      {
        id: 'complexity',
        value: '1 in 5',
        label: 'suppliers cite procurement complexity as a reason not to bid',
        sourceLabel: 'Upphandlingsmyndigheten, 2025 supplier survey',
        sourceUrl: SOURCES.supplierSurvey2025,
      },
    ],
    context:
      'Advertised Swedish procurement carried an estimated value of SEK 982 billion in 2025.',
    contextQualifier: 'Public-procurement context — not Bevisa’s addressable market.',
  },
  pipeline: {
    eyebrow: 'FROM DOCUMENT TO DECISION',
    title: 'One evidence chain. Five controlled steps.',
    intro:
      'A live tender enters as a document. It leaves as a governed requirement matrix, ready for a human decision.',
    steps: [
      {
        id: 'ingest',
        number: '01',
        title: 'Ingest',
        body: 'Bring in one live tender. The original document remains the reference point for every extracted requirement.',
        signal: 'FFU RECEIVED · SOURCE LOCKED',
      },
      {
        id: 'extract',
        number: '02',
        title: 'Extract',
        body: 'Identify every mandatory requirement. Ambiguity is flagged for review instead of being silently guessed.',
        signal: '147 REQUIREMENTS · 1 REVIEW FLAG',
      },
      {
        id: 'map',
        number: '03',
        title: 'Map',
        body: 'Connect each requirement to dated, approved evidence. Unmatched requirements remain visibly hollow.',
        signal: 'LINEAGE VERIFIED · GAPS VISIBLE',
      },
      {
        id: 'draft',
        number: '04',
        title: 'Assign & draft',
        body: 'Assign every gap to a named role. Draft only from approved sources, with a citation attached to each claim.',
        signal: 'OWNER ASSIGNED · SOURCES ATTACHED',
      },
      {
        id: 'approve',
        number: '05',
        title: 'Approve & export',
        body: 'A bid lead reviews the complete kravmatris and retains final authority before Word or portal export.',
        signal: 'GODKÄND · HUMAN GATE PASSED',
      },
    ],
    sceneDescription:
      'A tender document becomes requirement markers, connects to evidence, then resolves into a compliance matrix behind a human approval gate.',
    requirementCount: '147 mandatory requirements found',
    ambiguous: 'AMBIGUOUS — flagged for human review',
    owner: 'OWNER: QUALITY LEAD',
    draft: 'The proposed delivery team maintains a documented quality system',
    citationOne: 'E-014',
    citationTwo: 'CV-028',
    approval: 'GODKÄND — human approval required for every submission',
    export: 'EXPORT · WORD / PORTAL',
  },
  health: {
    eyebrow: 'EVIDENCE HEALTH',
    title: 'Between tenders, Bevisa keeps watch.',
    body:
      'The design-partner workflow includes expiry alerts, certificate renewal owners and a Monday evidence-health digest — so readiness does not reset after every submission.',
    filterLabel: 'Filter evidence horizon',
    filters: { all: 'All evidence', urgent: 'Next 90 days', quarter: 'This year' },
    columns: { evidence: 'Evidence', owner: 'Owner', status: 'Renewal horizon' },
    scoreLabel: 'Evidence health score',
    digest: 'Monday digest · 3 actions assigned',
  },
  sovereignty: {
    eyebrow: 'DIGITAL SOVEREIGNTY',
    title: 'Your win themes never leave Europe.',
    body:
      'CVs, references, financials and prior answers are competitive assets and personal data. Every design-partner environment is specified for EU/EEA jurisdiction, role-based access, retention controls and auditable activity.',
    commitment:
      'That architecture follows the direction of Sweden’s 2026 cloud policy: stronger control over data, lower dependency and practical exit paths.',
    badges: ['EU/EEA HOSTING', 'GDPR BY DESIGN', 'FULL AUDIT TRAIL'],
    sourceLabel: 'Sweden’s 2026 cloud policy',
  },
  stack: {
    eyebrow: 'WORKS WITH YOUR STACK',
    title: "We don't replace your portals. We arm them.",
    body:
      'SharePoint, Microsoft 365 and your approved evidence feed the governed layer. Mercell, TendSign, Tendium, Word and Excel remain where discovery and submission happen.',
    inputLabel: 'INPUT',
    outputLabel: 'OUTPUT',
    inputs: ['SharePoint / M365', 'CV · CASE · POLICY'],
    outputs: ['Mercell · TendSign', 'Tendium · Word / Excel'],
    evidence: 'YOUR EVIDENCE',
    center: 'EVIDENCE LAYER',
    conclusion: 'Discovery and submission are solved problems. Proof is not.',
  },
  offer: {
    eyebrow: 'DESIGN PARTNERS · SWEDEN',
    title: "We're selecting three design partners.",
    body:
      'Use one live tender to test whether governed evidence can reduce cycle time and improve requirement coverage. Shadow mode comes first; your bid lead keeps final authority.',
    terms: [
      '8 weeks',
      'One live tender',
      'SEK 45,000–75,000',
      'Fully credited to year-one SaaS',
      'Traceability promised — never wins',
    ],
    qualifiersTitle: 'A strong fit looks like',
    qualifiers: [
      '8+ public bids per year',
      '2–10 person bid function',
      'Evidence lives in Microsoft 365',
      'Can start within 60 days',
    ],
    book: 'Book a discovery call',
    bookingPending: 'Booking link is being configured before launch.',
    plannedEmail: PLANNED_CONTACT_EMAIL,
    emailPending: 'Planned address — email delivery is not active yet.',
    report: 'Download the sample assurance report',
    reportPending: 'The sample report is being prepared before launch.',
    legal: LEGAL_NOTICE,
  },
  footer: {
    tagline: 'Bevisa — Built in Stockholm.',
    privacy: 'No tracking cookies. Privacy-first analytics only.',
    copyright: '© 2026 Bevisa',
    legal: LEGAL_NOTICE,
  },
  notFound: {
    eyebrow: '404 · RECORD NOT FOUND',
    title: 'This evidence path ends here.',
    body: 'The requested page is not part of the Bevisa archive.',
    home: 'Return to Bevisa',
  },
}
