import { useParams, Link } from 'react-router-dom';
import { ChevronRight, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface LegalPageContent {
  id: string;
  title: string;
  lastUpdated: string;
  sections: { title: string; content: string }[];
}

const legalPages: Record<string, LegalPageContent> = {
  terms: {
    id: 'terms',
    title: 'Terms of Use',
    lastUpdated: '2025-01-30',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: 'By accessing and using VASPKenya.com ("the Website"), you accept and agree to be bound by these Terms of Use. This Website provides educational information about Kenya\'s Virtual Asset Service Providers Bill 2025 and is intended for informational purposes only.'
      },
      {
        title: '2. Not Legal Advice',
        content: 'The content on this Website is for general informational purposes only and does not constitute legal, financial, or professional advice. You should consult with qualified legal and regulatory professionals before making any decisions based on the information provided.'
      },
      {
        title: '3. Accuracy of Information',
        content: 'While we strive to provide accurate and up-to-date information about the VASP Bill 2025, we make no representations or warranties about the completeness, reliability, or accuracy of the information. The Bill may be amended during the legislative process.'
      },
      {
        title: '4. Intellectual Property',
        content: 'All content on this Website, including text, graphics, logos, and software, is the property of VASPKenya.com or its content suppliers and is protected by intellectual property laws. The VASP Bill 2025 text is public domain as government legislation.'
      },
      {
        title: '5. Limitation of Liability',
        content: 'To the fullest extent permitted by law, VASPKenya.com shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this Website or reliance on any information provided.'
      },
      {
        title: '6. Governing Law',
        content: 'These Terms are governed by and construed in accordance with the laws of Kenya. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of Kenyan courts.'
      }
    ]
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy Policy',
    lastUpdated: '2025-01-30',
    sections: [
      {
        title: '1. Introduction',
        content: 'VASPKenya.com ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our Website. This policy complies with the Kenya Data Protection Act, 2019.'
      },
      {
        title: '2. Information We Collect',
        content: 'We may collect: (a) Usage Data - automatically collected information about how you interact with the Website; (b) Local Storage Data - your compliance tracker progress is saved locally in your browser and is not transmitted to our servers.'
      },
      {
        title: '3. Data Storage and Security',
        content: 'Your compliance tracker data is stored locally in your browser using localStorage and is not transmitted to our servers. We implement appropriate security measures to protect any data we do collect.'
      },
      {
        title: '4. Your Rights',
        content: 'Under the Kenya Data Protection Act, you have the right to: (a) access your personal data; (b) correct inaccurate data; (c) request deletion of your data; (d) object to processing; (e) data portability.'
      },
      {
        title: '5. Changes to This Policy',
        content: 'We may update this Privacy Policy periodically. Changes will be posted on this page with an updated "Last Updated" date. Continued use constitutes acceptance.'
      }
    ]
  },
  disclaimer: {
    id: 'disclaimer',
    title: 'Legal Disclaimer',
    lastUpdated: '2025-01-30',
    sections: [
      {
        title: 'Educational Purpose Only',
        content: 'This Website provides educational information about Kenya\'s Virtual Asset Service Providers Bill 2025. The content is intended to help businesses and individuals understand the regulatory framework being proposed for virtual assets in Kenya.'
      },
      {
        title: 'Not Legal or Financial Advice',
        content: 'Nothing on this Website constitutes legal, financial, tax, or regulatory advice. You should always seek advice from qualified professionals before making business or investment decisions related to virtual assets.'
      },
      {
        title: 'Bill Status',
        content: 'The VASP Bill 2025 is currently a proposed piece of legislation. It has not yet been enacted into law and may be subject to amendments during the legislative process.'
      },
      {
        title: 'No Regulatory Affiliation',
        content: 'VASPKenya.com is an independent educational resource. We are not affiliated with, endorsed by, or officially connected to the Central Bank of Kenya, Capital Markets Authority, National Treasury, or any other government body.'
      },
      {
        title: 'No Warranty',
        content: 'This Website and its content are provided "as is" without warranty of any kind, express or implied. We disclaim all warranties including merchantability, fitness for a particular purpose, and non-infringement.'
      }
    ]
  }
};

const LegalPage = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const page = pageId ? legalPages[pageId] : undefined;

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const otherPages = Object.values(legalPages).filter(p => p.id !== page.id);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="container px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{page.title}</span>
            </nav>
          </div>
        </div>

        {/* Content */}
        <section className="py-10 md:py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="font-display text-2xl md:text-3xl font-bold">{page.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {new Date(page.lastUpdated).toLocaleDateString('en-KE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="prose prose-sm md:prose-base max-w-none">
                {page.sections.map((section, i) => (
                  <Card key={i} className="mb-4">
                    <CardContent className="p-4 md:p-6">
                      <h2 className="font-semibold text-base md:text-lg mb-3">{section.title}</h2>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Other Legal Pages */}
              <div className="mt-10 pt-6 border-t">
                <h3 className="font-semibold mb-4">Other Legal Documents</h3>
                <div className="flex flex-wrap gap-3">
                  {otherPages.map((p) => (
                    <Link key={p.id} to={`/legal/${p.id}`}>
                      <Button variant="outline" size="sm">{p.title}</Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
