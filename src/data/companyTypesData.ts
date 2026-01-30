export interface CompanyTypeData {
  id: string;
  name: string;
  icon: string;
  description: string;
  isRegulated: boolean;
  regulationStatus: 'fully-regulated' | 'partially-regulated' | 'exempt' | 'unclear';
  regulatoryAuthority: string[];
  keyObligations: string[];
  relevantSections: string[];
  pdfPages?: number[]; // Pages in the PDF where this is referenced
  examples: {
    name: string;
    description: string;
    type: 'local' | 'international';
  }[];
  keywords: string[]; // For search matching
  custodial: boolean;
  riskLevel: 'high' | 'medium' | 'low';
  licensingRequirements: {
    title: string;
    description: string;
    resource?: string;
    resourceUrl?: string;
  }[];
}

export const companyTypesData: CompanyTypeData[] = [
  // REGULATED COMPANY TYPES
  {
    id: 'wallet-provider',
    name: 'Virtual Asset Wallet Provider (Custodial)',
    icon: 'Wallet',
    description: 'Provides custodial storage for virtual assets on behalf of others and facilitates exchanges or transfers between virtual assets or fiat currency.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Central Bank of Kenya', 'Capital Markets Authority'],
    custodial: true,
    riskLevel: 'high',
    keyObligations: [
      'Maintain a registered office in Kenya',
      'Appoint a fit and proper CEO',
      'Comply with AML/CFT/CPF requirements',
      'Maintain prescribed capital and solvency requirements',
      'Protect customer assets at all times',
      'Submit annual audited financial statements'
    ],
    relevantSections: ['Section 3', 'Section 11', 'Section 19-32', 'Section 33-34'],
    pdfPages: [3, 7, 11, 15, 17],
    examples: [
      { name: 'BitPesa/AZA Finance', description: 'Offers crypto custody and exchange services in Africa', type: 'local' },
      { name: 'Yellow Card', description: 'Pan-African crypto wallet with custody services', type: 'local' },
      { name: 'Coinbase Custody', description: 'Institutional-grade digital asset custody', type: 'international' }
    ],
    keywords: ['wallet', 'custody', 'custodial', 'storage', 'safekeeping', 'hold', 'keep', 'store'],
    licensingRequirements: [
      { title: 'Company Incorporation', description: 'Register under Companies Act', resource: 'eCitizen Portal', resourceUrl: 'https://www.ecitizen.go.ke' },
      { title: 'Minimum Capital', description: 'Maintain prescribed minimum capital', resource: 'Section 23', resourceUrl: '/bill/part4-obligations' },
      { title: 'Insurance', description: 'Obtain professional indemnity insurance', resource: 'Section 23', resourceUrl: '/bill/part4-obligations' },
      { title: 'AML Program', description: 'Implement KYC/AML procedures', resource: 'FRC Guidelines', resourceUrl: 'https://www.frc.go.ke' }
    ]
  },
  {
    id: 'exchange',
    name: 'Virtual Asset Exchange',
    icon: 'ArrowLeftRight',
    description: 'Provides a digital platform facilitating virtual asset transfers and exchanges between virtual assets and/or fiat currency.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Central Bank of Kenya', 'Capital Markets Authority'],
    custodial: true,
    riskLevel: 'high',
    keyObligations: [
      'Register as a company under Companies Act',
      'Obtain license from regulatory authority',
      'Maintain adequate technological resources',
      'Implement cyber security measures',
      'Provide real-time transaction access to regulators',
      'Maintain 7-year transaction records'
    ],
    relevantSections: ['Section 3', 'Section 10', 'Section 29', 'Section 44'],
    pdfPages: [3, 6, 14, 21],
    examples: [
      { name: 'Paxful (Kenya operations)', description: 'Peer-to-peer Bitcoin marketplace', type: 'international' },
      { name: 'Binance', description: 'Global cryptocurrency exchange', type: 'international' },
      { name: 'LocalBitcoins', description: 'P2P trading platform (now closed)', type: 'international' }
    ],
    keywords: ['exchange', 'trading', 'trade', 'buy', 'sell', 'platform', 'marketplace', 'swap'],
    licensingRequirements: [
      { title: 'Exchange License', description: 'Obtain VASP license from CMA/CBK', resource: 'Section 11', resourceUrl: '/bill/part3-licensing' },
      { title: 'Cyber Security', description: 'Implement security per Cybercrimes Act', resource: 'Section 29', resourceUrl: '/bill/part4-obligations' },
      { title: 'Record Keeping', description: '7-year transaction records', resource: 'Section 44', resourceUrl: '/bill/part8-miscellaneous' }
    ]
  },
  {
    id: 'payment-processor',
    name: 'Virtual Asset Payment Processor',
    icon: 'CreditCard',
    description: 'Arranges transactions involving virtual assets and fiat currency, or between virtual assets (payment gateway services).',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Central Bank of Kenya'],
    custodial: false,
    riskLevel: 'medium',
    keyObligations: [
      'Licensed by Central Bank of Kenya only',
      'Open and operate a bank account in Kenya',
      'Ensure fair and transparent marketing',
      'Handle customer complaints mechanism',
      'Business continuity and disaster recovery planning',
      'Comply with data protection requirements'
    ],
    relevantSections: ['Section 6', 'Section 25', 'Section 32'],
    pdfPages: [4, 13, 16],
    examples: [
      { name: 'BitPay', description: 'Crypto payment processor for merchants', type: 'international' },
      { name: 'Kotani Pay', description: 'Blockchain payment rails for Africa', type: 'local' },
      { name: 'Fonbnk', description: 'Crypto-to-airtime payment service', type: 'local' }
    ],
    keywords: ['payment', 'processor', 'gateway', 'merchant', 'pay', 'transaction', 'transfer'],
    licensingRequirements: [
      { title: 'CBK License', description: 'National Payment System license', resource: 'CBK', resourceUrl: 'https://www.centralbank.go.ke' },
      { title: 'Bank Account', description: 'Kenya-based bank account', resource: 'Section 25(g)', resourceUrl: '/bill/part4-obligations' }
    ]
  },
  {
    id: 'broker',
    name: 'Virtual Asset Broker',
    icon: 'Handshake',
    description: 'Facilitates exchange between virtual assets through exchanges and wallet providers for retail, institutional investors, or funds.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Capital Markets Authority'],
    custodial: false,
    riskLevel: 'medium',
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Conduct due diligence on virtual assets',
      'Manage conflicts of interest',
      'Maintain competence in services provided',
      'Protect whistle-blowers',
      'Prevent market abuse'
    ],
    relevantSections: ['Section 24', 'Section 25', 'Section 32'],
    pdfPages: [12, 13, 16],
    examples: [
      { name: 'OVEX', description: 'OTC crypto brokerage in Africa', type: 'local' },
      { name: 'Genesis Trading', description: 'Institutional crypto broker', type: 'international' }
    ],
    keywords: ['broker', 'brokerage', 'facilitate', 'intermediary', 'agent', 'otc'],
    licensingRequirements: [
      { title: 'CMA License', description: 'Capital Markets Authority license', resource: 'CMA', resourceUrl: 'https://www.cma.or.ke' }
    ]
  },
  {
    id: 'investment-advisor',
    name: 'Virtual Asset Investment Advisor',
    icon: 'TrendingUp',
    description: 'Provides investment advice on virtual assets, initial virtual asset offerings, and non-fungible tokens for clients.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Capital Markets Authority'],
    custodial: false,
    riskLevel: 'medium',
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Provide services honestly and fairly',
      'Maintain consumer education programs',
      'Ensure employees comply with the Act',
      'Annual financial statement audits',
      'Comply with code of conduct'
    ],
    relevantSections: ['Section 22', 'Section 25', 'Section 30'],
    pdfPages: [11, 13, 15],
    examples: [
      { name: 'Crypto investment consultancies', description: 'Firms advising on crypto portfolios', type: 'local' },
      { name: 'Wealth managers adding crypto', description: 'Traditional advisors adding digital assets', type: 'local' }
    ],
    keywords: ['advisor', 'advice', 'investment', 'consult', 'recommend', 'guide', 'portfolio'],
    licensingRequirements: [
      { title: 'Investment Advisor License', description: 'CMA investment advisor registration', resource: 'CMA', resourceUrl: 'https://www.cma.or.ke' }
    ]
  },
  {
    id: 'asset-manager',
    name: 'Virtual Asset Manager',
    icon: 'PieChart',
    description: 'Manages portfolios including virtual assets on a discretionary basis according to client mandates.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Capital Markets Authority'],
    custodial: true,
    riskLevel: 'high',
    keyObligations: [
      'Licensed by Capital Markets Authority',
      'Discretionary portfolio management',
      'Conduct business with integrity',
      'Deal fairly with all clients',
      'Maintain financial soundness',
      'Insurance requirements compliance'
    ],
    relevantSections: ['Section 21', 'Section 22', 'Section 23'],
    pdfPages: [10, 11, 12],
    examples: [
      { name: 'Grayscale', description: 'Digital asset investment manager', type: 'international' },
      { name: 'CoinShares', description: 'Digital asset investment company', type: 'international' }
    ],
    keywords: ['manager', 'manage', 'fund', 'portfolio', 'discretionary', 'asset management'],
    licensingRequirements: [
      { title: 'Fund Manager License', description: 'CMA fund management license', resource: 'CMA', resourceUrl: 'https://www.cma.or.ke' }
    ]
  },
  {
    id: 'ivao-provider',
    name: 'Initial Virtual Asset Offering Provider',
    icon: 'Rocket',
    description: 'Issues and sells virtual assets to the public, including providing financial services relating to IVAOs.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Capital Markets Authority', 'Central Bank of Kenya'],
    custodial: false,
    riskLevel: 'high',
    keyObligations: [
      'Obtain approval before issuance',
      'Submit offering documents to regulator',
      'Cannot be a natural person',
      'Comply with promotion requirements',
      'Target investor base disclosure',
      'No misleading information'
    ],
    relevantSections: ['Section 35', 'Section 7', 'Section 41'],
    pdfPages: [17, 5, 19],
    examples: [
      { name: 'Token fundraising projects', description: 'Projects raising funds via token sales', type: 'international' },
      { name: 'Security token offerings', description: 'Regulated token offerings', type: 'international' }
    ],
    keywords: ['ico', 'ivao', 'token sale', 'offering', 'fundraise', 'issue', 'issuance', 'launch'],
    licensingRequirements: [
      { title: 'IVAO Approval', description: 'Regulatory approval before offering', resource: 'Section 35', resourceUrl: '/bill/part6-ivao' }
    ]
  },
  {
    id: 'stablecoin-issuer',
    name: 'Stablecoin Issuer',
    icon: 'Coins',
    description: 'Issues stablecoins backed by fiat currency, commodities, or algorithmic mechanisms for use in Kenya.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Central Bank of Kenya'],
    custodial: true,
    riskLevel: 'high',
    keyObligations: [
      'Maintain 1:1 reserve backing (for fiat-backed)',
      'Regular reserve audits and disclosures',
      'Redemption mechanisms for holders',
      'Comply with monetary policy requirements',
      'CBK approval for issuance',
      'Enhanced capital requirements'
    ],
    relevantSections: ['Section 3', 'Section 6', 'Section 35'],
    pdfPages: [3, 4, 17],
    examples: [
      { name: 'USDT (Tether)', description: 'USD-pegged stablecoin', type: 'international' },
      { name: 'USDC (Circle)', description: 'Regulated USD stablecoin', type: 'international' },
      { name: 'cKES (potential)', description: 'Potential Kenya Shilling stablecoin', type: 'local' }
    ],
    keywords: ['stablecoin', 'stable', 'usdt', 'usdc', 'peg', 'pegged', 'fiat-backed'],
    licensingRequirements: [
      { title: 'CBK Approval', description: 'Central Bank approval required', resource: 'CBK', resourceUrl: 'https://www.centralbank.go.ke' }
    ]
  },
  {
    id: 'crypto-atm',
    name: 'Crypto ATM Operator',
    icon: 'Landmark',
    description: 'Operates physical kiosks allowing purchase or sale of virtual assets for cash or mobile money.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Central Bank of Kenya'],
    custodial: false,
    riskLevel: 'high',
    keyObligations: [
      'Physical location registration',
      'KYC verification at point of sale',
      'Transaction limits per user',
      'Cash handling compliance',
      'Real-time reporting to regulator',
      'Machine security requirements'
    ],
    relevantSections: ['Section 3', 'Section 6', 'Section 33'],
    pdfPages: [3, 4, 17],
    examples: [
      { name: 'Bitcoin ATMs', description: 'Physical Bitcoin buying/selling kiosks', type: 'international' },
      { name: 'General Bytes', description: 'Bitcoin ATM manufacturer/operator', type: 'international' }
    ],
    keywords: ['atm', 'kiosk', 'machine', 'physical', 'cash', 'terminal'],
    licensingRequirements: [
      { title: 'Physical Registration', description: 'Register ATM locations', resource: 'CBK', resourceUrl: 'https://www.centralbank.go.ke' }
    ]
  },
  {
    id: 'otc-desk',
    name: 'OTC Trading Desk',
    icon: 'Building',
    description: 'Facilitates over-the-counter trading of virtual assets for high-value transactions outside public exchanges.',
    isRegulated: true,
    regulationStatus: 'fully-regulated',
    regulatoryAuthority: ['Capital Markets Authority', 'Central Bank of Kenya'],
    custodial: false,
    riskLevel: 'high',
    keyObligations: [
      'Enhanced customer due diligence for large transactions',
      'Price transparency requirements',
      'Settlement risk management',
      'Trade reporting to regulators',
      'Maintain adequate capital reserves',
      'AML/CFT compliance for high-value trades'
    ],
    relevantSections: ['Section 3', 'Section 25', 'Section 33'],
    pdfPages: [3, 13, 17],
    examples: [
      { name: 'Circle Trade', description: 'Institutional OTC trading', type: 'international' },
      { name: 'Cumberland', description: 'DRW subsidiary for crypto OTC', type: 'international' }
    ],
    keywords: ['otc', 'over the counter', 'institutional', 'large', 'block trade', 'desk'],
    licensingRequirements: [
      { title: 'OTC License', description: 'CMA/CBK license for OTC activities', resource: 'Section 3', resourceUrl: '/bill/part1-preliminary' }
    ]
  },

  // PARTIALLY REGULATED / CONDITIONAL
  {
    id: 'defi-aggregator',
    name: 'DeFi Aggregator / Front-End',
    icon: 'Layers',
    description: 'Provides user interfaces or aggregation services for accessing decentralized finance protocols. Regulation depends on custody involvement.',
    isRegulated: true,
    regulationStatus: 'partially-regulated',
    regulatoryAuthority: ['Capital Markets Authority'],
    custodial: false,
    riskLevel: 'medium',
    keyObligations: [
      'Disclose protocol risks to users',
      'Implement basic AML screening',
      'No custody of user assets',
      'Fair representation of yields/returns',
      'Risk warnings for smart contract risks',
      'Consumer education requirements'
    ],
    relevantSections: ['Section 3', 'Section 22', 'Section 25'],
    pdfPages: [3, 11, 13],
    examples: [
      { name: '1inch', description: 'DEX aggregator', type: 'international' },
      { name: 'Zapper', description: 'DeFi portfolio manager interface', type: 'international' },
      { name: 'DefiLlama', description: 'DeFi analytics platform', type: 'international' }
    ],
    keywords: ['defi', 'decentralized', 'aggregator', 'yield', 'farming', 'liquidity', 'protocol', 'dex'],
    licensingRequirements: [
      { title: 'Activity Assessment', description: 'Determine if activities trigger licensing', resource: 'CMA Guidance', resourceUrl: 'https://www.cma.or.ke' }
    ]
  },
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace (Financial)',
    icon: 'Image',
    description: 'Operates marketplace for NFTs used for investment or financial purposes. Pure art/collectible NFTs are exempt.',
    isRegulated: true,
    regulationStatus: 'partially-regulated',
    regulatoryAuthority: ['Capital Markets Authority'],
    custodial: false,
    riskLevel: 'medium',
    keyObligations: [
      'Determine if NFTs are used for investment',
      'AML/KYC for high-value transactions',
      'Platform integrity requirements',
      'Fraud prevention measures',
      'Consumer protection disclosures',
      'Transaction record keeping'
    ],
    relevantSections: ['Section 5(2)(d)', 'Section 25', 'Section 44'],
    pdfPages: [4, 13, 21],
    examples: [
      { name: 'OpenSea', description: 'NFT marketplace', type: 'international' },
      { name: 'Blur', description: 'NFT trading platform', type: 'international' },
      { name: 'African NFT platforms', description: 'Local NFT marketplaces', type: 'local' }
    ],
    keywords: ['nft', 'non-fungible', 'collectible', 'art', 'marketplace', 'digital art'],
    licensingRequirements: [
      { title: 'NFT Classification', description: 'Determine if NFTs are financial instruments', resource: 'Section 5(2)(d)', resourceUrl: '/bill/part1-preliminary' }
    ]
  },

  // NON-REGULATED / EXEMPT CATEGORIES
  {
    id: 'non-custodial-wallet',
    name: 'Non-Custodial Wallet Provider',
    icon: 'Wallet',
    description: 'Provides software for users to manage their own private keys without custody. Users maintain full control of their assets.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'No direct VASP licensing required',
      'Consider data protection compliance',
      'Provide security best practices to users',
      'Clear terms of service'
    ],
    relevantSections: ['Section 3(2)'],
    pdfPages: [3],
    examples: [
      { name: 'MetaMask', description: 'Browser-based self-custody wallet', type: 'international' },
      { name: 'Trust Wallet', description: 'Mobile non-custodial wallet', type: 'international' },
      { name: 'Ledger (hardware)', description: 'Hardware wallet manufacturer', type: 'international' }
    ],
    keywords: ['self-custody', 'non-custodial', 'hardware wallet', 'cold storage', 'private key', 'metamask'],
    licensingRequirements: [
      { title: 'No License Required', description: 'Non-custodial services generally exempt from VASP licensing', resource: 'Section 3(2)', resourceUrl: '/bill/part1-preliminary' }
    ]
  },
  {
    id: 'utility-token-issuer',
    name: 'Utility Token Issuer',
    icon: 'Coins',
    description: 'Issues tokens that provide access to a specific application or service. These are exempt if non-transferable and closed ecosystem.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'Tokens must be non-transferable to third parties',
      'Only usable within specific ecosystem',
      'No investment/payment purpose',
      'Clear utility function'
    ],
    relevantSections: ['Section 2', 'Section 3(2)'],
    pdfPages: [2, 3],
    examples: [
      { name: 'Gaming tokens (non-tradeable)', description: 'In-game currency with no external value', type: 'international' },
      { name: 'Loyalty points', description: 'Brand-specific rewards', type: 'local' },
      { name: 'Access tokens', description: 'Membership/access credentials', type: 'international' }
    ],
    keywords: ['utility', 'token', 'service', 'access', 'non-transferable', 'closed', 'ecosystem'],
    licensingRequirements: [
      { title: 'Token Assessment', description: 'Confirm token meets utility exemption criteria', resource: 'Section 3(2)', resourceUrl: '/bill/part1-preliminary' }
    ]
  },
  {
    id: 'nft-art-only',
    name: 'NFT Marketplace (Art/Collectibles Only)',
    icon: 'Image',
    description: 'NFT platforms exclusively for art and collectibles without investment or financial purposes are exempt.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'Ensure NFTs are not marketed as investments',
      'No fractional ownership schemes',
      'No yield/return promises',
      'Consumer protection disclosures'
    ],
    relevantSections: ['Section 5(2)(d)'],
    pdfPages: [4],
    examples: [
      { name: 'Digital art galleries', description: 'Pure art NFT platforms', type: 'international' },
      { name: 'Artist direct sales', description: 'Artists selling directly to collectors', type: 'local' }
    ],
    keywords: ['art', 'collectible', 'artist', 'gallery', 'culture', 'creative'],
    licensingRequirements: [
      { title: 'Art NFT Exemption', description: 'Ensure NFTs meet art/collectible exemption', resource: 'Section 5(2)(d)', resourceUrl: '/bill/part1-preliminary' }
    ]
  },
  {
    id: 'blockchain-developer',
    name: 'Blockchain/Smart Contract Developer',
    icon: 'Code',
    description: 'Develops blockchain infrastructure, smart contracts, or dApps without providing financial services.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'No direct VASP obligations',
      'Consider IP and contract law',
      'Security audit best practices'
    ],
    relevantSections: [],
    pdfPages: [],
    examples: [
      { name: 'Smart contract auditors', description: 'Security audit firms', type: 'international' },
      { name: 'Protocol developers', description: 'Open-source blockchain developers', type: 'international' },
      { name: 'dApp builders', description: 'Decentralized application developers', type: 'local' }
    ],
    keywords: ['developer', 'code', 'smart contract', 'blockchain', 'protocol', 'build', 'audit'],
    licensingRequirements: [
      { title: 'No License Required', description: 'Pure development activities are exempt', resource: 'Not applicable', resourceUrl: '' }
    ]
  },
  {
    id: 'mining-operator',
    name: 'Crypto Mining Operator',
    icon: 'Cpu',
    description: 'Operates cryptocurrency mining infrastructure. Mining itself is not a VASP activity, but selling mined assets may trigger requirements.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'Mining itself not regulated under VASP Bill',
      'Energy regulations may apply',
      'Tax obligations on mining income',
      'Selling mined assets may require license if done as business'
    ],
    relevantSections: [],
    pdfPages: [],
    examples: [
      { name: 'Bitcoin miners', description: 'BTC mining operations', type: 'international' },
      { name: 'Mining pools', description: 'Collective mining operations', type: 'international' }
    ],
    keywords: ['mining', 'miner', 'hash', 'proof of work', 'validator', 'node'],
    licensingRequirements: [
      { title: 'Activity Assessment', description: 'Mining exempt but distribution may require license', resource: 'KRA Guidelines', resourceUrl: 'https://www.kra.go.ke' }
    ]
  },
  {
    id: 'crypto-education',
    name: 'Crypto Education Provider',
    icon: 'GraduationCap',
    description: 'Provides educational content, courses, or training about blockchain and cryptocurrencies without financial services.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'No VASP license required',
      'Avoid providing investment advice',
      'Disclaimer that education is not financial advice',
      'General consumer protection'
    ],
    relevantSections: [],
    pdfPages: [],
    examples: [
      { name: 'Crypto academies', description: 'Online crypto courses', type: 'international' },
      { name: 'Blockchain training', description: 'Professional development programs', type: 'local' }
    ],
    keywords: ['education', 'training', 'course', 'academy', 'learn', 'teach', 'workshop'],
    licensingRequirements: [
      { title: 'No License Required', description: 'Educational services are exempt', resource: 'Not applicable', resourceUrl: '' }
    ]
  },
  {
    id: 'crypto-media',
    name: 'Crypto News/Media Platform',
    icon: 'Newspaper',
    description: 'Provides news, analysis, and information about cryptocurrencies and blockchain without financial services.',
    isRegulated: false,
    regulationStatus: 'exempt',
    regulatoryAuthority: [],
    custodial: false,
    riskLevel: 'low',
    keyObligations: [
      'No VASP license required',
      'Media and press law compliance',
      'Avoid paid promotions appearing as news',
      'Disclosure of sponsored content'
    ],
    relevantSections: [],
    pdfPages: [],
    examples: [
      { name: 'CoinDesk', description: 'Crypto news outlet', type: 'international' },
      { name: 'Africa blockchain news', description: 'Regional crypto journalism', type: 'local' }
    ],
    keywords: ['news', 'media', 'journalism', 'reporting', 'analysis', 'blog'],
    licensingRequirements: [
      { title: 'No License Required', description: 'Media activities are exempt from VASP licensing', resource: 'Not applicable', resourceUrl: '' }
    ]
  }
];

