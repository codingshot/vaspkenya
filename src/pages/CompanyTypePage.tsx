import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Building2, Shield, CheckCircle2, AlertTriangle, 
  ExternalLink, FileText, Scale, Users, Wallet, ArrowLeftRight,
  CreditCard, Handshake, TrendingUp, PieChart, Rocket, Coins,
  Layers, Image, Landmark, Building, Code, Cpu, GraduationCap, Newspaper
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCompanyById, getRelatedCompanies, type CompanyTypeData } from '@/data/companyTypesData';

const iconMap: Record<string, React.ReactNode> = {
  'Wallet': <Wallet className="h-6 w-6" />,
  'ArrowLeftRight': <ArrowLeftRight className="h-6 w-6" />,
  'CreditCard': <CreditCard className="h-6 w-6" />,
  'Handshake': <Handshake className="h-6 w-6" />,
  'TrendingUp': <TrendingUp className="h-6 w-6" />,
  'PieChart': <PieChart className="h-6 w-6" />,
  'Rocket': <Rocket className="h-6 w-6" />,
  'Building': <Building className="h-6 w-6" />,
  'Coins': <Coins className="h-6 w-6" />,
  'Layers': <Layers className="h-6 w-6" />,
  'Image': <Image className="h-6 w-6" />,
  'Landmark': <Landmark className="h-6 w-6" />,
  'Code': <Code className="h-6 w-6" />,
  'Cpu': <Cpu className="h-6 w-6" />,
  'GraduationCap': <GraduationCap className="h-6 w-6" />,
  'Newspaper': <Newspaper className="h-6 w-6" />,
};

const CompanyTypePage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const company = getCompanyById(companyId || '');

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Company Type Not Found</h1>
            <Link to="/#company-selector">
              <Button>Back to Company Types</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const regulationStatusColors = {
    'fully-regulated': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    'partially-regulated': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'exempt': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    'unclear': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
  };

  const regulationStatusLabels = {
    'fully-regulated': 'Fully Regulated',
    'partially-regulated': 'Conditionally Regulated',
    'exempt': 'Exempt from Licensing',
    'unclear': 'Regulatory Status Unclear'
  };

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
              <Link to="/#company-selector" className="hover:text-foreground">Company Types</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{company.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className={`p-4 rounded-2xl w-fit ${company.isRegulated ? 'bg-primary/10' : 'bg-green-100 dark:bg-green-900/20'}`}>
                  {iconMap[company.icon] || <Building2 className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className={regulationStatusColors[company.regulationStatus]}>
                      {regulationStatusLabels[company.regulationStatus]}
                    </Badge>
                    {company.custodial && (
                      <Badge variant="outline">Custodial</Badge>
                    )}
                    <Badge variant="outline" className={
                      company.riskLevel === 'high' ? 'border-red-500 text-red-600' :
                      company.riskLevel === 'medium' ? 'border-amber-500 text-amber-600' :
                      'border-green-500 text-green-600'
                    }>
                      {company.riskLevel.charAt(0).toUpperCase() + company.riskLevel.slice(1)} Risk
                    </Badge>
                  </div>
                  <h1 className="font-display text-2xl md:text-4xl font-bold mb-3">
                    {company.name}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base mb-4">
                    {company.description}
                  </p>
                  {company.pdfPages && company.pdfPages.length > 0 && (
                    <Link to={`/pdf-viewer?page=${company.pdfPages[0]}`}>
                      <Button className="gap-2">
                        <FileText className="h-4 w-4" />
                        View in Bill PDF
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regulatory Authority */}
        {company.regulatoryAuthority.length > 0 && (
          <section className="py-8 border-b">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg md:text-xl font-bold">Regulatory Authority</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.regulatoryAuthority.map((auth, i) => (
                    <Link key={i} to={`/regulator/${auth.toLowerCase().includes('central') ? 'cbk' : 'cma'}`}>
                      <Badge variant="secondary" className="text-sm py-2 px-3 hover:bg-secondary/80 cursor-pointer">
                        {auth}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Obligations */}
        {company.keyObligations.length > 0 && (
          <section className="py-10 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg md:text-xl font-bold">
                    {company.isRegulated ? 'Key Compliance Obligations' : 'Considerations'}
                  </h2>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {company.keyObligations.map((obligation, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{obligation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Relevant Bill Sections */}
        {company.relevantSections.length > 0 && (
          <section className="py-10 md:py-16 bg-muted/30">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg md:text-xl font-bold">Relevant Bill Sections</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {company.relevantSections.map((section, i) => (
                    <Badge key={i} variant="outline" className="py-2 px-3">
                      {section}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Licensing Requirements */}
        {company.licensingRequirements.length > 0 && (
          <section className="py-10 md:py-16">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg md:text-xl font-bold">
                    {company.isRegulated ? 'Licensing Requirements' : 'Regulatory Guidance'}
                  </h2>
                </div>
                <div className="space-y-3">
                  {company.licensingRequirements.map((req, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-sm md:text-base">{req.title}</h3>
                          <p className="text-sm text-muted-foreground">{req.description}</p>
                        </div>
                        {req.resourceUrl && (
                          req.resourceUrl.startsWith('/') ? (
                            <Link to={req.resourceUrl}>
                              <Button variant="outline" size="sm" className="gap-1">
                                {req.resource}
                                <ChevronRight className="h-3 w-3" />
                              </Button>
                            </Link>
                          ) : (
                            <a href={req.resourceUrl} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm" className="gap-1">
                                {req.resource}
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </a>
                          )
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Examples */}
        {company.examples.length > 0 && (
          <section className="py-10 md:py-16 bg-muted/30">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-lg md:text-xl font-bold">Examples</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {company.examples.map((example, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-sm">{example.name}</h3>
                          <Badge variant="outline" className="text-[10px]">
                            {example.type === 'local' ? 'Kenya/Africa' : 'International'}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{example.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Company Types */}
        <section className="py-10 md:py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-lg md:text-xl font-bold mb-6">Related Business Types</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {getRelatedCompanies(company.id, 3).map((related) => (
                  <Link key={related.id} to={`/company/${related.id}`}>
                    <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-4">
                        <div className={`inline-flex p-2 rounded-lg mb-2 ${related.isRegulated ? 'bg-primary/10' : 'bg-green-100 dark:bg-green-900/20'}`}>
                          {iconMap[related.icon] || <Building2 className="h-5 w-5" />}
                        </div>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{related.name}</h3>
                        <Badge variant="outline" className={`text-[10px] ${related.isRegulated ? 'border-destructive/50 text-destructive' : 'border-green-500 text-green-600'}`}>
                          {related.isRegulated ? 'Regulated' : 'Exempt'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{related.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 md:py-16 border-t">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                Need Help With Compliance?
              </h2>
              <p className="text-muted-foreground mb-6">
                Use our compliance tracker to monitor your progress toward licensing.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/#compliance-tracker">
                  <Button className="gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Start Compliance Tracker
                  </Button>
                </Link>
                <Link to="/#questionnaire">
                  <Button variant="outline" className="gap-2">
                    Take Assessment Quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyTypePage;
