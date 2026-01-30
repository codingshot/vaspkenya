import { FileText, Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'company-selector', label: 'Types' },
    { id: 'regulator-comparison', label: 'CMA vs CBK' },
    { id: 'key-concepts', label: 'Concepts' },
    { id: 'bill-text', label: 'Bill' },
    { id: 'test-questions', label: 'Quiz' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 md:h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm md:text-lg font-bold leading-tight">Kenya VASP</span>
            <span className="text-[9px] md:text-xs text-muted-foreground hidden sm:block">Compliance Guide</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-xs xl:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
          <a 
            href="/documents/VASP_Bill_2025_Kenya.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="default" size="sm" className="gap-2 text-xs">
              <FileText className="h-3 w-3" />
              PDF
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 -mr-2 touch-manipulation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background absolute w-full shadow-lg z-50">
          <nav className="container flex flex-col gap-1 p-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left py-3 px-4 rounded-lg text-sm font-medium hover:bg-muted transition-colors active:bg-muted/80 touch-manipulation"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t my-2" />
            <a 
              href="/documents/VASP_Bill_2025_Kenya.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="default" size="sm" className="w-full gap-2">
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
