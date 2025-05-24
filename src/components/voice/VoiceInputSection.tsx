
import { useState } from "react";
import { Mic, MicOff, Type, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

interface VoiceInputSectionProps {
  onStartConversation: (message: string) => void;
}

const VoiceInputSection = ({ onStartConversation }: VoiceInputSectionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [textInput, setTextInput] = useState("");
  const navigate = useNavigate();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      onStartConversation("I have a persistent cough and fever. Can you help me find a doctor nearby?");
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onStartConversation(textInput);
    }
  };

  return (
    <>
      {/* Unified Action Buttons */}
      <div className="flex items-center gap-8 mb-16">
        {/* Text Mode Button */}
        <div className="transition-all duration-500 delay-400 translate-x-0 opacity-100 scale-100">
          <Button
            onClick={() => setInputMode(inputMode === 'text' ? 'voice' : 'text')}
            variant="outline"
            className={`rounded-full w-16 h-16 transition-all duration-300 shadow-lg hover:scale-110 border-2 backdrop-blur-sm ${
              inputMode === 'text' 
                ? 'bg-white/90 border-violet-300 text-violet-600 shadow-violet-200/50' 
                : 'bg-white/80 border-white/40 text-slate-500 hover:text-violet-600 hover:border-violet-300'
            }`}
          >
            <Type className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Voice Button */}
        <div className="relative transition-all duration-600 delay-500 translate-y-0 opacity-100 scale-100">
          <Button
            onClick={toggleListening}
            className={`rounded-full w-28 h-28 transition-all duration-300 hover:scale-105 shadow-2xl ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600' 
                : 'bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700'
            }`}
          >
            {isListening ? (
              <MicOff className="h-10 w-10 text-white" />
            ) : (
              <Mic className="h-10 w-10 text-white" />
            )}
          </Button>
          
          {/* Pulse rings for listening state */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-red-400/60 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-2 border-red-300/40 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
        </div>

        {/* Camera Button */}
        <div className="transition-all duration-500 delay-600 translate-x-0 opacity-100 scale-100">
          <Button
            onClick={() => navigate("/scanner")}
            variant="outline"
            className="rounded-full w-16 h-16 bg-white/80 border-2 border-white/40 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-white/90 transition-all duration-300 shadow-lg hover:scale-110 backdrop-blur-sm"
          >
            <Camera className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Unified Action Labels */}
      <div className="flex gap-8 text-sm text-slate-500 transition-all duration-700 delay-700 translate-y-0 opacity-100">
        <span className="hover:text-violet-600 transition-colors duration-200 font-medium">Type</span>
        <span className="hover:text-indigo-600 transition-colors duration-200 font-medium">Voice</span>
        <span className="hover:text-blue-600 transition-colors duration-200 font-medium">Scan</span>
      </div>

      {/* Text Input Modal */}
      {inputMode === 'text' && (
        <div className="fixed inset-x-4 bottom-32 max-w-md mx-auto z-50 animate-scale-in">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/50">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Type Your Question</h3>
            <Textarea
              placeholder="Describe your symptoms..."
              className="w-full p-4 border-2 border-white/40 bg-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm transition-all duration-200 backdrop-blur-sm"
              rows={3}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button 
              className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-xl py-3 font-semibold shadow-lg transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
              disabled={!textInput.trim()}
              onClick={handleTextSubmit}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      )}

      {/* Listening Indicator */}
      {isListening && (
        <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-xl px-6 py-3 rounded-full shadow-xl border border-white/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-red-300 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">Listening...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceInputSection;
