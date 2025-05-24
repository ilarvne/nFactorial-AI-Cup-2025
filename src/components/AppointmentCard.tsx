
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Star, CheckCircle, AlertCircle } from "lucide-react";

interface AppointmentCardProps {
  doctorName: string;
  specialty: string;
  time: string;
  date: string;
  location: string;
  rating: number;
  price: string;
  status?: "confirmed" | "pending" | "completed";
  aiSuggested?: boolean;
  symptoms?: string;
  avatar?: string;
}

const AppointmentCard = ({ 
  doctorName, 
  specialty, 
  time, 
  date, 
  location, 
  rating, 
  price,
  status = "confirmed",
  aiSuggested = false,
  symptoms,
  avatar 
}: AppointmentCardProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (status) {
      case "confirmed":
        return "bg-gradient-to-br from-green-50 to-green-100";
      case "pending":
        return "bg-gradient-to-br from-yellow-50 to-yellow-100";
      case "completed":
        return "bg-gradient-to-br from-blue-50 to-blue-100";
      default:
        return "bg-gradient-to-br from-gray-50 to-gray-100";
    }
  };

  return (
    <Card className={`${getBackgroundColor()} border-0 p-4 hover:scale-[1.02] transition-all duration-300 rounded-xl`}>
      <div className="flex items-start space-x-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">
          {avatar || doctorName.charAt(0)}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                {doctorName}
                {getStatusIcon()}
              </h3>
              <p className="text-xs text-purple-700 font-medium">
                {specialty}
              </p>
            </div>
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-100 to-yellow-200 px-2 py-1 rounded-full border-0">
              <Star className="h-3 w-3 text-yellow-600 fill-current" />
              <span className="text-xs text-yellow-800 font-semibold">{rating}</span>
            </div>
          </div>
          
          <div className="space-y-1 text-xs text-gray-700">
            <div className="flex items-center space-x-2">
              <Clock className="h-3 w-3 text-blue-600" />
              <span>{time}</span>
              <span className="text-blue-700 font-medium">{date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3 text-green-600" />
              <span>{location}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-purple-700">{price}</span>
            <div className="flex gap-2">
              {status === "pending" && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="rounded-full px-3 py-1 text-xs h-7 bg-white/60 border-0 hover:bg-white/80"
                >
                  Cancel
                </Button>
              )}
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-4 py-1 text-xs h-7 border-0">
                {status === "completed" ? "View" : status === "pending" ? "Confirm" : "Reschedule"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;
