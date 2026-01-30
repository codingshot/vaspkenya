// Resources for each compliance item
export interface ComplianceResource {
  itemId: string;
  resources: {
    title: string;
    description: string;
    url: string;
    type: 'internal' | 'external' | 'pdf';
  }[];
  billSection?: string;
  pdfPage?: number;
}

export const complianceResources: Record<string, ComplianceResource> = {
  'entity-1': {
    itemId: 'entity-1',
    billSection: 'part3-licensing',
    pdfPage: 6,
    resources: [
      { title: 'eCitizen Registration', description: 'Company registration portal', url: 'https://www.ecitizen.go.ke', type: 'external' },
      { title: 'Companies Act Guide', description: 'Registrar of Companies', url: 'https://www.attorney-general.go.ke', type: 'external' },
      { title: 'View Bill Section', description: 'Section 3, 9 - VASP requirements', url: '/pdf-viewer?page=6&search=incorporated', type: 'internal' }
    ]
  },
  'entity-2': {
    itemId: 'entity-2',
    billSection: 'part4-obligations',
    pdfPage: 11,
    resources: [
      { title: 'View Bill Section', description: 'Section 20 - Registered office requirement', url: '/pdf-viewer?page=11&search=registered%20office', type: 'internal' },
      { title: 'Office Space Guide', description: 'Requirements for business premises', url: '/concept/registered-office', type: 'internal' }
    ]
  },
  'entity-3': {
    itemId: 'entity-3',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25(g) - Bank account', url: '/pdf-viewer?page=13&search=bank%20account', type: 'internal' },
      { title: 'Kenya Bank Requirements', description: 'Corporate banking in Kenya', url: 'https://www.centralbank.go.ke', type: 'external' }
    ]
  },
  'license-1': {
    itemId: 'license-1',
    billSection: 'part3-licensing',
    pdfPage: 7,
    resources: [
      { title: 'View Bill Section', description: 'Section 11 - License application', url: '/pdf-viewer?page=7&search=application', type: 'internal' },
      { title: 'CMA Application', description: 'Capital Markets Authority', url: 'https://www.cma.or.ke', type: 'external' },
      { title: 'CBK Application', description: 'Central Bank of Kenya', url: 'https://www.centralbank.go.ke', type: 'external' }
    ]
  },
  'license-2': {
    itemId: 'license-2',
    billSection: 'part3-licensing',
    pdfPage: 7,
    resources: [
      { title: 'View Bill Section', description: 'Section 11 - Application fees', url: '/pdf-viewer?page=7&search=fee', type: 'internal' }
    ]
  },
  'license-3': {
    itemId: 'license-3',
    billSection: 'part3-licensing',
    pdfPage: 8,
    resources: [
      { title: 'View Bill Section', description: 'Section 13 - License display', url: '/pdf-viewer?page=8&search=display', type: 'internal' }
    ]
  },
  'gov-1': {
    itemId: 'gov-1',
    billSection: 'part4-obligations',
    pdfPage: 10,
    resources: [
      { title: 'View Bill Section', description: 'Section 21 - Board requirements', url: '/pdf-viewer?page=10&search=directors', type: 'internal' },
      { title: 'Board Composition Guide', description: 'Director requirements for VASPs', url: '/concept/fit-proper', type: 'internal' }
    ]
  },
  'gov-2': {
    itemId: 'gov-2',
    billSection: 'part4-obligations',
    pdfPage: 10,
    resources: [
      { title: 'View Bill Section', description: 'Section 19 - Fit and proper', url: '/pdf-viewer?page=10&search=fit%20and%20proper', type: 'internal' },
      { title: 'Fit & Proper Criteria', description: 'Assessment requirements', url: '/concept/fit-proper', type: 'internal' }
    ]
  },
  'gov-3': {
    itemId: 'gov-3',
    billSection: 'part4-obligations',
    pdfPage: 10,
    resources: [
      { title: 'View Bill Section', description: 'Section 19 - CEO requirements', url: '/pdf-viewer?page=10&search=chief%20executive', type: 'internal' }
    ]
  },
  'gov-4': {
    itemId: 'gov-4',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25 - Compliance officer', url: '/pdf-viewer?page=13&search=compliance', type: 'internal' }
    ]
  },
  'aml-1': {
    itemId: 'aml-1',
    billSection: 'part5-aml',
    pdfPage: 17,
    resources: [
      { title: 'View Bill Section', description: 'Section 33 - AML requirements', url: '/pdf-viewer?page=17&search=money%20laundering', type: 'internal' },
      { title: 'FRC Guidelines', description: 'Financial Reporting Centre', url: 'https://www.frc.go.ke', type: 'external' },
      { title: 'POCAMLA Act', description: 'Proceeds of Crime and AML Act', url: 'http://kenyalaw.org', type: 'external' }
    ]
  },
  'aml-2': {
    itemId: 'aml-2',
    billSection: 'part5-aml',
    pdfPage: 17,
    resources: [
      { title: 'View Bill Section', description: 'Section 33 - Suspicious activity', url: '/pdf-viewer?page=17&search=suspicious', type: 'internal' },
      { title: 'FRC SAR Filing', description: 'How to file SARs in Kenya', url: 'https://www.frc.go.ke', type: 'external' }
    ]
  },
  'aml-3': {
    itemId: 'aml-3',
    billSection: 'part5-aml',
    pdfPage: 17,
    resources: [
      { title: 'View Bill Section', description: 'Section 33 - Sanctions screening', url: '/pdf-viewer?page=17&search=sanctions', type: 'internal' },
      { title: 'UN Sanctions List', description: 'United Nations sanctions', url: 'https://www.un.org/securitycouncil/sanctions', type: 'external' }
    ]
  },
  'aml-4': {
    itemId: 'aml-4',
    billSection: 'part5-aml',
    pdfPage: 17,
    resources: [
      { title: 'View Bill Section', description: 'Section 33 - Risk assessment', url: '/pdf-viewer?page=17&search=risk', type: 'internal' },
      { title: 'FATF Guidance', description: 'Virtual asset risk assessment', url: 'https://www.fatf-gafi.org', type: 'external' }
    ]
  },
  'ops-1': {
    itemId: 'ops-1',
    billSection: 'part4-obligations',
    pdfPage: 14,
    resources: [
      { title: 'View Bill Section', description: 'Section 29 - Cyber security', url: '/pdf-viewer?page=14&search=cyber%20security', type: 'internal' },
      { title: 'Cybercrimes Act', description: 'Computer Misuse and Cybercrimes Act', url: 'http://kenyalaw.org', type: 'external' }
    ]
  },
  'ops-2': {
    itemId: 'ops-2',
    billSection: 'part4-obligations',
    pdfPage: 16,
    resources: [
      { title: 'View Bill Section', description: 'Section 32 - Customer assets', url: '/pdf-viewer?page=16&search=customer%20asset', type: 'internal' },
      { title: 'Asset Segregation Guide', description: 'Best practices for custody', url: '/concept/customer-protection', type: 'internal' }
    ]
  },
  'ops-3': {
    itemId: 'ops-3',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25(i) - Business continuity', url: '/pdf-viewer?page=13&search=continuity', type: 'internal' }
    ]
  },
  'ops-4': {
    itemId: 'ops-4',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25(h) - Data protection', url: '/pdf-viewer?page=13&search=data%20protection', type: 'internal' },
      { title: 'ODPC Guidelines', description: 'Office of Data Protection Commissioner', url: 'https://www.odpc.go.ke', type: 'external' }
    ]
  },
  'ops-5': {
    itemId: 'ops-5',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25(j) - Complaints mechanism', url: '/pdf-viewer?page=13&search=complaint', type: 'internal' }
    ]
  },
  'ops-6': {
    itemId: 'ops-6',
    billSection: 'part4-obligations',
    pdfPage: 12,
    resources: [
      { title: 'View Bill Section', description: 'Section 23 - Insurance requirements', url: '/pdf-viewer?page=12&search=insurance', type: 'internal' }
    ]
  },
  'report-1': {
    itemId: 'report-1',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 25(f) - Auditor appointment', url: '/pdf-viewer?page=13&search=auditor', type: 'internal' },
      { title: 'ICPAK', description: 'Institute of Certified Public Accountants', url: 'https://www.icpak.com', type: 'external' }
    ]
  },
  'report-2': {
    itemId: 'report-2',
    billSection: 'part8-miscellaneous',
    pdfPage: 21,
    resources: [
      { title: 'View Bill Section', description: 'Section 44 - Record keeping', url: '/pdf-viewer?page=21&search=seven%20years', type: 'internal' }
    ]
  },
  'report-3': {
    itemId: 'report-3',
    billSection: 'part8-miscellaneous',
    pdfPage: 21,
    resources: [
      { title: 'View Bill Section', description: 'Section 44 - Real-time access', url: '/pdf-viewer?page=21&search=real-time', type: 'internal' }
    ]
  },
  'report-4': {
    itemId: 'report-4',
    billSection: 'part4-obligations',
    pdfPage: 13,
    resources: [
      { title: 'View Bill Section', description: 'Section 26 - Incident notification', url: '/pdf-viewer?page=13&search=notification', type: 'internal' }
    ]
  }
};

export const getResourcesForItem = (itemId: string): ComplianceResource | undefined => {
  return complianceResources[itemId];
};
