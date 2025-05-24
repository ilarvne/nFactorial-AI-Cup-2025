
import { useState } from "react";
import { Search, MapPin, Star, Clock, Filter, Heart, Eye, Brain, Baby, Bone, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import UnifiedHeader from "@/components/UnifiedHeader";

const FindDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const specialties = [
    { name: "Cardiology", icon: Heart, count: 24, gradient: "from-red-500 to-pink-600" },
    { name: "Dermatology", icon: Eye, count: 18, gradient: "from-blue-500 to-cyan-600" },
    { name: "Neurology", icon: Brain, count: 15, gradient: "from-purple-500 to-indigo-600" },
    { name: "Pediatrics", icon: Baby, count: 32, gradient: "from-green-500 to-emerald-600" },
    { name: "Orthopedics", icon: Bone, count: 21, gradient: "from-orange-500 to-amber-600" },
    { name: "General", icon: Stethoscope, count: 12, gradient: "from-teal-500 to-cyan-600" }
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 156,
      distance: "1.2 km",
      nextAvailable: "Today 2:30 PM",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specialty: "Dermatology",
      rating: 4.9,
      reviews: 203,
      distance: "2.1 km",
      nextAvailable: "Tomorrow 10:00 AM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50/40 pb-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <UnifiedHeader 
          title="Find Doctor"
          subtitle="Search for specialists near you"
          showSearch={true}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          showFilter={true}
        />

        <div className="px-4 py-6 space-y-8">
          {/* Specialties Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">Specialties</h2>
              <Button variant="ghost" size="sm" className="text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl px-3 text-sm">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map((specialty) => (
                <Card 
                  key={specialty.name}
                  className="p-4 cursor-pointer hover:scale-105 transition-all duration-300 bg-white/95 border border-white/40 rounded-xl group shadow-sm hover:shadow-md backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className={`w-10 h-10 bg-gradient-to-br ${specialty.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                      <specialty.icon className="h-5 w-5 text-white" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-0.5">{specialty.name}</h3>
                      <p className="text-slate-600 text-xs font-medium">{specialty.count} doctors</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Nearby Doctors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 bg-clip-text text-transparent">Nearby Doctors</h2>
              <Button variant="ghost" size="sm" className="text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl px-3 text-sm">
                View all
              </Button>
            </div>
            <div className="space-y-3">
              {doctors.map((doctor) => (
                <Card 
                  key={doctor.id}
                  className="p-4 cursor-pointer hover:scale-[1.01] transition-all duration-300 bg-white/95 border border-white/40 rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm"
                  onClick={() => navigate(`/doctors/${doctor.id}`)}
                >
                  <div className="flex gap-3">
                    <img 
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-semibold text-slate-900 text-base mb-1 truncate">{doctor.name}</h3>
                      <p className="text-indigo-600 font-medium mb-2 text-sm">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-3 mb-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span>({doctor.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{doctor.distance}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">{doctor.nextAvailable}</span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 self-start">
                      <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 rounded-xl px-4 py-2 font-medium shadow-sm hover:shadow-md transition-all duration-300 text-xs h-8">
                        Book
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FindDoctor;
