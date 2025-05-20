
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DemoAuthProvider, useDemoAuth } from "./contexts/DemoAuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import EventDashboard from "./pages/EventDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// Import additional potential routes if they exist in your app
// import EventDetails from "./pages/EventDetails";
// import GuestProfile from "./pages/GuestProfile";
// import ChatPage from "./pages/ChatPage";
// import GalleryPage from "./pages/GalleryPage";

const DashboardRouter = () => {
  const { user } = useDemoAuth();
  return user?.role === 'host' ? <EventDashboard /> : <GuestDashboard />;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DemoAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner closeButton position="top-center" theme="light" />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Event routes */}
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
            
            {/* These routes can be implemented later */}
            {/*
            <Route path="/events/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
            <Route path="/events/chat" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />
            <Route path="/events/:eventId" element={<ProtectedRoute><EventDetails /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><GuestProfile /></ProtectedRoute>} />
            */}
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DemoAuthProvider>
  </QueryClientProvider>
);

export default App;
