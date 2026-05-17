import React, { useState } from "react";
import { motion } from "motion/react";
import { HardHat, Chrome, ArrowRight, User, Mail, Lock } from "lucide-react";
import { cn } from "../lib/utils";

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (isForgotPassword) {
      setSuccess("Reset link sent to your email!");
      setTimeout(() => setIsForgotPassword(false), 2000);
      return;
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-12 items-center justify-center bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
            <HardHat size={48} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-center">Namma-Mistri</h1>
          <p className="text-slate-500 font-medium">
            {isForgotPassword ? "Recover Account" : "Construction Assistant"}
          </p>
        </div>

        <div className="space-y-4">
          {!isForgotPassword && (
            <>
              <button 
                onClick={onLogin}
                className="w-full h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <Chrome size={20} className="text-orange-500" />
                Continue with Google
              </button>

              <div className="relative py-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  or
                </span>
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && !isForgotPassword && (
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  required
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                required
                className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {!isForgotPassword && (
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Password"
                  required
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            )}

            {isSignUp && !isForgotPassword && (
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="password" 
                  placeholder="Confirm Password"
                  required
                  className="w-full h-14 pl-12 pr-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-sm font-medium px-2">{error}</p>}
            {success && <p className="text-green-600 text-sm font-medium px-2">{success}</p>}

            {!isSignUp && !isForgotPassword && (
              <div className="flex justify-end px-2">
                <button 
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-lg shadow-lg shadow-orange-200 transition-all active:scale-95"
            >
              {isForgotPassword ? "Send Reset Link" : isSignUp ? "Create Account" : "Sign In"}
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-slate-500 font-medium">
            {isForgotPassword ? (
              <button 
                onClick={() => setIsForgotPassword(false)}
                className="text-orange-600 font-bold hover:underline"
              >
                Back to Login
              </button>
            ) : (
              <>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <button 
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-orange-600 font-bold hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
