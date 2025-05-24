
import { Bell, Clock, AlertTriangle, CheckCircle, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import FloatingAIButton from "@/components/FloatingAIButton";
import UnifiedHeader from "@/components/UnifiedHeader";

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "medication",
      title: "Medication Reminder",
      message: "Time to take your evening vitamins",
      time: "2 hours ago",
      priority: "high",
      icon: Clock,
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
    {
      id: 2,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Check-up with Dr. Smith tomorrow at 2:30 PM",
      time: "4 hours ago",
      priority: "medium",
      icon: Calendar,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      id: 3,
      type: "health",
      title: "Health Goal Achieved",
      message: "Congratulations! You've reached your daily step goal",
      time: "1 day ago",
      priority: "low",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      id: 4,
      type: "warning",
      title: "Blood Pressure Reading",
      message: "Your last reading was slightly elevated. Consider consulting your doctor",
      time: "2 days ago",
      priority: "high",
      icon: AlertTriangle,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
    }
  ];

  const unreadCount = alerts.filter(alert => alert.priority === "high").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50/40 pb-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <UnifiedHeader 
          title="Alerts"
          subtitle={unreadCount > 0 ? `${unreadCount} urgent alerts` : "You're all caught up"}
          showBack={true}
          showNotifications={true}
        />

        <div className="px-4 py-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">Recent Alerts</h2>
            <Button variant="outline" size="sm" className="text-xs border-0 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-800 rounded-xl px-3 py-1.5 font-medium shadow-sm">
              Mark all read
            </Button>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`bg-white/95 backdrop-blur-sm border ${alert.borderColor} rounded-xl hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md`}>
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${alert.bgColor} flex-shrink-0 shadow-sm`}>
                      <alert.icon className={`h-4 w-4 ${alert.color}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-900 text-sm mb-1">{alert.title}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed mb-2">{alert.message}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{alert.time}</span>
                            {alert.priority === "high" && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                                Urgent
                              </span>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {alerts.length === 0 && (
            <Card className="bg-white/95 backdrop-blur-sm border border-white/40 rounded-xl shadow-sm">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No alerts</h3>
                <p className="text-slate-600">You're all caught up! No new alerts at this time.</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <BottomNavigation />
      <FloatingAIButton />
    </div>
  );
};

export default Alerts;
