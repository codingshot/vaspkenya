import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ChevronLeft, CheckCircle2, Building2, 
  Users, Globe, Wallet, BarChart3, AlertTriangle, FileCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: string;
  question: string;
  description?: string;
  options: {
    value: string;
    label: string;
    description?: string;
  }[];
  multiSelect?: boolean;
}

const questions: Question[] = [
  {
    id: 'entity-type',
    question: 'What type of entity is your business?',
    description: 'Section 9(2): Only companies can be licensed as VASPs in Kenya',
    options: [
      { value: 'local-company', label: 'Kenyan Registered Company', description: 'Incorporated under the Companies Act (Cap. 486)' },
      { value: 'foreign-company', label: 'Foreign Company (with Kenya compliance)', description: 'With Certificate of Compliance from Registrar of Companies' },
      { value: 'foreign-no-compliance', label: 'Foreign Company (no Kenya presence)', description: 'Operating globally without Kenya registration' },
      { value: 'individual', label: 'Individual / Sole Proprietor', description: 'Natural person - NOT eligible under Section 9(2)' },
      { value: 'partnership', label: 'Partnership', description: 'Unincorporated partnership - NOT eligible' },
      { value: 'dao', label: 'DAO / Decentralized Entity', description: 'Decentralized autonomous organization - NOT eligible' },
    ]
  },
  {
    id: 'custody-type',
    question: 'Do you hold or control customer virtual assets?',
    description: 'Custodial services trigger additional requirements under Section 32',
    options: [
      { value: 'custodial', label: 'Yes - Custodial', description: 'We store/manage customer private keys or assets' },
      { value: 'non-custodial', label: 'No - Non-Custodial', description: 'Users control their own keys; we provide software only' },
      { value: 'hybrid', label: 'Hybrid/Mixed', description: 'Some custodial, some non-custodial services' },
      { value: 'unsure', label: 'Not Sure', description: 'Need help determining custody status' },
    ]
  },
  {
    id: 'services',
    question: 'What virtual asset services do you provide?',
    description: 'Select all that apply - see Schedule to the Act',
    multiSelect: true,
    options: [
      { value: 'custody', label: 'Custody / Wallet Services', description: 'Storing virtual assets for clients' },
      { value: 'exchange', label: 'Exchange Services', description: 'Trading between virtual assets and/or fiat' },
      { value: 'transfer', label: 'Transfer Services', description: 'Facilitating transfers between parties' },
      { value: 'payment', label: 'Payment Processing', description: 'Payment gateway for virtual assets' },
      { value: 'brokerage', label: 'Brokerage', description: 'Facilitating trades for clients' },
      { value: 'advisory', label: 'Investment Advisory', description: 'Advice on virtual asset investments' },
      { value: 'management', label: 'Asset Management', description: 'Managing virtual asset portfolios' },
      { value: 'ivao', label: 'Token Issuance (IVAO)', description: 'Issuing/selling new virtual assets - Section 35' },
      { value: 'defi', label: 'DeFi Aggregation', description: 'Frontend for DeFi protocols' },
      { value: 'nft-investment', label: 'NFT (Investment)', description: 'NFTs marketed as investments' },
      { value: 'nft-art', label: 'NFT (Art/Collectibles)', description: 'Pure art/collectible NFTs - EXEMPT per Section 5(2)(d)' },
      { value: 'development', label: 'Software/Development Only', description: 'Building dApps, smart contracts - may be EXEMPT' },
      { value: 'education', label: 'Education/Content Only', description: 'Teaching, courses, media - EXEMPT' },
      { value: 'mining', label: 'Mining Only', description: 'Crypto mining without exchange - may be EXEMPT' },
      { value: 'research', label: 'Research/Analytics Only', description: 'Data analytics - EXEMPT' },
    ]
  },
  {
    id: 'client-type',
    question: 'Who are your primary clients?',
    multiSelect: true,
    options: [
      { value: 'retail', label: 'Retail Clients', description: 'Individual consumers' },
      { value: 'institutional', label: 'Institutional Clients', description: 'Banks, funds, corporations' },
      { value: 'corporate', label: 'Corporate Clients', description: 'Businesses using crypto payments' },
      { value: 'other-vasps', label: 'Other VASPs', description: 'B2B virtual asset services' },
      { value: 'no-clients', label: 'No Direct Clients', description: 'Open-source/infrastructure only' },
    ]
  },
  {
    id: 'jurisdiction',
    question: 'Where do you provide services?',
    description: 'The Act applies to services provided in or from Kenya',
    options: [
      { value: 'kenya-only', label: 'Kenya Only', description: 'Services limited to Kenya' },
      { value: 'kenya-based', label: 'Kenya-Based, Serving Africa', description: 'Based in Kenya, serving regional markets' },
      { value: 'global-kenya', label: 'Global, Serving Kenya', description: 'International company serving Kenyan clients' },
      { value: 'global-no-kenya', label: 'Global, Not Serving Kenya', description: 'No Kenyan clients or operations - NOT subject to Act' },
    ]
  },
  {
    id: 'assets-handled',
    question: 'What types of digital assets do you handle?',
    description: 'Some asset types are exempt under Section 5',
    multiSelect: true,
    options: [
      { value: 'crypto', label: 'Cryptocurrencies', description: 'Bitcoin, Ethereum, etc. - REGULATED' },
      { value: 'stablecoins', label: 'Stablecoins', description: 'USDT, USDC, etc. - REGULATED' },
      { value: 'utility-tokens', label: 'Utility Tokens (Closed System)', description: 'Non-transferable service access - EXEMPT per Section 3(2)' },
      { value: 'nfts-investment', label: 'NFTs (Investment)', description: 'NFTs used for investment - REGULATED' },
      { value: 'nfts-art', label: 'NFTs (Art/Collectibles Only)', description: 'Non-financial NFTs - EXEMPT per Section 5(2)(d)' },
      { value: 'security-tokens', label: 'Security Tokens', description: 'Tokenized securities - regulated by CMA' },
      { value: 'none', label: 'No Assets Handled', description: 'Software/education only' },
    ]
  },
  {
    id: 'current-status',
    question: 'What is your current operational status?',
    description: 'Existing operators have 6 months transitional period (Section 47)',
    options: [
      { value: 'operating', label: 'Currently Operating in Kenya', description: 'Already providing services - apply within 6 months' },
      { value: 'planning', label: 'Planning to Launch', description: 'Preparing to enter Kenyan market' },
      { value: 'expanding', label: 'Expanding to Kenya', description: 'Operating elsewhere, entering Kenya' },
      { value: 'exploring', label: 'Exploring Options', description: 'Researching the market' },
    ]
  },
  {
    id: 'compliance-readiness',
    question: 'What compliance measures do you have in place?',
    description: 'Select all that apply',
    multiSelect: true,
    options: [
      { value: 'aml-kyc', label: 'AML/KYC Program', description: 'Customer due diligence per POCAMLA' },
      { value: 'cyber-security', label: 'Cyber Security Framework', description: 'Per Computer Misuse and Cybercrimes Act' },
      { value: 'audited-financials', label: 'Audited Financial Statements', description: 'Annual audits by approved auditor' },
      { value: 'local-office', label: 'Kenya Registered Office', description: 'Physical presence per Section 20' },
      { value: 'local-bank', label: 'Kenya Bank Account', description: 'Per Section 25(g)' },
      { value: 'insurance', label: 'Professional Insurance', description: 'Liability coverage per Section 23' },
      { value: 'fit-proper', label: 'Fit & Proper Directors', description: 'Per Section 19 requirements' },
      { value: 'none', label: 'None Yet', description: 'Starting from scratch' },
      { value: 'not-applicable', label: 'Not Applicable', description: 'May not need VASP compliance' },
    ]
  },
];

