import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { LayoutDashboard, CheckCircle2 } from "lucide-react";

export function WelcomeScreen() {
  return (
    <div className="flex flex-col min-h-screen px-6 py-12 items-center justify-center bg-orange-600 text-white overflow-hidden">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
          >
            <CheckCircle2 size={48} className="text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-black mb-2">Welcome to Namma-Mistri 👷‍♂️</h1>
        <p className="text-orange-100 text-lg mb-12 max-w-[280px] mx-auto">
          Your Smart Construction Assistant is ready to help you build better.
        </p>

        <Link to="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full h-16 bg-white text-orange-600 rounded-2xl flex items-center justify-center gap-3 font-bold text-xl shadow-2xl px-8"
          >
            <LayoutDashboard size={24} />
            Go to Dashboard
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative patterns */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-5%] left-[-5%] w-80 h-80 bg-black/10 rounded-full blur-3xl" />
    </div>
  );
}
