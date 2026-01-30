import { Shield, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="container px-4 md:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold">Kenya VASP Guide</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              A comprehensive compliance guide for the Virtual Asset Service Providers Bill, 2025. 
              Navigate Kenya's regulatory framework for virtual assets with clarity.
            </p>
            <a 
              href="/documents/VASP_Bill_2025_Kenya.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Download Full Bill PDF
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#company-selector" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Company Types
                </a>
              </li>
              <li>
                <a href="#key-concepts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Key Concepts
                </a>
              </li>
              <li>
                <a href="#bill-text" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Bill Text
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h4 className="font-semibold mb-4">Official Resources</h4>
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
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>
              © 2025 Kenya VASP Compliance Guide. For informational purposes only.
            </p>
            <p className="text-center md:text-right">
              This is not legal advice. Consult qualified legal professionals for compliance guidance.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
