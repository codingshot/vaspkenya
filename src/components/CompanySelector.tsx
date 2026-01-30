import { useState } from 'react';
import { 
  Wallet, ArrowLeftRight, CreditCard, Handshake, 
  TrendingUp, PieChart, Rocket, Building2, CheckCircle2, AlertTriangle,
  Building, Coins, Layers, Image, Landmark
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { companyTypes, type CompanyType } from '@/data/vaspBillData';

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
};

export const CompanySelector = () => {
  const [selectedType, setSelectedType] = useState<CompanyType | null>(null);

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
          <p className="text-sm md:text-lg text-muted-foreground">
            Select your company type to see specific licensing requirements and obligations under the VASP Bill.
          </p>
        </div>

        {/* Company Type Grid */}
        <div className="grid gap-3 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-6 md:mb-8">
          {companyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`text-left p-3 md:p-4 rounded-xl border-2 transition-all duration-200 touch-manipulation ${
                selectedType?.id === type.id
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <div className={`inline-flex p-2 md:p-3 rounded-lg mb-2 md:mb-3 ${
                selectedType?.id === type.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'
              }`}>
                {iconMap[type.icon] || <Building className="h-5 w-5 md:h-6 md:w-6" />}
              </div>
              <h3 className="font-semibold text-xs md:text-sm mb-1 line-clamp-2">{type.name}</h3>
              <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 hidden sm:block">
                {type.description}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Type Details */}
        {selectedType && (
          <Card className="animate-fade-in border-2 border-primary/20 shadow-xl">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  {iconMap[selectedType.icon]}
                </div>
                <div className="flex-1">
                  <CardTitle className="font-display text-xl md:text-2xl mb-2">
                    {selectedType.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {selectedType.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Regulatory Authority */}
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

                {/* Relevant Sections */}
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
              </div>

              {/* Key Obligations */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Key Compliance Obligations</h4>
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
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};
