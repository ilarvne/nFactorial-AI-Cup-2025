
import { useState } from "react";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col justify-center px-6">
        <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Check Your Email</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            We've sent a password reset link to <span className="font-semibold text-slate-900">{email}</span>
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-2xl"
          >
            Back to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center p-6">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/login")}
          className="rounded-2xl h-12 w-12 bg-white/60 hover:bg-white/80"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Mail className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Reset Password</h1>
          <p className="text-slate-600 text-lg">Enter your email to receive a reset link</p>
        </div>

        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl py-4"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-slate-600 hover:text-slate-700"
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
