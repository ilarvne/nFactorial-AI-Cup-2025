
import { Clock, Bell, Calendar, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ItemInfo {
  id: string | undefined;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  time: string;
  status: string;
}

interface ItemInfoCardProps {
  item: ItemInfo;
}

const ItemInfoCard = ({ item }: ItemInfoCardProps) => {
  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          item.type === "reminder" ? "bg-orange-100" :
          item.type === "appointment" ? "bg-blue-100" :
          "bg-purple-100"
        }`}>
          {item.type === "reminder" ? <Bell className="h-6 w-6 text-orange-600" /> :
           item.type === "appointment" ? <Calendar className="h-6 w-6 text-blue-600" /> :
           <Pill className="h-6 w-6 text-purple-600" />}
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800 mb-1">{item.title}</h2>
          <p className="text-indigo-600 font-semibold mb-1">{item.subtitle}</p>
          <p className="text-slate-600 text-sm mb-2">{item.description}</p>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600">{item.time}</span>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              item.status === 'active' ? 'bg-green-100 text-green-700' :
              item.status === 'completed' ? 'bg-gray-100 text-gray-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {item.status}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemInfoCard;
