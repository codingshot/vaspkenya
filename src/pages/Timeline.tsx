import { Link } from 'react-router-dom';
import { 
  ChevronRight, Calendar, FileText, CheckCircle2, 
  Clock, AlertCircle, ArrowRight, Building2, ExternalLink,
  Gavel, Users, Vote, Stamp
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  type: 'milestone' | 'draft' | 'review' | 'approval' | 'assent';
  details?: string[];
  sources?: { label: string; url: string }[];
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '2024',
    title: 'Policy Development & Draft Bill',
    description: 'National Treasury produced the Draft National Policy on Virtual Assets and VASPs, with the VASP Bill 2024 prepared from private-sector input.',
    status: 'completed',
    type: 'draft',
    details: [
      'CBK and National Treasury form technical working group',
      'Draft National Policy on Virtual Assets published',
      'VASP Bill 2024 drafted with industry consultation',
      'Bill presented to National Assembly in March 2024'
    ],
    sources: [
      { label: 'Treasury Policy PDF', url: 'https://newsite.treasury.go.ke' }
    ]
  },
  {
    date: '4 April 2025',
    title: 'Updated Bill Tabled in Parliament',
    description: 'The "Updated" Virtual Asset Service Providers Bill, 2025 was officially tabled before Parliament.',
    status: 'completed',
    type: 'milestone',
    details: [
      'Bill officially tabled in National Assembly',
      'Assigned to Departmental Committee on Finance and National Planning',
      '44-page bill covering comprehensive VASP regulation'
    ],
    sources: [
      { label: 'Parliament of Kenya', url: 'https://parliament.go.ke' }
    ]
  },
  {
    date: 'April 2025',
    title: 'First Reading',
    description: 'Formal introduction of the Bill; read a first time and committed to the Departmental Committee on Finance and National Planning.',
    status: 'completed',
    type: 'approval',
    details: [
      'Bill read a first time in plenary',
      'Committed to Finance and National Planning Committee',
      'Committee begins technical review'
    ]
  },
  {
    date: '25 April 2025',
    title: 'Public Participation & Committee Stage',
    description: 'The Finance and National Planning Committee invited public memoranda, then prepared its report and recommendations.',
    status: 'completed',
    type: 'review',
    details: [
      'Public invited to submit written memoranda by 25 April 2025',
      'Industry stakeholders provide feedback',
      'Committee prepares report for Second Reading',
      'Bowmans Law and other legal practitioners submit analysis'
    ],
    sources: [
      { label: 'Bowmans Law Analysis', url: 'https://bowmanslaw.com' }
    ]
  },
  {
    date: 'May-Sept 2025',
    title: 'Second Reading (Plenary Debate)',
    description: 'MPs debated the general principles and merits of the Bill and voted to move it forward to Committee of the Whole House.',
    status: 'completed',
    type: 'approval',
    details: [
      'Debate on principles and policy objectives',
      'MPs discuss regulatory scope and penalties',
      'Vote to proceed to Committee stage'
    ]
  },
  {
    date: '2 October 2025',
    title: 'Committee of the Whole House',
    description: 'The Bill was taken up in the Committee of the Whole House, where each clause was debated, amended and approved.',
    status: 'completed',
    type: 'review',
    details: [
      'Clause-by-clause debate and amendment',
      'All 47 sections reviewed and voted on',
      'Key amendments on licensing requirements adopted',
      'Penalties and enforcement provisions finalized'
    ],
    sources: [
      { label: 'Virtual Assets Chamber LinkedIn', url: 'https://linkedin.com' }
    ]
  },
  {
    date: '14 October 2025',
    title: 'Third Reading & Passage',
    description: 'After Committee stage, the Bill went to Third Reading and received final approval by MPs.',
    status: 'completed',
    type: 'approval',
    details: [
      'Final vote on the complete Bill',
      'Passed by National Assembly',
      'Transmitted to President for assent'
    ],
    sources: [
      { label: 'Yogupay Blog', url: 'https://yogupay.com' }
    ]
  },
  {
    date: '15 October 2025',
    title: 'Presidential Assent',
    description: 'The President gave assent, making it law as the Virtual Asset Service Providers Act, 2025.',
    status: 'completed',
    type: 'assent',
    details: [
      'President signs the Bill into law',
      'Virtual Asset Service Providers Act, 2025 enacted',
      'Kenya becomes one of first African nations with comprehensive VASP law'
    ],
    sources: [
      { label: 'Yogupay: VASP Bill Is Now Law', url: 'https://yogupay.com' }
    ]
  },
  {
    date: 'Late 2025',
    title: 'Gazettement & Implementation Notice',
    description: 'The Act is gazetted and CBK/CMA issue joint public notice on implementation and licensing.',
    status: 'completed',
    type: 'milestone',
    details: [
      'Act published in Kenya Gazette',
      'CBK and CMA issue joint implementation notice',
      'Licensing guidelines and procedures announced',
      'Application portal preparation begins'
    ],
    sources: [
      { label: 'CBK Public Notice', url: 'https://centralbank.go.ke' }
    ]
  },
  {
    date: '2026',
    title: 'Commencement & Transitional Period',
    description: 'Act comes into full force; 6-month transitional period for existing operators to apply for licenses.',
    status: 'current',
    type: 'milestone',
    details: [
      '6-month transitional period for existing VASPs',
      'CMA and CBK accept license applications',
      'Existing operators must register within transitional period',
      'Full enforcement begins after transitional period'
    ]
  }
];

