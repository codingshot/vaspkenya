import { FileText, Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold leading-tight">Kenya VASP</span>
            <span className="text-xs text-muted-foreground">Compliance Guide</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('company-selector')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Company Types
          </button>
          <button
            onClick={() => scrollToSection('key-concepts')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Key Concepts
          </button>
          <button
            onClick={() => scrollToSection('bill-text')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Bill Text
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            FAQ
          </button>
          <a 
            href="/documents/VASP_Bill_2025_Kenya.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              Download PDF
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container flex flex-col gap-2 p-4">
            <button
              onClick={() => scrollToSection('company-selector')}
              className="text-left py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Company Types
            </button>
            <button
              onClick={() => scrollToSection('key-concepts')}
              className="text-left py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Key Concepts
            </button>
            <button
              onClick={() => scrollToSection('bill-text')}
              className="text-left py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              Bill Text
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left py-2 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
            >
              FAQ
            </button>
            <a 
              href="/documents/VASP_Bill_2025_Kenya.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2"
            >
              <Button variant="outline" size="sm" className="w-full gap-2">
                <FileText className="h-4 w-4" />
                Download PDF
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
