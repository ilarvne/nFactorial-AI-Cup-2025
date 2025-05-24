
import AppointmentCard from "./AppointmentCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AppointmentsList = () => {
  const navigate = useNavigate();

  const appointments = [
    {
      doctorName: "Dr. Aida Nazarbayeva",
      specialty: "Pulmonologist",
      time: "2:30pm - 3:30pm",
      date: "Today",
      location: "Almaty Medical Center",
      rating: 4.9,
      price: "₸18,000",
      status: "confirmed" as const,
      aiSuggested: false,
      symptoms: "Persistent cough, chest tightness"
    },
    {
      doctorName: "Dr. Askar Tursynov",
      specialty: "Cardiologist", 
      time: "10:00am - 11:00am",
      date: "Tomorrow",
      location: "Kazakhstan Heart Institute",
      rating: 4.8,
      price: "₸25,000",
      status: "confirmed" as const,
      aiSuggested: false
    },
    {
      doctorName: "Dr. Zhanna Omarova",
      specialty: "Dermatologist",
      time: "4:00pm - 4:30pm",
      date: "Friday, Dec 27",
      location: "Skin Health Clinic",
      rating: 4.7,
      price: "₸15,000",
      status: "pending" as const,
      aiSuggested: false,
      symptoms: "Skin consultation requested"
    },
    {
      doctorName: "Dr. Marat Bekmuratov",
      specialty: "Orthopedist",
      time: "11:30am - 12:00pm",
      date: "Last Monday",
      location: "Bone & Joint Clinic",
      rating: 4.6,
      price: "₸20,000",
      status: "completed" as const,
      aiSuggested: false,
      symptoms: "Knee pain after sports"
    }
  ];

  return (
    <div className="px-4 py-4 space-y-4 pb-20">
      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            Quick Actions
          </h2>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-sm border-0 cursor-pointer hover:scale-105 transition-all duration-300 rounded-xl"
            onClick={() => navigate("/voice")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/60 rounded-lg flex items-center justify-center">
                <Plus className="h-4 w-4 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-800 text-sm">Book New</h3>
                <p className="text-xs text-blue-700">Find doctor</p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 backdrop-blur-sm border-0 cursor-pointer hover:scale-105 transition-all duration-300 rounded-xl"
            onClick={() => navigate("/scanner")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/60 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-emerald-800 text-sm">Find Nearby</h3>
                <p className="text-xs text-emerald-700">Clinics & hospitals</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Current Appointments */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-500" />
            Your Appointments
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all
          </button>
        </div>
        
        <div className="space-y-3">
          {appointments.map((appointment, index) => (
            <AppointmentCard key={index} {...appointment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsList;
