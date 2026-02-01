import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Wallet, ArrowLeftRight, CreditCard, Handshake, 
  TrendingUp, PieChart, Rocket, Building2, CheckCircle2, AlertTriangle, AlertCircle, Info,
  Building, Coins, Layers, Image, Landmark, Search, Code, Cpu, GraduationCap, Newspaper,
  Filter, ExternalLink
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { companyTypesData, searchCompanyTypes, getRegulatedCompanies, getNonRegulatedCompanies, type CompanyTypeData } from '@/data/companyTypesData';

const iconMap: Record<string, React.ReactNode> = {
  'Wallet': <Wallet className="h-5 w-5 md:h-6 md:w-6" />,
  'ArrowLeftRight': <ArrowLeftRight className="h-5 w-5 md:h-6 md:w-6" />,
  'CreditCard': <CreditCard className="h-5 w-5 md:h-6 md:w-6" />,
  'Handshake': <Handshake className="h-5 w-5 md:h-6 md:w-6" />,
  'TrendingUp': <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />,
  'PieChart': <PieChart className="h-5 w-5 md:h-6 md:w-6" />,
  'Rocket': <Rocket className="h-5 w-5 md:h-6 md:w-6" />,
  'Building': <Building className="h-5 w-5 md:h-6 md:w-6" />,
  'Coins': <Coins className="h-5 w-5 md:h-6 md:w-6" />,
  'Layers': <Layers className="h-5 w-5 md:h-6 md:w-6" />,
  'Image': <Image className="h-5 w-5 md:h-6 md:w-6" />,
  'Landmark': <Landmark className="h-5 w-5 md:h-6 md:w-6" />,
  'Code': <Code className="h-5 w-5 md:h-6 md:w-6" />,
  'Cpu': <Cpu className="h-5 w-5 md:h-6 md:w-6" />,
  'GraduationCap': <GraduationCap className="h-5 w-5 md:h-6 md:w-6" />,
  'Newspaper': <Newspaper className="h-5 w-5 md:h-6 md:w-6" />,
  'Search': <Search className="h-5 w-5 md:h-6 md:w-6" />,
};

