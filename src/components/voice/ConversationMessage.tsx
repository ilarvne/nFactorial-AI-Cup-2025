
import { Card } from "@/components/ui/card";
import { User, Bot, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface ConversationMessageProps {
  message: Message;
  index: number;
}

const ConversationMessage = ({ message, index }: ConversationMessageProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
  };

  return (
    <div className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'} group animate-fade-in`}>
      {message.type === 'ai' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col max-w-xs ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
        <Card className={`p-4 rounded-2xl relative ${
          message.type === 'user'
            ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white border-0'
            : 'bg-white border-2 border-slate-200'
        }`}>
          <p className={`text-sm leading-relaxed ${
            message.type === 'user' ? 'text-white' : 'text-slate-700'
          }`}>
            {message.content}
          </p>
          
          {/* Message Actions - only for AI messages */}
          {message.type === 'ai' && (
            <div className="flex gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-6 w-6 p-0 hover:bg-slate-100 rounded-full border border-slate-200"
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-slate-100 rounded-full border border-slate-200"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 hover:bg-slate-100 rounded-full border border-slate-200"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </Card>
        
        <p className={`text-xs mt-2 ${
          message.type === 'user' ? 'text-indigo-300' : 'text-slate-400'
        }`}>
          {message.timestamp}
        </p>
      </div>

      {message.type === 'user' && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0 mt-1">
          <User className="h-4 w-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ConversationMessage;
