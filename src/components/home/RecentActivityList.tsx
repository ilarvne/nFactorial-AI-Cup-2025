
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope, Pill, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentActivityList = () => {
  const navigate = useNavigate();

  const recentActivity = [
    {
      id: 1,
      type: "appointment",
      title: "Dr. Sarah Johnson",
      subtitle: "Cardiology Checkup",
      description: "Heart health assessment scheduled",
      time: "Tomorrow, 2:30 PM",
      status: "upcoming",
      icon: Stethoscope,
      color: "text-blue-600",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-200",
      shadowColor: "shadow-blue-200/50"
    },
    {
      id: 2,
      type: "medication",
      title: "Medication Reminder",
      subtitle: "Lisinopril 10mg",
      description: "Take with breakfast",
      time: "In 30 minutes",
      status: "pending",
      icon: Pill,
      color: "text-purple-600",
      bgColor: "bg-gradient-to-br from-purple-100 to-purple-200",
      shadowColor: "shadow-purple-200/50"
    },
    {
      id: 3,
      type: "health",
      title: "Blood Pressure Reading",
      subtitle: "120/80 mmHg",
      description: "Normal range - looking good",
      time: "2 hours ago",
      status: "completed",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200",
      shadowColor: "shadow-emerald-200/50"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Recent Activity</h2>
        <Button variant="ghost" size="sm" className="text-indigo-600 font-bold hover:bg-indigo-50 rounded-xl px-4">
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      <div className="space-y-4">
        {recentActivity.map((item) => (
          <Card 
            key={item.id} 
            className={`bg-white/80 backdrop-blur-sm border border-slate-200/50 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl hover:bg-white/90`}
            onClick={() => navigate(`/assistant/${item.id}`)}
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 ${item.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${item.shadowColor}`}>
                <item.icon className={`h-7 w-7 ${item.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 text-base truncate">{item.title}</h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {item.status}
                  </div>
                </div>
                <p className="text-sm text-indigo-600 font-bold mb-2">{item.subtitle}</p>
                <p className="text-slate-600 text-sm mb-2 font-medium">{item.description}</p>
                <p className="text-slate-500 text-sm font-semibold">{item.time}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityList;
