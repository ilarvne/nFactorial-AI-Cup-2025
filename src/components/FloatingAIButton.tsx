
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingAIButton = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-28 right-6 z-50">
      <Button
        onClick={() => navigate("/voice")}
        className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 rounded-full text-white h-14 w-14 p-0 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl"
      >
        <Sparkles className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default FloatingAIButton;
