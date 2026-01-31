import { Link } from 'react-router-dom';
import { ScrollText, FileText, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { billClauses } from '@/data/vaspBillData';

// Map sections to PDF pages
const sectionToPage: Record<string, number> = {
  '1': 2, '2': 2, '3': 3, '4': 4, '5': 4,
  '6': 4, '7': 5, '8': 5,
  '9': 6, '10': 6, '11': 7, '12': 7, '13': 8, '14': 8, '15': 8, '16': 9, '17': 9, '18': 10,
  '19': 10, '20': 10, '21': 10, '22': 11, '23': 12, '24': 12, '25': 13, '26': 13, '27': 14, '28': 14, '29': 14, '30': 15, '31': 15, '32': 16,
  '33': 17, '34': 17,
  '35': 17,
  '36': 18, '37': 18, '38': 18, '39': 19,
  '40': 19, '41': 19,
  '42': 20, '43': 20, '44': 21, '45': 21, '46': 21, '47': 21
};

export const BillIndex = () => {
  const partGroups = [
    { name: 'Part I - Preliminary', sections: billClauses.slice(0, 5), pdfPage: 2 },
    { name: 'Part II - Regulatory Authorities', sections: billClauses.slice(5, 8), pdfPage: 4 },
    { name: 'Part III - Licensing', sections: billClauses.slice(8, 18), pdfPage: 6 },
    { name: 'Part IV - Obligations', sections: billClauses.slice(18, 32), pdfPage: 10 },
    { name: 'Part V - AML/CFT/CPF', sections: billClauses.slice(32, 34), pdfPage: 17 },
    { name: 'Part VI - IVAO', sections: billClauses.slice(34, 35), pdfPage: 17 },
    { name: 'Part VII - Investigation', sections: billClauses.slice(35, 39), pdfPage: 18 },
    { name: 'Part VIII - Enforcement', sections: billClauses.slice(39, 41), pdfPage: 19 },
    { name: 'Part IX - Miscellaneous', sections: billClauses.slice(41, 47), pdfPage: 20 },
  ];

  const getSectionNumber = (clause: string) => {
    const match = clause.match(/\d+/);
    return match ? match[0] : '1';
  };

  return (
    <section id="bill-index" className="py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center mb-8 md:mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <ScrollText className="h-3 w-3 mr-1" />
            Complete Index
          </Badge>
          <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4">
            Bill Clause Index
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground">
            Click any section to view in the PDF. All 47 sections indexed.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {partGroups.map((group) => (
              <Card key={group.name}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-primary">
                      {group.name}
                    </CardTitle>
                    <Link to={`/pdf-viewer?page=${group.pdfPage}`}>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <FileText className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-1">
                    {group.sections.map((clause) => {
                      const sectionNum = getSectionNumber(clause.clause);
                      const pdfPage = sectionToPage[sectionNum] || 2;
                      return (
                        <li key={clause.clause}>
                          <Link 
                            to={`/pdf-viewer?page=${pdfPage}&search=${encodeURIComponent(clause.title.split(' ').slice(0, 2).join(' '))}`}
                            className="text-sm hover:text-primary hover:underline cursor-pointer block py-0.5"
                          >
                            <span className="font-medium">{clause.clause}:</span>{' '}
                            <span className="text-muted-foreground">{clause.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SEO-friendly full list */}
          <div className="mt-8 p-4 md:p-6 bg-card border rounded-lg">
            <h3 className="font-semibold mb-4 text-sm md:text-base">Complete Section Reference</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-semibold w-20">Section</th>
                    <th className="text-left py-2 px-2 font-semibold w-32 md:w-40">Title</th>
                    <th className="text-left py-2 px-2 font-semibold hidden md:table-cell">Summary</th>
                    <th className="text-left py-2 px-2 font-semibold w-16">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {billClauses.map((clause, index) => {
                    const sectionNum = getSectionNumber(clause.clause);
                    const pdfPage = sectionToPage[sectionNum] || 2;
                    return (
                      <tr key={clause.clause} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                        <td className="py-2 px-2 font-medium">{clause.clause}</td>
                        <td className="py-2 px-2">{clause.title}</td>
                        <td className="py-2 px-2 text-muted-foreground hidden md:table-cell">{clause.summary}</td>
                        <td className="py-2 px-2">
                          <Link to={`/pdf-viewer?page=${pdfPage}&search=${encodeURIComponent(clause.title.split(' ').slice(0, 2).join(' '))}`}>
                            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
