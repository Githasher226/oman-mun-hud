import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import ProceduresPage from "@/pages/ProceduresPage";
import TopicsPage from "@/pages/TopicsPage";
import CountriesPage from "@/pages/CountriesPage";
import StrategyPage from "@/pages/StrategyPage";
import ResearchPage from "@/pages/ResearchPage";
import ResolutionPage from "@/pages/ResolutionPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<ProceduresPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/strategy" element={<StrategyPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/resolution" element={<ResolutionPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
