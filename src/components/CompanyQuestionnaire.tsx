import { useState } from 'react';
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
    description: 'Only companies can be licensed as VASPs in Kenya',
    options: [
      { value: 'local-company', label: 'Kenyan Registered Company', description: 'Incorporated under the Companies Act (Cap. 486)' },
      { value: 'foreign-company', label: 'Foreign Company', description: 'With Certificate of Compliance in Kenya' },
      { value: 'individual', label: 'Individual / Sole Proprietor', description: 'Natural person operating independently' },
      { value: 'partnership', label: 'Partnership', description: 'Unincorporated partnership' },
    ]
  },
  {
    id: 'services',
    question: 'What virtual asset services do you provide?',
    description: 'Select all that apply',
    multiSelect: true,
    options: [
      { value: 'custody', label: 'Custody / Wallet Services', description: 'Storing virtual assets for clients' },
      { value: 'exchange', label: 'Exchange Services', description: 'Trading between virtual assets and/or fiat' },
      { value: 'transfer', label: 'Transfer Services', description: 'Facilitating transfers between parties' },
      { value: 'payment', label: 'Payment Processing', description: 'Payment gateway for virtual assets' },
      { value: 'brokerage', label: 'Brokerage', description: 'Facilitating trades for clients' },
      { value: 'advisory', label: 'Investment Advisory', description: 'Advice on virtual asset investments' },
      { value: 'management', label: 'Asset Management', description: 'Managing virtual asset portfolios' },
      { value: 'ivao', label: 'Token Issuance (IVAO)', description: 'Issuing/selling new virtual assets' },
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
    ]
  },
  {
    id: 'jurisdiction',
    question: 'Where do you provide services?',
    options: [
      { value: 'kenya-only', label: 'Kenya Only', description: 'Services limited to Kenya' },
      { value: 'kenya-based', label: 'Kenya-Based, Serving Africa', description: 'Based in Kenya, serving regional markets' },
      { value: 'global-kenya', label: 'Global, Serving Kenya', description: 'International company serving Kenyan clients' },
      { value: 'global-no-kenya', label: 'Global, Not Serving Kenya', description: 'No Kenyan clients or operations' },
    ]
  },
  {
    id: 'assets-handled',
    question: 'What types of digital assets do you handle?',
    multiSelect: true,
    options: [
      { value: 'crypto', label: 'Cryptocurrencies', description: 'Bitcoin, Ethereum, etc.' },
      { value: 'stablecoins', label: 'Stablecoins', description: 'USDT, USDC, etc.' },
      { value: 'utility-tokens', label: 'Utility Tokens', description: 'Service access tokens' },
      { value: 'nfts-investment', label: 'NFTs (Investment)', description: 'NFTs used for investment' },
      { value: 'nfts-art', label: 'NFTs (Art/Collectibles)', description: 'Non-financial NFTs' },
      { value: 'security-tokens', label: 'Security Tokens', description: 'Tokenized securities' },
    ]
  },
  {
    id: 'current-status',
    question: 'What is your current operational status?',
    options: [
      { value: 'operating', label: 'Currently Operating', description: 'Already providing services in Kenya' },
      { value: 'planning', label: 'Planning to Launch', description: 'Preparing to enter Kenyan market' },
      { value: 'expanding', label: 'Expanding to Kenya', description: 'Operating elsewhere, entering Kenya' },
      { value: 'exploring', label: 'Exploring Options', description: 'Researching the market' },
    ]
  },
  {
    id: 'compliance-readiness',
    question: 'What compliance measures do you have in place?',
    multiSelect: true,
    options: [
      { value: 'aml-kyc', label: 'AML/KYC Program', description: 'Customer due diligence procedures' },
      { value: 'cyber-security', label: 'Cyber Security Framework', description: 'Security measures in place' },
      { value: 'audited-financials', label: 'Audited Financial Statements', description: 'Annual audits completed' },
      { value: 'local-office', label: 'Kenya Office', description: 'Physical presence in Kenya' },
      { value: 'local-bank', label: 'Kenya Bank Account', description: 'Banking relationship established' },
      { value: 'insurance', label: 'Professional Insurance', description: 'Liability coverage' },
      { value: 'none', label: 'None Yet', description: 'Starting from scratch' },
    ]
  },
];

interface AssessmentResult {
  requiresLicense: boolean;
  eligibleForLicense: boolean;
  regulators: string[];
  riskLevel: 'low' | 'medium' | 'high';
  immediateActions: string[];
  complianceGaps: string[];
  relevantSections: string[];
  estimatedTimeline: string;
}

