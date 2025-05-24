
import { useState } from "react";
import { Mic, MicOff, Camera, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const AIActionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [inputMode, setInputMode] = useState<'voice' | 'text'>('voice');
  const [isInConversation, setIsInConversation] = useState(false);
  const navigate = useNavigate();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("I have a persistent cough and fever. Can you help me find a doctor nearby?");
      setIsInConversation(true);
    } else {
      setTranscript("");
    }
  };

  const toggleInputMode = () => {
    setInputMode(inputMode === 'voice' ? 'text' : 'voice');
    setIsListening(false);
    setTranscript("");
  };

  const endConversation = () => {
    setIsInConversation(false);
    setIsListening(false);
    setTranscript("");
  };

  if (isInConversation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-8">
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">DoqLink AI</h2>
              <p className="text-sm text-gray-500">In conversation...</p>
            </div>
            <Button
              onClick={endConversation}
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              End
            </Button>
          </div>

          {/* Conversation Area */}
          <div className="flex-1 space-y-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
              <p className="text-blue-800">{transcript}</p>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-700">I can help you find a doctor near Abay Avenue. Let me search for available GPs in your area with good ratings.</p>
            </div>
          </div>

          {/* Voice Controls */}
          <div className="flex justify-center">
            <Button
              onClick={toggleListening}
              size="lg"
              className={`rounded-full w-16 h-16 transition-all duration-300 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 voice-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              {isListening ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Mic className="h-6 w-6 text-white" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6">
      <div className="text-center space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-gray-800">DoqLink AI Assistant</h2>
        <p className="text-gray-600 text-lg">
          How can I help you today?
        </p>
      </div>
      
      {/* Floating Button Group */}
      <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex justify-center items-center gap-4">
          {/* Text Mode Button */}
          <Button
            onClick={toggleInputMode}
            variant="outline"
            size="lg"
            className={`rounded-full w-12 h-12 transition-all duration-300 ${
              inputMode === 'text' 
                ? 'bg-purple-100 border-purple-300 text-purple-600' 
                : 'bg-white/90 backdrop-blur-sm border-gray-200 text-gray-400 hover:text-gray-600'
            }`}
          >
            <Type className="h-5 w-5" />
          </Button>

          {/* Main Voice Button */}
          <Button
            onClick={inputMode === 'voice' ? toggleListening : toggleInputMode}
            size="lg"
            className={`rounded-full w-16 h-16 transition-all duration-300 hover:scale-105 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 voice-pulse' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
            }`}
            style={{
              boxShadow: isListening 
                ? '0 0 30px rgba(239, 68, 68, 0.4)' 
                : '0 8px 32px rgba(59, 130, 246, 0.3)',
            }}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white" />
            ) : (
              <Mic className="h-6 w-6 text-white" />
            )}
          </Button>

          {/* Camera Button */}
          <Button
            onClick={() => navigate("/scanner")}
            variant="outline"
            size="lg"
            className="rounded-full w-12 h-12 bg-white/90 backdrop-blur-sm border-gray-200 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-300"
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {inputMode === 'text' && (
        <div className="fixed bottom-48 left-1/2 transform -translate-x-1/2 w-80 z-40">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
            <textarea
              placeholder="Type your health question here..."
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none text-sm"
              rows={3}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <Button 
              className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl"
              disabled={!transcript.trim()}
              onClick={() => setIsInConversation(true)}
            >
              Send Message
            </Button>
          </div>
        </div>
      )}

      {transcript && inputMode === 'voice' && (
        <div className="fixed bottom-48 left-1/2 transform -translate-x-1/2 max-w-sm z-40">
          <div className="bg-blue-50/90 backdrop-blur-sm p-4 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800 text-center">{transcript}</p>
          </div>
        </div>
      )}

      {isListening && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
          <div className="text-sm text-gray-500 text-center bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
            Listening... Speak clearly
          </div>
        </div>
      )}
    </div>
  );
};

export default AIActionComponent;
