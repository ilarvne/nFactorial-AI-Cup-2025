
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Sparkles, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  const features = [
    { icon: Sparkles, text: "AI-powered health assistant" },
    { icon: Shield, text: "Secure & private data handling" },
    { icon: Heart, text: "Personalized health insights" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Welcome to DoqLink
          </h1>
          <p className="text-slate-600 text-lg">Your intelligent health companion</p>
        </div>

        {/* Features Preview */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                <feature.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-slate-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Login Form */}
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
                placeholder="Enter your email"
                required
                className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-blue-500/20 rounded-2xl py-4 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded text-blue-600 mr-2" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Signing in..." : "Sign In"}
              {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-600">Don't have an account? </span>
            <Button
              variant="ghost"
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign up
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
