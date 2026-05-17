import React, { useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Edit3, Save, IndianRupee, Info, RefreshCw } from "lucide-react";
import { cn } from "../lib/utils";

export function RatesTab() {
  const [rates, setRates] = useState({
    bricks: 8.5,
    cement: 380,
    sand: 3200,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempRates, setTempRates] = useState(rates);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  const refreshRates = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate price fluctuation
      setRates(prev => ({
        bricks: parseFloat((prev.bricks + (Math.random() * 0.4 - 0.2)).toFixed(2)),
        cement: Math.round(prev.cement + (Math.random() * 10 - 5)),
        sand: Math.round(prev.sand + (Math.random() * 100 - 50)),
      }));
      setLastUpdated(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1500);
  };

  const handleSave = () => {
    setRates(tempRates);
    setIsEditing(false);
    // In a real app, this would persist to localStorage or DB
    localStorage.setItem("materialRates", JSON.stringify(tempRates));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-black">Material Rates</h3>
            <div className="flex items-center gap-1.5 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               <span className="text-[8px] font-black uppercase text-green-700">Live</span>
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Updated {lastUpdated}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={refreshRates}
            disabled={isRefreshing}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-100 text-slate-400 shadow-sm active:scale-95 transition-all text-orange-600",
              isRefreshing && "animate-spin"
            )}
          >
            <RefreshCw size={20} />
          </button>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all active:scale-95",
              isEditing ? "bg-green-600 shadow-green-100" : "bg-orange-600 shadow-orange-100"
            )}
          >
            {isEditing ? <Save size={24} /> : <Edit3 size={24} />}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Bricks (Per Piece)</p>
                <h4 className="text-lg font-bold">Standard Red Brick</h4>
              </div>
            </div>
            {isEditing ? (
              <input 
                type="number" 
                className="w-24 h-12 bg-slate-50 border-2 border-orange-200 rounded-xl px-3 font-bold text-right focus:outline-none"
                value={tempRates.bricks}
                onChange={(e) => setTempRates({...tempRates, bricks: parseFloat(e.target.value)})}
              />
            ) : (
              <span className="text-xl font-black text-slate-800">₹{rates.bricks}</span>
            )}
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Cement (Per Bag)</p>
                <h4 className="text-lg font-bold">Grade 43/53 PPC</h4>
              </div>
            </div>
            {isEditing ? (
              <input 
                type="number" 
                className="w-24 h-12 bg-slate-50 border-2 border-orange-200 rounded-xl px-3 font-bold text-right focus:outline-none"
                value={tempRates.cement}
                onChange={(e) => setTempRates({...tempRates, cement: parseFloat(e.target.value)})}
              />
            ) : (
              <span className="text-xl font-black text-slate-800">₹{rates.cement}</span>
            )}
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-500">
                <IndianRupee size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Sand (Per Load/m³)</p>
                <h4 className="text-lg font-bold">M-Sand / River Sand</h4>
              </div>
            </div>
            {isEditing ? (
              <input 
                type="number" 
                className="w-24 h-12 bg-slate-50 border-2 border-orange-200 rounded-xl px-3 font-bold text-right focus:outline-none"
                value={tempRates.sand}
                onChange={(e) => setTempRates({...tempRates, sand: parseFloat(e.target.value)})}
              />
            ) : (
              <span className="text-xl font-black text-slate-800">₹{rates.sand}</span>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-dashed border-slate-100">
          <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-2xl">
            <TrendingUp size={18} className="text-orange-500" />
            <p className="text-[10px] font-bold text-orange-700 uppercase tracking-widest leading-relaxed">
              Updating these rates will automatically recalculate your estimated project costs in the calculator tab.
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-900 rounded-[32px] text-white">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-orange-500" />
          <h4 className="text-xs font-black uppercase tracking-widest">Pricing Tip</h4>
        </div>
        <p className="text-sm font-medium text-slate-400 leading-relaxed">
          Always include a 5% buffer in your rates to account for sudden spikes in transportation costs or site wastage.
        </p>
      </div>
    </div>
  );
}
