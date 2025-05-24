
import { useState } from "react";
import { Mic, MicOff, Camera, Calendar, FileText, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const VoiceInterface = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const navigate = useNavigate();

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTranscript("I have a persistent cough and fever...");
    } else {
      setTranscript("");
    }
  };

  const actionCards = [
    {
      title: "Book Appointment",
      description: "Find and book a doctor appointment",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      action: () => navigate("/appointments")
    },
    {
      title: "Scan Document",
      description: "Upload prescription or medical document",
      icon: Camera,
      color: "from-green-500 to-green-600",
      action: () => navigate("/scanner")
    },
    {
      title: "Health Check",
      description: "Describe your symptoms to AI",
      icon: Stethoscope,
      color: "from-purple-500 to-purple-600",
      action: toggleListening
    },
    {
      title: "Add Notes",
      description: "Record health notes or reminders",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      action: toggleListening
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DoqLink AI Assistant
        </h2>
        <p className="text-gray-600">
          Speak with AI about your health or use quick actions
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {actionCards.map((card, index) => (
          <Card 
            key={index}
            className="relative overflow-hidden bg-white/95 backdrop-blur-sm border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group rounded-3xl"
            onClick={card.action}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
            
            <div className="relative space-y-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{card.description}</p>
              </div>

              {/* Listen Button for voice-enabled cards */}
              {(card.title === "Health Check" || card.title === "Add Notes") && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleListening();
                  }}
                  size="sm"
                  className={`w-full mt-4 transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 hover:bg-red-600 voice-pulse' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                  } text-white rounded-2xl py-2.5 shadow-lg`}
                >
                  {isListening ? (
                    <>
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Listen
                    </>
                  )}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Voice Transcript Display */}
      {transcript && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 p-4 rounded-3xl animate-fade-in">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-blue-800">AI is listening...</span>
            </div>
            <p className="text-sm text-blue-700 bg-white/50 p-3 rounded-2xl">{transcript}</p>
          </div>
        </Card>
      )}

      {isListening && (
        <Card className="bg-white/95 backdrop-blur-sm border border-gray-200/50 p-4 rounded-3xl text-center animate-fade-in">
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Listening... Speak clearly about your symptoms or health concerns</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VoiceInterface;
