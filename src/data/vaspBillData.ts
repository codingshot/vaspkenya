export interface CompanyType {
  id: string;
  name: string;
  icon: string;
  description: string;
  regulatoryAuthority: string[];
  keyObligations: string[];
  relevantSections: string[];
}

export interface KeyConcept {
  id: string;
  term: string;
  definition: string;
  section: string;
  category: 'definition' | 'obligation' | 'penalty' | 'process';
}

export interface BillSection {
  id: string;
  part: string;
  section: string;
  title: string;
  content: string;
  keywords: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const companyTypes: CompanyType[] = [
  {
    id: 'wallet-provider',
    name: 'Virtual Asset Wallet Provider',
    icon: 'Wallet',
    description: 'Provides storage for virtual assets on behalf of others and facilitates exchanges or transfers between virtual assets or fiat currency.',
    regulatoryAuthority: ['Central Bank of Kenya', 'Capital Markets Authority'],
    keyObligations: [
      'Maintain a registered office in Kenya',
      'Appoint a fit and proper CEO',
      'Comply with AML/CFT/CPF requirements',
      'Maintain prescribed capital and solvency requirements',
      'Protect customer assets at all times',
      'Submit annual audited financial statements'
    ],
    relevantSections: ['Section 3', 'Section 11', 'Section 19-32', 'Section 33-34']
  },
  {
    id: 'exchange',
    name: 'Virtual Asset Exchange',
    icon: 'ArrowLeftRight',
    description: 'Provides a digital platform facilitating virtual asset transfers and exchanges between virtual assets and/or fiat currency.',
    regulatoryAuthority: ['Central Bank of Kenya', 'Capital Markets Authority'],
    keyObligations: [
      'Register as a company under Companies Act',
      'Obtain license from regulatory authority',
      'Maintain adequate technological resources',
      'Implement cyber security measures',
      'Provide real-time transaction access to regulators',
      'Maintain 7-year transaction records'
    ],
    relevantSections: ['Section 3', 'Section 10', 'Section 29', 'Section 44']
  },
  {
    id: 'payment-processor',
    name: 'Virtual Asset Payment Processor',
    icon: 'CreditCard',
    description: 'Arranges transactions involving virtual assets and fiat currency, or between virtual assets (payment gateway services).',
    regulatoryAuthority: ['Central Bank of Kenya'],
    keyObligations: [
      'Licensed by Central Bank of Kenya only',
      'Open and operate a bank account in Kenya',
      'Ensure fair and transparent marketing',
      'Handle customer complaints mechanism',
      'Business continuity and disaster recovery planning',
      'Comply with data protection requirements'
    ],
    relevantSections: ['Section 6', 'Section 25', 'Section 32']
  },
  {
    id: 'broker',
    name: 'Virtual Asset Broker',
    icon: 'Handshake',
    description: 'Facilitates exchange between virtual assets through exchanges and wallet providers for retail, institutional investors, or funds.',
    regulatoryAuthority: ['Capital Markets Authority'],
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Conduct due diligence on virtual assets',
      'Manage conflicts of interest',
      'Maintain competence in services provided',
      'Protect whistle-blowers',
      'Prevent market abuse'
    ],
    relevantSections: ['Section 24', 'Section 25', 'Section 32']
  },
  {
    id: 'investment-advisor',
    name: 'Virtual Asset Investment Advisor',
    icon: 'TrendingUp',
    description: 'Provides investment advice on virtual assets, initial virtual asset offerings, and non-fungible tokens for clients.',
    regulatoryAuthority: ['Capital Markets Authority'],
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Provide services honestly and fairly',
      'Maintain consumer education programs',
      'Ensure employees comply with the Act',
      'Annual financial statement audits',
      'Comply with code of conduct'
    ],
    relevantSections: ['Section 22', 'Section 25', 'Section 30']
  },
  {
    id: 'asset-manager',
    name: 'Virtual Asset Manager',
    icon: 'PieChart',
    description: 'Manages portfolios including virtual assets on a discretionary basis according to client mandates.',
    regulatoryAuthority: ['Capital Markets Authority'],
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Discretionary portfolio management',
      'Conduct business with integrity',
      'Deal fairly with all clients',
      'Maintain financial soundness',
      'Insurance requirements compliance'
    ],
    relevantSections: ['Section 21', 'Section 22', 'Section 23']
  },
  {
    id: 'ivao-provider',
    name: 'Initial Virtual Asset Offering Provider',
    icon: 'Rocket',
    description: 'Issues and sells virtual assets to the public, including providing financial services relating to IVAOs.',
    regulatoryAuthority: ['Capital Markets Authority', 'Central Bank of Kenya'],
    keyObligations: [
      'Obtain approval before issuance',
      'Submit offering documents to regulator',
      'Cannot be a natural person',
      'Comply with promotion requirements',
      'Target investor base disclosure',
      'No misleading information'
    ],
    relevantSections: ['Section 35', 'Section 7', 'Section 41']
  },
  {
    id: 'otc-desk',
    name: 'OTC Trading Desk',
    icon: 'Building',
    description: 'Facilitates over-the-counter trading of virtual assets for high-value transactions outside public exchanges.',
    regulatoryAuthority: ['Capital Markets Authority', 'Central Bank of Kenya'],
    keyObligations: [
      'Enhanced customer due diligence for large transactions',
      'Price transparency requirements',
      'Settlement risk management',
      'Trade reporting to regulators',
      'Maintain adequate capital reserves',
      'AML/CFT compliance for high-value trades'
    ],
    relevantSections: ['Section 3', 'Section 25', 'Section 33']
  },
  {
    id: 'stablecoin-issuer',
    name: 'Stablecoin Issuer',
    icon: 'Coins',
    description: 'Issues stablecoins backed by fiat currency, commodities, or algorithmic mechanisms for use in Kenya.',
    regulatoryAuthority: ['Central Bank of Kenya'],
    keyObligations: [
      'Maintain 1:1 reserve backing (for fiat-backed)',
      'Regular reserve audits and disclosures',
      'Redemption mechanisms for holders',
      'Comply with monetary policy requirements',
      'CBK approval for issuance',
      'Enhanced capital requirements'
    ],
    relevantSections: ['Section 3', 'Section 6', 'Section 35']
  },
  {
    id: 'defi-aggregator',
    name: 'DeFi Aggregator / Front-End',
    icon: 'Layers',
    description: 'Provides user interfaces or aggregation services for accessing decentralized finance protocols.',
    regulatoryAuthority: ['Capital Markets Authority'],
    keyObligations: [
      'Disclose protocol risks to users',
      'Implement basic AML screening',
      'No custody of user assets',
      'Fair representation of yields/returns',
      'Risk warnings for smart contract risks',
      'Consumer education requirements'
    ],
    relevantSections: ['Section 3', 'Section 22', 'Section 25']
  },
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace (Financial)',
    icon: 'Image',
    description: 'Operates marketplace for NFTs used for investment or financial purposes (not art/collectibles only).',
    regulatoryAuthority: ['Capital Markets Authority'],
    keyObligations: [
      'Determine if NFTs are used for investment',
      'AML/KYC for high-value transactions',
      'Platform integrity requirements',
      'Fraud prevention measures',
      'Consumer protection disclosures',
      'Transaction record keeping'
    ],
    relevantSections: ['Section 5(2)(d)', 'Section 25', 'Section 44']
  },
  {
    id: 'crypto-atm',
    name: 'Crypto ATM Operator',
    icon: 'Landmark',
    description: 'Operates physical kiosks allowing purchase or sale of virtual assets for cash or mobile money.',
    regulatoryAuthority: ['Central Bank of Kenya'],
    keyObligations: [
      'Physical location registration',
      'KYC verification at point of sale',
      'Transaction limits per user',
      'Cash handling compliance',
      'Real-time reporting to regulator',
      'Machine security requirements'
    ],
    relevantSections: ['Section 3', 'Section 6', 'Section 33']
  }
];

