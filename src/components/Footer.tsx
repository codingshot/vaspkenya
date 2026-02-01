import { Shield, ExternalLink, FileText, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const GITHUB_URL = 'https://github.com/codingshot/vaspkenya';
const CONTACT_EMAIL = 'info@vaspkenya.com';

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-8 py-8 md:py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">Kenya VASP Guide</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive compliance guide for the Virtual Asset Service Providers Act, 2025.
            </p>
            <a 
              href="/documents/VASP_Bill_2025_Kenya.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Download Bill PDF
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { id: 'company-selector', label: 'Company Types' },
                { id: 'questionnaire', label: 'Assessment' },
                { id: 'key-concepts', label: 'Key Concepts' },
                { id: 'bill-text', label: 'Bill Text' },
                { id: 'faq', label: 'FAQ' },
                { id: 'sources', label: 'Sources' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-semibold mb-4">Regulatory Bodies</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.treasury.go.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  National Treasury
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cma.or.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Capital Markets Authority
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.centralbank.go.ke" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Central Bank of Kenya
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="font-semibold mb-4">Legal & Contact</h4>
            <p className="text-sm text-muted-foreground mb-3">
              This guide is for informational purposes only and does not constitute legal advice.
            </p>
            <div className="space-y-2">
              <a 
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </a>
              <br />
              <a 
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              © 2025 Kenya VASP Compliance Guide. Based on the Virtual Asset Service Providers Act, 2025 (enacted 15 October 2025).
            </p>
            <div className="flex items-center gap-3">
              <a 
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                title="View source on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href={`${GITHUB_URL}/commits`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
              >
                Last updated: January 2026
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};