import { useState } from 'react';
import { Book, AlertCircle, Gavel, Settings, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { keyConcepts, type KeyConcept } from '@/data/vaspBillData';

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  definition: { 
    icon: <Book className="h-4 w-4" />, 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    label: 'Definition'
  },
  obligation: { 
    icon: <AlertCircle className="h-4 w-4" />, 
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    label: 'Obligation'
  },
  penalty: { 
    icon: <Gavel className="h-4 w-4" />, 
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    label: 'Penalty'
  },
  process: { 
    icon: <Settings className="h-4 w-4" />, 
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    label: 'Process'
  },
};

type CategoryFilter = 'all' | KeyConcept['category'];

export const KeyConcepts = () => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');

  const filteredConcepts = keyConcepts.filter((concept) => {
    const matchesSearch = 
      concept.term.toLowerCase().includes(search.toLowerCase()) ||
      concept.definition.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || concept.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'definition', label: 'Definitions' },
    { value: 'obligation', label: 'Obligations' },
    { value: 'penalty', label: 'Penalties' },
    { value: 'process', label: 'Processes' },
  ];

  return (
    <section id="key-concepts" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 bg-accent/10 text-accent-foreground hover:bg-accent/20">
            Essential Knowledge
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Key Concepts & Definitions
          </h2>
          <p className="text-lg text-muted-foreground">
            Understand the critical terms, obligations, penalties, and processes defined in the VASP Bill.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search concepts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  categoryFilter === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background border border-border hover:bg-muted'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Concepts Grid */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredConcepts.map((concept, index) => {
            const config = categoryConfig[concept.category];
            return (
              <Card 
                key={concept.id} 
                className="animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-semibold leading-tight">
                      {concept.term}
                    </CardTitle>
                    <Badge className={`${config.color} flex-shrink-0 gap-1`}>
                      {config.icon}
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {concept.definition}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {concept.section}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredConcepts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No concepts found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};
