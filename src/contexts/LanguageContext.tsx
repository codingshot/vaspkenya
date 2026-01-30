import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.types': 'Types',
    'nav.assessment': 'Assessment',
    'nav.tracker': 'Tracker',
    'nav.regulators': 'CMA vs CBK',
    'nav.concepts': 'Concepts',
    'nav.bill': 'Bill',
    'nav.quiz': 'Quiz',
    'nav.faq': 'FAQ',
    'nav.pdfViewer': 'PDF Viewer',
    'nav.timeline': 'Timeline',
    
    // Hero Section
    'hero.badge': 'Virtual Asset Service Providers Bill 2025',
    'hero.title': "Navigate Kenya's VASP Regulations",
    'hero.subtitle': 'Comprehensive compliance guide for virtual asset service providers operating in Kenya. Understand licensing requirements, obligations, and penalties.',
    'hero.cta.assessment': 'Start Compliance Assessment',
    'hero.cta.bill': 'Read Full Bill',
    'hero.stats.companies': 'Company Types',
    'hero.stats.concepts': 'Key Concepts',
    
    // Company Selector
    'companies.badge': 'Business Types',
    'companies.title': 'What Type of VASP Are You?',
    'companies.subtitle': 'Select your business type to see specific regulatory requirements and obligations under the VASP Bill.',
    'companies.authority': 'Regulatory Authority',
    'companies.obligations': 'Key Obligations',
    'companies.sections': 'Relevant Sections',
    
    // Compliance Tracker
    'tracker.badge': 'Interactive Tool',
    'tracker.title': 'Compliance Progress Tracker',
    'tracker.subtitle': 'Track your VASP licensing requirements. Progress auto-saves to your browser.',
    'tracker.why': 'Why use this tracker?',
    'tracker.requirements': 'requirements across',
    'tracker.categories': 'categories mapped directly from the VASP Bill',
    'tracker.click': 'Click items to cycle through: Not Started → In Progress → Completed',
    'tracker.saves': 'Progress saves automatically in your browser - come back anytime',
    'tracker.links': 'Each item links to the relevant section of the Bill for reference',
    'tracker.export': 'Export your progress as JSON for record-keeping or sharing',
    
    // Regulator Comparison
    'regulators.badge': 'Regulatory Framework',
    'regulators.title': 'CMA vs CBK: Who Regulates What?',
    'regulators.subtitle': 'Understanding which regulatory authority oversees your virtual asset activities.',
    
    // Key Concepts
    'concepts.badge': 'Definitions & Terms',
    'concepts.title': 'Key Concepts Explained',
    'concepts.subtitle': 'Essential definitions and terms from the VASP Bill that every operator should understand.',
    
    // Bill Text
    'bill.badge': 'Full Bill Summary',
    'bill.title': 'Bill Text & Provisions',
    'bill.subtitle': 'Search and explore all sections of the Virtual Asset Service Providers Bill, 2025.',
    'bill.search': 'Search in PDF...',
    'bill.expandAll': 'Expand All',
    'bill.collapseAll': 'Collapse All',
    
    // FAQ
    'faq.badge': 'Common Questions',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Answers to common questions about the VASP Bill and compliance requirements.',
    
    // Footer
    'footer.disclaimer': 'This guide does not constitute legal advice.',
    'footer.copyright': '© 2025 VASPKenya.com. Based on draft bill - may change during legislative process.',
    
    // Common
    'common.learnMore': 'Learn More',
    'common.viewDetails': 'View Details',
    'common.download': 'Download',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
  },
  sw: {
    // Navigation
    'nav.types': 'Aina',
    'nav.assessment': 'Tathmini',
    'nav.tracker': 'Kifuatiliaji',
    'nav.regulators': 'CMA vs CBK',
    'nav.concepts': 'Dhana',
    'nav.bill': 'Mswada',
    'nav.quiz': 'Maswali',
    'nav.faq': 'Maswali Yanayoulizwa',
    'nav.pdfViewer': 'Kitazamaji PDF',
    'nav.timeline': 'Ratiba',
    
    // Hero Section
    'hero.badge': 'Mswada wa Watoa Huduma za Mali Pepe 2025',
    'hero.title': 'Elewa Kanuni za VASP Kenya',
    'hero.subtitle': 'Mwongozo kamili wa kufuata sheria kwa watoa huduma za mali pepe wanaofanya kazi Kenya. Elewa mahitaji ya leseni, wajibu, na adhabu.',
    'hero.cta.assessment': 'Anza Tathmini ya Kufuata Sheria',
    'hero.cta.bill': 'Soma Mswada Mzima',
    'hero.stats.companies': 'Aina za Kampuni',
    'hero.stats.concepts': 'Dhana Muhimu',
    
    // Company Selector
    'companies.badge': 'Aina za Biashara',
    'companies.title': 'Ni Aina Gani ya VASP Wewe?',
    'companies.subtitle': 'Chagua aina ya biashara yako kuona mahitaji maalum ya udhibiti na wajibu chini ya Mswada wa VASP.',
    'companies.authority': 'Mamlaka ya Udhibiti',
    'companies.obligations': 'Wajibu Muhimu',
    'companies.sections': 'Sehemu Husika',
    
    // Compliance Tracker
    'tracker.badge': 'Zana ya Mwingiliano',
    'tracker.title': 'Kifuatiliaji cha Maendeleo ya Kufuata Sheria',
    'tracker.subtitle': 'Fuatilia mahitaji yako ya leseni ya VASP. Maendeleo huhifadhiwa kiotomatiki kwenye kivinjari chako.',
    'tracker.why': 'Kwa nini utumie kifuatiliaji hiki?',
    'tracker.requirements': 'mahitaji katika',
    'tracker.categories': 'kategoria zilizochorwa moja kwa moja kutoka Mswada wa VASP',
    'tracker.click': 'Bofya vitu kubadilisha: Haijaanza → Inaendelea → Imekamilika',
    'tracker.saves': 'Maendeleo huhifadhiwa kiotomatiki kwenye kivinjari chako - rudi wakati wowote',
    'tracker.links': 'Kila kipengele kinaungana na sehemu husika ya Mswada kwa rejea',
    'tracker.export': 'Hamisha maendeleo yako kama JSON kwa kumbukumbu au kushiriki',
    
    // Regulator Comparison
    'regulators.badge': 'Mfumo wa Udhibiti',
    'regulators.title': 'CMA vs CBK: Nani Anadhibiti Nini?',
    'regulators.subtitle': 'Kuelewa mamlaka gani ya udhibiti inasimamia shughuli zako za mali pepe.',
    
    // Key Concepts
    'concepts.badge': 'Ufafanuzi na Istilahi',
    'concepts.title': 'Dhana Muhimu Zimefafanuliwa',
    'concepts.subtitle': 'Ufafanuzi muhimu na istilahi kutoka Mswada wa VASP ambayo kila opereta anapaswa kuelewa.',
    
    // Bill Text
    'bill.badge': 'Muhtasari wa Mswada Mzima',
    'bill.title': 'Maandishi na Masharti ya Mswada',
    'bill.subtitle': 'Tafuta na chunguza sehemu zote za Mswada wa Watoa Huduma za Mali Pepe, 2025.',
    'bill.search': 'Tafuta katika PDF...',
    'bill.expandAll': 'Panua Zote',
    'bill.collapseAll': 'Kunja Zote',
    
    // FAQ
    'faq.badge': 'Maswali ya Kawaida',
    'faq.title': 'Maswali Yanayoulizwa Mara kwa Mara',
    'faq.subtitle': 'Majibu ya maswali ya kawaida kuhusu Mswada wa VASP na mahitaji ya kufuata sheria.',
    
    // Footer
    'footer.disclaimer': 'Mwongozo huu hauundikishaji ushauri wa kisheria.',
    'footer.copyright': '© 2025 VASPKenya.com. Kulingana na rasimu ya mswada - inaweza kubadilika wakati wa mchakato wa kisheria.',
    
    // Common
    'common.learnMore': 'Jifunze Zaidi',
    'common.viewDetails': 'Tazama Maelezo',
    'common.download': 'Pakua',
    'common.search': 'Tafuta',
    'common.close': 'Funga',
    'common.save': 'Hifadhi',
    'common.cancel': 'Ghairi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.back': 'Rudi',
    'common.next': 'Ifuatayo',
    'common.previous': 'Iliyotangulia',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>('en');

  React.useEffect(() => {
    const stored = localStorage.getItem('vasp-language') as Language;
    if (stored && (stored === 'en' || stored === 'sw')) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vasp-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}