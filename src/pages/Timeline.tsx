import { Link } from 'react-router-dom';
import { 
  ChevronRight, Calendar, FileText, CheckCircle2, 
  Clock, AlertCircle, ArrowRight, Building2
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
  type: 'milestone' | 'draft' | 'review' | 'approval';
  details?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    date: '2023',
    title: 'Initial Policy Discussions',
    description: 'National Treasury and Central Bank begin discussions on regulating virtual assets in Kenya.',
    status: 'completed',
    type: 'milestone',
    details: [
      'CBK issues public warnings about cryptocurrency risks',
      'National Treasury forms technical working group',
      'Consultation with industry stakeholders begins'
    ]
  },
  {
    date: 'March 2024',
    title: 'Draft Bill Development',
    description: 'Technical drafting of the Virtual Asset Service Providers Bill commences.',
    status: 'completed',
    type: 'draft',
    details: [
      'Legal experts engaged for bill drafting',
      'Review of international VASP regulatory frameworks',
      'FATF guidelines incorporated into draft'
    ]
  },
  {
    date: 'August 2024',
    title: 'Public Consultation',
    description: 'Draft bill released for public comment and industry feedback.',
    status: 'completed',
    type: 'review',
    details: [
      'Industry associations submit feedback',
      'Virtual asset operators provide input',
      'Legal practitioners review provisions'
    ]
  },
  {
    date: 'November 2024',
    title: 'Bill Refinement',
    description: 'Incorporation of public comments and stakeholder feedback into revised draft.',
    status: 'completed',
    type: 'draft',
    details: [
      'Penalty provisions reviewed',
      'Licensing requirements clarified',
      'Transitional provisions added'
    ]
  },
  {
    date: 'January 2025',
    title: 'Bill Publication',
    description: 'Virtual Asset Service Providers Bill, 2025 officially published.',
    status: 'completed',
    type: 'milestone',
    details: [
      'Bill gazetted for parliamentary consideration',
      'Public awareness campaign launched',
      'VASPKenya.com launched as compliance resource'
    ]
  },
  {
    date: 'Q1 2025',
    title: 'Parliamentary First Reading',
    description: 'Bill presented to National Assembly for first reading.',
    status: 'current',
    type: 'approval',
    details: [
      'Bill assigned to relevant parliamentary committee',
      'Committee hearings scheduled',
      'Public participation invited'
    ]
  },
  {
    date: 'Q2 2025',
    title: 'Committee Review',
    description: 'Parliamentary committee reviews bill and receives submissions.',
    status: 'upcoming',
    type: 'review',
    details: [
      'Sectoral committee analysis',
      'Expert testimony',
      'Proposed amendments consideration'
    ]
  },
  {
    date: 'Q3 2025',
    title: 'Second & Third Reading',
    description: 'Bill debated and voted on by National Assembly.',
    status: 'upcoming',
    type: 'approval',
    details: [
      'Clause-by-clause debate',
      'Amendments voted on',
      'Final passage vote'
    ]
  },
  {
    date: 'Q4 2025',
    title: 'Senate Review',
    description: 'If applicable, Senate reviews and votes on the bill.',
    status: 'upcoming',
    type: 'review'
  },
  {
    date: 'Late 2025',
    title: 'Presidential Assent',
    description: 'Bill presented to President for signature into law.',
    status: 'upcoming',
    type: 'milestone'
  },
  {
    date: '2026',
    title: 'Commencement',
    description: 'Act comes into force; transitional period begins for existing operators.',
    status: 'upcoming',
    type: 'milestone',
    details: [
      '6-month transitional period for existing operators',
      'CMA and CBK issue licensing guidelines',
      'Application process opens'
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
  review: Building2,
  approval: CheckCircle2
};

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
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                <Calendar className="h-3 w-3 mr-1" />
                Legislative Process
              </Badge>
              <h1 className="font-display text-2xl md:text-4xl font-bold mb-4">
                VASP Bill Timeline
              </h1>
              <p className="text-muted-foreground mb-6">
                Track the legislative journey of Kenya's Virtual Asset Service Providers Bill 
                from initial discussions to enactment.
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
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                  <span>Upcoming</span>
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
                              <ul className="space-y-1">
                                {event.details.map((detail, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <ArrowRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
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

        {/* CTA */}
        <section className="py-10 md:py-16 bg-muted/30 border-t">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-xl md:text-2xl font-bold mb-4">
                Stay Informed
              </h2>
              <p className="text-muted-foreground mb-6">
                The legislative process may change. Check back regularly for updates 
                or read the current bill text to understand what's proposed.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/#bill-text">
                  <Button className="gap-2">
                    <FileText className="h-4 w-4" />
                    Read the Bill
                  </Button>
                </Link>
                <Link to="/pdf-viewer">
                  <Button variant="outline" className="gap-2">
                    View PDF
                    <ArrowRight className="h-4 w-4" />
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
