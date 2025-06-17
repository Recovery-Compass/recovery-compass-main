
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import InvestorNavigation from "./components/InvestorNavigation";
import Index from "./pages/Index";
import CompassCompanion from "./pages/CompassCompanion";
import ImpactTranslator from "./pages/ImpactTranslator";
import PartnershipProposals from "./pages/PartnershipProposals";
import PathwaySelect from "./pages/PathwaySelect";
import MakeIntegration from "./pages/MakeIntegration";
import NotFound from "./pages/NotFound";
import WFDAttachmentSuite from "./components/WFDAttachmentSuite";
// Investor Pages
import InvestorPitch from "./pages/InvestorPitch";
import MarketAnalysis from "./pages/MarketAnalysis";
import SolutionDemo from "./pages/SolutionDemo";
import BusinessModel from "./pages/BusinessModel";
import ImpactMetrics from "./pages/ImpactMetrics";
import Roadmap from "./pages/Roadmap";
import { trackPageView } from "./lib/analytics";

// Analytics wrapper component to track page views
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on every route change
    trackPageView(document.title);
  }, [location]);

  return null;
};

const queryClient = new QueryClient();

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
            <Route path="/make-integration" element={
              <>
                <Navigation />
                <MakeIntegration />
              </>
            } />
            <Route path="/wfd-attachments" element={<WFDAttachmentSuite />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
