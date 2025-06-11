
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PathwaySelect from "./pages/PathwaySelect";
import CompassCompanion from "./pages/CompassCompanion";
import ImpactTranslator from "./pages/ImpactTranslator";
import StrategicDashboardView from "./components/StrategicDashboardView";
import WFDAttachmentSuite from "./components/WFDAttachmentSuite";
import MakeIntegrationPage from "./pages/MakeIntegration";
import PartnershipProposals from "./pages/PartnershipProposals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pathways" element={<PathwaySelect />} />
          <Route path="/compass-companion" element={<CompassCompanion />} />
          <Route path="/impact-translator" element={<ImpactTranslator />} />
          <Route path="/strategic-dashboard" element={<StrategicDashboardView />} />
          <Route path="/wfd-attachments" element={<WFDAttachmentSuite />} />
          <Route path="/make-integration" element={<MakeIntegrationPage />} />
          <Route path="/partnership-proposals" element={<PartnershipProposals />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
