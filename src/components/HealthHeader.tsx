
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HealthHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-100/50">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5 text-slate-700" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                Health Dashboard
              </h1>
              <p className="text-slate-600 font-medium mt-1">Monitor your wellness</p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
          >
            <Settings className="h-5 w-5 text-slate-700" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HealthHeader;
