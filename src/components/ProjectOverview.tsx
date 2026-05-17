import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight, 
  Plus, 
  MessageSquare,
  FileText,
  Calendar,
  BarChart3,
  Users,
  Calculator as CalculatorIcon,
  IndianRupee
} from "lucide-react";
import { cn } from "../lib/utils";

const TASKS = [
  { id: 1, title: "Order Red Bricks", deadline: "Today", status: "urgent", assignee: "Self" },
  { id: 2, title: "Slab Casting Prep", deadline: "May 15", status: "pending", assignee: "Mason Basavaraj" },
  { id: 3, title: "Plumbing First Fix", deadline: "May 18", status: "pending", assignee: "Plumber Shivu" },
];

export function ProjectOverview() {
  const navigate = useNavigate();
  const [activeSiteIdx, setActiveSiteIdx] = useState(0);
  const sites = ["City Center Mall", "Green Valley", "Residential-2"];

  return (
    <div className="space-y-8">
      {/* Site Switcher */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
        {sites.map((site, i) => (
          <button
            key={i}
            onClick={() => setActiveSiteIdx(i)}
            className={cn(
              "whitespace-nowrap px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeSiteIdx === i 
                ? "bg-slate-900 text-white shadow-xl shadow-slate-200" 
                : "bg-white border border-slate-100 text-slate-400"
            )}
          >
            {site}
          </button>
        ))}
        <button className="p-2.5 bg-orange-100 text-orange-600 rounded-xl shrink-0">
          <Plus size={18} />
        </button>
      </div>

      {/* Active Projects Slider Hook */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black">Active Projects</h3>
          <button className="text-orange-600 text-[10px] font-black uppercase tracking-widest">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
          <motion.div 
            whileTap={{ scale: 0.98 }}
            className="min-w-[280px] bg-slate-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-black leading-tight">City Center Mall</h4>
                  <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">Phase: Plinth Level</p>
                </div>
                <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                   <BarChart3 size={20} className="text-orange-500" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Progress</p>
                  <p className="text-3xl font-black mt-1">65%</p>
                </div>
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-white/10" />
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={28 * 2 * Math.PI} strokeDashoffset={28 * 2 * Math.PI * (1 - 0.65)} className="text-orange-500" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[10px] font-black">65</span>
                </div>
              </div>
            </div>
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-orange-600/20 rounded-full blur-3xl" />
          </motion.div>

          <div className="min-w-[280px] bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="text-lg font-black text-slate-800 leading-tight">Green Valley</h4>
                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">Phase: Excavation</p>
              </div>
               <div className="p-2 bg-slate-50 rounded-xl">
                   <BarChart3 size={20} className="text-slate-400" />
                </div>
            </div>
            <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</p>
                  <p className="text-3xl font-black mt-1 text-slate-800">30%</p>
                </div>
                <div className="w-16 h-16 relative flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
                    <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="6" strokeDasharray={28 * 2 * Math.PI} strokeDashoffset={28 * 2 * Math.PI * (1 - 0.3)} className="text-slate-300" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-[10px] font-black text-slate-400">30</span>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black">Tasks & Deadlines</h3>
          <button className="w-8 h-8 bg-slate-900 text-white rounded-xl flex items-center justify-center">
            <Plus size={18} />
          </button>
        </div>
        <div className="space-y-3">
          {TASKS.map((task) => (
            <div 
              key={task.id}
              className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  task.status === "urgent" ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400"
                )}>
                  {task.status === "urgent" ? <AlertCircle size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">{task.title}</h5>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wider">
                    Due {task.deadline} • {task.assignee}
                  </p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
