import { useParams, Link } from 'react-router-dom';
import { 
  Building2, ExternalLink, Mail, Phone, MapPin, 
  FileText, Shield, CheckCircle2, ArrowRight, ChevronRight,
  Globe, Clock, Scale
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface RegulatoryAuthority {
  id: string;
  name: string;
  shortName: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  vaspResponsibilities: string[];
  regulatedActivities: string[];
  licensingProcess: { step: number; title: string; description: string }[];
  relevantLegislation: string[];
}

const regulatoryAuthorities: RegulatoryAuthority[] = [
  {
    id: 'cma',
    name: 'Capital Markets Authority',
    shortName: 'CMA',
    description: 'The Capital Markets Authority is the regulatory body responsible for supervising, licensing, and monitoring the activities of market intermediaries and listed companies in Kenya. Under the VASP Bill, CMA regulates investment-related virtual asset activities.',
    website: 'https://www.cma.or.ke',
    email: 'corporate@cma.or.ke',
    phone: '+254 20 2264900',
    address: 'Embankment Plaza, 3rd Floor, Longonot Road, Upper Hill, Nairobi',
    vaspResponsibilities: [
      'License virtual asset brokers',
      'License virtual asset investment advisors',
      'License virtual asset managers',
      'Regulate virtual asset trading platforms',
      'Approve Initial Virtual Asset Offerings (IVAOs)',
      'Supervise clearing and settlement platforms',
      'Monitor market abuse in virtual asset markets'
    ],
    regulatedActivities: [
      'Virtual Asset Brokerage - Facilitating exchange for retail and institutional investors',
      'Investment Advisory - Providing advice on virtual asset investments',
      'Portfolio Management - Managing virtual asset portfolios on discretionary basis',
      'Trading Platforms - Operating matching/trading platforms for virtual assets',
      'Clearing & Settlement - Platforms holding assets while matching buyers/sellers',
      'IVAO Services - Issuing or selling virtual assets to the public'
    ],
    licensingProcess: [
      { step: 1, title: 'Pre-Application Consultation', description: 'Meet with CMA to discuss your business model and licensing requirements' },
      { step: 2, title: 'Application Submission', description: 'Submit completed application form with required documents and non-refundable fee' },
      { step: 3, title: 'Fit and Proper Assessment', description: 'CMA evaluates directors, officers, and significant shareholders' },
      { step: 4, title: 'Technical Review', description: 'Assessment of technology infrastructure, cyber security, and operational capacity' },
      { step: 5, title: 'Compliance Review', description: 'Review of AML/CFT policies, internal controls, and governance framework' },
      { step: 6, title: 'License Decision', description: 'CMA issues decision within prescribed timeframe; license valid until December 31st' }
    ],
    relevantLegislation: [
      'Capital Markets Act (Cap. 485A)',
      'VASP Bill 2025 (Sections 6-8, 35)',
      'Capital Markets (Licensing Requirements) Regulations',
      'Proceeds of Crime and Anti-Money Laundering Act',
      'Companies Act (Cap. 486)'
    ]
  },
  {
    id: 'cbk',
    name: 'Central Bank of Kenya',
    shortName: 'CBK',
    description: 'The Central Bank of Kenya is the monetary authority responsible for formulating monetary policy, promoting financial stability, and regulating payment systems. Under the VASP Bill, CBK regulates payment-related virtual asset activities.',
    website: 'https://www.centralbank.go.ke',
    email: 'info@centralbank.go.ke',
    phone: '+254 20 2860000',
    address: 'Haile Selassie Avenue, P.O. Box 60000-00200, Nairobi',
    vaspResponsibilities: [
      'License virtual asset payment processors',
      'License virtual asset wallet providers (custody)',
      'Regulate virtual asset exchanges (transfer services)',
      'Oversee conversion services (fiat-crypto)',
      'Monitor systemic risks from virtual assets',
      'Enforce payment system stability requirements'
    ],
    regulatedActivities: [
      'Payment Gateway Services - Arranging transactions between virtual assets and fiat',
      'Custodial Wallet Services - Storing virtual assets on behalf of customers',
      'Transfer Services - Facilitating virtual asset transfers',
      'Conversion Services - Converting between virtual assets and fiat currency',
      'Stablecoin Issuance - Issuing payment-focused stablecoins',
      'Crypto ATM Operations - Physical kiosks for virtual asset transactions'
    ],
    licensingProcess: [
      { step: 1, title: 'Initial Inquiry', description: 'Submit preliminary inquiry to National Payments System Department' },
      { step: 2, title: 'Formal Application', description: 'Complete application with all required documentation and fees' },
      { step: 3, title: 'Due Diligence', description: 'CBK conducts background checks on directors and beneficial owners' },
      { step: 4, title: 'System Assessment', description: 'Evaluation of payment systems, security infrastructure, and operational resilience' },
      { step: 5, title: 'AML/CFT Review', description: 'Assessment of anti-money laundering program and compliance controls' },
      { step: 6, title: 'Approval and Conditions', description: 'License issued with specific conditions; annual renewal required' }
    ],
    relevantLegislation: [
      'Central Bank of Kenya Act (Cap. 491)',
      'National Payment System Act, 2011',
      'VASP Bill 2025 (Sections 6-8)',
      'Proceeds of Crime and Anti-Money Laundering Act',
      'Banking Act (Cap. 488)'
    ]
  }
];

const getAuthorityById = (id: string) => regulatoryAuthorities.find(auth => auth.id === id);

const RegulatorDetail = () => {
  const { regulatorId } = useParams<{ regulatorId: string }>();
  const authority = getAuthorityById(regulatorId || '');

  if (!authority) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Regulatory Authority Not Found</h1>
            <Link to="/#regulator-comparison">
              <Button>Back to Regulators</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherAuthority = regulatoryAuthorities.find(a => a.id !== authority.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/#regulator-comparison" className="hover:text-foreground">Regulators</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{authority.shortName}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="p-4 rounded-2xl bg-primary/10 w-fit">
                  <Building2 className="h-10 w-10 md:h-14 md:w-14 text-primary" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-3">{authority.shortName}</Badge>
                  <h1 className="font-display text-2xl md:text-4xl font-bold mb-3">
                    {authority.name}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">
                    {authority.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href={authority.website} target="_blank" rel="noopener noreferrer">
                      <Button className="gap-2" size="sm">
                        <Globe className="h-4 w-4" />
                        Official Website
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </a>
                    <a href={`mailto:${authority.email}`}>
                      <Button variant="outline" className="gap-2" size="sm">
                        <Mail className="h-4 w-4" />
                        Contact
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-8 border-b">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">{authority.phone}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium break-all">{authority.email}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm font-medium">{authority.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* VASP Responsibilities */}
        <section className="py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  VASP Regulatory Responsibilities
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Under the Virtual Asset Service Providers Bill 2025, {authority.shortName} is responsible for:
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {authority.vaspResponsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Regulated Activities */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  Regulated Virtual Asset Activities
                </h2>
              </div>
              <div className="space-y-3">
                {authority.regulatedActivities.map((activity, i) => {
                  const [title, description] = activity.split(' - ');
                  return (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-sm md:text-base mb-1">{title}</h3>
                        {description && (
                          <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Licensing Process */}
        <section className="py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  Licensing Process
                </h2>
              </div>
              <div className="space-y-4">
                {authority.licensingProcess.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="font-semibold mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Relevant Legislation */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="h-6 w-6 text-primary" />
                <h2 className="font-display text-xl md:text-2xl font-bold">
                  Relevant Legislation
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {authority.relevantLegislation.map((leg, i) => (
                  <Badge key={i} variant="outline" className="py-2 px-3">
                    {leg}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Regulator CTA */}
        {otherAuthority && (
          <section className="py-10 md:py-16 border-t">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                  Also Regulated Under VASP Bill
                </h2>
                <p className="text-muted-foreground mb-6">
                  Some virtual asset activities may require licenses from both regulators.
                </p>
                <Link to={`/regulator/${otherAuthority.id}`}>
                  <Button variant="outline" className="gap-2">
                    View {otherAuthority.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default RegulatorDetail;

