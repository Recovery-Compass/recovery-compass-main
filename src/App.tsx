
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import InvestorNavigation from "./components/InvestorNavigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CompassCompanion from "./pages/CompassCompanion";
import ImpactTranslator from "./pages/ImpactTranslator";
import PartnershipProposals from "./pages/PartnershipProposals";
import PathwaySelect from "./pages/PathwaySelect";
import EnvironmentalDesign from "./pages/EnvironmentalDesign";
import EnvironmentalDesignAdaptive from "./pages/EnvironmentalDesignAdaptive";
import AssessmentTransition from "./components/AssessmentTransition";
import MakeIntegration from "./pages/MakeIntegration";
import WhittierDashboard from "./pages/WhittierDashboard";
import NotFound from "./pages/NotFound";
import WFDAttachmentSuite from "./components/WFDAttachmentSuite";
import ComplianceCompass from "./pages/ComplianceCompass";
import FirstExhibit from "./pages/FirstExhibit";
import Methodology from "./pages/Methodology";
import Adventure from "./pages/Adventure";
// Investor Pages
import InvestorPitch from "./pages/InvestorPitch";
import MarketAnalysis from "./pages/MarketAnalysis";
import SolutionDemo from "./pages/SolutionDemo";
import BusinessModel from "./pages/BusinessModel";
import ImpactMetrics from "./pages/ImpactMetrics";
import Roadmap from "./pages/Roadmap";
import { TestBreathSync } from "./pages/TestBreathSync";
import { EnvironmentalQuizStandalone } from "./pages/EnvironmentalQuizStandalone";
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
        '/compliance-compass': 'Compliance Compass - Recovery Compass',
        '/adventure': 'Adventure Prompt Engine - Recovery Compass',
        '/wfd-attachments': 'Dashboard Case Studies - Recovery Compass',
        '/first-exhibit': 'The First Exhibit - Recovery Compass',
        '/methodology': 'Environmental Response Architecture™ - Recovery Compass',
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
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <AnalyticsWrapper />
            <Routes>
              {/* Authentication Route */}
              <Route path="/auth" element={<Auth />} />
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
                <div className="pt-20">
                  <CompassCompanion />
                </div>
              </>
            } />
            <Route path="/impact-translator" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <ImpactTranslator />
                </div>
              </>
            } />
            <Route path="/partnership-proposals" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <PartnershipProposals />
                </div>
              </>
            } />
            <Route path="/pathway-select" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <PathwaySelect />
                </div>
              </>
            } />
            <Route path="/environmental-design" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <EnvironmentalDesignAdaptive />
                </div>
              </>
            } />
            <Route path="/environmental-design-static" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <EnvironmentalDesign />
                </div>
              </>
            } />
            <Route path="/assessment-transition" element={<AssessmentTransition />} />
            <Route path="/environmental-quiz" element={<EnvironmentalQuizStandalone />} />
            <Route path="/make-integration" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <MakeIntegration />
                </div>
              </>
            } />
            <Route path="/whittier-dashboard" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <WhittierDashboard />
                </div>
              </>
            } />
            <Route path="/compliance-compass" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <ComplianceCompass />
                </div>
              </>
            } />
            <Route path="/first-exhibit" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <FirstExhibit />
                </div>
              </>
            } />
            <Route path="/methodology" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <Methodology />
                </div>
              </>
            } />
            <Route path="/adventure" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <Adventure />
                </div>
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
    </AuthProvider>
  </QueryClientProvider>
  );
}

export default App;
