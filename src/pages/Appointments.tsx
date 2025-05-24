
import { useState } from "react";
import { Calendar, Clock, MapPin, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filters = ["All", "Upcoming", "Completed", "Cancelled"];

  const appointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Today",
      time: "2:30 PM",
      status: "upcoming",
      location: "Almaty Medical Center",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Dermatology",
      date: "Tomorrow",
      time: "10:00 AM",
      status: "upcoming",
      location: "Skin Care Clinic",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      doctor: "Dr. Emma Wilson",
      specialty: "General Practice",
      date: "Jan 10",
      time: "3:15 PM",
      status: "completed",
      location: "Central Health Clinic",
      avatar: "https://images.unsplash.com/photo-1594824388687-d80ff4a20a48?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const stats = [
    { label: "Upcoming", value: "2", color: "from-blue-500 to-cyan-600" },
    { label: "This Month", value: "8", color: "from-emerald-500 to-teal-600" },
    { label: "Completed", value: "15", color: "from-purple-500 to-violet-600" }
  ];

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || appointment.status === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pb-24">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-200/50">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Appointments
              </h1>
              <p className="text-slate-600 mt-1">Manage your healthcare schedule</p>
            </div>
            <Button
              onClick={() => navigate("/find-doctor")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Book
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors, specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all duration-300 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat, index) => (
              <Card key={index} className={`p-4 text-center bg-gradient-to-br ${stat.color} border-0 rounded-2xl`}>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-white/90">{stat.label}</div>
              </Card>
            ))}
          </div>

          {/* Filter Pills */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {filters.map((filter) => (
              <Button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                variant={filter === activeFilter ? "default" : "outline"}
                size="sm"
                className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 border-0 ${
                  filter === activeFilter 
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                    : "bg-white/60 text-slate-700 hover:bg-white/80"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-6 py-6">
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <Card 
              key={appointment.id}
              className="bg-white border border-slate-200/50 p-5 rounded-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md"
              onClick={() => navigate(`/appointments/${appointment.id}`)}
            >
              <div className="flex items-center gap-4">
                <img 
                  src={appointment.avatar}
                  alt={appointment.doctor}
                  className="w-14 h-14 rounded-2xl object-cover"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-slate-900 text-lg">{appointment.doctor}</h3>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                      appointment.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {appointment.status}
                    </div>
                  </div>
                  
                  <p className="text-blue-600 font-semibold mb-3">{appointment.specialty}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">{appointment.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No appointments found</h3>
            <p className="text-slate-500 mb-6">Try adjusting your search or book a new appointment</p>
            <Button
              onClick={() => navigate("/find-doctor")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl"
            >
              Book Appointment
            </Button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Appointments;
