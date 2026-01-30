# Kenya VASP Bill 2025 - Compliance Guide

A comprehensive web application for understanding and navigating the Virtual Asset Service Providers Bill, 2025 in Kenya.

## 🎯 Overview

This application helps businesses understand their compliance obligations under Kenya's new virtual asset regulatory framework. It provides searchable bill text, company-specific guidance, key concept definitions, and frequently asked questions.

## ✨ Features

### Core Features
- **Company Type Selector** - Interactive selection to identify your VASP category and specific requirements
- **Detailed Questionnaire** - Multi-step assessment of your compliance needs
- **Key Concepts Library** - 16+ searchable definitions, obligations, penalties, and processes
- **Full Bill Text** - Complete 47 sections with full-text search and keyword filtering
- **FAQ Section** - 15+ common questions with category-based filtering
- **PDF Download** - Direct access to the official bill document
- **Sources & References** - All official sources documented

### Technical Features
- **SEO Optimized** - Meta tags, structured data, semantic HTML
- **Mobile Responsive** - Hamburger menu, responsive grids, touch-friendly
- **Fast Search** - Instant filtering across all content
- **Accessible** - WCAG compliant design patterns

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn UI components (accordion, badge, button, etc.)
│   ├── Header.tsx             # Navigation with mobile hamburger menu
│   ├── Hero.tsx               # Landing hero with key statistics
│   ├── CompanySelector.tsx    # 7 VASP type cards with details
│   ├── CompanyQuestionnaire.tsx # Multi-step compliance assessment
│   ├── KeyConcepts.tsx        # Filterable concepts grid (16 items)
│   ├── BillText.tsx           # Collapsible bill sections (10 parts)
│   ├── FAQ.tsx                # Accordion FAQ (15 questions)
│   ├── Sources.tsx            # Official references and disclaimer
│   └── Footer.tsx             # Navigation and external links
├── data/
│   └── vaspBillData.ts        # All structured content:
│       ├── companyTypes[]     # 7 VASP categories
│       ├── keyConcepts[]      # 16 definitions/obligations
│       ├── billSections[]     # 10 bill parts with full text
│       └── faqs[]             # 15 frequently asked questions
├── pages/
│   ├── Index.tsx              # Main application page
│   └── NotFound.tsx           # 404 error page
├── hooks/
│   ├── use-mobile.tsx         # Mobile detection hook
│   └── use-toast.ts           # Toast notifications
├── lib/
│   └── utils.ts               # Utility functions (cn, etc.)
└── index.css                  # Design system with CSS variables
```

## 📚 Data Sources & Fact Checking

### Primary Source
| Document | Source | URL | Status |
|----------|--------|-----|--------|
| Virtual Asset Service Providers Bill, 2025 | Kenya National Treasury | [treasury.go.ke](https://newsite.treasury.go.ke/sites/default/files/Notices/VIRTUAL-ASSET-SERVICE-PROVIDERS-BILL-2024.pdf) | Draft Bill |

### Regulatory Authorities Referenced
| Authority | Role | Website |
|-----------|------|---------|
| Capital Markets Authority (CMA) | Regulates brokers, advisors, managers, trading platforms | https://www.cma.or.ke |
| Central Bank of Kenya (CBK) | Regulates payment processors, wallet providers | https://www.centralbank.go.ke |
| National Treasury | Bill sponsor | https://www.treasury.go.ke |
| Financial Reporting Centre | AML/CFT oversight | - |

### Related Legislation Referenced in Bill
- Companies Act (Cap. 486) - Company registration requirements
- Capital Markets Act (Cap. 485A) - CMA establishment
- Proceeds of Crime and Anti-Money Laundering Act (Cap. 59A) - AML/CFT framework
- Prevention of Terrorism Act - CFT requirements
- Computer Misuse and Cybercrimes Act (Cap. 79C) - Cyber security standards
- National Payment Systems Regulations, 2014 (L.N. No. 109 of 2014) - E-money definition

### Key Facts Verified
| Fact | Bill Reference | Verified |
|------|----------------|----------|
| Natural persons cannot be VASPs | Section 9(2) | ✅ |
| License expires Dec 31st annually | Section 14 | ✅ |
| 7-year record retention required | Section 44(2) | ✅ |
| 6-month transitional period | Section 47(1) | ✅ |
| Max penalty KES 30 million | Section 41(4) | ✅ |
| Max imprisonment 10 years | Section 41(1)(a) | ✅ |

## 🚀 Future Features

### Phase 1 - Content
- [ ] Complete clause-by-clause annotations
- [ ] Interactive penalty calculator
- [ ] Timeline for compliance deadlines
- [ ] CMA vs CBK comparison matrix
- [ ] Swahili translation

### Phase 2 - Interactivity
- [ ] Compliance progress tracker
- [ ] Document checklist generator
- [ ] Email alerts for bill updates
- [ ] Print-friendly reports

### Phase 3 - Integration
- [ ] User accounts
- [ ] Saved assessments
- [ ] Regulatory portal links
- [ ] Legal professional directory

## 🛠 Technology Stack

- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Components**: Shadcn/ui (Radix primitives)
- **Build**: Vite
- **Routing**: React Router v6
- **Icons**: Lucide React

## 📱 Mobile Support

- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile hamburger menu with smooth transitions
- Touch-friendly tap targets (min 44px)
- Optimized images and fonts

## ⚠️ Disclaimer

This application is for **informational purposes only** and does not constitute legal advice. Content is based on the draft Virtual Asset Service Providers Bill, 2025 which may change during legislative process.

**For official guidance, consult:**
- Capital Markets Authority: compliance@cma.or.ke
- Central Bank of Kenya: info@centralbank.go.ke
- Qualified legal professionals

## 📄 License

Educational content about public legislation. Bill text is public domain.

---

**Last Updated**: January 2025  
**Bill Version**: Draft VASP Bill 2025  
**Content Accuracy**: Verified against official Treasury publication
