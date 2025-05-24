
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Heart, Brain, Baby, Eye, Bone, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoriesGrid = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: "general-medicine",
      name: "General Medicine",
      icon: Stethoscope,
      gradient: "category-gradient-1",
      count: "24 doctors"
    },
    {
      id: "cardiology",
      name: "Cardiology",
      icon: Heart,
      gradient: "category-gradient-2",
      count: "18 doctors"
    },
    {
      id: "pediatrics",
      name: "Pediatrics",
      icon: Baby,
      gradient: "category-gradient-3",
      count: "16 doctors"
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology",
      icon: Eye,
      gradient: "category-gradient-4",
      count: "12 doctors"
    },
    {
      id: "orthopedics",
      name: "Orthopedics",
      icon: Bone,
      gradient: "category-gradient-5",
      count: "20 doctors"
    },
    {
      id: "neurology",
      name: "Neurology",
      icon: Brain,
      gradient: "category-gradient-6",
      count: "14 doctors"
    }
  ];

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Find Specialists</h2>
          <p className="text-gray-600 text-sm">Choose your medical category</p>
        </div>
        <button className="text-sm text-purple-600 font-semibold hover:text-purple-700 transition-colors px-3 py-1 rounded-lg bg-purple-50 hover:bg-purple-100">
          View All
        </button>
      </div>
      
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-3 pb-4 px-1">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              onClick={() => navigate(`/category/${category.id}`)}
              className="border-0 p-0 hover:scale-105 transition-all duration-300 cursor-pointer flex-shrink-0 w-32 rounded-2xl overflow-hidden"
            >
              <div className={`${category.gradient} p-4 text-white`}>
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs leading-tight mb-1">{category.name}</h3>
                    <p className="text-xs text-white/80">{category.count}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoriesGrid;
