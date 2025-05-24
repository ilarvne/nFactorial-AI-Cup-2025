
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings, Search, Filter, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UnifiedHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSettings?: boolean;
  showSearch?: boolean;
  showFilter?: boolean;
  showNotifications?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: React.ReactNode;
}

const UnifiedHeader = ({
  title,
  subtitle,
  showBack = false,
  showSettings = false,
  showSearch = false,
  showFilter = false,
  showNotifications = false,
  searchValue = "",
  onSearchChange,
  children
}: UnifiedHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/95 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-100/50">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {showBack && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
              >
                <ArrowLeft className="h-5 w-5 text-slate-700" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
                {title}
              </h1>
              {subtitle && (
                <p className="text-slate-600 font-medium mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showFilter && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
              >
                <Filter className="h-5 w-5 text-slate-700" />
              </Button>
            )}
            {showNotifications && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 relative transition-all duration-200"
              >
                <Bell className="h-5 w-5 text-slate-700" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
            )}
            {showSettings && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
              >
                <Settings className="h-5 w-5 text-slate-700" />
              </Button>
            )}
          </div>
        </div>

        {showSearch && (
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50/80 border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all duration-300 text-slate-700 font-medium placeholder:text-slate-400"
            />
          </div>
        )}

        {children}
      </div>
    </header>
  );
};

export default UnifiedHeader;
