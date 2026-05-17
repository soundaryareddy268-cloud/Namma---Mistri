import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  UserPlus, 
  Calendar, 
  IndianRupee, 
  Wallet, 
  MoreHorizontal, 
  X,
  Check,
  History,
  TrendingUp,
  CheckCircle2
} from "lucide-react";
import { cn } from "../lib/utils";

interface Worker {
  id: number;
  name: string;
  role: string;
  wage: number;
  attendance: boolean;
  advance: number;
  balance: number;
}

interface WageRecord {
  workerId: number;
  name: string;
  date: string;
  amount: number;
}

export function TeamTab() {
  const [workers, setWorkers] = useState<Worker[]>([
    { id: 1, name: "Basavaraj M.", role: "Mason", wage: 800, attendance: true, advance: 500, balance: 3500 },
    { id: 2, name: "Shivareddy P.", role: "Helper", wage: 550, attendance: false, advance: 200, balance: 1800 },
    { id: 3, name: "Lakshmi K.", role: "Helper", wage: 550, attendance: true, advance: 0, balance: 2200 },
  ]);

  const [wageRecords, setWageRecords] = useState<WageRecord[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWorker, setNewWorker] = useState({ name: "", role: "Helper", wage: "" });

  const toggleAttendance = (id: number) => {
    setWorkers(workers.map(w => {
      if (w.id === id) {
        const newAttendance = !w.attendance;
        // If marking present, we can log a potential wage increment or just track
        return { ...w, attendance: newAttendance };
      }
      return w;
    }));
  };

  const handleAddWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorker.name || !newWorker.wage) return;
    
    const worker: Worker = {
      id: Date.now(),
      name: newWorker.name,
      role: newWorker.role,
      wage: parseInt(newWorker.wage),
      attendance: false,
      advance: 0,
      balance: 0
    };
    
    setWorkers([...workers, worker]);
    setNewWorker({ name: "", role: "Helper", wage: "" });
    setIsAddModalOpen(false);
  };

  const [isWageLogged, setIsWageLogged] = useState<string | null>(null);

  const logWage = (worker: Worker) => {
    const record: WageRecord = {
      workerId: worker.id,
      name: worker.name,
      date: new Date().toLocaleDateString(),
      amount: worker.wage
    };
    setWageRecords([record, ...wageRecords]);
    setWorkers(workers.map(w => w.id === worker.id ? { ...w, balance: w.balance + w.wage } : w));
    
    setIsWageLogged(worker.name);
    setTimeout(() => setIsWageLogged(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black">Team Management</h3>
          <p className="text-sm font-bold text-slate-400">ತಂಡದ ನಿರ್ವಹಣೆ</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200 active:scale-95 transition-all"
        >
          <UserPlus size={24} />
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-4 rounded-3xl text-white">
          <TrendingUp className="text-orange-500 mb-2" size={20} />
          <p className="text-[10px] font-black uppercase text-slate-500">Total Workers</p>
          <h4 className="text-2xl font-black">{workers.length}</h4>
        </div>
        <div className="bg-orange-600 p-4 rounded-3xl text-white">
          <History className="text-orange-200 mb-2" size={20} />
          <p className="text-[10px] font-black uppercase text-orange-200">Present Today</p>
          <h4 className="text-2xl font-black">{workers.filter(w => w.attendance).length}</h4>
        </div>
      </div>
      
      {/* Success Toast */}
      <AnimatePresence>
        {isWageLogged && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-white/10"
          >
            <Check size={18} className="text-green-400" />
            <p className="text-xs font-bold truncate">Wage logged for {isWageLogged}!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Staff List</h4>
        {workers.map((worker) => (
          <motion.div 
            key={worker.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 font-bold uppercase">
                  {worker.name.substring(0, 2)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 leading-none">{worker.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{worker.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    logWage(worker);
                    // Single-use visual feedback handled by local state could be added,
                    // but for now we rely on the balance change and History log.
                  }}
                  className="p-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100 transition-all active:scale-90"
                  title="Pay Daily Wage"
                >
                  <IndianRupee size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 p-3 rounded-2xl flex flex-col items-center">
                <p className="text-[9px] font-black uppercase text-slate-400">Daily Wage</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-sm font-bold text-slate-900">₹{worker.wage}</span>
                </div>
              </div>
              <div className={cn(
                "p-3 rounded-2xl flex flex-col items-center border transition-all cursor-pointer",
                worker.attendance 
                  ? "bg-green-50 border-green-100 text-green-700" 
                  : "bg-red-50 border-red-100 text-red-700"
              )}
              onClick={() => toggleAttendance(worker.id)}
              >
                <p className="text-[9px] font-black uppercase opacity-60">Attendance</p>
                <div className="flex items-center gap-2">
                  {worker.attendance ? <Check size={14} /> : <X size={14} />}
                  <p className="text-sm font-bold">{worker.attendance ? "Present" : "Absent"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1 bg-blue-50/50 p-3 rounded-2xl border border-blue-100/50">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <Wallet size={12} />
                  <span className="text-[9px] font-black uppercase">Advance (ಮುಂಗಡ)</span>
                </div>
                <p className="text-sm font-bold text-blue-700">₹{worker.advance}</p>
              </div>
              <div className="flex-1 bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50">
                <div className="flex items-center gap-2 text-orange-600 mb-1">
                  <IndianRupee size={12} />
                  <span className="text-[9px] font-black uppercase">Balance (ಬಾಕಿ)</span>
                </div>
                <p className="text-sm font-bold text-orange-700">₹{worker.balance}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Wage History Snapshot */}
      {wageRecords.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-400">
              <History size={16} />
              <h4 className="text-xs font-black uppercase tracking-widest">Recent Wage Logs (ಇತ್ತೀಚಿನ ಪಾವತಿಗಳು)</h4>
            </div>
            <CheckCircle2 size={16} className="text-green-500" />
          </div>
          <div className="space-y-3">
            {wageRecords.slice(0, 3).map((record, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="font-bold text-slate-700">{record.name}</span>
                </div>
                <span className="font-black text-slate-400">₹{record.amount} • {record.date}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add Worker Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[40px] p-8 z-[70] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black">Add Team Member</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 text-slate-400"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddWorker} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Full Name / ಹೆಸರು</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Enter worker name"
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Role / ಪಾತ್ರ</label>
                  <select 
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
                    value={newWorker.role}
                    onChange={(e) => setNewWorker({...newWorker, role: e.target.value})}
                  >
                    <option value="Helper">Helper</option>
                    <option value="Mason">Mason</option>
                    <option value="Carpenter">Carpenter</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Electrician">Electrician</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Daily Wage / ದಿನಗೂಲಿ (₹)</label>
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 600"
                    className="w-full h-14 bg-slate-50 border-none rounded-2xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
                    value={newWorker.wage}
                    onChange={(e) => setNewWorker({...newWorker, wage: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full h-16 bg-orange-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 mt-4 active:scale-95 transition-all"
                >
                  Confirm & Add Member
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
