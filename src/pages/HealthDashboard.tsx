
import HealthHeader from "@/components/HealthHeader";
import BottomNavigation from "@/components/BottomNavigation";
import FloatingAIButton from "@/components/FloatingAIButton";
import { Card } from "@/components/ui/card";
import { Heart, Activity, Thermometer, Scale, Calendar, Bell, TrendingUp, User } from "lucide-react";

const HealthDashboard = () => {
  const healthStats = [
    {
      title: "Heart Rate",
      value: "72 BPM",
      status: "Normal",
      icon: Heart,
      bgColor: "bg-gradient-to-br from-red-100 to-pink-200",
      textColor: "text-red-800",
      trend: "+2%"
    },
    {
      title: "Blood Pressure",
      value: "120/80",
      status: "Good",
      icon: Activity,
      bgColor: "bg-gradient-to-br from-blue-100 to-cyan-200",
      textColor: "text-blue-800",
      trend: "Stable"
    },
    {
      title: "Temperature",
      value: "36.5°C",
      status: "Normal",
      icon: Thermometer,
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-200",
      textColor: "text-green-800",
      trend: "Normal"
    },
    {
      title: "Weight",
      value: "70.2 kg",
      status: "Stable",
      icon: Scale,
      bgColor: "bg-gradient-to-br from-purple-100 to-violet-200",
      textColor: "text-purple-800",
      trend: "-0.5kg"
    }
  ];

  const recentActivities = [
    {
      type: "Appointment",
      description: "Check-up with Dr. Smith",
      date: "Today, 2:30 PM",
      icon: User,
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      textColor: "text-blue-800"
    },
    {
      type: "Medication",
      description: "Took morning vitamins",
      date: "Today, 8:00 AM",
      icon: Bell,
      bgColor: "bg-gradient-to-br from-green-100 to-green-200",
      textColor: "text-green-800"
    },
    {
      type: "Exercise",
      description: "30 min walk in the park",
      date: "Yesterday, 6:00 PM",
      icon: Activity,
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      textColor: "text-purple-800"
    }
  ];

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative z-10">
        <HealthHeader />
        
        <div className="p-4 space-y-6">
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Health Overview</h2>
              <p className="text-gray-600">Track your vital statistics</p>
            </div>
            
            {/* Health Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {healthStats.map((stat, index) => (
                <Card key={index} className={`${stat.bgColor} border-0 p-4 rounded-2xl`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-white/60">
                        <stat.icon className={`h-5 w-5 ${stat.textColor}`} />
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <TrendingUp className="h-3 w-3 text-green-600" />
                        <span className="text-green-700 font-medium">{stat.trend}</span>
                      </div>
                    </div>
                    <div>
                      <p className={`text-xs ${stat.textColor} opacity-80 font-medium`}>{stat.title}</p>
                      <p className={`text-lg font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                      <p className={`text-xs ${stat.textColor} font-semibold`}>{stat.status}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activities */}
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 p-4 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Recent Activities</h3>
                <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 transition-colors px-3 py-1 rounded-lg bg-gradient-to-r from-purple-100 to-purple-200">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {recentActivities.map((activity, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 ${activity.bgColor} rounded-xl`}>
                    <div className="p-2 bg-white/60 rounded-lg">
                      <activity.icon className={`h-4 w-4 ${activity.textColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${activity.textColor}`}>{activity.description}</p>
                      <p className={`text-xs ${activity.textColor} opacity-80 mt-1`}>{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
      <FloatingAIButton />
    </div>
  );
};

export default HealthDashboard;
