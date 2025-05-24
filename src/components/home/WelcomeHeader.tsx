
import { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WelcomeHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const WelcomeHeader = ({ searchQuery, onSearchChange }: WelcomeHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 backdrop-blur-2xl sticky top-0 z-40 border-b border-slate-200/50 shadow-sm">
      <div className="px-6 py-8">
        {/* User Greeting */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">
              Good morning, Alex
            </h1>
            <p className="text-slate-600 mt-2 font-medium">How are you feeling today?</p>
          </div>
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-2xl h-14 w-14 bg-gradient-to-br from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 border border-slate-200/50 shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => navigate("/alerts")}
            >
              <Bell className="h-6 w-6 text-slate-700" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse"></div>
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search health records, appointments..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-14 pr-6 py-5 rounded-3xl bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-300 focus:bg-white transition-all duration-300 text-slate-700 placeholder:text-slate-400 font-medium shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