export const keyConcepts: KeyConcept[] = [
  {
    id: 'virtual-asset',
    term: 'Virtual Asset',
    definition: 'A digital representation of value that can be digitally traded or transferred and can be used for payment or investment purposes. Does NOT include fiat currencies, e-money, securities, or other financial assets.',
    section: 'Section 2',
    category: 'definition'
  },
  {
    id: 'vasp',
    term: 'Virtual Asset Service Provider (VASP)',
    definition: 'A local company incorporated under the Companies Act, or a foreign company with a certificate of compliance, that conducts one or more virtual asset activities listed in the Schedule.',
    section: 'Section 3',
    category: 'definition'
  },
  {
    id: 'ivao',
    term: 'Initial Virtual Asset Offering (IVAO)',
    definition: 'A method of raising funds whereby an issuer issues virtual assets and offers them in exchange for funds. Similar to an ICO but under Kenyan regulatory framework.',
    section: 'Section 2',
    category: 'definition'
  },
  {
    id: 'virtual-service-token',
    term: 'Virtual Service Token (Utility Token)',
    definition: 'A digital representation of value which is not transferable or exchangeable with third parties and only provides access to a specific application or service. These are EXEMPT from VASP licensing.',
    section: 'Section 2, 3(2)',
    category: 'definition'
  },
  {
    id: 'nft-exemption',
    term: 'NFT Exemption',
    definition: 'Non-fungible tokens are NOT regulated under this Act if they are not used for payment, investment, or any other financial purposes.',
    section: 'Section 5(2)(d)',
    category: 'definition'
  },
  {
    id: 'stablecoin',
    term: 'Stablecoin',
    definition: 'A virtual asset designed to maintain stable value relative to a fiat currency or commodity. Subject to VASP regulation if used for payment or investment in Kenya.',
    section: 'Section 2, 3',
    category: 'definition'
  },
  {
    id: 'central-bank-digital-currency',
    term: 'CBDC Exemption',
    definition: 'Digital representations of fiat currency issued by the Central Bank of Kenya are explicitly excluded from virtual asset regulation under this Act.',
    section: 'Section 5(2)(b)',
    category: 'definition'
  },
  {
    id: 'beneficial-owner',
    term: 'Beneficial Owner',
    definition: 'The natural person(s) who ultimately own or control the VASP, or on whose behalf a transaction is conducted. Must be identified for AML/CFT compliance.',
    section: 'Section 33',
    category: 'definition'
  },
  {
    id: 'fit-proper',
    term: 'Fit and Proper Assessment',
    definition: 'Directors, principal officers, and key persons must meet standards of probity, competence, experience, and sound judgment. Criminal history, dishonesty, or bankruptcy disqualifies individuals.',
    section: 'Section 19',
    category: 'obligation'
  },
  {
    id: 'aml-cft-cpf',
    term: 'AML/CFT/CPF Compliance',
    definition: 'Anti-Money Laundering, Counter-Terrorism Financing, and Counter-Proliferation Financing requirements. VASPs must comply with the Proceeds of Crime and Anti-Money Laundering Act and Prevention of Terrorism Act.',
    section: 'Section 33',
    category: 'obligation'
  },
  {
    id: 'capital-requirements',
    term: 'Capital & Solvency Requirements',
    definition: 'VASPs must maintain prescribed capital, solvency, and insurance requirements at all times to ensure financial soundness.',
    section: 'Section 23',
    category: 'obligation'
  },
  {
    id: 'customer-protection',
    term: 'Customer Asset Protection',
    definition: 'VASPs must maintain sufficient virtual assets to meet customer obligations, hold assets for entitled customers, and not subject them to creditor claims.',
    section: 'Section 32',
    category: 'obligation'
  },
  {
    id: 'cyber-security',
    term: 'Cyber Security Requirements',
    definition: 'VASPs must implement appropriate cyber security measures as prescribed under the Computer Misuse and Cybercrimes Act.',
    section: 'Section 29',
    category: 'obligation'
  },
  {
    id: 'travel-rule',
    term: 'Travel Rule Compliance',
    definition: 'VASPs must obtain, hold, and transmit required originator and beneficiary information during virtual asset transfers as required by FATF standards.',
    section: 'Section 33',
    category: 'obligation'
  },
  {
    id: 'data-protection',
    term: 'Data Protection Compliance',
    definition: 'VASPs must comply with the Data Protection Act regarding customer personal data collection, storage, processing, and transfer.',
    section: 'Section 25(h)',
    category: 'obligation'
  },
  {
    id: 'whistle-blower',
    term: 'Whistle-Blower Protection',
    definition: 'VASPs must establish mechanisms to protect employees who report violations or misconduct from retaliation.',
    section: 'Section 25(k)',
    category: 'obligation'
  },
  {
    id: 'market-abuse',
    term: 'Market Abuse Prevention',
    definition: 'VASPs must implement measures to detect and prevent market manipulation, insider trading, and other forms of market abuse.',
    section: 'Section 25(l)',
    category: 'obligation'
  },
  {
    id: 'license-duration',
    term: 'License Duration',
    definition: 'Licenses are valid from date of issue until December 31st of the same year. Annual renewal is required.',
    section: 'Section 14',
    category: 'process'
  },
  {
    id: 'record-keeping',
    term: '7-Year Record Keeping',
    definition: 'VASPs must maintain client and own transaction records for at least 7 years from the transaction date.',
    section: 'Section 44',
    category: 'obligation'
  },
  {
    id: 'transitional',
    term: 'Transitional Period',
    definition: 'Existing VASPs have 6 months from Act commencement to apply for a license and may continue operations until decision is made.',
    section: 'Section 47',
    category: 'process'
  },
  {
    id: 'appeals-process',
    term: 'Appeals Process',
    definition: 'Aggrieved persons may appeal license refusals, revocations, suspensions, and enforcement actions to an appeals body.',
    section: 'Section 43',
    category: 'process'
  },
  {
    id: 'enforcement-notice',
    term: 'Enforcement Notice',
    definition: 'Formal regulatory action requiring a VASP to rectify non-compliance within a specified period, with escalating penalties for continued violation.',
    section: 'Section 40',
    category: 'process'
  },
  {
    id: 'penalty-unlicensed',
    term: 'Penalty: Operating Without License',
    definition: 'Individuals: Up to KES 10 million fine and/or 10 years imprisonment. Companies: Up to KES 20 million fine. Plus KES 3.75 million per day for continuing offenses.',
    section: 'Section 41(1)(2)',
    category: 'penalty'
  },
  {
    id: 'penalty-false-info',
    term: 'Penalty: False Information',
    definition: 'Individuals: KES 750,000 fine and/or 5 years imprisonment. Companies: KES 15 million fine.',
    section: 'Section 41(3)',
    category: 'penalty'
  },
  {
    id: 'penalty-integrity',
    term: 'Penalty: Integrity Violations',
    definition: 'Failing to conduct business with integrity or violating prudent management: Up to KES 30 million fine and/or 10 years imprisonment.',
    section: 'Section 41(4)',
    category: 'penalty'
  },
  {
    id: 'penalty-aml',
    term: 'Penalty: AML/CFT Violations',
    definition: 'Violations of anti-money laundering requirements subject to penalties under both this Act and POCAMLA, including license revocation.',
    section: 'Section 34, 41',
    category: 'penalty'
  },
  {
    id: 'administrative-penalty',
    term: 'Administrative Penalties',
    definition: 'Regulatory authorities may impose fines from KES 150,000 to KES 3 million plus daily penalties for various compliance violations.',
    section: 'Section 40(2)',
    category: 'penalty'
  }
];

