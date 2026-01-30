import { Building2, CheckCircle2, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ComparisonRow {
  activity: string;
  cma: boolean | 'partial';
  cbk: boolean | 'partial';
  notes: string;
}

const comparisonData: ComparisonRow[] = [
  {
    activity: 'Virtual Asset Wallet Provider (Custody)',
    cma: true,
    cbk: true,
    notes: 'Both regulators share oversight'
  },
  {
    activity: 'Virtual Asset Exchange (Trading)',
    cma: true,
    cbk: true,
    notes: 'Both regulators share oversight'
  },
  {
    activity: 'Transfer Services',
    cma: true,
    cbk: true,
    notes: 'Both regulators share oversight'
  },
  {
    activity: 'Conversion Services',
    cma: true,
    cbk: true,
    notes: 'Both regulators share oversight'
  },
  {
    activity: 'Trading, Clearing & Settlement',
    cma: true,
    cbk: false,
    notes: 'CMA exclusive - capital markets function'
  },
  {
    activity: 'Payment Gateway / Processing',
    cma: false,
    cbk: true,
    notes: 'CBK exclusive - payment systems'
  },
  {
    activity: 'Brokerage Services',
    cma: true,
    cbk: false,
    notes: 'CMA exclusive - intermediation'
  },
  {
    activity: 'Investment Advisory',
    cma: true,
    cbk: false,
    notes: 'CMA exclusive - investment advice'
  },
  {
    activity: 'Asset Management',
    cma: true,
    cbk: false,
    notes: 'CMA exclusive - portfolio management'
  },
  {
    activity: 'Initial Virtual Asset Offering (IVAO)',
    cma: true,
    cbk: true,
    notes: 'Both regulators - fund raising'
  },
];

const regulatorInfo = {
  cma: {
    name: 'Capital Markets Authority (CMA)',
    focus: 'Investment & Trading Activities',
    website: 'https://www.cma.or.ke',
    keyFunctions: [
      'Licensing brokers and advisors',
      'Regulating trading platforms',
      'Overseeing asset management',
      'Approving IVAOs',
      'Investor protection'
    ],
    contact: 'compliance@cma.or.ke'
  },
  cbk: {
    name: 'Central Bank of Kenya (CBK)',
    focus: 'Payment & Money Services',
    website: 'https://www.centralbank.go.ke',
    keyFunctions: [
      'Licensing payment processors',
      'Regulating money transfers',
      'Overseeing wallet custody',
      'Financial stability',
      'AML/CFT supervision'
    ],
    contact: 'info@centralbank.go.ke'
  }
};

const StatusIcon = ({ status }: { status: boolean | 'partial' }) => {
  if (status === true) {
    return <CheckCircle2 className="h-5 w-5 text-primary" />;
  } else if (status === 'partial') {
    return <div className="h-5 w-5 rounded-full border-2 border-amber-500 flex items-center justify-center text-amber-500 text-xs">~</div>;
  }
  return <XCircle className="h-5 w-5 text-muted-foreground/40" />;
};

export const RegulatorComparison = () => {
  return (
    <section id="regulator-comparison" className="py-12 md:py-20 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Building2 className="h-3 w-3 mr-1" />
            Regulatory Framework
          </Badge>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            CMA vs CBK: Who Regulates What?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Understanding which regulatory authority oversees your virtual asset activities.
          </p>
        </div>

        {/* Regulator Cards */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-2 max-w-4xl mx-auto mb-8 md:mb-12">
          {Object.entries(regulatorInfo).map(([key, info]) => (
            <Card key={key} className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg md:text-xl font-display flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${key === 'cma' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {key.toUpperCase()}
                  </span>
                  <span className="text-sm md:text-base">{info.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Focus Area</p>
                  <p className="font-semibold text-sm md:text-base">{info.focus}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Key Functions</p>
                  <ul className="space-y-1">
                    {info.keyFunctions.map((func, i) => (
                      <li key={i} className="text-xs md:text-sm flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 md:h-4 md:w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{func}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-3 border-t">
                  <a 
                    href={info.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm text-primary hover:underline"
                  >
                    {info.website} →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Table */}
        <Card className="max-w-4xl mx-auto overflow-hidden">
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-base md:text-lg">Activity Comparison Matrix</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left py-3 px-3 md:px-4 font-semibold min-w-[180px] md:min-w-[200px]">Activity</th>
                    <th className="text-center py-3 px-2 md:px-4 font-semibold w-16 md:w-20">
                      <span className="hidden sm:inline">CMA</span>
                      <span className="sm:hidden text-xs">CMA</span>
                    </th>
                    <th className="text-center py-3 px-2 md:px-4 font-semibold w-16 md:w-20">
                      <span className="hidden sm:inline">CBK</span>
                      <span className="sm:hidden text-xs">CBK</span>
                    </th>
                    <th className="text-left py-3 px-3 md:px-4 font-semibold hidden md:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={row.activity} className={`border-b ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}>
                      <td className="py-3 px-3 md:px-4 font-medium text-xs md:text-sm">{row.activity}</td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        <div className="flex justify-center">
                          <StatusIcon status={row.cma} />
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        <div className="flex justify-center">
                          <StatusIcon status={row.cbk} />
                        </div>
                      </td>
                      <td className="py-3 px-3 md:px-4 text-muted-foreground text-xs md:text-sm hidden md:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-6 text-xs md:text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Regulated by this authority</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-muted-foreground/40" />
            <span>Not regulated by this authority</span>
          </div>
        </div>
      </div>
    </section>
  );
};
