
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AppointmentActionButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="flex items-center gap-2">
        <Phone className="h-4 w-4" />
        Call Doctor
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        Message
      </Button>
    </div>
  );
};

export default AppointmentActionButtons;
