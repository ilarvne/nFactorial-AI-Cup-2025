
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Search, Camera, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActionsGrid = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "AI Assistant",
      subtitle: "Ask health questions",
      icon: Brain,
      route: "/voice",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-100",
      shadowColor: "shadow-indigo-200/50"
    },
    {
      id: 2,
      title: "Find Doctor",
      subtitle: "Search specialists",
      icon: Search,
      route: "/find-doctor",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-100",
      shadowColor: "shadow-emerald-200/50"
    },
    {
      id: 3,
      title: "Scan Document",
      subtitle: "Upload prescription",
      icon: Camera,
      route: "/scanner",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100",
      shadowColor: "shadow-orange-200/50"
    },
    {
      id: 4,
      title: "Health Records",
      subtitle: "View documents",
      icon: FileText,
      route: "/health",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-100",
      shadowColor: "shadow-blue-200/50"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
        <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-xl px-4">
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {quickActions.map((action) => (
          <Card 
            key={action.id}
            className={`p-6 cursor-pointer hover:scale-105 transition-all duration-300 bg-gradient-to-br ${action.bgGradient} border-0 rounded-3xl group shadow-lg ${action.shadowColor} hover:shadow-xl`}
            onClick={() => navigate(action.route)}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${action.gradient} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <action.icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{action.title}</h3>
                <p className="text-slate-600 text-sm font-medium">{action.subtitle}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsGrid;
