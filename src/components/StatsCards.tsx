
import { Card } from "@/components/ui/card";
import { Calendar, Users, Heart } from "lucide-react";

const StatsCards = () => {
  const stats = [
    {
      title: "Appointments",
      value: "12",
      subtitle: "This month",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      textColor: "text-blue-800",
      icon: Calendar
    },
    {
      title: "Doctors",
      value: "8",
      subtitle: "In network",
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      textColor: "text-purple-800",
      icon: Users
    },
    {
      title: "Health Score",
      value: "89%",
      subtitle: "Excellent",
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      textColor: "text-emerald-800",
      icon: Heart
    }
  ];

  return (
    <div className="py-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-4 px-1">Quick Stats</h2>
      <div className="grid grid-cols-3 gap-3 px-1">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`${stat.bgColor} border-0 p-3 text-center rounded-xl transition-all duration-200 hover:scale-105`}
          >
            <div className={`bg-white/60 w-8 h-8 rounded-lg flex items-center justify-center mx-auto mb-2`}>
              <stat.icon className={`h-4 w-4 ${stat.textColor}`} />
            </div>
            <p className={`text-lg font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
            <p className={`text-xs ${stat.textColor} opacity-80 font-medium`}>{stat.subtitle}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
