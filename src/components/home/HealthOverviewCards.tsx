
import { Card } from "@/components/ui/card";
import { Calendar, Heart, Pill, TrendingUp } from "lucide-react";

const HealthOverviewCards = () => {
  const healthStats = [
    {
      title: "Health Score",
      value: "92%",
      change: "+5%",
      color: "from-emerald-500 to-teal-600",
      icon: Heart,
      bgColor: "from-emerald-50 to-teal-100",
      shadowColor: "shadow-emerald-200/50"
    },
    {
      title: "Next Appointment",
      value: "2 days",
      change: "Dr. Johnson",
      color: "from-blue-500 to-cyan-600",
      icon: Calendar,
      bgColor: "from-blue-50 to-cyan-100",
      shadowColor: "shadow-blue-200/50"
    },
    {
      title: "Active Meds",
      value: "3",
      change: "2 due today",
      color: "from-purple-500 to-violet-600",
      icon: Pill,
      bgColor: "from-purple-50 to-violet-100",
      shadowColor: "shadow-purple-200/50"
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Health Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        {healthStats.map((stat, index) => (
          <Card 
            key={index}
            className={`p-5 text-center bg-gradient-to-br ${stat.bgColor} border-0 rounded-3xl shadow-lg ${stat.shadowColor} hover:scale-105 transition-all duration-300 hover:shadow-xl`}
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
            <div className="text-sm text-slate-600 mb-2 font-medium">{stat.title}</div>
            <div className="flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-600" />
              <div className="text-xs font-semibold text-emerald-700">{stat.change}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HealthOverviewCards;
