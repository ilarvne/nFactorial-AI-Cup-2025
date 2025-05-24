
import { Bell, Calendar, Pill, Brain, FileText, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedHeader from "@/components/UnifiedHeader";
import { useState } from "react";

const Reminders = () => {
  const [activeTab, setActiveTab] = useState("all");

  const reminders = [
    {
      id: 1,
      type: "medication",
      title: "Take Lisinopril",
      description: "10mg with breakfast",
      time: "8:00 AM",
      status: "pending",
      source: "prescription",
      icon: Pill,
      color: "from-blue-400 to-blue-500"
    },
    {
      id: 2,
      type: "appointment",
      title: "Follow-up Appointment",
      description: "Check blood pressure results with Dr. Smith",
      time: "Tomorrow 2:30 PM",
      status: "upcoming",
      source: "doctor",
      icon: Calendar,
      color: "from-purple-400 to-purple-500"
    },
    {
      id: 3,
      type: "recommendation",
      title: "Increase Water Intake",
      description: "AI recommends 8 glasses daily based on your profile",
      time: "Daily reminder",
      status: "active",
      source: "ai",
      icon: Brain,
      color: "from-emerald-400 to-emerald-500"
    },
    {
      id: 4,
      type: "scan",
      title: "Lab Results Available",
      description: "Your recent blood work results are ready for review",
      time: "2 hours ago",
      status: "new",
      source: "scan",
      icon: FileText,
      color: "from-orange-400 to-orange-500"
    },
    {
      id: 5,
      type: "medication",
      title: "Evening Vitamins",
      description: "Vitamin D3 and B12 supplements",
      time: "8:00 PM",
      status: "completed",
      source: "prescription",
      icon: Pill,
      color: "from-green-400 to-green-500"
    }
  ];

  const tabs = [
    { id: "all", label: "All", count: reminders.length },
    { id: "medication", label: "Medications", count: reminders.filter(r => r.type === "medication").length },
    { id: "recommendation", label: "AI Tips", count: reminders.filter(r => r.type === "recommendation").length },
    { id: "scan", label: "Scanned", count: reminders.filter(r => r.source === "scan").length }
  ];

  const filteredReminders = activeTab === "all" 
    ? reminders 
    : reminders.filter(r => r.type === activeTab || r.source === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "upcoming": return "bg-blue-100 text-blue-700";
      case "active": return "bg-green-100 text-green-700";
      case "new": return "bg-red-100 text-red-700";
      case "completed": return "bg-gray-100 text-gray-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-3 w-3" />;
      case "upcoming": return <Calendar className="h-3 w-3" />;
      case "active": return <Bell className="h-3 w-3" />;
      case "new": return <Bell className="h-3 w-3" />;
      case "completed": return <CheckCircle2 className="h-3 w-3" />;
      default: return <Bell className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-400/15 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <UnifiedHeader 
        title="Smart Reminders"
        subtitle="AI-powered health recommendations"
        showBack={true}
        showNotifications={true}
      >
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={tab.id === activeTab ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 border-0 ${
                tab.id === activeTab 
                  ? "bg-indigo-500 text-white" 
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                tab.id === activeTab 
                  ? "bg-white/20 text-white" 
                  : "bg-slate-200 text-slate-600"
              }`}>
                {tab.count}
              </span>
            </Button>
          ))}
        </div>
      </UnifiedHeader>

      <div className="p-6 space-y-4 relative z-10">
        {filteredReminders.map((reminder) => (
          <Card 
            key={reminder.id} 
            className="bg-white/90 backdrop-blur-sm border-0 p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${reminder.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <reminder.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm mb-1">{reminder.title}</h3>
                    <p className="text-slate-600 text-xs mb-2">{reminder.description}</p>
                    <p className="text-slate-500 text-xs">{reminder.time}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(reminder.status)}`}>
                      {getStatusIcon(reminder.status)}
                      {reminder.status}
                    </span>
                    <span className="text-xs text-slate-400 capitalize">{reminder.source}</span>
                  </div>
                </div>
                
                {reminder.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="text-xs px-3 py-1 h-auto bg-indigo-500 hover:bg-indigo-600">
                      Mark Done
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs px-3 py-1 h-auto border-0 bg-slate-50 hover:bg-slate-100">
                      Snooze
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredReminders.length === 0 && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 p-8 text-center rounded-xl">
            <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No reminders</h3>
            <p className="text-gray-600">All caught up! Check back later for new recommendations.</p>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reminders;
