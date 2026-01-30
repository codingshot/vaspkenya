import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, AlertCircle, Gavel, Settings, ExternalLink } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { keyConcepts, faqs, billSections } from '@/data/vaspBillData';

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  definition: { 
    icon: <Book className="h-5 w-5" />, 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    label: 'Definition'
  },
  obligation: { 
    icon: <AlertCircle className="h-5 w-5" />, 
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    label: 'Obligation'
  },
  penalty: { 
    icon: <Gavel className="h-5 w-5" />, 
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    label: 'Penalty'
  },
  process: { 
    icon: <Settings className="h-5 w-5" />, 
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    label: 'Process'
  },
};

const ConceptDetail = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const concept = keyConcepts.find(c => c.id === conceptId);

  if (!concept) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Concept Not Found</h1>
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const config = categoryConfig[concept.category];
  
  // Find related FAQs
  const relatedFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(concept.term.toLowerCase()) ||
    faq.answer.toLowerCase().includes(concept.term.toLowerCase())
  ).slice(0, 3);

  // Find related bill sections
  const relatedSections = billSections.filter(section =>
    section.content.toLowerCase().includes(concept.term.toLowerCase()) ||
    section.keywords.some(k => concept.term.toLowerCase().includes(k.toLowerCase()))
  ).slice(0, 2);

  // Find related concepts
  const relatedConcepts = keyConcepts.filter(c => 
    c.id !== concept.id && 
    (c.category === concept.category || 
     c.definition.toLowerCase().includes(concept.term.split(' ')[0].toLowerCase()))
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/#key-concepts" className="hover:text-foreground">Key Concepts</Link>
              <span>/</span>
              <span className="text-foreground">{concept.term}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link to="/#key-concepts" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Key Concepts
            </Link>

            {/* Main Card */}
            <Card className="border-2 mb-8">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Badge className={`${config.color} gap-1 mb-3`}>
                      {config.icon}
                      {config.label}
                    </Badge>
                    <CardTitle className="font-display text-2xl md:text-3xl">
                      {concept.term}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {concept.section}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {concept.definition}
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Related Bill Sections */}
              {relatedSections.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Bill Sections</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedSections.map(section => (
                      <div key={section.id} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{section.part}</Badge>
                          <span className="font-medium text-sm">{section.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {section.content.substring(0, 150)}...
                        </p>
                      </div>
                    ))}
                    <Link to="/#bill-text">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        View Full Bill Text
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Related FAQs */}
              {relatedFaqs.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related FAQs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {relatedFaqs.map(faq => (
                      <div key={faq.id} className="p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm mb-1">{faq.question}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{faq.answer}</p>
                      </div>
                    ))}
                    <Link to="/#faq">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        View All FAQs
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Related Concepts */}
            {relatedConcepts.length > 0 && (
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Related Concepts</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {relatedConcepts.map(c => {
                    const cConfig = categoryConfig[c.category];
                    return (
                      <Link key={c.id} to={`/concept/${c.id}`}>
                        <Card className="hover:border-primary/50 transition-colors h-full">
                          <CardContent className="p-4">
                            <Badge className={`${cConfig.color} text-xs mb-2`}>
                              {cConfig.label}
                            </Badge>
                            <p className="font-medium text-sm">{c.term}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConceptDetail;
