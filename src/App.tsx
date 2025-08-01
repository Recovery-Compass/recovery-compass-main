
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import InvestorNavigation from "./components/InvestorNavigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CompassCompanion from "./pages/CompassCompanion";
import ImpactTranslator from "./pages/ImpactTranslator";
import PartnershipProposals from "./pages/PartnershipProposals";
import PathwaySelect from "./pages/PathwaySelect";
import EnvironmentalDesign from "./pages/EnvironmentalDesign";
import MakeIntegration from "./pages/MakeIntegration";
import WhittierDashboard from "./pages/WhittierDashboard";
import NotFound from "./pages/NotFound";
import WFDAttachmentSuite from "./components/WFDAttachmentSuite";
import ComplianceCompass from "./pages/ComplianceCompass";
// Investor Pages
import InvestorPitch from "./pages/InvestorPitch";
import MarketAnalysis from "./pages/MarketAnalysis";
import SolutionDemo from "./pages/SolutionDemo";
import BusinessModel from "./pages/BusinessModel";
import ImpactMetrics from "./pages/ImpactMetrics";
import Roadmap from "./pages/Roadmap";
import { TestBreathSync } from "./pages/TestBreathSync";
import { trackPageView, trackBusinessEvent } from "./lib/analytics";

// Enhanced analytics wrapper with business event tracking
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // Get page title for tracking
    const getPageTitle = (pathname: string): string => {
      const titleMap: Record<string, string> = {
        '/': 'Recovery Compass - AI-Powered Addiction Recovery Platform',
        '/compass-companion': 'Compass Companion - Recovery Compass',
        '/impact-translator': 'Impact Translator - Recovery Compass',
        '/partnership-proposals': 'Partnership Proposals - Recovery Compass',
        '/pathway-select': 'Pathway Select - Recovery Compass',
        '/environmental-design': 'Environmental Design - Recovery Compass',
        '/make-integration': 'Make Integration - Recovery Compass',
        '/investor-pitch': 'Investor Pitch - Recovery Compass',
        '/market-analysis': 'Market Analysis - Recovery Compass',
        '/solution-demo': 'Solution Demo - Recovery Compass',
        '/business-model': 'Business Model - Recovery Compass',
        '/impact-metrics': 'Impact Metrics - Recovery Compass',
        '/roadmap': 'Roadmap - Recovery Compass',
        '/wfd-attachments': 'Dashboard Case Studies - Recovery Compass',
      };
      return titleMap[pathname] || 'Recovery Compass';
    };

    const title = getPageTitle(location.pathname);
    trackPageView(title);

    // Track business-critical page views
    if (location.pathname.startsWith('/investor-')) {
      trackBusinessEvent('investor_page_view', {
        page: location.pathname,
        timestamp: new Date().toISOString(),
      });
    }

    if (location.pathname === '/pathway-select') {
      trackBusinessEvent('journey_started', {
        entry_point: 'pathway_select',
        timestamp: new Date().toISOString(),
      });
    }

    if (location.pathname === '/partnership-proposals') {
      trackBusinessEvent('partnership_inquiry', {
        page_view: true,
        timestamp: new Date().toISOString(),
      });
    }

  }, [location]);

  return null;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AnalyticsWrapper />
          <Routes>
            {/* Investor Relations Routes */}
            <Route path="/investor-pitch" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <InvestorPitch />
              </div>
            } />
            <Route path="/market-analysis" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <MarketAnalysis />
              </div>
            } />
            <Route path="/solution-demo" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <SolutionDemo />
              </div>
            } />
            <Route path="/business-model" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <BusinessModel />
              </div>
            } />
            <Route path="/impact-metrics" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <ImpactMetrics />
              </div>
            } />
            <Route path="/roadmap" element={
              <div className="min-h-screen bg-navy">
                <InvestorNavigation />
                <Roadmap />
              </div>
            } />

            {/* Main Recovery Compass Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/compass-companion" element={
              <>
                <Navigation />
                <CompassCompanion />
              </>
            } />
            <Route path="/impact-translator" element={
              <>
                <Navigation />
                <ImpactTranslator />
              </>
            } />
            <Route path="/partnership-proposals" element={
              <>
                <Navigation />
                <PartnershipProposals />
              </>
            } />
            <Route path="/pathway-select" element={
              <>
                <Navigation />
                <PathwaySelect />
              </>
            } />
            <Route path="/environmental-design" element={
              <>
                <Navigation />
                <EnvironmentalDesign />
              </>
            } />
            <Route path="/make-integration" element={
              <>
                <Navigation />
                <MakeIntegration />
              </>
            } />
            <Route path="/whittier-dashboard" element={
              <>
                <Navigation />
                <WhittierDashboard />
              </>
            } />
            <Route path="/compliance-compass" element={
              <>
                <Navigation />
                <ComplianceCompass />
              </>
            } />
            <Route path="/wfd-attachments" element={<WFDAttachmentSuite />} />
            <Route path="/test-breathsync" element={<TestBreathSync />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