const statusColors = {
  completed: 'bg-green-500',
  current: 'bg-primary animate-pulse',
  upcoming: 'bg-muted-foreground/30'
};

const statusIcons = {
  completed: CheckCircle2,
  current: Clock,
  upcoming: AlertCircle
};

const typeIcons = {
  milestone: Calendar,
  draft: FileText,
  review: Users,
  approval: Vote,
  assent: Stamp
};

const officialSources = [
  {
    title: 'Parliament of Kenya',
    description: 'Official Bill status and documents',
    url: 'https://parliament.go.ke',
    type: 'Primary'
  },
  {
    title: 'National Treasury',
    description: 'Draft policy and Bill PDF',
    url: 'https://newsite.treasury.go.ke',
    type: 'Primary'
  },
  {
    title: 'Central Bank of Kenya',
    description: 'Implementation notice and CBK role',
    url: 'https://centralbank.go.ke',
    type: 'Primary'
  },
  {
    title: 'Bowmans Law',
    description: 'Legal analysis of Bill provisions',
    url: 'https://bowmanslaw.com',
    type: 'Analysis'
  },
  {
    title: 'Njaga Advocates',
    description: 'VASP Bill 2025 explainer',
    url: 'https://njagaadvocates.com',
    type: 'Analysis'
  },
  {
    title: 'Mohammed Muigai Advocates',
    description: 'VASP Bill briefing',
    url: 'https://mohammedmuigai.com',
    type: 'Analysis'
  }
];

const Timeline = () => {
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
              <span className="text-foreground font-medium">Legislative Timeline</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-green-500/10 text-green-600 hover:bg-green-500/20">
                <Gavel className="h-3 w-3 mr-1" />
                Now Law - Enacted October 2025
              </Badge>
              <h1 className="font-display text-2xl md:text-4xl font-bold mb-4">
                VASP Act 2025 Timeline
              </h1>
              <p className="text-muted-foreground mb-6">
                Kenya's Virtual Asset Service Providers Bill was signed into law on 15 October 2025. 
                Track the complete legislative journey from policy development to enactment.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span>Current Stage</span>
                </div>
              </div>
              
              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">44</div>
                  <div className="text-xs text-muted-foreground">Pages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <div className="text-xs text-muted-foreground">Sections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-xs text-muted-foreground">Regulators</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">6 Mo</div>
                  <div className="text-xs text-muted-foreground">Transition</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-border" />
                
                {/* Events */}
                <div className="space-y-8">
                  {timelineEvents.map((event, index) => {
                    const StatusIcon = statusIcons[event.status];
                    const TypeIcon = typeIcons[event.type];
                    
                    return (
                      <div key={index} className="relative pl-12 md:pl-20">
                        {/* Status Dot */}
                        <div className={`absolute left-2 md:left-6 w-5 h-5 rounded-full ${statusColors[event.status]} border-4 border-background`} />
                        
                        <Card className={event.status === 'current' ? 'border-primary shadow-lg' : ''}>
                          <CardHeader className="pb-2">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                {event.date}
                              </Badge>
                              <Badge variant="secondary" className="text-xs gap-1">
                                <TypeIcon className="h-3 w-3" />
                                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                              </Badge>
                              {event.status === 'current' && (
                                <Badge className="text-xs bg-primary">
                                  Current Stage
                                </Badge>
                              )}
                              {event.status === 'completed' && event.type === 'assent' && (
                                <Badge className="text-xs bg-green-500">
                                  ✓ Enacted
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              <StatusIcon className={`h-5 w-5 ${
                                event.status === 'completed' ? 'text-green-500' :
                                event.status === 'current' ? 'text-primary' :
                                'text-muted-foreground'
                              }`} />
                              {event.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-3">
                              {event.description}
                            </p>
                            {event.details && (
                              <ul className="space-y-1 mb-3">
                                {event.details.map((detail, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            )}
                            {event.sources && (
                              <div className="flex flex-wrap gap-2 pt-2 border-t">
                                {event.sources.map((source, i) => (
                                  <a
                                    key={i}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline flex items-center gap-1"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    {source.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Official Sources */}
        <section className="py-10 md:py-16 bg-muted/30 border-t">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-2 text-center">
                Official & Reference Sources
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-8">
                For legal or product compliance, use only official sources from Parliament, Treasury, or the Kenya Gazette.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {officialSources.map((source, index) => (
                  <a
                    key={index}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Badge 
                              variant={source.type === 'Primary' ? 'default' : 'outline'} 
                              className="text-[10px] mb-2"
                            >
                              {source.type}
                            </Badge>
                            <h3 className="font-semibold text-sm">{source.title}</h3>
                            <p className="text-xs text-muted-foreground">{source.description}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 md:py-16 border-t">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                Ready to Comply?
              </h2>
              <p className="text-muted-foreground mb-6">
                The transitional period is now active. Check your compliance requirements 
                and prepare your license application.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/#company-selector">
                  <Button className="gap-2">
                    Check Requirements
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/pdf-viewer">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Full Act (PDF)
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

export default Timeline;