interface ActionItem {
  action: string;
  link?: string;
  linkText?: string;
  section?: string;
  priority: 'high' | 'medium' | 'low';
}

interface SectionLink {
  section: string;
  title: string;
  pdfPage: number;
}

interface AssessmentResult {
  requiresLicense: boolean;
  eligibleForLicense: boolean;
  regulators: string[];
  riskLevel: 'low' | 'medium' | 'high';
  immediateActions: ActionItem[];
  complianceGaps: ActionItem[];
  relevantSections: SectionLink[];
  estimatedTimeline: string;
  exemptionReason?: string;
  entityType: string;
  services: string[];
}

export const CompanyQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  // Load saved answers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vasp-questionnaire-answers');
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved answers');
      }
    }
  }, []);

  // Save answers to localStorage
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem('vasp-questionnaire-answers', JSON.stringify(answers));
    }
  }, [answers]);

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  const handleAnswer = (value: string) => {
    if (currentQuestion.multiSelect) {
      const current = (answers[currentQuestion.id] as string[]) || [];
      if (current.includes(value)) {
        setAnswers({ ...answers, [currentQuestion.id]: current.filter(v => v !== value) });
      } else {
        setAnswers({ ...answers, [currentQuestion.id]: [...current, value] });
      }
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const isOptionSelected = (value: string) => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (Array.isArray(answer)) {
      return answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to results page
      const results = getResults();
      navigate('/assessment-results', { state: { results } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getResults = (): AssessmentResult => {
    const entityType = answers['entity-type'] as string;
    const services = answers['services'] as string[] || [];
    const jurisdiction = answers['jurisdiction'] as string;
    const assetsHandled = answers['assets-handled'] as string[] || [];
    const complianceReady = answers['compliance-readiness'] as string[] || [];
    const currentStatus = answers['current-status'] as string;
    const custodyType = answers['custody-type'] as string;

    // Check for exempt activities
    const exemptServices = ['development', 'education', 'mining', 'nft-art', 'research'];
    const exemptAssets = ['utility-tokens', 'nfts-art', 'none'];
    
    const isExemptActivity = services.length > 0 && services.every(s => exemptServices.includes(s));
    const isExemptAssets = assetsHandled.length > 0 && assetsHandled.every(a => exemptAssets.includes(a));
    const isNonCustodial = custodyType === 'non-custodial' && !services.some(s => ['exchange', 'custody', 'payment'].includes(s));
    const isForeignNoCompliance = entityType === 'foreign-no-compliance';
    const isDAO = entityType === 'dao';
    const isNotServingKenya = jurisdiction === 'global-no-kenya';

    // Determine exemption reason
    let exemptionReason: string | undefined;
    if (isNotServingKenya) {
      exemptionReason = 'Not serving Kenya (Section 4)';
    } else if (isExemptActivity) {
      exemptionReason = 'Exempt activity (Section 5)';
    } else if (isExemptAssets) {
      exemptionReason = 'Exempt asset types only (Section 3, 5)';
    } else if (isNonCustodial && services.every(s => exemptServices.includes(s) || s === 'defi')) {
      exemptionReason = 'Non-custodial software only';
    }

    // Determine if license is required
    const requiresLicense = 
      !isNotServingKenya && 
      !isForeignNoCompliance &&
      services.length > 0 &&
      !isExemptActivity &&
      !isExemptAssets &&
      !exemptionReason;

    // Determine eligibility
    const eligibleForLicense = 
      entityType === 'local-company' || entityType === 'foreign-company';

    // Determine regulators
    const regulators: string[] = [];
    if (requiresLicense) {
      if (services.some(s => ['custody', 'exchange', 'transfer', 'payment'].includes(s))) {
        regulators.push('Central Bank of Kenya (CBK)');
      }
      if (services.some(s => ['brokerage', 'advisory', 'management', 'ivao', 'exchange', 'defi', 'nft-investment'].includes(s))) {
        regulators.push('Capital Markets Authority (CMA)');
      }
    }

    // Risk assessment
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (currentStatus === 'operating' && requiresLicense && !eligibleForLicense) riskLevel = 'high';
    else if (currentStatus === 'operating' && requiresLicense && complianceReady.includes('none')) riskLevel = 'high';
    else if (currentStatus === 'operating' && requiresLicense) riskLevel = 'medium';
    else if (services.length > 3) riskLevel = 'medium';
    else if (services.includes('ivao')) riskLevel = 'medium';

    // Immediate actions with links
    const immediateActions: ActionItem[] = [];
    
    if (!eligibleForLicense && entityType === 'individual') {
      immediateActions.push({
        action: 'Incorporate a company under the Companies Act - Section 9(2) prohibits individuals from being VASPs',
        link: '/pdf-viewer?page=6&search=natural%20person',
        linkText: 'View Section 9(2)',
        section: 'Section 9',
        priority: 'high'
      });
    }
    if (!eligibleForLicense && entityType === 'partnership') {
      immediateActions.push({
        action: 'Convert to a registered company - partnerships cannot be licensed as VASPs',
        link: '/pdf-viewer?page=6&search=company',
        linkText: 'View Requirements',
        section: 'Section 9',
        priority: 'high'
      });
    }
    if (entityType === 'dao') {
      immediateActions.push({
        action: 'DAOs cannot be licensed in Kenya - consider incorporating a legal entity wrapper in Kenya',
        link: '/company/foreign-company',
        linkText: 'Foreign Company Options',
        priority: 'high'
      });
    }
    if (entityType === 'foreign-no-compliance') {
      immediateActions.push({
        action: 'To serve Kenyan clients, obtain Certificate of Compliance from the Registrar of Companies',
        link: 'https://brs.go.ke',
        linkText: 'Business Registration Service',
        priority: 'high'
      });
      immediateActions.push({
        action: 'Consider establishing a local subsidiary or partnership with a Kenyan company',
        link: '/company/foreign-company',
        linkText: 'Foreign Company Guide',
        priority: 'medium'
      });
    }
    if (entityType === 'foreign-company') {
      immediateActions.push({
        action: 'Verify Certificate of Compliance is current with the Registrar of Companies',
        link: 'https://brs.go.ke',
        linkText: 'Check Status',
        section: 'Section 9',
        priority: 'medium'
      });
    }
    if (currentStatus === 'operating' && requiresLicense) {
      immediateActions.push({
        action: 'Apply for license within 6 months of Act commencement (transitional period)',
        link: '/pdf-viewer?page=26&search=transitional',
        linkText: 'View Section 47',
        section: 'Section 47',
        priority: 'high'
      });
    }
    if (services.includes('ivao')) {
      immediateActions.push({
        action: 'IVAO (token issuance) requires prior approval from regulatory authority before any offering',
        link: '/pdf-viewer?page=18&search=virtual%20asset%20offering',
        linkText: 'IVAO Requirements',
        section: 'Section 35',
        priority: 'high'
      });
    }

    // Compliance gaps with links
    const complianceGaps: ActionItem[] = [];
    
    if (requiresLicense && !complianceReady.includes('aml-kyc')) {
      complianceGaps.push({
        action: 'Establish AML/KYC/CFT program compliant with POCAMLA and Prevention of Terrorism Act',
        link: '/compliance/aml-kyc',
        linkText: 'AML/KYC Guide',
        section: 'Section 33',
        priority: 'high'
      });
    }
    if (requiresLicense && !complianceReady.includes('cyber-security')) {
      complianceGaps.push({
        action: 'Implement cyber security measures per Computer Misuse and Cybercrimes Act',
        link: '/compliance/cyber-security',
        linkText: 'Cyber Security Guide',
        section: 'Section 29',
        priority: 'high'
      });
    }
    if (requiresLicense && !complianceReady.includes('local-office')) {
      complianceGaps.push({
        action: 'Establish registered office in Kenya',
        link: '/compliance/registered-office',
        linkText: 'Office Requirements',
        section: 'Section 20',
        priority: 'high'
      });
    }
    if (requiresLicense && !complianceReady.includes('local-bank')) {
      complianceGaps.push({
        action: 'Open and maintain a bank account in Kenya',
        link: '/pdf-viewer?page=13&search=bank%20account',
        linkText: 'View Requirement',
        section: 'Section 25(g)',
        priority: 'medium'
      });
    }
    if (requiresLicense && !complianceReady.includes('audited-financials')) {
      complianceGaps.push({
        action: 'Engage approved auditor for annual audited financial statements',
        link: '/compliance/financial-reporting',
        linkText: 'Audit Requirements',
        section: 'Section 25(f)',
        priority: 'medium'
      });
    }
    if (requiresLicense && !complianceReady.includes('insurance')) {
      complianceGaps.push({
        action: 'Obtain professional indemnity insurance as prescribed',
        link: '/pdf-viewer?page=12&search=insurance',
        linkText: 'Insurance Requirements',
        section: 'Section 23',
        priority: 'medium'
      });
    }
    if (requiresLicense && !complianceReady.includes('fit-proper')) {
      complianceGaps.push({
        action: 'Ensure all directors and officers meet fit and proper requirements',
        link: '/compliance/fit-and-proper',
        linkText: 'Fit & Proper Guide',
        section: 'Section 19',
        priority: 'high'
      });
    }
    if (requiresLicense && services.includes('custody') && !complianceReady.includes('insurance')) {
      complianceGaps.push({
        action: 'Implement customer asset protection measures - assets must be segregated',
        link: '/pdf-viewer?page=16&search=customer%20asset',
        linkText: 'Customer Protection',
        section: 'Section 32',
        priority: 'high'
      });
    }

    // Relevant sections with PDF pages
    const relevantSections: SectionLink[] = [
      { section: 'Section 2', title: 'Definitions', pdfPage: 2 },
      { section: 'Section 3', title: 'VASP Definition', pdfPage: 3 },
    ];
    
    if (!exemptionReason) {
      relevantSections.push(
        { section: 'Section 9', title: 'Prohibition (Natural Persons)', pdfPage: 6 },
        { section: 'Section 11', title: 'License Application', pdfPage: 7 },
        { section: 'Section 19', title: 'Fit and Proper', pdfPage: 10 },
        { section: 'Section 25', title: 'Additional Requirements', pdfPage: 13 }
      );
    }
    
    if (services.includes('ivao')) {
      relevantSections.push({ section: 'Section 35', title: 'IVAO Requirements', pdfPage: 18 });
    }
    if (services.includes('custody')) {
      relevantSections.push({ section: 'Section 32', title: 'Customer Asset Protection', pdfPage: 16 });
    }
    if (requiresLicense) {
      relevantSections.push(
        { section: 'Section 33', title: 'AML/CFT/CPF', pdfPage: 17 },
        { section: 'Section 41', title: 'Penalties', pdfPage: 21 }
      );
    }
    if (currentStatus === 'operating') {
      relevantSections.push({ section: 'Section 47', title: 'Transitional Provisions', pdfPage: 26 });
    }

    // Timeline
    let estimatedTimeline = '3-6 months';
    if (complianceGaps.length > 4) estimatedTimeline = '6-12 months';
    if (!eligibleForLicense) estimatedTimeline = '12+ months (requires incorporation)';
    if (!requiresLicense) estimatedTimeline = 'N/A - May be exempt';

    return {
      requiresLicense,
      eligibleForLicense,
      regulators,
      riskLevel,
      immediateActions,
      complianceGaps,
      relevantSections,
      estimatedTimeline,
      exemptionReason,
      entityType,
      services,
    };
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setAnswers({});
    localStorage.removeItem('vasp-questionnaire-answers');
  };

  return (
    <section id="questionnaire" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            Compliance Assessment
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Determine Your Requirements
          </h2>
          <p className="text-lg text-muted-foreground">
            Answer a few questions to get a personalized compliance assessment based on the VASP Act, 2025.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Question {currentStep + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question Card */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="font-display text-xl md:text-2xl">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.description && (
                <CardDescription className="text-base">
                  {currentQuestion.description}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isOptionSelected(option.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      isOptionSelected(option.value) ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {isOptionSelected(option.value) && (
                        <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{option.label}</p>
                      {option.description && (
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              {/* Navigation */}
              <div className="flex gap-4 pt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex-1 gap-2"
                >
                  {currentStep === questions.length - 1 ? 'See Results' : 'Next'}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Reset button */}
              {Object.keys(answers).length > 0 && (
                <div className="pt-2 text-center">
                  <Button variant="ghost" size="sm" onClick={resetQuestionnaire} className="text-muted-foreground">
                    Start Over
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