export const billSections: BillSection[] = [
  {
    id: 'part1-preliminary',
    part: 'Part I',
    section: 'Sections 1-5',
    title: 'Preliminary',
    content: `This Act may be cited as the Virtual Asset Service Providers Act, 2025.

Key Definitions:
• "Virtual asset" means a digital representation of value that can be digitally traded or transferred and can be used for payment or investment purposes. Does not include fiat currencies, e-money, securities and other financial assets.
• "Virtual asset service provider" is a local company incorporated under the Companies Act, or a foreign company with certificate of compliance, conducting activities listed in the Schedule.
• "Initial virtual asset offering" means a method of raising funds whereby an issuer issues virtual assets in exchange for funds.
• "Virtual service token" (utility tokens) are exempt from licensing if they only provide access to a specific service and are non-transferable.

Objects of the Act:
• Establish virtual asset service providers and IVAO issuers in Kenya
• License virtual asset service providers
• Approve issuance of initial virtual asset offerings
• Regulate connected matters to virtual assets

Scope - The Act does NOT apply to:
• Non-transferable tokens in closed ecosystems
• Fiat currency digital representations
• NFTs not used for payment/investment purposes
• Digital representations excluded by regulatory authority`,
    keywords: ['definition', 'virtual asset', 'vasp', 'scope', 'application', 'preliminary', 'objects', 'interpretation']
  },
  {
    id: 'part2-authorities',
    part: 'Part II',
    section: 'Sections 6-8',
    title: 'Designation of Regulatory Authorities',
    content: `Regulatory Authorities:
• Capital Markets Authority (CMA) - established under section 5 of the Capital Markets Act
• Central Bank of Kenya (CBK) - established by Article 231(1) of the Constitution
• Any other body designated by the Cabinet Secretary via Kenya Gazette notice

Functions of Regulatory Authorities:
• License virtual asset service providers
• Approve initial virtual asset offerings
• Regulate and supervise IVAO promoters
• Issue directions and enforcement actions for non-compliance
• Publish guidelines and guidance notes
• Provide feedback to VASPs on suspicious activity detection
• Ensure financial soundness and stability
• Advise Cabinet Secretary on virtual asset matters
• Cooperate with competent authorities and share information

Guiding Principles:
• Ensure financial stability in Kenya
• Ensure market integrity
• Foster innovation and maintain fairness, transparency, efficiency
• Prevent conduct that damages Kenya's financial reputation`,
    keywords: ['regulatory authority', 'CMA', 'CBK', 'Capital Markets Authority', 'Central Bank of Kenya', 'functions', 'guiding principles']
  },
  {
    id: 'part3-licensing',
    part: 'Part III',
    section: 'Sections 9-18',
    title: 'Licensing Requirement',
    content: `Prohibition (Section 9):
• No person shall carry on virtual asset services business without a license
• Natural persons are strictly PROHIBITED from conducting VASP business
• Violation: Fine up to KES 10 million (individuals) or KES 20 million (companies), imprisonment up to 10 years, or both

License Application Requirements:
• Must be a company (local or foreign with compliance certificate)
• Personnel with necessary skills, knowledge, experience
• Consumer and data protection capability
• Financial obligations capability (insurance, capital, solvency)
• Fit and proper directors and officers
• Cyber security measures (Computer Misuse and Cybercrimes Act)
• Suitable premises for record keeping
• Public interest consideration

License Conditions:
• Display license at principal place of business
• Include: issue date, license number, trade names, conditions, activities, address
• Cannot modify activities without regulatory approval
• Must cooperate with regulatory authority

License Duration:
• Valid from issue date until December 31st of issue year
• Cannot be transferred or assigned without approval
• May be suspended, varied, or revoked for non-compliance

Register of Licensees:
• Each authority maintains public register
• Published on authority website`,
    keywords: ['license', 'licensing', 'prohibition', 'natural person', 'application', 'requirements', 'conditions', 'duration', 'register', 'suspension', 'revocation']
  },
  {
    id: 'part4-obligations',
    part: 'Part IV',
    section: 'Sections 19-32',
    title: 'General Obligations for VASPs',
    content: `Fit and Proper Assessment (Section 19):
Directors, principal officers must meet standards:
• Probity, competence, experience, sound judgment
• Diligence in fulfilling responsibilities
• Educational and professional qualifications
• Legal and professional obligation knowledge
• No dishonesty or fraud offenses
• No virtual asset law contraventions
• Financial standing integrity

Registered Office (Section 20):
• Must maintain registered office in Kenya

Business Conduct Requirements:
• Managed by board of at least 2 directors (natural persons only)
• Conduct business prudently
• Comply with minimum net assets requirements
• Maintain adequate accounting records
• Effect appropriate insurance policies

Integrity Requirements (Section 22):
• Conduct business with integrity, due care, skill, diligence
• Deal fairly with all clients
• Ensure clients are not misled

Capital, Solvency & Insurance (Section 23):
• Maintain financial soundness at all times
• Comply with prescribed requirements

Additional Requirements (Section 25):
• Provide services honestly and fairly
• Maintain prescribed capital
• Manage conflicts of interest
• Adequate technological, financial, human resources
• Full AML/CFT/CPF compliance
• Annual audited financial statements
• Bank account in Kenya
• Data protection compliance
• Fair marketing and promotional materials
• Business continuity and disaster recovery
• Customer complaint mechanism
• Whistle-blower protection
• Market abuse prevention
• Consumer education programs
• Employee compliance oversight

Cyber Security (Section 29):
• Appropriate measures per Computer Misuse and Cybercrimes Act

Customer Asset Protection (Section 32):
• Maintain sufficient virtual assets for customer obligations
• Meet prescribed financial requirements
• Hold assets for entitled customers
• Assets not subject to VASP's creditor claims`,
    keywords: ['fit and proper', 'obligations', 'registered office', 'integrity', 'capital', 'solvency', 'insurance', 'cyber security', 'customer protection', 'prudent', 'compliance', 'AML', 'CFT', 'CPF']
  },
  {
    id: 'part5-aml',
    part: 'Part V',
    section: 'Sections 33-34',
    title: 'Prevention of Money Laundering, Terrorism & Proliferation Financing',
    content: `Powers of Regulatory Authority (Section 33):
Pursuant to Proceeds of Crime and Anti-Money Laundering Act and Prevention of Terrorism Act:

• Vet significant shareholders, beneficial owners, directors, senior officers
• Conduct onsite inspections
• Conduct offsite surveillance
• Consolidated supervision of institution and group
• Compel document production
• Impose monetary, civil, or administrative sanctions
• Issue regulations, guidelines, directions for AML/CFT/CPF
• Cooperate and share information
• Take necessary enforcement actions

Penalties for AML/CFT/CPF Violations (Section 34):
• Directors, officers, employees, agents must not violate AML/CFT/CPF regulations
• Violations subject to penalties under Section 41`,
    keywords: ['AML', 'CFT', 'CPF', 'money laundering', 'terrorism', 'financing', 'proliferation', 'inspection', 'surveillance', 'sanctions', 'proceeds of crime']
  },
  {
    id: 'part6-ivao',
    part: 'Part VI',
    section: 'Section 35',
    title: 'Initial Virtual Asset Offering',
    content: `IVAO Requirements (Section 35):
• Cannot issue or purport to issue IVAO without approval
• Natural persons PROHIBITED from promoting or issuing IVAOs
• Must comply with prescribed requirements
• Must notify regulatory authority with no objection received

Regulatory Authority May Object If:
• Advertising inconsistent with application
• IVAO characteristics deviate from description
• Issuer not disclosed in application
• Target investor base differs from disclosure
• Reason to believe mis-selling
• Issuance detrimental to public interest

Penalties:
• False/misleading information: Fines under Section 41
• Contravention: Imprisonment, fine, or both per Section 41`,
    keywords: ['IVAO', 'initial virtual asset offering', 'issuer', 'approval', 'promotion', 'offering document', 'investor', 'fund raising']
  },
  {
    id: 'part7-investigation',
    part: 'Part VII',
    section: 'Sections 36-39',
    title: 'Investigation and Examination',
    content: `Compliance, Inspection & Investigation (Section 36):
• Regulatory authority shall undertake compliance inspections
• VASPs and IVAO issuers must cooperate during investigations

Examiner Appointment (Section 37):
• Authority may appoint/designate examiners with necessary powers

Powers to Request Information (Section 38):
• Request specified information or documents
• May request from parent companies, subsidiaries, associates
• May require controllers/officers to provide information
• Powers apply to former licensees for period when licensed

Additional Powers (Section 39):
• Require information provision at specified place/time
• Require document production
• Require attendance to answer questions
• Access premises on notice
• Take copies of documents
• Connected persons also subject to powers`,
    keywords: ['investigation', 'examination', 'compliance', 'inspection', 'examiner', 'information', 'documents', 'powers', 'cooperation']
  },
  {
    id: 'part8-enforcement',
    part: 'Part VIII',
    section: 'Sections 40-41',
    title: 'Enforcement',
    content: `Enforcement Actions (Section 40):
• Formal written warning with cessation requirement
• Direction for remedial action within timeframe
• Prohibition, restriction, or limitation directives
• Enforcement notices with rectification period
• Restriction from new business contracts
• Removal of directors/officers
• Protection of customers/creditors
• Suspend or revoke license/IVAO
• Initiate investigation
• Administrative penalties

Administrative Penalty Amounts:
• KES 3 million + KES 300,000/day (max 30 days) for Sections 13(5), 30(5), 38(6), 44(3)
• KES 150,000 + KES 15,000/day for Sections 13(3), 23(2), 26(3), 27(1), 29(2)
• KES 750,000 + KES 7,500/day for Sections 19(4), 24(2), 26(3)

Offences and Penalties (Section 41):

Operating Without License (Sections 9(3), 28(5)):
• Individuals: Up to KES 10 million fine and/or 10 years imprisonment
• Companies: Up to KES 20 million fine
• Continuing offense: Additional KES 3.75 million per day

False Information (Section 11(8)):
• Individuals: KES 750,000 fine and/or 5 years imprisonment
• Companies: KES 15 million fine

Integrity Violations (Sections 21(5), 22(2), 38(5), 44(4)):
• Up to KES 30 million fine and/or 10 years imprisonment
• Continuing: Additional KES 750,000 per day

Liability of Directors/Officers:
• Directors/officers who knowingly authorized violations also personally liable`,
    keywords: ['enforcement', 'penalties', 'offences', 'fine', 'imprisonment', 'suspension', 'revocation', 'warning', 'administrative penalty', 'sanctions']
  },
  {
    id: 'part9-misc',
    part: 'Part IX',
    section: 'Sections 42-47',
    title: 'Miscellaneous Provisions',
    content: `Confidentiality (Section 42):
• Regulatory authority and agents shall not disclose information to third parties
• Exceptions: Court orders, consent, statistical form, lawful requirements under Mutual Legal Assistance Act, POCAMLA, Prevention of Terrorism Act

Appeals (Section 43):
Aggrieved persons may appeal:
• Refusal to approve license application
• Refusal of other applications
• License amendment, revocation, or suspension
• Enforcement actions

Transaction Records (Section 44):
• Provide real-time read-only access to regulators if required
• Maintain records for minimum 7 YEARS from transaction date
• Records at principal place of business

Protection from Liability (Section 45):
• No action against regulatory authority for good faith acts/omissions

Regulations (Section 46):
Cabinet Secretary may make regulations for:
• IVAO promotional materials
• Application documentation
• Share acquisition/holding
• License transfer conditions
• Business standards
• Policies and procedures
• Prudential standards (disclosure, safekeeping, cyber security, reporting)
• Third party transactions
• Penalties up to KES 3 million or 5 years imprisonment

Transitional Provisions (Section 47):
• Existing VASPs must apply within 6 MONTHS of commencement
• May continue operating until application decision`,
    keywords: ['confidentiality', 'appeals', 'records', 'transaction', '7 years', 'protection', 'regulations', 'transitional', 'saving provisions', 'cabinet secretary']
  },
  {
    id: 'schedule',
    part: 'Schedule',
    section: 'Virtual Asset Activities',
    title: 'Schedule of Virtual Asset Services',
    content: `Virtual Asset Wallet Provider:
• Function: Custodial wallet services (corporate and retail)
• Description: Providing storage for virtual assets on behalf of others and facilitating exchanges/transfers
• Regulators: Central Bank of Kenya, Capital Markets Authority

Virtual Asset Exchange:
• Function: Transfer Services of Virtual Assets
• Description: Digital platform facilitating virtual asset transfers and exchanges
• Regulators: Central Bank of Kenya, Capital Markets Authority

• Function: Conversion Services
• Regulators: Central Bank of Kenya, Capital Markets Authority

• Function: Trading, Clearing and Settlement Platforms
• Description: Matching buyers/sellers while holding virtual assets for clients
• Regulator: Capital Markets Authority

Virtual Asset Payment Processor:
• Function: Payment Gateway
• Description: Arranging transactions involving virtual assets and fiat currency
• Regulator: Central Bank of Kenya

Virtual Asset Broker:
• Function: Brokerage services
• Description: Facilitate exchange for retail, institutional investors, or funds
• Regulator: Capital Markets Authority

Virtual Asset Investment Advisor:
• Function: Investment advisory services
• Description: Provision of investment advice on virtual assets, IVAOs, and NFTs
• Regulator: Capital Markets Authority

Virtual Asset Manager:
• Function: Virtual asset management
• Description: Managing portfolios on discretionary basis including virtual assets
• Regulator: Capital Markets Authority

Initial Virtual Asset Offering Provider:
• Function: Fund Raising
• Description: Issuing and selling virtual assets to the public
• Regulators: Capital Markets Authority, Central Bank of Kenya`,
    keywords: ['schedule', 'activities', 'wallet', 'exchange', 'payment', 'broker', 'advisor', 'manager', 'IVAO', 'trading', 'custody', 'transfer']
  }
];

