import { Shield, FileText, ArrowDown, Building2, HelpCircle, CheckSquare, Calculator, Calendar, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const Hero = () => {
  const scrollToSelector = () => {
    const element = document.getElementById('company-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickActions = [
    { id: 'company-selector', label: 'Business Types', icon: Building2, color: 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20' },
    { id: 'questionnaire', label: 'Quick Assessment', icon: HelpCircle, color: 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20' },
    { id: 'compliance-tracker', label: 'Compliance Checklist', icon: CheckSquare, color: 'bg-green-500/10 text-green-600 hover:bg-green-500/20' },
    { id: 'penalty-calculator', label: 'Penalty Calculator', icon: Calculator, color: 'bg-red-500/10 text-red-600 hover:bg-red-500/20' },
    { id: 'test-questions', label: 'Knowledge Quiz', icon: BookOpen, color: 'bg-amber-500/10 text-amber-600 hover:bg-amber-500/20' },
  ];

  return (
    <section className="relative overflow-hidden hero-gradient py-12 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Status Badge */}
          <Badge className="mb-4 bg-green-500/20 text-green-100 border-green-400/30 hover:bg-green-500/30">
            <Shield className="h-3 w-3 mr-1" />
            Now Law - Enacted 15 October 2025
          </Badge>

          {/* Title */}
          <h1 className="mb-4 font-display text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl md:text-4xl lg:text-5xl text-balance">
            Kenya Virtual Asset Service Providers Act 2025
          </h1>

          {/* Description */}
          <p className="mb-6 text-base text-primary-foreground/90 md:text-lg max-w-2xl mx-auto text-balance">
            Navigate Kenya's regulatory framework for virtual assets. Understand licensing requirements, 
            compliance obligations, and prepare your business for the new law.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Button 
              size="lg" 
              onClick={scrollToSelector}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 w-full sm:w-auto"
            >
              Check Your Requirements
              <ArrowDown className="h-4 w-4" />
            </Button>
            <Link to="/pdf-viewer" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white/20 text-primary-foreground border-2 border-primary-foreground/30 hover:bg-white/30 gap-2 w-full backdrop-blur-sm"
              >
                <FileText className="h-4 w-4" />
                View Full Act (44 pages)
              </Button>
            </Link>
            <Link to="/timeline" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="ghost"
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 gap-2 w-full"
              >
                <Calendar className="h-4 w-4" />
                Legislative History
              </Button>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-4 mb-8">
            <p className="text-xs text-primary-foreground/70 mb-3">Quick Actions</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => scrollToSection(action.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${action.color}`}
                >
                  <action.icon className="h-3 w-3" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pt-6 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary-foreground">44</div>
              <div className="text-xs text-primary-foreground/70">Pages</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary-foreground">47</div>
              <div className="text-xs text-primary-foreground/70">Sections</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary-foreground">17</div>
              <div className="text-xs text-primary-foreground/70">Business Types</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-primary-foreground">6 Mo</div>
              <div className="text-xs text-primary-foreground/70">Transition Period</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
