import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CompanySelector } from '@/components/CompanySelector';
import { CompanyQuestionnaire } from '@/components/CompanyQuestionnaire';
import { ComplianceTracker } from '@/components/ComplianceTracker';
import { RegulatorComparison } from '@/components/RegulatorComparison';
import { KeyConcepts } from '@/components/KeyConcepts';
import { BillIndex } from '@/components/BillIndex';
import { BillText } from '@/components/BillText';
import { TestQuestions } from '@/components/TestQuestions';
import { FAQ } from '@/components/FAQ';
import { Sources } from '@/components/Sources';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CompanySelector />
        <CompanyQuestionnaire />
        <ComplianceTracker />
        <RegulatorComparison />
        <KeyConcepts />
        <BillIndex />
        <BillText />
        <TestQuestions />
        <FAQ />
        <Sources />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
