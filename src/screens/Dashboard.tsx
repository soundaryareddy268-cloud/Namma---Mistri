import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calculator as CalculatorIcon, 
  Users, 
  Image as ImageIcon, 
  Bot, 
  Bell, 
  Search,
  Plus,
  ArrowLeft,
  Settings,
  MoreVertical,
  Briefcase,
  Home,
  IndianRupee,
  User
} from "lucide-react";
import { cn } from "../lib/utils";

// Sub-components for tabs
import { CalculatorTab } from "../components/CalculatorTab";
import { TeamTab } from "../components/TeamTab";
import { PhotosTab } from "../components/PhotosTab";
import { AIAssistantTab } from "../components/AIAssistantTab";
import { ProjectOverview } from "../components/ProjectOverview";
import { RatesTab } from "../components/RatesTab";
import { ProfileTab } from "../components/ProfileTab";

const TABS = [
  { id: "home", label: "Home", icon: Home, path: "/dashboard" },
  { id: "calculator", label: "Calculator", icon: CalculatorIcon, path: "/dashboard/calculator" },
  { id: "team", label: "Team", icon: Users, path: "/dashboard/team" },
  { id: "ai", label: "AI Help", icon: Bot, path: "/dashboard/ai" },
  { id: "profile", label: "More", icon: User, path: "/dashboard/profile" },
];

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = TABS.find(tab => location.pathname === tab.path)?.id || "home";
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 overflow-hidden max-w-md mx-auto relative border-x border-slate-200">
      {/* Header */}
      <header className="bg-white px-6 pt-8 pb-4 border-b border-slate-100 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-none">Namma-Mistri</h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Construction Partner</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all relative"
          >
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>
          </button>
          <button 
            onClick={() => navigate("/dashboard/profile")}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
          >
            <Settings size={22} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-8 scroll-smooth">
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<ProjectOverview />} />
                <Route path="calculator" element={<CalculatorTab />} />
                <Route path="team" element={<TeamTab />} />
                <Route path="gallery" element={<PhotosTab />} />
                <Route path="ai" element={<AIAssistantTab />} />
                <Route path="rates" element={<RatesTab />} />
                <Route path="profile" element={<ProfileTab onLogout={onLogout} />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/95 backdrop-blur-xl border-t border-slate-100 h-20 px-2 flex items-center justify-around w-full z-30 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] shrink-0">
        {TABS.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all flex-1 min-w-0",
                isActive ? "text-orange-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl transition-all",
                isActive ? "bg-orange-50 scale-110" : "bg-transparent"
              )}>
                <tab.icon size={isActive ? 22 : 20} />
              </div>
              <span className={cn(
                "text-[8px] font-black uppercase tracking-tight truncate w-full text-center",
                isActive ? "opacity-100" : "opacity-60"
              )}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>


      {/* Notification Drawer (Simple Overlay) */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationsOpen(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="absolute right-0 top-0 h-full w-4/5 bg-white shadow-2xl z-50 p-6 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Notifications</h3>
                <button onClick={() => setIsNotificationsOpen(false)} className="p-2"><ArrowLeft size={24} /></button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100">
                  <p className="text-sm font-bold text-orange-900 leading-tight">Material Delivery Scheduled</p>
                  <p className="text-xs text-orange-700 mt-1">10,000 Bricks arriving tomorrow at 9:00 AM</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-sm font-bold text-slate-800 leading-tight">Team Attendance Alert</p>
                  <p className="text-xs text-slate-500 mt-1">3 workers have not marked attendance today.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
