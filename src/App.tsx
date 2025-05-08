
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SearchProvider } from "@/components/search/SearchProvider";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Fundamentals from "./pages/Fundamentals";
import EasyProblems from "./pages/EasyProblems";
import MediumProblems from "./pages/MediumProblems";
import HardProblems from "./pages/HardProblems";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import CourseDashboard from "./pages/CourseDashboard";
import TopicDashboard from "./pages/TopicDashboard";
import ProblemPage from "./pages/ProblemPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <SearchProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/fundamentals" element={<Fundamentals />} />
                  <Route path="/easy" element={<EasyProblems />} />
                  <Route path="/medium" element={<MediumProblems />} />
                  <Route path="/hard" element={<HardProblems />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/courses/:courseId" element={<CourseDashboard />} />
                  <Route path="/courses/:courseId/topics/:topicId" element={<TopicDashboard />} />
                  <Route path="/courses/:courseId/topics/:topicId/problems/:problemId" element={<ProblemPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SearchProvider>
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </NextThemesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
