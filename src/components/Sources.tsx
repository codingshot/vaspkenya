import { ExternalLink, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Sources = () => {
  const primarySources = [
    {
      name: 'Virtual Asset Service Providers Bill, 2025',
      organization: 'Kenya National Treasury',
      url: 'https://newsite.treasury.go.ke/sites/default/files/Notices/VIRTUAL-ASSET-SERVICE-PROVIDERS-BILL-2024.pdf',
      type: 'Primary Source',
      verified: true,
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
      role: 'Bill sponsor and policy coordination',
      url: 'https://www.treasury.go.ke',
      contact: 'https://www.treasury.go.ke/contact/',
    },
  ];

  const relatedLegislation = [
    { name: 'Companies Act', chapter: 'Cap. 486', relevance: 'Company registration requirements for VASPs' },
    { name: 'Capital Markets Act', chapter: 'Cap. 485A', relevance: 'CMA establishment and powers' },
    { name: 'Proceeds of Crime and Anti-Money Laundering Act', chapter: 'Cap. 59A', relevance: 'AML/CFT framework and Financial Reporting Centre' },
    { name: 'Prevention of Terrorism Act', chapter: '-', relevance: 'Counter-terrorism financing requirements' },
    { name: 'Computer Misuse and Cybercrimes Act', chapter: 'Cap. 79C', relevance: 'Cyber security standards for VASPs' },
    { name: 'National Payment Systems Regulations, 2014', chapter: 'L.N. No. 109 of 2014', relevance: 'E-money definition' },
  ];

  const factChecks = [
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
            All information is sourced from official government publications and verified against the bill text.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Primary Source */}
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Primary Source Document
              </CardTitle>
            </CardHeader>
            <CardContent>
              {primarySources.map((source) => (
                <div key={source.name} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="font-semibold">{source.name}</h4>
                    <p className="text-sm text-muted-foreground">{source.organization}</p>
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    View Document
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

          {/* Related Legislation */}
          <Card>
            <CardHeader>
              <CardTitle>Related Legislation Referenced in Bill</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Legislation</th>
                      <th className="text-left py-3 px-4 font-semibold">Chapter</th>
                      <th className="text-left py-3 px-4 font-semibold">Relevance to VASP Bill</th>
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
                    The content is based on the draft Virtual Asset Service Providers Bill, 2025 which may change during the legislative process.
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
