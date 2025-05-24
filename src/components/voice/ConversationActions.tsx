
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, FileText, Share2, Bookmark, MoreHorizontal } from "lucide-react";

const ConversationActions = () => {
  const actions = [
    { icon: Calendar, label: "Book Appointment", bgColor: "bg-gradient-to-br from-indigo-100 to-indigo-200", textColor: "text-indigo-800" },
    { icon: MapPin, label: "Find Location", bgColor: "bg-gradient-to-br from-emerald-100 to-emerald-200", textColor: "text-emerald-800" },
    { icon: FileText, label: "Save Notes", bgColor: "bg-gradient-to-br from-purple-100 to-purple-200", textColor: "text-purple-800" },
    { icon: Share2, label: "Share", bgColor: "bg-gradient-to-br from-orange-100 to-orange-200", textColor: "text-orange-800" },
    { icon: Bookmark, label: "Save", bgColor: "bg-gradient-to-br from-blue-100 to-blue-200", textColor: "text-blue-800" },
    { icon: MoreHorizontal, label: "More", bgColor: "bg-gradient-to-br from-slate-100 to-slate-200", textColor: "text-slate-800" },
  ];

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 p-4 mx-6 mb-4 rounded-2xl">
      <p className="text-sm font-medium text-slate-700 mb-3">Quick Actions</p>
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className={`flex flex-col items-center gap-2 h-auto py-3 px-2 rounded-xl border-0 ${action.bgColor} hover:scale-105 transition-all duration-200`}
          >
            <div className="w-8 h-8 rounded-xl bg-white/60 flex items-center justify-center">
              <action.icon className={`h-4 w-4 ${action.textColor}`} />
            </div>
            <span className={`text-xs ${action.textColor} font-medium`}>{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default ConversationActions;