export const CompanyQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);

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
      setShowResults(true);
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

    // Determine if license is required
    const requiresLicense = 
      jurisdiction !== 'global-no-kenya' && 
      services.length > 0 &&
      !services.every(s => s === 'nfts-art');

    // Determine eligibility
    const eligibleForLicense = 
      entityType === 'local-company' || entityType === 'foreign-company';

    // Determine regulators
    const regulators: string[] = [];
    if (services.some(s => ['custody', 'exchange', 'transfer', 'payment'].includes(s))) {
      regulators.push('Central Bank of Kenya (CBK)');
    }
    if (services.some(s => ['brokerage', 'advisory', 'management', 'ivao', 'exchange'].includes(s))) {
      regulators.push('Capital Markets Authority (CMA)');
    }

    // Risk assessment
    let riskLevel: 'low' | 'medium' | 'high' = 'low';
    if (currentStatus === 'operating' && !eligibleForLicense) riskLevel = 'high';
    else if (currentStatus === 'operating' && complianceReady.includes('none')) riskLevel = 'high';
    else if (services.length > 3) riskLevel = 'medium';
    else if (services.includes('ivao')) riskLevel = 'medium';

    // Immediate actions
    const immediateActions: string[] = [];
    if (!eligibleForLicense && entityType === 'individual') {
      immediateActions.push('Incorporate a company under the Companies Act - individuals cannot be VASPs');
    }
    if (!eligibleForLicense && entityType === 'partnership') {
      immediateActions.push('Convert to a registered company - partnerships cannot be VASPs');
    }
    if (entityType === 'foreign-company') {
      immediateActions.push('Obtain Certificate of Compliance from Registrar of Companies');
    }
    if (currentStatus === 'operating') {
      immediateActions.push('Apply for license within 6 months of Act commencement (transitional period)');
    }

    // Compliance gaps
    const complianceGaps: string[] = [];
    if (!complianceReady.includes('aml-kyc')) {
      complianceGaps.push('Establish AML/KYC/CFT program compliant with POCAMLA');
    }
    if (!complianceReady.includes('cyber-security')) {
      complianceGaps.push('Implement cyber security measures per Computer Misuse and Cybercrimes Act');
    }
    if (!complianceReady.includes('local-office')) {
      complianceGaps.push('Establish registered office in Kenya (Section 20)');
    }
    if (!complianceReady.includes('local-bank')) {
      complianceGaps.push('Open bank account in Kenya (Section 25(g))');
    }
    if (!complianceReady.includes('audited-financials')) {
      complianceGaps.push('Engage approved auditor for annual financial statements');
    }
    if (!complianceReady.includes('insurance')) {
      complianceGaps.push('Obtain professional indemnity insurance');
    }

    // Relevant sections
    const relevantSections: string[] = ['Section 3 (VASP Definition)', 'Section 9 (Prohibition)', 'Section 11 (Licensing)'];
    if (services.includes('ivao')) relevantSections.push('Section 35 (IVAO Requirements)');
    if (services.includes('custody')) relevantSections.push('Section 32 (Customer Asset Protection)');
    relevantSections.push('Section 25 (Additional Requirements)', 'Section 33 (AML/CFT/CPF)');

    // Timeline
    let estimatedTimeline = '3-6 months';
    if (complianceGaps.length > 4) estimatedTimeline = '6-12 months';
    if (!eligibleForLicense) estimatedTimeline = '12+ months (requires incorporation)';

    return {
      requiresLicense,
      eligibleForLicense,
      regulators,
      riskLevel,
      immediateActions,
      complianceGaps,
      relevantSections,
      estimatedTimeline,
    };
  };

  const resetQuestionnaire = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const results = getResults();
    return (
      <section id="questionnaire" className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl">
              <CardHeader className="text-center border-b bg-primary/5">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  <FileCheck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-display text-2xl md:text-3xl">
                  Your Compliance Assessment
                </CardTitle>
                <CardDescription className="text-base">
                  Based on your responses, here's your VASP Bill compliance summary
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* Status Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className={`${results.requiresLicense ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}`}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold mb-1">License Required</h4>
                      <p className={`text-2xl font-bold ${results.requiresLicense ? 'text-amber-600' : 'text-green-600'}`}>
                        {results.requiresLicense ? 'Yes' : 'No'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={`${results.eligibleForLicense ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}`}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold mb-1">Currently Eligible</h4>
                      <p className={`text-2xl font-bold ${results.eligibleForLicense ? 'text-green-600' : 'text-red-600'}`}>
                        {results.eligibleForLicense ? 'Yes' : 'No'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className={`${
                    results.riskLevel === 'low' ? 'border-green-500 bg-green-50 dark:bg-green-950/20' :
                    results.riskLevel === 'medium' ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20' :
                    'border-red-500 bg-red-50 dark:bg-red-950/20'
                  }`}>
                    <CardContent className="p-4 text-center">
                      <h4 className="font-semibold mb-1">Risk Level</h4>
                      <p className={`text-2xl font-bold capitalize ${
                        results.riskLevel === 'low' ? 'text-green-600' :
                        results.riskLevel === 'medium' ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {results.riskLevel}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Regulators */}
                {results.regulators.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <Building2 className="h-5 w-5 text-primary" />
                      Your Regulatory Authorities
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.regulators.map((reg) => (
                        <Badge key={reg} variant="secondary" className="text-sm py-1.5 px-3">
                          {reg}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Immediate Actions */}
                {results.immediateActions.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Immediate Actions Required
                    </h4>
                    <ul className="space-y-2">
                      {results.immediateActions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 bg-red-50 dark:bg-red-950/20 p-3 rounded-lg">
                          <span className="font-bold text-red-600">{i + 1}.</span>
                          <span className="text-sm">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Compliance Gaps */}
                {results.complianceGaps.length > 0 && (
                  <div>
                    <h4 className="font-semibold flex items-center gap-2 mb-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      Compliance Gaps to Address
                    </h4>
                    <ul className="grid gap-2 md:grid-cols-2">
                      {results.complianceGaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Relevant Sections */}
                <div>
                  <h4 className="font-semibold mb-3">Key Bill Sections for Your Business</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.relevantSections.map((section) => (
                      <Badge key={section} variant="outline" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-semibold mb-1">Estimated Compliance Timeline</h4>
                  <p className="text-2xl font-bold text-primary">{results.estimatedTimeline}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This is an estimate based on typical cases. Actual timeline may vary.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                  <Button onClick={resetQuestionnaire} variant="outline" className="flex-1">
                    Start Over
                  </Button>
                  <Button 
                    onClick={() => document.getElementById('bill-text')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex-1"
                  >
                    View Relevant Bill Sections
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

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
            Answer a few questions to get a personalized compliance assessment.
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
