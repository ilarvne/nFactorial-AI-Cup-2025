
import { useState } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import WelcomeHeader from "@/components/home/WelcomeHeader";
import QuickActionsGrid from "@/components/home/QuickActionsGrid";
import RecentActivityList from "@/components/home/RecentActivityList";
import AIInsightsCard from "@/components/home/AIInsightsCard";
import VoiceAssistantFAB from "@/components/home/VoiceAssistantFAB";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50/40 pb-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <WelcomeHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="px-6 py-8 space-y-10">
          <QuickActionsGrid />
          <RecentActivityList />
          <AIInsightsCard />
        </div>
      </div>

      <VoiceAssistantFAB />
      <BottomNavigation />
    </div>
  );
};

export default Index;
