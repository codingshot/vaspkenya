import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { billSections } from '@/data/vaspBillData';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const BillText = () => {
  const [search, setSearch] = useState('');
  const [openSections, setOpenSections] = useState<string[]>(['part1-preliminary']);

  const filteredSections = billSections.filter((section) => {
    const searchLower = search.toLowerCase();
    return (
      section.title.toLowerCase().includes(searchLower) ||
      section.content.toLowerCase().includes(searchLower) ||
      section.keywords.some(kw => kw.toLowerCase().includes(searchLower)) ||
      section.part.toLowerCase().includes(searchLower) ||
      section.section.toLowerCase().includes(searchLower)
    );
  });

  const toggleSection = (id: string) => {
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

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

  const expandAll = () => {
    setOpenSections(billSections.map(s => s.id));
  };

  const collapseAll = () => {
    setOpenSections([]);
  };

  return (
    <section id="bill-text" className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <FileText className="h-3 w-3 mr-1" />
            Full Bill Summary
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Bill Text & Provisions
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Search and explore the complete provisions of the Virtual Asset Service Providers Bill, 2025.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 md:h-5 w-4 md:w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bill text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base"
            />
            {search && (
              <span className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-xs md:text-sm text-muted-foreground">
                {filteredSections.length} results
              </span>
            )}
          </div>
          <div className="flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={expandAll} className="text-xs">
              Expand All
            </Button>
            <Button variant="outline" size="sm" onClick={collapseAll} className="text-xs">
              Collapse All
            </Button>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          {filteredSections.map((section) => (
            <Collapsible
              key={section.id}
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <Card className={`transition-shadow ${openSections.includes(section.id) ? 'shadow-lg' : ''}`}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors p-4 md:p-6">
                    <div className="flex items-start justify-between gap-3 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2">
                          <Badge variant="outline" className="text-[10px] md:text-xs">
                            {section.part}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] md:text-xs">
                            {section.section}
                          </Badge>
                        </div>
                        <CardTitle className="text-base md:text-lg lg:text-xl font-display leading-tight">
                          {highlightText(section.title, search)}
                        </CardTitle>
                      </div>
                      {openSections.includes(section.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 border-t px-4 md:px-6 pb-4 md:pb-6">
                    <div className="prose prose-sm max-w-none mt-4">
                      <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm text-muted-foreground leading-relaxed bg-transparent p-0 overflow-visible">
                        {highlightText(section.content, search)}
                      </pre>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t">
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {section.keywords.slice(0, 6).map((keyword) => (
                          <Badge 
                            key={keyword} 
                            variant="outline" 
                            className="text-[10px] md:text-xs cursor-pointer hover:bg-muted"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearch(keyword);
                            }}
                          >
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                      <Link to={`/bill/${section.id}`}>
                        <Button variant="outline" size="sm" className="gap-2 text-xs md:text-sm w-full sm:w-auto">
                          View Full Section
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No sections found matching "{search}"</p>
          </div>
        )}
      </div>
    </section>
  );
};
