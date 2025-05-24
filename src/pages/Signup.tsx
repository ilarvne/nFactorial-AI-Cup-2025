
import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    iin: "",
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert("Please agree to terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const benefits = [
    "AI-powered health recommendations",
    "Secure prescription management",
    "Easy doctor appointment booking",
    "Personalized health insights"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col">
      <div className="flex-1 px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Join DoqLink
          </h1>
          <p className="text-slate-600 text-lg">Start your health journey today</p>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Why choose DoqLink?</h3>
          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Check className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signup Form */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name
              </label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData("fullName", e.target.value)}
                placeholder="Enter your full name"
                required
                className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="Enter your email"
                required
                className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                IIN (Kazakhstan National ID)
              </label>
              <Input
                type="text"
                value={formData.iin}
                onChange={(e) => updateFormData("iin", e.target.value)}
                placeholder="Enter your IIN"
                required
                maxLength={12}
                className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-4"
              />
              <p className="text-xs text-slate-500 mt-1">Required for appointment booking in Kazakhstan</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateFormData("password", e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-4 pr-12"
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

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="bg-slate-50/80 border-0 focus:ring-2 focus:ring-emerald-500/20 rounded-2xl py-4 pr-12"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
                className="mt-1 rounded text-emerald-600"
                required
              />
              <span className="text-sm text-slate-600">
                I agree to the <span className="text-emerald-600 font-semibold">Terms of Service</span> and <span className="text-emerald-600 font-semibold">Privacy Policy</span>
              </span>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 py-4 rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? "Creating account..." : "Create Account"}
              {!isLoading && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-slate-600">Already have an account? </span>
            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              Sign in
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
