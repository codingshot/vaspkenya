import { ExternalLink, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export const Sources = () => {
  const primarySources = [
    {
      name: 'Virtual Asset Service Providers Act, 2025',
      organization: 'Parliament of Kenya',
      url: 'https://parliament.go.ke',
      type: 'Primary Law',
      verified: true,
      description: 'Official enacted law - 44 pages, 47 sections'
    },
    {
      name: 'CBK/CMA Implementation Notice',
      organization: 'Central Bank of Kenya',
      url: 'https://centralbank.go.ke',
      type: 'Official Notice',
      verified: true,
      description: 'Joint implementation and licensing notice'
    },
    {
      name: 'Draft National Policy on Virtual Assets',
      organization: 'Kenya National Treasury',
      url: 'https://newsite.treasury.go.ke',
      type: 'Policy Background',
      verified: true,
      description: 'Background policy document'
    },
  ];

  const regulatoryAuthorities = [
    {
      name: 'Capital Markets Authority (CMA)',
      role: 'Regulates brokers, investment advisors, asset managers, trading platforms',
      url: 'https://www.cma.or.ke',
      contact: 'https://www.cma.or.ke/index.php/contact-us',
    },
    {
      name: 'Central Bank of Kenya (CBK)',
      role: 'Regulates payment processors, wallet providers, certain exchange functions',
      url: 'https://www.centralbank.go.ke',
      contact: 'https://www.centralbank.go.ke/contacts/',
    },
    {
      name: 'National Treasury',
      role: 'Policy coordination and legislative sponsor',
      url: 'https://www.treasury.go.ke',
      contact: 'https://www.treasury.go.ke/contact/',
    },
  ];

  const legalAnalysis = [
    {
      name: 'Bowmans Law',
      description: 'Updated Bill 2025 analysis',
      url: 'https://bowmanslaw.com',
      type: 'Legal Analysis'
    },
    {
      name: 'Njaga Advocates',
      description: 'VASP Bill 2025 explainer',
      url: 'https://njagaadvocates.com',
      type: 'Legal Analysis'
    },
    {
      name: 'Mohammed Muigai Advocates',
      description: 'VASP Bill briefing',
      url: 'https://mohammedmuigai.com',
      type: 'Legal Analysis'
    },
  ];

  const relatedLegislation = [
    { name: 'Companies Act', chapter: 'Cap. 486', relevance: 'Company registration requirements for VASPs' },
    { name: 'Capital Markets Act', chapter: 'Cap. 485A', relevance: 'CMA establishment and powers (amended by VASP Act)' },
    { name: 'Central Bank of Kenya Act', chapter: 'Cap. 491', relevance: 'CBK supervisory powers (amended by VASP Act)' },
    { name: 'Proceeds of Crime and Anti-Money Laundering Act', chapter: 'Cap. 59A', relevance: 'AML/CFT framework - VASPs now classified as reporting institutions' },
    { name: 'Prevention of Terrorism Act', chapter: '-', relevance: 'Counter-terrorism financing requirements' },
    { name: 'Computer Misuse and Cybercrimes Act', chapter: 'Cap. 79C', relevance: 'Cyber security standards for VASPs' },
    { name: 'Data Protection Act', chapter: 'Cap. 411C', relevance: 'Customer data handling requirements' },
  ];

  const factChecks = [
    { fact: 'Act enacted 15 October 2025 (Presidential assent)', section: 'Gazette Notice', status: 'verified' },
    { fact: '44-page official bill text', section: 'Parliament Record', status: 'verified' },
    { fact: 'Natural persons cannot operate as VASPs', section: 'Section 9(2)', status: 'verified' },
    { fact: 'VASP licenses expire December 31st annually', section: 'Section 14', status: 'verified' },
    { fact: 'Transaction records must be kept for 7 years', section: 'Section 44(2)', status: 'verified' },
    { fact: 'Existing VASPs have 6 months to apply for license', section: 'Section 47(1)', status: 'verified' },
    { fact: 'Maximum penalty is KES 30 million fine', section: 'Section 41(4)', status: 'verified' },
    { fact: 'Maximum imprisonment is 10 years', section: 'Section 41(1)(a)', status: 'verified' },
    { fact: 'Utility tokens are exempt from licensing', section: 'Section 3(2)', status: 'verified' },
    { fact: 'NFTs not used for investment are exempt', section: 'Section 5(2)(d)', status: 'verified' },
  ];

  return (
    <section id="sources" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <FileText className="h-3 w-3 mr-1" />
            Sources & Verification
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Official Sources & Fact Checking
          </h2>
          <p className="text-lg text-muted-foreground">
            All information is sourced from official government publications and verified against the enacted law.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Primary Sources */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Primary Official Sources
                </CardTitle>
                <Link to="/timeline">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                    View Timeline →
                  </Badge>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {primarySources.map((source) => (
                <div key={source.name} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">{source.organization}</p>
                    <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{source.type}</Badge>
                      {source.verified && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    View Source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regulatory Authorities */}
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Authorities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {regulatoryAuthorities.map((authority) => (
                  <div key={authority.name} className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">{authority.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{authority.role}</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={authority.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Website <ExternalLink className="h-3 w-3" />
                      </a>
                      <a
                        href={authority.contact}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                      >
                        Contact <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Legal Analysis (Secondary Sources) */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Analysis (Secondary Sources)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These are interpretive analyses from law firms - not official sources. For legal compliance, always reference official documents.
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                {legalAnalysis.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-medium text-sm">{source.name}</h4>
                        <p className="text-xs text-muted-foreground">{source.description}</p>
                        <Badge variant="outline" className="mt-2 text-[10px]">{source.type}</Badge>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Related Legislation */}
          <Card>
            <CardHeader>
              <CardTitle>Related Legislation Referenced in Act</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Legislation</th>
                      <th className="text-left py-3 px-4 font-semibold">Chapter</th>
                      <th className="text-left py-3 px-4 font-semibold">Relevance to VASP Act</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatedLegislation.map((law) => (
                      <tr key={law.name} className="border-b">
                        <td className="py-3 px-4 font-medium">{law.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{law.chapter}</td>
                        <td className="py-3 px-4 text-muted-foreground">{law.relevance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Fact Checks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Verified Facts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {factChecks.map((check, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{check.fact}</p>
                      <p className="text-xs text-muted-foreground">{check.section}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2">
                    Important Disclaimer
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
                    This application is for <strong>informational purposes only</strong> and does not constitute legal advice. 
                    The content is based on the Virtual Asset Service Providers Act, 2025 as enacted. Regulations and guidelines may be issued by CMA and CBK.
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    For official guidance and legal advice, please consult:
                  </p>
                  <ul className="text-sm text-amber-700 dark:text-amber-300 mt-2 space-y-1">
                    <li>• Capital Markets Authority: compliance@cma.or.ke</li>
                    <li>• Central Bank of Kenya: info@centralbank.go.ke</li>
                    <li>• Qualified legal professionals specializing in financial regulation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