export const CompanySelector = () => {
  const [selectedType, setSelectedType] = useState<CompanyTypeData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredCompanies = useMemo(() => {
    let companies = companyTypesData;
    
    // Filter by tab
    if (activeTab === 'regulated') {
      companies = getRegulatedCompanies();
    } else if (activeTab === 'exempt') {
      companies = getNonRegulatedCompanies();
    }
    
    // Then apply search
    if (searchQuery.trim()) {
      const searchResults = searchCompanyTypes(searchQuery);
      companies = companies.filter(c => searchResults.some(r => r.id === c.id));
    }
    
    return companies;
  }, [searchQuery, activeTab]);

  const handleDoubleClick = (type: CompanyTypeData) => {
    // Navigate to detail page on double click
    window.location.href = `/company/${type.id}`;
  };

  return (
    <section id="company-selector" className="py-12 md:py-24 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary hover:bg-primary/20 text-xs md:text-sm">
            Quick Select
          </Badge>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">
            What Type of Business Are You?
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground mb-6">
            Select your company type to see specific licensing requirements. Double-click for full details.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by business type, e.g. 'wallet', 'exchange', 'mining'..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && filteredCompanies.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                {filteredCompanies.length} matches
              </span>
            )}
          </div>
        </div>

        {/* Tabs for Regulated vs Exempt */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto mb-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="all" className="text-xs md:text-sm">All Types</TabsTrigger>
            <TabsTrigger value="regulated" className="text-xs md:text-sm">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Regulated
            </TabsTrigger>
            <TabsTrigger value="exempt" className="text-xs md:text-sm">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Exempt
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Company Type Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-6 md:mb-8">
          {filteredCompanies.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              onDoubleClick={() => handleDoubleClick(type)}
              className={`text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation ${
                selectedType?.id === type.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className={`inline-flex p-2 md:p-3 rounded-lg mb-2 md:mb-3 ${
                selectedType?.id === type.id 
                  ? 'bg-primary text-primary-foreground' 
                  : type.regulationStatus === 'fully-regulated'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                  : type.regulationStatus === 'partially-regulated'
                  ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              }`}>
                {iconMap[type.icon] || <Building className="h-5 w-5 md:h-6 md:w-6" />}
              </div>
              <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{type.name}</h3>
              <div className="flex flex-wrap gap-1 mb-1">
                <Badge 
                  variant="outline" 
                  className={`text-[8px] md:text-[10px] flex items-center gap-0.5 ${
                    type.regulationStatus === 'fully-regulated'
                      ? 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400' 
                      : type.regulationStatus === 'partially-regulated'
                      ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400'
                      : 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400'
                  }`}
                >
                  {type.regulationStatus === 'fully-regulated' && <AlertTriangle className="h-2.5 w-2.5" />}
                  {type.regulationStatus === 'partially-regulated' && <AlertCircle className="h-2.5 w-2.5" />}
                  {type.regulationStatus === 'exempt' && <CheckCircle2 className="h-2.5 w-2.5" />}
                  {type.regulationStatus === 'fully-regulated' ? 'Licensed Required' : 
                   type.regulationStatus === 'partially-regulated' ? 'Conditional' : 'Exempt'}
                </Badge>
              </div>
              <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                {type.description}
              </p>
            </button>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No company types found matching "{searchQuery}"</p>
            <Button variant="outline" onClick={() => setSearchQuery('')}>Clear Search</Button>
          </div>
        )}

        {/* Selected Type Details */}
        {selectedType && (
          <Card className="animate-fade-in border-2 border-primary/20 shadow-xl max-w-4xl mx-auto">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${selectedType.isRegulated ? 'bg-primary text-primary-foreground' : 'bg-green-500 text-white'}`}>
                  {iconMap[selectedType.icon]}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <CardTitle className="font-display text-xl md:text-2xl">
                      {selectedType.name}
                    </CardTitle>
                    <Badge className={
                      selectedType.regulationStatus === 'fully-regulated' ? 'bg-red-100 text-red-700' :
                      selectedType.regulationStatus === 'partially-regulated' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }>
                      {selectedType.regulationStatus === 'fully-regulated' ? 'Fully Regulated' :
                       selectedType.regulationStatus === 'partially-regulated' ? 'Conditionally Regulated' :
                       'Exempt'}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {selectedType.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Regulatory Authority */}
                {selectedType.regulatoryAuthority.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">Regulatory Authority</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedType.regulatoryAuthority.map((auth) => (
                        <Badge key={auth} variant="secondary" className="text-sm">
                          {auth}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Relevant Sections */}
                {selectedType.relevantSections.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="h-5 w-5 text-accent" />
                      <h4 className="font-semibold">Key Bill Sections</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedType.relevantSections.map((section) => (
                        <Badge key={section} variant="outline" className="text-sm">
                          {section}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Examples */}
              {selectedType.examples.length > 0 && (
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 mb-4">
                    <Building className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Examples</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedType.examples.map((example, i) => (
                      <Badge key={i} variant="outline" className="text-sm py-1">
                        {example.name}
                        <span className="text-muted-foreground ml-1 text-xs">
                          ({example.type === 'local' ? 'Kenya' : 'Intl'})
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Obligations */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">
                    {selectedType.isRegulated ? 'Key Compliance Obligations' : 'Considerations'}
                  </h4>
                </div>
                <ul className="grid gap-3 md:grid-cols-2">
                  {selectedType.keyObligations.map((obligation, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{obligation}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-6 border-t flex flex-wrap gap-3">
                <Link to={`/company/${selectedType.id}`}>
                  <Button className="gap-2">
                    View Full Details
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                {selectedType.pdfPages && selectedType.pdfPages.length > 0 && (
                  <Link to={`/pdf-viewer?page=${selectedType.pdfPages[0]}`}>
                    <Button variant="outline" className="gap-2">
                      View in Bill PDF
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
