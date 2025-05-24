
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VoiceAssistant from "./pages/VoiceAssistant";
import DocumentScanner from "./pages/DocumentScanner";
import Appointments from "./pages/Appointments";
import HealthDashboard from "./pages/HealthDashboard";
import Alerts from "./pages/Alerts";
import Reminders from "./pages/Reminders";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import FindDoctor from "./pages/FindDoctor";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DoctorProfile from "./pages/DoctorProfile";
import AppointmentDetail from "./pages/AppointmentDetail";
import AssistantItemDetail from "./pages/AssistantItemDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assistant" element={<Index />} />
          <Route path="/voice" element={<VoiceAssistant />} />
          <Route path="/scanner" element={<DocumentScanner />} />
          <Route path="/find-doctor" element={<FindDoctor />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/health" element={<HealthDashboard />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/doctors/:doctorId" element={<DoctorProfile />} />
          <Route path="/appointments/:appointmentId" element={<AppointmentDetail />} />
          <Route path="/assistant/:itemId" element={<AssistantItemDetail />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