export const faqs: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Who needs to obtain a VASP license under this Bill?',
    answer: 'Any company (local or foreign with compliance certificate) conducting virtual asset activities in or from Kenya must obtain a license. This includes wallet providers, exchanges, payment processors, brokers, investment advisors, asset managers, and IVAO providers. Natural persons (individuals) are strictly prohibited from operating as VASPs.',
    category: 'Licensing'
  },
  {
    id: 'faq-2',
    question: 'Can individuals operate as Virtual Asset Service Providers?',
    answer: 'No. Section 9(2) explicitly states that natural persons shall NOT carry on the business of virtual asset services in or from Kenya. Only companies incorporated under the Companies Act (local or foreign with certificate of compliance) are eligible for licensing.',
    category: 'Licensing'
  },
  {
    id: 'faq-3',
    question: 'Which regulatory authority do I apply to for a license?',
    answer: 'It depends on your business type: Central Bank of Kenya (CBK) regulates payment processors and certain exchange functions. Capital Markets Authority (CMA) regulates brokers, investment advisors, asset managers, and trading platforms. Some activities (wallets, exchanges, IVAOs) may fall under both authorities.',
    category: 'Licensing'
  },
  {
    id: 'faq-4',
    question: 'How long is a VASP license valid?',
    answer: 'Licenses are valid from the date of issue until December 31st of the same year. This means annual renewal is required. Licenses cannot be transferred or assigned without prior written approval from the regulatory authority.',
    category: 'Licensing'
  },
  {
    id: 'faq-5',
    question: 'Are NFTs regulated under this Bill?',
    answer: 'Not necessarily. NFTs that are not used for payment, investment, or any other financial purposes are explicitly excluded from regulation under Section 5(2)(d). However, if an NFT is used for payment or investment purposes, or functions as a financial asset, it may fall under regulation.',
    category: 'Scope'
  },
  {
    id: 'faq-6',
    question: 'Are utility tokens (virtual service tokens) regulated?',
    answer: 'No. Virtual service tokens that are non-transferable, only provide access to a specific service/application, and cannot be exchanged with third parties are exempt from licensing requirements under Section 3(2). These tokens are not considered "virtual assets" under the Act.',
    category: 'Scope'
  },
  {
    id: 'faq-7',
    question: 'What are the penalties for operating without a license?',
    answer: 'Individuals face up to KES 10 million fine and/or 10 years imprisonment. Companies face up to KES 20 million fine. For continuing offenses, an additional KES 3.75 million per day applies. Directors who knowingly authorized the violation are also personally liable.',
    category: 'Penalties'
  },
  {
    id: 'faq-8',
    question: 'What capital and insurance requirements apply?',
    answer: 'VASPs must maintain prescribed capital, solvency, and insurance requirements at all times to ensure financial soundness (Section 23). Specific amounts will be prescribed by regulations. Insurance must cover risks inherent in the operation commensurate with nature and scale of services.',
    category: 'Compliance'
  },
  {
    id: 'faq-9',
    question: 'What AML/CFT/CPF obligations do VASPs have?',
    answer: 'VASPs must comply with the full range of AML/CFT/CPF preventive measures under the Proceeds of Crime and Anti-Money Laundering Act and Prevention of Terrorism Act. This includes customer due diligence, suspicious activity reporting, targeted financial sanctions compliance, and cooperation with the Financial Reporting Centre.',
    category: 'Compliance'
  },
  {
    id: 'faq-10',
    question: 'How long must transaction records be kept?',
    answer: 'VASPs must maintain client and own transaction records for a minimum of 7 years from the date each transaction occurred (Section 44). Records must be kept at the principal place of business and VASPs may be required to provide real-time read-only access to regulators.',
    category: 'Compliance'
  },
  {
    id: 'faq-11',
    question: 'What is the transitional period for existing operators?',
    answer: 'Existing VASPs have 6 months from the commencement of the Act to apply for a license. They may continue operating until their application is granted or refused. After 6 months, unlicensed operation becomes an offense.',
    category: 'Transitional'
  },
  {
    id: 'faq-12',
    question: 'What makes someone "fit and proper" under the Bill?',
    answer: 'Directors and officers must demonstrate: probity, competence, and sound judgment; relevant experience and qualifications; no history of dishonesty, fraud, or financial crimes; no bankruptcy or insolvency; no contraventions of virtual asset laws; and good financial standing. The regulatory authority assesses these criteria.',
    category: 'Compliance'
  },
  {
    id: 'faq-13',
    question: 'Can I appeal a regulatory decision?',
    answer: 'Yes. Section 43 allows appeals against: license application refusals, other application refusals, license amendments/revocations/suspensions, and enforcement actions. The appeals body may confirm, vary, or revoke the regulatory authority\'s decision.',
    category: 'Process'
  },
  {
    id: 'faq-14',
    question: 'What cyber security measures are required?',
    answer: 'VASPs must implement appropriate and effective cyber security measures as prescribed under the Computer Misuse and Cybercrimes Act. This is both a licensing requirement (Section 11) and ongoing obligation (Section 29). Cyber security incidents must be reported to the regulator.',
    category: 'Compliance'
  },
  {
    id: 'faq-15',
    question: 'What happens to customer assets if a VASP faces financial trouble?',
    answer: 'Section 32 protects customers: VASPs must maintain sufficient virtual assets to meet obligations, hold assets for entitled customers, and customer assets cannot be subject to claims from the VASP\'s creditors. This provides segregation protection for customer funds.',
    category: 'Customer Protection'
  },
  {
    id: 'faq-16',
    question: 'Can a foreign company operate a VASP in Kenya?',
    answer: 'Yes, but the foreign company must first obtain a Certificate of Compliance from the Registrar of Companies under the Companies Act. This certifies the company is authorized to operate in Kenya. The company must also maintain a registered office in Kenya.',
    category: 'Licensing'
  },
  {
    id: 'faq-17',
    question: 'What is an Initial Virtual Asset Offering (IVAO)?',
    answer: 'An IVAO is a method of raising funds whereby an issuer issues virtual assets and offers them in exchange for funds. This is similar to an ICO (Initial Coin Offering). IVAOs require approval from the regulatory authority before issuance, and natural persons cannot issue or promote them.',
    category: 'IVAO'
  },
  {
    id: 'faq-18',
    question: 'What are stablecoins classified as under this Bill?',
    answer: 'Stablecoins that can be digitally traded or transferred and used for payment or investment purposes would generally fall under the definition of "virtual assets" and be regulated. However, digital representations of fiat currencies issued by the Central Bank of Kenya are excluded.',
    category: 'Scope'
  },
  {
    id: 'faq-19',
    question: 'Do I need a license if I only provide services outside Kenya?',
    answer: 'If you are operating from Kenya (even serving foreign clients) or serving Kenyan clients (even from abroad), you likely need a license. The Act applies to virtual asset services "in or from Kenya." Companies with no Kenya nexus are not covered.',
    category: 'Scope'
  },
  {
    id: 'faq-20',
    question: 'What happens if my license application is rejected?',
    answer: 'The regulatory authority must inform you in writing of the rejection and provide reasons. You have the right to appeal the decision under Section 43. The appeals body can confirm, vary, or revoke the regulatory authority\'s decision.',
    category: 'Process'
  },
  {
    id: 'faq-21',
    question: 'How many directors must a VASP company have?',
    answer: 'A VASP must be managed by a board of directors consisting of at least 2 directors (Section 21). All directors must be natural persons, and a director cannot serve on more than one VASP board.',
    category: 'Governance'
  },
  {
    id: 'faq-22',
    question: 'Is DeFi (Decentralized Finance) regulated under this Bill?',
    answer: 'The Bill focuses on entities conducting virtual asset services. Purely decentralized protocols without identifiable operators may fall outside scope. However, any company or person facilitating DeFi services (like aggregators, front-ends, or liquidity providers) could be regulated.',
    category: 'Scope'
  },
  {
    id: 'faq-23',
    question: 'What notifications must a VASP provide to regulators?',
    answer: 'Section 26 requires notification of: insolvency or potential insolvency, compliance failures, criminal proceedings, registered agent resignations, pending civil suits, cessation of business, director/officer resignations or unfitness, and cyber security incidents. Written reports must follow within 7 working days.',
    category: 'Compliance'
  },
  {
    id: 'faq-24',
    question: 'Can I transfer or sell my VASP license to another company?',
    answer: 'No license can be transferred or assigned without prior written approval from the regulatory authority (Section 15). Unauthorized transfer is an offense subject to enforcement action.',
    category: 'Licensing'
  },
  {
    id: 'faq-25',
    question: 'When is this Bill expected to become law?',
    answer: 'The Bill was published in 2025 and must go through Parliamentary approval process. Timeline depends on legislative priorities. Check the National Treasury and Parliament websites for updates on the Bill\'s progress.',
    category: 'Transitional'
  }
];

