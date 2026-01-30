import { ScrollText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { billClauses } from '@/data/vaspBillData';

export const BillIndex = () => {
  const partGroups = [
    { name: 'Part I - Preliminary', sections: billClauses.slice(0, 5) },
    { name: 'Part II - Regulatory Authorities', sections: billClauses.slice(5, 8) },
    { name: 'Part III - Licensing', sections: billClauses.slice(8, 18) },
    { name: 'Part IV - Obligations', sections: billClauses.slice(18, 32) },
    { name: 'Part V - AML/CFT/CPF', sections: billClauses.slice(32, 34) },
    { name: 'Part VI - IVAO', sections: billClauses.slice(34, 35) },
    { name: 'Part VII - Investigation', sections: billClauses.slice(35, 39) },
    { name: 'Part VIII - Enforcement', sections: billClauses.slice(39, 41) },
    { name: 'Part IX - Miscellaneous', sections: billClauses.slice(41, 47) },
  ];

  return (
    <section id="bill-index" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <ScrollText className="h-3 w-3 mr-1" />
            Complete Index
          </Badge>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl mb-4">
            Bill Clause Index
          </h2>
          <p className="text-lg text-muted-foreground">
            Quick reference to all 47 sections of the Virtual Asset Service Providers Bill, 2025.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partGroups.map((group) => (
              <Card key={group.name}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold text-primary">
                    {group.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {group.sections.map((clause) => (
                      <li key={clause.clause} className="text-sm">
                        <span className="font-medium">{clause.clause}:</span>{' '}
                        <span className="text-muted-foreground">{clause.title}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO-friendly full list */}
          <div className="mt-12 p-6 bg-card border rounded-lg">
            <h3 className="font-semibold mb-4">Complete Section Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 font-semibold w-24">Section</th>
                    <th className="text-left py-2 px-3 font-semibold w-40">Title</th>
                    <th className="text-left py-2 px-3 font-semibold">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {billClauses.map((clause, index) => (
                    <tr key={clause.clause} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                      <td className="py-2 px-3 font-medium">{clause.clause}</td>
                      <td className="py-2 px-3">{clause.title}</td>
                      <td className="py-2 px-3 text-muted-foreground">{clause.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
