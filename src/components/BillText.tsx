import { useState } from 'react';
import { Search, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

  return (
    <section id="bill-text" className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <FileText className="h-3 w-3 mr-1" />
            Full Bill Summary
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Bill Text & Provisions
          </h2>
          <p className="text-lg text-muted-foreground">
            Search and explore the complete provisions of the Virtual Asset Service Providers Bill, 2025.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bill text (e.g., 'license', 'penalty', 'AML')..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12 h-12 text-base"
          />
          {search && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {filteredSections.length} results
            </span>
          )}
        </div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredSections.map((section) => (
            <Collapsible
              key={section.id}
              open={openSections.includes(section.id)}
              onOpenChange={() => toggleSection(section.id)}
            >
              <Card className={`transition-shadow ${openSections.includes(section.id) ? 'shadow-lg' : ''}`}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {section.part}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {section.section}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg md:text-xl font-display">
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
                  <CardContent className="pt-0 border-t">
                    <div className="prose prose-sm max-w-none mt-4">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-muted-foreground leading-relaxed bg-transparent p-0 overflow-visible">
                        {highlightText(section.content, search)}
                      </pre>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
                      {section.keywords.slice(0, 8).map((keyword) => (
                        <Badge 
                          key={keyword} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSearch(keyword);
                          }}
                        >
                          {keyword}
                        </Badge>
                      ))}
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
