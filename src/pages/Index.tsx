import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CompanySelector } from '@/components/CompanySelector';
import { KeyConcepts } from '@/components/KeyConcepts';
import { BillText } from '@/components/BillText';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <CompanySelector />
        <KeyConcepts />
        <BillText />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
