
import { useState } from "react";
import { ArrowLeft, Mic, MicOff, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConversationMessage from "@/components/voice/ConversationMessage";

interface ConversationScreenProps {
  onEnd: () => void;
  initialMessage: string;
}

const ConversationScreen = ({ onEnd, initialMessage }: ConversationScreenProps) => {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'user' as const,
      content: initialMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    },
    {
      type: 'ai' as const,
      content: "I can help you find a doctor near Abay Avenue. Let me search for available GPs in your area with good ratings. Based on your symptoms (cough and fever), I recommend seeing a general practitioner first.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate adding a new message after listening
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'user' as const,
          content: "Yes, please find doctors near me with good ratings",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setIsListening(false);
        
        // AI response
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'ai' as const,
            content: "I found 5 highly-rated GPs near Abay Avenue. Dr. Nazarbayev at City Medical Center has the highest rating (4.8/5) and has availability tomorrow at 2:30 PM. Would you like me to show you more options or book this appointment?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }, 1500);
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 z-50 overflow-hidden">
      {/* Unified Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-indigo-300/20 to-violet-400/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-400/15 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col h-full">
        {/* Unified Header */}
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-xl border-b border-white/20 px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <Button
              onClick={onEnd}
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/60 transition-all duration-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">DoqLink AI</h2>
              <p className="text-sm text-emerald-600 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                In conversation
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-white/60 transition-all duration-200"
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {messages.map((message, index) => (
            <ConversationMessage key={index} message={message} index={index} />
          ))}
          
          {/* Typing indicator when listening */}
          {isListening && (
            <div className="flex gap-3 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <div className="bg-white/80 border border-white/30 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
                <p className="text-sm text-slate-500">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>

        {/* Unified Voice Controls */}
        <div className="bg-white/95 backdrop-blur-xl border-t border-white/20 px-6 py-6">
          <div className="flex justify-center">
            <Button
              onClick={toggleListening}
              size="lg"
              className={`rounded-full w-16 h-16 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isListening 
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 animate-pulse' 
                  : 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
          {isListening && (
            <p className="text-center text-sm text-slate-600 mt-3 animate-fade-in">
              Listening... Tap to stop
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationScreen;
