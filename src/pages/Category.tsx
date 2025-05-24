
import { useState } from "react";
import { ArrowLeft, MapPin, Star, Clock, Phone, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useParams } from "react-router-dom";
import BottomNavigation from "@/components/BottomNavigation";
import FloatingAIButton from "@/components/FloatingAIButton";

const Category = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const categoryNames: Record<string, string> = {
    "general-medicine": "General Medicine",
    "cardiology": "Cardiology",
    "pediatrics": "Pediatrics",
    "ophthalmology": "Ophthalmology",
    "orthopedics": "Orthopedics",
    "neurology": "Neurology",
  };

  const filters = [
    { id: "all", label: "All", color: "bg-purple-500" },
    { id: "nearby", label: "Nearby", color: "bg-blue-500" },
    { id: "top-rated", label: "Top Rated", color: "bg-yellow-500" },
    { id: "available", label: "Available", color: "bg-green-500" },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Aida Nazarbayeva",
      clinic: "City Medical Center",
      rating: 4.8,
      reviews: 124,
      distance: "1.2 km",
      price: "₸₸",
      availability: "Today 2:30 PM",
      specialization: "General Practice",
      experience: "15 years",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 2,
      name: "Dr. Baurzhan Suleimenov",
      clinic: "Almaty Health Clinic",
      rating: 4.6,
      reviews: 89,
      distance: "2.1 km",
      price: "₸₸₸",
      availability: "Tomorrow 10:00 AM",
      specialization: "Internal Medicine",
      experience: "12 years",
      image: "/placeholder.svg",
      verified: true
    },
    {
      id: 3,
      name: "Dr. Zhanna Kurmanova",
      clinic: "Premium Medical",
      rating: 4.9,
      reviews: 156,
      distance: "0.8 km",
      price: "₸₸₸₸",
      availability: "Today 4:00 PM",
      specialization: "Family Medicine",
      experience: "18 years",
      image: "/placeholder.svg",
      verified: true
    }
  ];

  const categoryName = categoryNames[categoryId || ""] || "Specialists";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-24">
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="px-4 py-4">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-800">{categoryName}</h1>
                <p className="text-sm text-gray-600">{doctors.length} doctors available</p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <input
              type="text"
              placeholder="Search doctors, clinics..."
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto px-4">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                selectedFilter === filter.id
                  ? `${filter.color} text-white` 
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="space-y-3 px-4">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="bg-white border-0 p-4 rounded-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                {/* Doctor Image */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {doctor.name.split(' ')[1]?.[0]}
                    </span>
                  </div>
                  {doctor.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  )}
                </div>

                {/* Doctor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{doctor.name}</h3>
                      <p className="text-purple-600 font-medium text-sm">{doctor.specialization}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-700">{doctor.rating}</span>
                        <span className="text-xs text-gray-500">({doctor.reviews})</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">{doctor.price}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">{doctor.clinic}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-blue-500" />
                        <span>{doctor.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-purple-500" />
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-100 text-green-700 border-green-200 rounded-full px-3 py-1">
                      {doctor.availability}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="rounded-full border-gray-200"
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 font-semibold"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <BottomNavigation />
        <FloatingAIButton />
      </div>
    </div>
  );
};

export default Category;
