
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DemoAuthProvider } from "./contexts/DemoAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import EventDashboard from "./pages/EventDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { useDemoAuth } from "./contexts/DemoAuthContext";

const DashboardRouter = () => {
  const { user } = useDemoAuth();
  return user?.role === 'host' ? <EventDashboard /> : <GuestDashboard />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/events" element={<Navigate to="/events/dashboard" replace />} />
            <Route 
              path="/events/create" 
              element={
                <ProtectedRoute>
                  <CreateEvent />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/events/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DemoAuthProvider>
  </QueryClientProvider>
);

export default App;
