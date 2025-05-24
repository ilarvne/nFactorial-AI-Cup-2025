
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VoiceAssistantFAB = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-28 right-6 z-30">
      <Button
        onClick={() => navigate("/voice")}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-violet-600 hover:from-indigo-600 hover:via-purple-700 hover:to-violet-700 shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20"
      >
        <Mic className="h-7 w-7 text-white" />
      </Button>
    </div>
  );
};

export default VoiceAssistantFAB;