// Helper function to get regulated vs non-regulated
export const getRegulatedCompanies = () => companyTypesData.filter(c => c.isRegulated);
export const getNonRegulatedCompanies = () => companyTypesData.filter(c => !c.isRegulated);

// Simple string matching for search
export const searchCompanyTypes = (query: string): CompanyTypeData[] => {
  if (!query.trim()) return companyTypesData;
  
  const q = query.toLowerCase().trim();
  
  return companyTypesData
    .map(company => {
      let score = 0;
      
      // Exact name match
      if (company.name.toLowerCase() === q) score += 100;
      
      // Name contains
      if (company.name.toLowerCase().includes(q)) score += 50;
      
      // Description match
      if (company.description.toLowerCase().includes(q)) score += 20;
      
      // Keyword matches
      company.keywords.forEach(keyword => {
        if (keyword.toLowerCase() === q) score += 40;
        if (keyword.toLowerCase().includes(q)) score += 15;
        if (q.includes(keyword.toLowerCase())) score += 10;
      });
      
      // Example matches
      company.examples.forEach(ex => {
        if (ex.name.toLowerCase().includes(q)) score += 25;
        if (ex.description.toLowerCase().includes(q)) score += 10;
      });
      
      return { company, score };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(result => result.company);
};

// Get company by ID
export const getCompanyById = (id: string): CompanyTypeData | undefined => 
  companyTypesData.find(c => c.id === id);
