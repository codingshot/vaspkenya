import { useParams, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { billSections, billClauses } from '@/data/vaspBillData';

const BillSection = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(searchQuery);

  const section = billSections.find(s => s.id === sectionId);
  const currentIndex = billSections.findIndex(s => s.id === sectionId);
  const prevSection = currentIndex > 0 ? billSections[currentIndex - 1] : null;
  const nextSection = currentIndex < billSections.length - 1 ? billSections[currentIndex + 1] : null;

  // Filter content based on search
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-accent/50 text-accent-foreground px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Get related clauses for this section
  const relatedClauses = useMemo(() => {
    if (!section) return [];
    const sectionMatch = section.section.match(/Sections?\s*([\d-]+)/i);
    if (!sectionMatch) return [];
    
    const range = sectionMatch[1];
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number);
      return billClauses.filter(c => {
        const clauseNum = parseInt(c.clause.replace('Section ', ''));
        return clauseNum >= start && clauseNum <= end;
      });
    } else {
      return billClauses.filter(c => c.clause === `Section ${range}`);
    }
  }, [section]);

  if (!section) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Section Not Found</h1>
            <Link to="/#bill-text">
              <Button>View All Sections</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span>
              <Link to="/#bill-text" className="hover:text-foreground">Bill Text</Link>
              <span>/</span>
              <span className="text-foreground">{section.part}</span>
            </div>
          </div>
        </div>

        <div className="container px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back and Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <Link to="/#bill-text" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Bill Overview
              </Link>
              <div className="flex gap-2">
                {prevSection && (
                  <Link to={`/bill/${prevSection.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Prev</span>
                    </Button>
                  </Link>
                )}
                {nextSection && (
                  <Link to={`/bill/${nextSection.id}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Search within section */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search within this section..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Main Content */}
            <Card className="border-2 mb-6">
              <CardHeader className="bg-muted/30 border-b">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="outline">{section.part}</Badge>
                  <Badge variant="secondary">{section.section}</Badge>
                </div>
                <CardTitle className="font-display text-xl md:text-2xl">
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 md:p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                  {highlightText(section.content, search)}
                </pre>
                
                {/* Keywords */}
                <div className="mt-6 pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {section.keywords.map(keyword => (
                      <Badge key={keyword} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Clauses */}
            {relatedClauses.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Clauses in this Section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-3 font-semibold w-24">Clause</th>
                          <th className="text-left py-2 px-3 font-semibold">Title</th>
                          <th className="text-left py-2 px-3 font-semibold hidden md:table-cell">Summary</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatedClauses.map((clause, index) => (
                          <tr key={clause.clause} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                            <td className="py-2 px-3 font-medium">{clause.clause}</td>
                            <td className="py-2 px-3">{clause.title}</td>
                            <td className="py-2 px-3 text-muted-foreground hidden md:table-cell">{clause.summary}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation at bottom */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t">
              {prevSection ? (
                <Link to={`/bill/${prevSection.id}`}>
                  <Button variant="ghost" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Previous</div>
                      <div className="text-sm font-medium">{prevSection.title}</div>
                    </div>
                  </Button>
                </Link>
              ) : <div />}
              {nextSection && (
                <Link to={`/bill/${nextSection.id}`}>
                  <Button variant="ghost" className="gap-2">
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Next</div>
                      <div className="text-sm font-medium">{nextSection.title}</div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BillSection;
