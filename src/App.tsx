
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Navigation } from "./components/Navigation";
import InvestorNavigation from "./components/InvestorNavigation";
import Footer from "./components/Footer";
import { AuthProvider } from "./hooks/useAuth";
import VideoHero from "./components/VideoHero";
import PathwaySelect from "./pages/PathwaySelect";
import EnvironmentalDesignAdaptive from "./pages/EnvironmentalDesignAdaptive";
import NotFound from "./pages/NotFound";
import Adventure from "./pages/Adventure";
import Begin from "./pages/Begin";
import Personal from "./pages/Personal";
import PersonalDiscovery from "./pages/PersonalDiscovery";
import Organizations from "./pages/Organizations";
import { EnvironmentalQuizStandalone } from "./pages/EnvironmentalQuizStandalone";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AssessmentTransition from "./components/AssessmentTransition";
import { trackPageView, trackBusinessEvent } from "./lib/analytics";

// Enhanced analytics wrapper with business event tracking
const AnalyticsWrapper = () => {
  const location = useLocation();

  useEffect(() => {
    // Get page title for tracking
    const getPageTitle = (pathname: string): string => {
      const titleMap: Record<string, string> = {
        '/': 'Recovery Compass - AI-Powered Addiction Recovery Platform',
        '/begin': 'Choose Your Journey - Recovery Compass',
        '/compass-companion': 'Compass Companion - Recovery Compass',
        '/impact-translator': 'Impact Translator - Recovery Compass',
        '/partnership-proposals': 'Partnership Proposals - Recovery Compass',
        '/personal': 'Personal Journey - Recovery Compass',
        '/personal/discovery': 'Discovery Assessment - Recovery Compass',
        '/organizations': 'Organization Journey - Recovery Compass',
        '/organizations/transform': 'Transform - Recovery Compass',
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
            {/* Minimal app routes */}
            <Route path="/" element={<VideoHero />} />
            <Route path="/begin" element={<Begin />} />
            
            {/* Personal Journey Routes */}
            <Route path="/personal" element={<Personal />} />
            <Route path="/personal/discovery" element={<PersonalDiscovery />} />
            
            {/* Organization Journey Routes */}
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/organizations/transform" element={<Adventure />} />
            
            {/* Legacy URL Redirects */}
            <Route path="/pathway-select" element={<Navigate to="/personal" replace />} />
            <Route path="/adventure" element={<Navigate to="/organizations/transform" replace />} />
            
            {/* Existing routes with navigation */}
            <Route path="/environmental-quiz" element={<EnvironmentalQuizStandalone />} />
            <Route path="/environmental-design" element={
              <>
                <Navigation />
                <div className="pt-20">
                  <EnvironmentalDesignAdaptive />
                </div>
              </>
            } />
            
            {/* Legal Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Assessment Transition */}
            <Route path="/assessment-transition" element={<AssessmentTransition />} />
            
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
