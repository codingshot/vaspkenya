import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, AlertTriangle, DollarSign, Clock, 
  ChevronRight, FileText, Scale, Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// Penalty types from VASP Bill 2025 - Sections 40-43
const penaltyTypes = [
  {
    id: 'operating-without-license',
    name: 'Operating Without License',
    section: 'Section 9, 40',
    description: 'Providing VASP services without a valid license',
    baseFine: 20000000, // KES 20 million
    maxFine: 100000000, // KES 100 million
    dailyPenalty: 500000, // KES 500,000 per day
    imprisonment: '10 years',
    pdfPage: 19,
    severity: 'critical'
  },
  {
    id: 'false-information',
    name: 'Providing False Information',
    section: 'Section 41',
    description: 'Submitting false or misleading information to regulators',
    baseFine: 5000000,
    maxFine: 50000000,
    dailyPenalty: 200000,
    imprisonment: '5 years',
    pdfPage: 19,
    severity: 'high'
  },
  {
    id: 'aml-non-compliance',
    name: 'AML/CFT/CPF Non-Compliance',
    section: 'Section 33, 40',
    description: 'Failure to comply with anti-money laundering requirements',
    baseFine: 10000000,
    maxFine: 50000000,
    dailyPenalty: 300000,
    imprisonment: '7 years',
    pdfPage: 17,
    severity: 'critical'
  },
  {
    id: 'customer-asset-misuse',
    name: 'Customer Asset Misappropriation',
    section: 'Section 32, 40',
    description: 'Misusing or failing to protect customer virtual assets',
    baseFine: 20000000,
    maxFine: 100000000,
    dailyPenalty: 500000,
    imprisonment: '10 years',
    pdfPage: 16,
    severity: 'critical'
  },
  {
    id: 'failure-to-report',
    name: 'Failure to Report',
    section: 'Section 26, 42',
    description: 'Not notifying regulators of material changes within 7 days',
    baseFine: 1000000,
    maxFine: 10000000,
    dailyPenalty: 100000,
    imprisonment: '2 years',
    pdfPage: 13,
    severity: 'medium'
  },
  {
    id: 'record-keeping-failure',
    name: 'Record Keeping Failure',
    section: 'Section 44',
    description: 'Failure to maintain 7-year transaction records',
    baseFine: 2000000,
    maxFine: 20000000,
    dailyPenalty: 150000,
    imprisonment: '3 years',
    pdfPage: 21,
    severity: 'high'
  },
  {
    id: 'unauthorized-ivao',
    name: 'Unauthorized IVAO',
    section: 'Section 35, 40',
    description: 'Conducting Initial Virtual Asset Offering without approval',
    baseFine: 30000000,
    maxFine: 100000000,
    dailyPenalty: 500000,
    imprisonment: '10 years',
    pdfPage: 17,
    severity: 'critical'
  },
  {
    id: 'obstruction',
    name: 'Obstructing Investigation',
    section: 'Section 37, 42',
    description: 'Interfering with regulatory investigation or inspection',
    baseFine: 5000000,
    maxFine: 30000000,
    dailyPenalty: 200000,
    imprisonment: '5 years',
    pdfPage: 18,
    severity: 'high'
  },
  {
    id: 'cyber-security-breach',
    name: 'Cyber Security Non-Compliance',
    section: 'Section 29',
    description: 'Failure to implement required cyber security measures',
    baseFine: 5000000,
    maxFine: 25000000,
    dailyPenalty: 200000,
    imprisonment: '3 years',
    pdfPage: 14,
    severity: 'high'
  },
  {
    id: 'fit-proper-failure',
    name: 'Fit & Proper Violations',
    section: 'Section 19',
    description: 'Appointing directors/officers who fail fit and proper requirements',
    baseFine: 3000000,
    maxFine: 15000000,
    dailyPenalty: 100000,
    imprisonment: '2 years',
    pdfPage: 10,
    severity: 'medium'
  }
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0
  }).format(amount);
};