// Additional export for SEO-friendly bill clauses
export const billClauses = [
  { clause: 'Section 1', title: 'Short Title', summary: 'Virtual Asset Service Providers Act, 2025' },
  { clause: 'Section 2', title: 'Interpretation', summary: 'Definitions of key terms including virtual asset, VASP, IVAO, blockchain' },
  { clause: 'Section 3', title: 'Meaning of VASP', summary: 'Defines who qualifies as a virtual asset service provider' },
  { clause: 'Section 4', title: 'Objects of the Act', summary: 'Establish and regulate VASPs, license providers, approve IVAOs' },
  { clause: 'Section 5', title: 'Scope of Application', summary: 'Defines what is and is not covered by the Act' },
  { clause: 'Section 6', title: 'Regulatory Authorities', summary: 'CMA, CBK, and other designated bodies' },
  { clause: 'Section 7', title: 'Functions', summary: 'Powers and duties of regulatory authorities' },
  { clause: 'Section 8', title: 'Guiding Principles', summary: 'Financial stability, market integrity, innovation, reputation' },
  { clause: 'Section 9', title: 'Prohibition', summary: 'License requirement, natural persons prohibited' },
  { clause: 'Section 10', title: 'Permissible Activities', summary: 'Schedule of licensed activities' },
  { clause: 'Section 11', title: 'License Application', summary: 'Application requirements and process' },
  { clause: 'Section 12', title: 'Decision Criteria', summary: 'Factors considered in licensing decisions' },
  { clause: 'Section 13', title: 'License Conditions', summary: 'Conditions and display requirements' },
  { clause: 'Section 14', title: 'License Duration', summary: 'Valid until December 31st, annual renewal' },
  { clause: 'Section 15', title: 'Assignment/Transfer', summary: 'No transfer without approval' },
  { clause: 'Section 16', title: 'Suspension/Revocation', summary: 'Grounds for license suspension or revocation' },
  { clause: 'Section 17', title: 'Surrender', summary: 'Voluntary surrender process' },
  { clause: 'Section 18', title: 'Register of Licensees', summary: 'Public register maintained by authorities' },
  { clause: 'Section 19', title: 'Fit and Proper', summary: 'Assessment criteria for directors and officers' },
  { clause: 'Section 20', title: 'Registered Office', summary: 'Must maintain office in Kenya' },
  { clause: 'Section 21', title: 'Prudent Business', summary: 'Board requirements, prudent management' },
  { clause: 'Section 22', title: 'Business Integrity', summary: 'Due care, skill, fair dealing' },
  { clause: 'Section 23', title: 'Capital/Solvency', summary: 'Financial soundness requirements' },
  { clause: 'Section 24', title: 'Conflicts of Interest', summary: 'Policies to manage conflicts' },
  { clause: 'Section 25', title: 'Additional Requirements', summary: '22 specific ongoing obligations' },
  { clause: 'Section 26', title: 'Ongoing Notifications', summary: 'Events requiring regulator notification' },
  { clause: 'Section 27', title: 'Material Changes', summary: 'Approval required for significant changes' },
  { clause: 'Section 28', title: 'Ownership Changes', summary: 'Share transfers require approval' },
  { clause: 'Section 29', title: 'Cyber Security', summary: 'Security measures per Cybercrimes Act' },
  { clause: 'Section 30', title: 'Financial Statements', summary: 'Annual audited statements required' },
  { clause: 'Section 31', title: 'CEO Appointment', summary: 'CEO requirements and approval' },
  { clause: 'Section 32', title: 'Customer Protection', summary: 'Asset protection and segregation' },
  { clause: 'Section 33', title: 'AML/CFT Powers', summary: 'Regulatory powers for AML compliance' },
  { clause: 'Section 34', title: 'AML Penalties', summary: 'Penalties for AML violations' },
  { clause: 'Section 35', title: 'IVAO Requirements', summary: 'Initial virtual asset offering rules' },
  { clause: 'Section 36', title: 'Compliance Inspection', summary: 'Investigation powers' },
  { clause: 'Section 37', title: 'Examiner Appointment', summary: 'Authority to appoint examiners' },
  { clause: 'Section 38', title: 'Information Powers', summary: 'Powers to request information' },
  { clause: 'Section 39', title: 'Additional Powers', summary: 'Extended investigation powers' },
  { clause: 'Section 40', title: 'Enforcement Action', summary: 'Range of enforcement measures' },
  { clause: 'Section 41', title: 'Offences/Penalties', summary: 'Criminal penalties and fines' },
  { clause: 'Section 42', title: 'Confidentiality', summary: 'Information disclosure restrictions' },
  { clause: 'Section 43', title: 'Appeals', summary: 'Right to appeal decisions' },
  { clause: 'Section 44', title: 'Transaction Records', summary: '7-year record keeping requirement' },
  { clause: 'Section 45', title: 'Protection from Liability', summary: 'Regulator immunity for good faith' },
  { clause: 'Section 46', title: 'Regulations', summary: 'Cabinet Secretary regulation powers' },
  { clause: 'Section 47', title: 'Transitional Provisions', summary: '6-month transitional period' },
];