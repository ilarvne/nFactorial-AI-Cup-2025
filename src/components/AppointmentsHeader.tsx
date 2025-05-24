
import { Button } from "@/components/ui/button";
import { Filter, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AppointmentsHeader = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="relative">
      {/* Colorful Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-5 right-5 w-20 h-20 bg-gradient-to-br from-violet-300/40 to-purple-400/40 rounded-full blur-2xl"></div>
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-blue-300/40 to-cyan-400/40 rounded-full blur-xl"></div>
      </div>
      
      <div className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-lg border-0 px-4 py-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-xl h-10 w-10 bg-white/80 hover:bg-white border-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-slate-800">
                Appointments
              </h1>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl h-10 w-10 bg-white/80 hover:bg-white border-0"
          >
            <Filter className="h-5 w-5" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 p-2.5 text-center rounded-lg border-0">
            <div className="text-lg font-bold text-emerald-700">3</div>
            <div className="text-xs text-emerald-800">Upcoming</div>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2.5 text-center rounded-lg border-0">
            <div className="text-lg font-bold text-blue-700">15</div>
            <div className="text-xs text-blue-800">This Month</div>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-violet-200 p-2.5 text-center rounded-lg border-0">
            <div className="text-lg font-bold text-violet-700">12</div>
            <div className="text-xs text-violet-800">Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsHeader;
