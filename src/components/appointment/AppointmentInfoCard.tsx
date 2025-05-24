
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Doctor {
  name: string;
  specialty: string;
  image: string;
}

interface Appointment {
  doctor: Doctor;
  date: string;
  time: string;
  status: string;
  location: string;
  type: string;
  duration: string;
  reason: string;
}

interface AppointmentInfoCardProps {
  appointment: Appointment;
}

const AppointmentInfoCard = ({ appointment }: AppointmentInfoCardProps) => {
  return (
    <Card className="p-6 bg-white/80 border-slate-200/50">
      <div className="flex gap-4 mb-6">
        <img 
          src={appointment.doctor.image}
          alt={appointment.doctor.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold text-slate-800">{appointment.doctor.name}</h2>
          <p className="text-indigo-600 font-semibold">{appointment.doctor.specialty}</p>
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
            appointment.status === 'upcoming' 
              ? 'bg-blue-100 text-blue-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-slate-600" />
          <div>
            <p className="font-semibold text-slate-800">{appointment.date}</p>
            <p className="text-sm text-slate-600">{appointment.type}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-slate-600" />
          <div>
            <p className="font-semibold text-slate-800">{appointment.time}</p>
            <p className="text-sm text-slate-600">{appointment.duration}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-slate-600" />
          <div>
            <p className="font-semibold text-slate-800">{appointment.location}</p>
            <p className="text-sm text-slate-600">Clinic address</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50/80 rounded-xl">
        <h4 className="font-semibold text-slate-800 mb-2">Reason for Visit</h4>
        <p className="text-slate-700">{appointment.reason}</p>
      </div>
    </Card>
  );
};

export default AppointmentInfoCard;