export const PenaltyCalculator = () => {
  const [selectedViolation, setSelectedViolation] = useState<string>('');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [isRepeatOffender, setIsRepeatOffender] = useState<boolean>(false);
  const [aggravatingFactors, setAggravatingFactors] = useState<number>(0);

  const violation = penaltyTypes.find(p => p.id === selectedViolation);

  const calculatePenalty = () => {
    if (!violation) return null;

    let basePenalty = violation.baseFine;
    let continuingPenalty = violation.dailyPenalty * durationDays;
    
    // Apply multipliers
    let multiplier = 1;
    if (isRepeatOffender) multiplier += 0.5;
    multiplier += aggravatingFactors * 0.25;

    const totalFine = Math.min(
      (basePenalty + continuingPenalty) * multiplier,
      violation.maxFine
    );

    return {
      basePenalty,
      continuingPenalty,
      multiplier,
      totalFine,
      cappedAt: totalFine >= violation.maxFine
    };
  };

  const penalty = calculatePenalty();

  return (
    <section id="penalty-calculator" className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-3 md:mb-4 bg-destructive/10 text-destructive hover:bg-destructive/20 text-xs md:text-sm">
            <Scale className="h-3 w-3 mr-1" />
            Enforcement Reference
          </Badge>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">
            Penalty Calculator
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Estimate potential fines and penalties under the VASP Bill 2025 (Sections 40-43).
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-2">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculate Potential Penalties
              </CardTitle>
              <CardDescription>
                Select violation type and parameters to estimate applicable penalties
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Violation Type */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Violation Type</Label>
                <Select value={selectedViolation} onValueChange={setSelectedViolation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select violation type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {penaltyTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-[10px] ${
                            type.severity === 'critical' ? 'border-red-500 text-red-600' :
                            type.severity === 'high' ? 'border-amber-500 text-amber-600' :
                            'border-blue-500 text-blue-600'
                          }`}>
                            {type.severity}
                          </Badge>
                          <span>{type.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {violation && (
                <>
                  {/* Violation Details */}
                  <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{violation.name}</span>
                      <Badge variant="outline">{violation.section}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{violation.description}</p>
                    <div className="flex gap-4 text-sm pt-2">
                      <div>
                        <span className="text-muted-foreground">Base Fine:</span>{' '}
                        <span className="font-medium">{formatCurrency(violation.baseFine)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Daily Penalty:</span>{' '}
                        <span className="font-medium">{formatCurrency(violation.dailyPenalty)}</span>
                      </div>
                    </div>
                    <Link to={`/pdf-viewer?page=${violation.pdfPage}&search=${encodeURIComponent(violation.name.split(' ')[0])}`}>
                      <Button variant="link" size="sm" className="p-0 h-auto gap-1">
                        <FileText className="h-3 w-3" />
                        View in Bill PDF
                      </Button>
                    </Link>
                  </div>

                  {/* Duration */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Duration of Violation (Days)
                      </Label>
                      <span className="text-sm font-bold">{durationDays} days</span>
                    </div>
                    <Slider
                      value={[durationDays]}
                      onValueChange={(v) => setDurationDays(v[0])}
                      min={1}
                      max={365}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 day</span>
                      <span>1 year</span>
                    </div>
                  </div>

                  {/* Modifiers */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Repeat Offender?</Label>
                      <Select 
                        value={isRepeatOffender ? 'yes' : 'no'} 
                        onValueChange={(v) => setIsRepeatOffender(v === 'yes')}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no">No - First Offense</SelectItem>
                          <SelectItem value="yes">Yes - Repeat Offender (+50%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        Aggravating Factors
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-[200px]">
                                Factors like customer harm, systemic risk, 
                                deliberate concealment add +25% each
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Select 
                        value={aggravatingFactors.toString()} 
                        onValueChange={(v) => setAggravatingFactors(parseInt(v))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">None</SelectItem>
                          <SelectItem value="1">1 Factor (+25%)</SelectItem>
                          <SelectItem value="2">2 Factors (+50%)</SelectItem>
                          <SelectItem value="3">3+ Factors (+75%)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Results */}
                  {penalty && (
                    <div className="border-t pt-6 space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-destructive" />
                        Estimated Penalty
                      </h4>
                      
                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Base Fine</p>
                          <p className="font-bold text-lg">{formatCurrency(penalty.basePenalty)}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Continuing Penalty</p>
                          <p className="font-bold text-lg">{formatCurrency(penalty.continuingPenalty)}</p>
                          <p className="text-[10px] text-muted-foreground">
                            ({formatCurrency(violation.dailyPenalty)}/day × {durationDays} days)
                          </p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/50 text-center">
                          <p className="text-xs text-muted-foreground mb-1">Multiplier</p>
                          <p className="font-bold text-lg">{penalty.multiplier.toFixed(2)}×</p>
                        </div>
                      </div>

                      <Card className="border-destructive bg-destructive/5">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Total Estimated Fine</p>
                              {penalty.cappedAt && (
                                <p className="text-xs text-muted-foreground">
                                  Capped at maximum of {formatCurrency(violation.maxFine)}
                                </p>
                              )}
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-destructive">
                              {formatCurrency(penalty.totalFine)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-800 dark:text-amber-400">
                            Plus potential imprisonment: Up to {violation.imprisonment}
                          </p>
                          <p className="text-amber-700 dark:text-amber-500 text-xs">
                            Directors and officers may face personal liability
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {!violation && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Select a violation type to calculate potential penalties</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Penalty Overview */}
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {penaltyTypes.slice(0, 6).map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedViolation(type.id)}
                className={`text-left p-4 rounded-lg border transition-all ${
                  selectedViolation === type.id 
                    ? 'border-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className={`text-[10px] ${
                    type.severity === 'critical' ? 'border-red-500 text-red-600' :
                    type.severity === 'high' ? 'border-amber-500 text-amber-600' :
                    'border-blue-500 text-blue-600'
                  }`}>
                    {type.section}
                  </Badge>
                  <ChevronRight className="h-3 w-3 text-muted-foreground ml-auto" />
                </div>
                <h4 className="font-medium text-sm">{type.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">
                  Up to {formatCurrency(type.maxFine)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
