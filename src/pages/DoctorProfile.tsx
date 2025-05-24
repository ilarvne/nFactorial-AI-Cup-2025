
import { useState } from "react";
import { ArrowLeft, Star, MapPin, Clock, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

const DoctorProfile = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const doctor = {
    id: doctorId,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.8,
    reviews: 156,
    experience: "15 years",
    education: "Harvard Medical School",
    location: "Almaty Medical Center",
    distance: "1.2 km",
    bio: "Dr. Johnson is a board-certified cardiologist with expertise in preventive cardiology and heart disease management.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
  };

  const availableDates = [
    { date: "2024-01-15", day: "Today" },
    { date: "2024-01-16", day: "Tomorrow" },
    { date: "2024-01-17", day: "Wed" },
    { date: "2024-01-18", day: "Thu" }
  ];

  const availableTimes = [
    "09:00", "10:30", "14:00", "15:30", "16:00"
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time");
      return;
    }
    
    // Navigate to booking confirmation or process booking
    navigate("/appointments");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100/50 p-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/find-doctor")}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-slate-800">Doctor Profile</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Doctor Info Card */}
        <Card className="p-6 bg-white/80 border-slate-200/50">
          <div className="flex gap-4 mb-4">
            <img 
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{doctor.name}</h2>
              <p className="text-indigo-600 font-semibold">{doctor.specialty}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{doctor.rating} ({doctor.reviews})</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{doctor.distance}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-slate-600">Experience</p>
              <p className="font-semibold text-slate-800">{doctor.experience}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Education</p>
              <p className="font-semibold text-slate-800">{doctor.education}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">About</p>
            <p className="text-slate-700">{doctor.bio}</p>
          </div>

          <div className="flex items-center gap-1 text-slate-600">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{doctor.location}</span>
          </div>
        </Card>

        {/* Date Selection */}
        <Card className="p-6 bg-white/80 border-slate-200/50">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Select Date</h3>
          <div className="grid grid-cols-4 gap-3">
            {availableDates.map((date) => (
              <button
                key={date.date}
                onClick={() => setSelectedDate(date.date)}
                className={`p-3 rounded-xl text-center transition-all ${
                  selectedDate === date.date
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="text-sm font-semibold">{date.day}</div>
                <div className="text-xs">{new Date(date.date).getDate()}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card className="p-6 bg-white/80 border-slate-200/50">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Select Time</h3>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedTime === time
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Clock className="h-4 w-4 mx-auto mb-1" />
                  <div className="text-sm font-semibold">{time}</div>
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Booking Button */}
        <div className="sticky bottom-24 bg-white/95 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/50">
          <Button
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 py-4 text-lg"
          >
            Book Appointment
            {selectedDate && selectedTime && (
              <span className="ml-2 text-sm opacity-90">
                • {availableDates.find(d => d.date === selectedDate)?.day} at {selectedTime}
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
