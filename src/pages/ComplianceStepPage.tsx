import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, CheckCircle2, ExternalLink, FileText, 
  Building2, Shield, Clock, AlertTriangle, Book, ArrowLeft
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { complianceResources, getResourcesForItem } from '@/data/complianceResources';

// Compliance items data (same as in ComplianceTracker)
const complianceItems = [
  { id: 'entity-1', title: 'Company Incorporation', description: 'Incorporate under the Companies Act (Cap. 486) or obtain Certificate of Compliance for foreign companies', section: 'Section 3, 9', priority: 'critical', category: 'entity' },
  { id: 'entity-2', title: 'Registered Office in Kenya', description: 'Establish and maintain a registered office in Kenya', section: 'Section 20', priority: 'critical', category: 'entity' },
  { id: 'entity-3', title: 'Kenya Bank Account', description: 'Open and maintain a bank account in Kenya', section: 'Section 25(g)', priority: 'high', category: 'entity' },
  { id: 'license-1', title: 'License Application Submitted', description: 'Submit complete license application to relevant regulatory authority (CMA/CBK)', section: 'Section 11', priority: 'critical', category: 'licensing' },
  { id: 'license-2', title: 'Application Fee Paid', description: 'Pay prescribed non-refundable application fee', section: 'Section 11', priority: 'high', category: 'licensing' },
  { id: 'license-3', title: 'License Displayed', description: 'Display license at principal place of business once obtained', section: 'Section 13', priority: 'medium', category: 'licensing' },
  { id: 'gov-1', title: 'Board of Directors Appointed', description: 'Appoint at least 2 natural persons as directors', section: 'Section 21', priority: 'critical', category: 'governance' },
  { id: 'gov-2', title: 'Fit and Proper Assessment', description: 'Ensure all directors and key officers pass fit and proper assessment', section: 'Section 19', priority: 'critical', category: 'governance' },
  { id: 'gov-3', title: 'CEO Appointment', description: 'Appoint a fit and proper Chief Executive Officer', section: 'Section 19', priority: 'high', category: 'governance' },
  { id: 'gov-4', title: 'Compliance Officer', description: 'Designate a compliance officer responsible for regulatory matters', section: 'Section 25', priority: 'high', category: 'governance' },
  { id: 'aml-1', title: 'AML/KYC Program Established', description: 'Implement customer due diligence and KYC procedures compliant with POCAMLA', section: 'Section 33', priority: 'critical', category: 'aml' },
  { id: 'aml-2', title: 'Suspicious Activity Reporting', description: 'Establish procedures for detecting and reporting suspicious transactions to FRC', section: 'Section 33', priority: 'critical', category: 'aml' },
  { id: 'aml-3', title: 'Sanctions Screening', description: 'Implement screening against targeted financial sanctions lists', section: 'Section 33', priority: 'high', category: 'aml' },
  { id: 'aml-4', title: 'Risk Assessment Framework', description: 'Conduct and document institutional ML/TF/PF risk assessment', section: 'Section 33', priority: 'high', category: 'aml' },
  { id: 'ops-1', title: 'Cyber Security Framework', description: 'Implement measures per Computer Misuse and Cybercrimes Act', section: 'Section 29', priority: 'critical', category: 'operations' },
  { id: 'ops-2', title: 'Customer Asset Protection', description: 'Segregate customer assets and maintain sufficient reserves', section: 'Section 32', priority: 'critical', category: 'operations' },
  { id: 'ops-3', title: 'Business Continuity Plan', description: 'Develop and test business continuity and disaster recovery plan', section: 'Section 25(i)', priority: 'high', category: 'operations' },
  { id: 'ops-4', title: 'Data Protection Compliance', description: 'Comply with Data Protection Act requirements', section: 'Section 25(h)', priority: 'high', category: 'operations' },
  { id: 'ops-5', title: 'Customer Complaint Mechanism', description: 'Establish mechanism to handle and address customer complaints', section: 'Section 25(j)', priority: 'medium', category: 'operations' },
  { id: 'ops-6', title: 'Professional Insurance', description: 'Obtain professional indemnity insurance covering operational risks', section: 'Section 23', priority: 'high', category: 'operations' },
  { id: 'report-1', title: 'Auditor Appointed', description: 'Engage an approved auditor for annual financial statements', section: 'Section 25(f)', priority: 'high', category: 'reporting' },
  { id: 'report-2', title: '7-Year Record Keeping', description: 'Establish system to maintain transaction records for 7 years', section: 'Section 44', priority: 'high', category: 'reporting' },
  { id: 'report-3', title: 'Real-Time Access Capability', description: 'Capability to provide regulators with real-time read-only transaction access', section: 'Section 44', priority: 'medium', category: 'reporting' },
  { id: 'report-4', title: 'Incident Notification Procedures', description: 'Establish procedures for notifying regulators of material events within 7 working days', section: 'Section 26', priority: 'high', category: 'reporting' }
];

