import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import ConceptDetail from "./pages/ConceptDetail";
import BillSection from "./pages/BillSection";
import RegulatorDetail from "./pages/RegulatorDetail";
import LegalPage from "./pages/LegalPage";
import PDFViewer from "./pages/PDFViewer";
import Timeline from "./pages/Timeline";
import CompanyTypePage from "./pages/CompanyTypePage";
import ComplianceStepPage from "./pages/ComplianceStepPage";
import AssessmentResultsPage from "./pages/AssessmentResultsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/concept/:conceptId" element={<ConceptDetail />} />
            <Route path="/bill/:sectionId" element={<BillSection />} />
            <Route path="/regulator/:regulatorId" element={<RegulatorDetail />} />
            <Route path="/legal/:pageId" element={<LegalPage />} />
            <Route path="/pdf-viewer" element={<PDFViewer />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/company/:companyId" element={<CompanyTypePage />} />
            <Route path="/compliance/:stepId" element={<ComplianceStepPage />} />
            <Route path="/assessment-results" element={<AssessmentResultsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;