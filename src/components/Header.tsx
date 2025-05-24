
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-xl border-b border-slate-100/50 px-6 py-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 bg-clip-text text-transparent">
            DoqLink
          </h1>
          <p className="text-slate-600 font-medium mt-1">Find your doctor</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 transition-all duration-200"
          >
            <Search className="h-5 w-5 text-slate-700" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl h-10 w-10 bg-slate-50/80 hover:bg-slate-100 border-0 relative transition-all duration-200"
          >
            <Bell className="h-5 w-5 text-slate-700" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </Button>
          <Avatar className="h-10 w-10 border-2 border-slate-100">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">A</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