const categoryInfo: Record<string, { label: string; color: string }> = {
  entity: { label: 'Entity Setup', color: 'text-blue-600' },
  licensing: { label: 'Licensing', color: 'text-green-600' },
  governance: { label: 'Governance', color: 'text-purple-600' },
  aml: { label: 'AML/CFT/CPF', color: 'text-red-600' },
  operations: { label: 'Operations', color: 'text-amber-600' },
  reporting: { label: 'Reporting', color: 'text-cyan-600' }
};

const priorityColors: Record<string, string> = {
  critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  high: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
};

const ComplianceStepPage = () => {
  const { stepId } = useParams<{ stepId: string }>();
  const item = complianceItems.find(i => i.id === stepId);
  const resources = stepId ? getResourcesForItem(stepId) : undefined;

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Compliance Step Not Found</h1>
            <Link to="/#compliance-tracker">
              <Button>Back to Compliance Tracker</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const category = categoryInfo[item.category] || { label: 'General', color: 'text-gray-600' };

  // Find related items in same category
  const relatedItems = complianceItems.filter(i => i.category === item.category && i.id !== item.id).slice(0, 4);

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
              <Link to="/#compliance-tracker" className="hover:text-foreground">Compliance Tracker</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{item.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/#compliance-tracker" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Back to Tracker
              </Link>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={category.color} variant="outline">
                  {category.label}
                </Badge>
                <Badge className={priorityColors[item.priority]}>
                  {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                </Badge>
              </div>
              
              <h1 className="font-display text-2xl md:text-4xl font-bold mb-4">
                {item.title}
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                {item.description}
              </p>
              <Badge variant="secondary" className="text-sm">
                {item.section}
              </Badge>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Book className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg md:text-xl font-bold">Resources & How-To Guides</h2>
              </div>
              
              {resources && resources.resources.length > 0 ? (
                <div className="space-y-3">
                  {resources.resources.map((resource, i) => (
                    <Card key={i}>
                      <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            resource.type === 'internal' ? 'bg-primary/10' :
                            resource.type === 'pdf' ? 'bg-amber-100 dark:bg-amber-900/30' :
                            'bg-blue-100 dark:bg-blue-900/30'
                          }`}>
                            {resource.type === 'internal' ? (
                              <FileText className="h-4 w-4 text-primary" />
                            ) : resource.type === 'pdf' ? (
                              <FileText className="h-4 w-4 text-amber-600" />
                            ) : (
                              <ExternalLink className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm md:text-base">{resource.title}</h3>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                          </div>
                        </div>
                        {resource.type === 'internal' || resource.url.startsWith('/') ? (
                          <Link to={resource.url}>
                            <Button variant="outline" size="sm" className="gap-1 shrink-0">
                              View
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        ) : (
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="gap-1 shrink-0">
                              Visit
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No specific resources available for this step yet.</p>
                    <Link to="/pdf-viewer" className="mt-4 inline-block">
                      <Button variant="outline" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Search in Bill PDF
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Related Steps */}
        {relatedItems.length > 0 && (
          <section className="py-10 md:py-16 bg-muted/30">
            <div className="container px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-lg md:text-xl font-bold mb-6">
                  Related {category.label} Requirements
                </h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {relatedItems.map((related) => (
                    <Link key={related.id} to={`/compliance/${related.id}`}>
                      <Card className="h-full hover:border-primary/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                            <div>
                              <h3 className="font-semibold text-sm">{related.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2">{related.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-10 md:py-16 border-t">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                Track Your Progress
              </h2>
              <p className="text-muted-foreground mb-6">
                Use the compliance tracker to mark this step complete and monitor your overall progress.
              </p>
              <Link to="/#compliance-tracker">
                <Button className="gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Go to Compliance Tracker
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComplianceStepPage;
