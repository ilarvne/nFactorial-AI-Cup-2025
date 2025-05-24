
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AIInsightsCard = () => {
  const navigate = useNavigate();

  return (
    <Card className="p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 border-0 rounded-3xl text-white relative overflow-hidden shadow-2xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-sm">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              AI Health Insights
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </h3>
          </div>
        </div>
        <p className="text-white/90 mb-6 text-lg leading-relaxed font-medium">
          Your health metrics show consistent improvement. Keep maintaining your medication schedule and regular checkups!
        </p>
        <Button 
          variant="ghost" 
          className="bg-white/20 hover:bg-white/30 text-white border-0 rounded-2xl font-bold px-6 py-3 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          onClick={() => navigate("/health")}
        >
          View Detailed Analysis <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </Card>
  );
};

export default AIInsightsCard;
