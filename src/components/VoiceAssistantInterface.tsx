
import { useState, useEffect } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ConversationScreen from "@/components/ConversationScreen";
import VoiceInputSection from "@/components/voice/VoiceInputSection";

const VoiceAssistantInterface = () => {
  const [isInConversation, setIsInConversation] = useState(false);
  const [initialMessage, setInitialMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStartConversation = (message: string) => {
    setInitialMessage(message);
    setIsInConversation(true);
  };

  const endConversation = () => {
    setIsInConversation(false);
    setInitialMessage("");
  };

  if (isInConversation) {
    return (
      <ConversationScreen 
        onEnd={endConversation}
        initialMessage={initialMessage}
      />
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 z-40 overflow-hidden">
      {/* Animated Background Gradient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-violet-300/30 to-purple-400/20 rounded-full blur-3xl transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-indigo-400/20 rounded-full blur-3xl transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-300/20 to-blue-300/15 rounded-full blur-3xl transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}></div>
      </div>

      {/* Header */}
      <div className={`flex items-center justify-between p-4 bg-white/70 backdrop-blur-xl border-b border-white/30 transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate('/')}
          className="rounded-full h-10 w-10 hover:bg-white/50 transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          DoqLink AI
        </h1>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 delay-200 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            AI Health Assistant
          </h2>
          <p className="text-slate-600 max-w-md mx-auto text-lg leading-relaxed">
            Speak or type your health questions
          </p>
        </div>

        <VoiceInputSection onStartConversation={handleStartConversation} />
      </div>
    </div>
  );
};

export default VoiceAssistantInterface;
