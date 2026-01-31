import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, CheckCircle2, Building2, AlertTriangle, FileCheck,
  ExternalLink, FileText, ArrowRight, Download, Share2, Printer,
  Scale, Shield, Users, Wallet, Clock
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

// Map sections to PDF pages
const sectionToPdfPage: Record<string, number> = {
  '2': 2, '3': 3, '5': 4, '9': 6, '10': 6, '11': 7, '14': 8, '19': 10, '20': 10,
  '22': 11, '23': 12, '25': 13, '29': 14, '32': 16, '33': 17, '34': 17, '35': 18,
  '40': 21, '41': 21, '44': 23, '47': 26
};

const AssessmentResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as AssessmentResult | undefined;

  if (!results) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">No Assessment Found</h2>
              <p className="text-muted-foreground mb-4">
                Please complete the compliance assessment first.
              </p>
              <Link to="/#questionnaire">
                <Button>Start Assessment</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'VASP Compliance Assessment',
        text: `My VASP compliance assessment: ${results.requiresLicense ? 'License required' : 'No license required'}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 print:bg-white">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b print:hidden">
          <div className="container px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/#questionnaire" className="hover:text-foreground">Assessment</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Results</span>
            </nav>
          </div>
        </div>

        <div className="container px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                <FileCheck className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">
                Your VASP Compliance Assessment
              </h1>
              <p className="text-muted-foreground">
                Based on the Virtual Asset Service Providers Act, 2025
              </p>
              
              {/* Action buttons */}
              <div className="flex justify-center gap-2 mt-4 print:hidden">
                <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card className={`${results.requiresLicense ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}`}>
                <CardContent className="p-4 text-center">
                  <Scale className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-semibold mb-1 text-sm">VASP License Required</h4>
                  <p className={`text-2xl font-bold ${results.requiresLicense ? 'text-amber-600' : 'text-green-600'}`}>
                    {results.requiresLicense ? 'Yes' : 'No'}
                  </p>
                  {results.exemptionReason && (
                    <p className="text-xs text-muted-foreground mt-1">{results.exemptionReason}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card className={`${results.eligibleForLicense ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-red-500 bg-red-50 dark:bg-red-950/20'}`}>
                <CardContent className="p-4 text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-semibold mb-1 text-sm">Currently Eligible</h4>
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
                  <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <h4 className="font-semibold mb-1 text-sm">Compliance Risk</h4>
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

            {/* Regulatory Authorities */}
            {results.regulators.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Building2 className="h-5 w-5 text-primary" />
                    Your Regulatory Authorities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 md:grid-cols-2">
                    {results.regulators.map((reg) => (
                      <Link
                        key={reg}
                        to={reg.includes('CBK') ? '/regulator/cbk' : '/regulator/cma'}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{reg}</p>
                          <p className="text-sm text-muted-foreground">
                            {reg.includes('CBK') ? 'Payments, custody, exchange' : 'Brokerage, advisory, management'}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Immediate Actions */}
            {results.immediateActions.length > 0 && (
              <Card className="mb-6 border-red-200 dark:border-red-800">
                <CardHeader className="bg-red-50 dark:bg-red-950/30">
                  <CardTitle className="flex items-center gap-2 text-lg text-red-700 dark:text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    Immediate Actions Required
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {results.immediateActions.map((item, i) => (
                      <li key={i} className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <p className="text-sm mb-2">{item.action}</p>
                            {item.link && (
                              <Link to={item.link}>
                                <Button size="sm" variant="outline" className="gap-1 text-xs">
                                  {item.linkText || 'Learn More'}
                                  <ArrowRight className="h-3 w-3" />
                                </Button>
                              </Link>
                            )}
                            {item.section && (
                              <Link to={`/pdf-viewer?page=${sectionToPdfPage[item.section.replace('Section ', '')] || 2}&search=${encodeURIComponent(item.section)}`}>
                                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted ml-2">
                                  {item.section}
                                </Badge>
                              </Link>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Compliance Gaps */}
            {results.complianceGaps.length > 0 && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Compliance Checklist
                  </CardTitle>
                  <CardDescription>
                    Complete these items to prepare for your VASP license application
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ul className="divide-y">
                    {results.complianceGaps.map((item, i) => (
                      <li key={i} className="p-4 flex items-start gap-3">
                        <div className={`mt-1 h-4 w-4 rounded border-2 flex-shrink-0 ${
                          item.priority === 'high' ? 'border-red-500' :
                          item.priority === 'medium' ? 'border-amber-500' : 'border-muted-foreground'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{item.action}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.section && (
                              <Link to={`/pdf-viewer?page=${sectionToPdfPage[item.section.replace('Section ', '')] || 2}&search=${encodeURIComponent(item.section)}`}>
                                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted gap-1">
                                  <FileText className="h-3 w-3" />
                                  {item.section}
                                </Badge>
                              </Link>
                            )}
                            {item.link && (
                              <Link to={item.link}>
                                <Badge variant="secondary" className="text-xs cursor-pointer gap-1">
                                  {item.linkText || 'Guide'}
                                  <ExternalLink className="h-3 w-3" />
                                </Badge>
                              </Link>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Key Bill Sections */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <FileText className="h-5 w-5 text-primary" />
                  Key Sections for Your Business
                </CardTitle>
                <CardDescription>
                  Click any section to view in the official PDF
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2">
                  {results.relevantSections.map((item) => (
                    <Link
                      key={item.section}
                      to={`/pdf-viewer?page=${item.pdfPage}&search=${encodeURIComponent(item.title.split(' ').slice(0, 2).join(' '))}`}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <Badge variant="outline" className="text-xs mb-1">{item.section}</Badge>
                        <p className="text-sm font-medium">{item.title}</p>
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="mb-6 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Estimated Compliance Timeline</h4>
                    <p className="text-3xl font-bold text-primary">{results.estimatedTimeline}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on your current readiness. Actual timeline may vary.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="print:hidden">
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  <Link to="/#compliance-tracker">
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">Compliance Tracker</p>
                        <p className="text-xs text-muted-foreground">Track your progress</p>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/pdf-viewer">
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">View Full Act</p>
                        <p className="text-xs text-muted-foreground">44 pages, searchable PDF</p>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/#penalty-calculator">
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                      <Scale className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">Penalty Calculator</p>
                        <p className="text-xs text-muted-foreground">Understand risks</p>
                      </div>
                    </Button>
                  </Link>
                  
                  <Link to="/timeline">
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                      <Clock className="h-5 w-5 text-primary" />
                      <div className="text-left">
                        <p className="font-semibold">Legislative Timeline</p>
                        <p className="text-xs text-muted-foreground">Act history</p>
                      </div>
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <Button onClick={() => navigate('/#questionnaire')} variant="ghost" className="w-full">
                    ← Retake Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AssessmentResultsPage;
