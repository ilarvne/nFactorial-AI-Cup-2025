
import { Calendar, Search, Home, User, Stethoscope } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      icon: Home, 
      label: "Assistant", 
      path: "/",
      isActive: location.pathname === "/" || location.pathname === "/assistant",
    },
    { 
      icon: Search, 
      label: "Find Doctor", 
      path: "/find-doctor",
      isActive: location.pathname === "/find-doctor",
    },
    { 
      icon: Calendar, 
      label: "Appointments", 
      path: "/appointments",
      isActive: location.pathname === "/appointments",
    },
    { 
      icon: User, 
      label: "Profile", 
      path: "/profile",
      isActive: location.pathname === "/profile" || location.pathname === "/settings",
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 safe-area-inset-bottom z-40">
      <div className="max-w-md mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-3 transition-all duration-200 ease-out relative ${
                item.isActive 
                  ? "text-indigo-600" 
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <div className={`transition-transform duration-200 ${
                item.isActive ? "scale-110" : "hover:scale-105"
              }`}>
                <item.icon className="h-5 w-5" strokeWidth={item.isActive ? 2.5 : 2} />
              </div>
              <span className={`text-xs font-medium transition-colors duration-200 ${
                item.isActive ? "text-indigo-600" : "text-gray-500"
              }`}>
                {item.label}
              </span>
              {item.isActive && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavigation;
