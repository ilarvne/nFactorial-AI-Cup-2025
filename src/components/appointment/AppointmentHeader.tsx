
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AppointmentHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-slate-100/50 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/appointments")}
          className="rounded-xl"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-slate-800">Appointment Details</h1>
      </div>
    </div>
  );
};

export default AppointmentHeader;
