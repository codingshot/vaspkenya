import { Shield, FileText, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToSelector = () => {
    const element = document.getElementById('company-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden hero-gradient py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2">
            <Shield className="h-4 w-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">Kenya VASP Bill 2025</span>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl text-balance">
            Virtual Asset Service Providers Compliance Guide
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl max-w-2xl mx-auto text-balance">
            Navigate Kenya's regulatory framework for virtual assets. Understand licensing requirements, 
            key obligations, and compliance pathways for your business.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToSelector}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 w-full sm:w-auto"
            >
              Check Your Requirements
              <ArrowDown className="h-4 w-4" />
            </Button>
            <a 
              href="/documents/VASP_Bill_2025_Kenya.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 w-full"
              >
                <FileText className="h-4 w-4" />
                Download Bill PDF
              </Button>
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">47</div>
              <div className="text-sm text-primary-foreground/70">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">7</div>
              <div className="text-sm text-primary-foreground/70">VASP Types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">6 Mo</div>
              <div className="text-sm text-primary-foreground/70">Transition Period</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-foreground">2</div>
              <div className="text-sm text-primary-foreground/70">Regulators</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
