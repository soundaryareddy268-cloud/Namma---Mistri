import { useState } from "react";
import { motion } from "motion/react";
import { Hammer, Info, RefreshCw, Calculator as CalculatorIcon, IndianRupee } from "lucide-react";

export function CalculatorTab() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    height: "",
    thickness: ""
  });
  const [results, setResults] = useState<{
    bricks: number;
    cement: number;
    sand: number;
    totalCost: number;
  } | null>(null);

  // Default rates, in a real app these could come from the RatesTab context/localStorage
  const rates = {
    bricks: 8.5,
    cement: 380,
    sand: 3200
  };

  const calculate = () => {
    const l = parseFloat(values.length) || 0;
    const h = parseFloat(values.height) || 0;
    const t = parseFloat(values.thickness) || 0;

    const volume = l * h * (t / 100); // converting thickness cm to m
    
    // Simple Estimation Formulas
    const bricks = Math.round(volume * 500); 
    const cement = Math.round(volume * 6.5); // bags per m3 approx
    const sand = parseFloat((volume * 1.2).toFixed(2)); // m3 approx

    const totalCost = (bricks * rates.bricks) + (cement * rates.cement) + (sand * rates.sand);

    setResults({ bricks, cement, sand, totalCost: Math.round(totalCost) });
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-2xl font-black">Calculator</h3>
          <p className="text-sm font-bold text-slate-400">ಲೆಕ್ಕಾಚಾರ (Estimates)</p>
        </div>
        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
          <CalculatorIcon size={24} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Length (m) / ಉದ್ದ</label>
            <input 
              type="number" 
              placeholder="0.0"
              className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
              value={values.length}
              onChange={(e) => setValues({...values, length: e.target.value})}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Height (m) / ಎತ್ತರ</label>
            <input 
              type="number" 
              placeholder="0.0"
              className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
              value={values.height}
              onChange={(e) => setValues({...values, height: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Thickness (cm) / ದಪ್ಪ</label>
            <input 
              type="number" 
              placeholder="23"
              className="w-full h-12 bg-slate-50 border-none rounded-xl px-4 font-bold focus:ring-2 focus:ring-orange-500"
              value={values.thickness}
              onChange={(e) => setValues({...values, thickness: e.target.value})}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={calculate}
              className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95"
            >
              Calculate <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 gap-4"
        >
          <div className="bg-slate-900 p-6 rounded-[32px] text-white shadow-xl shadow-slate-200 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estimated Project Cost / ಅಂದಾಜು ವೆಚ್ಚ</p>
              <h4 className="text-4xl font-black mt-2">₹{results.totalCost.toLocaleString()}</h4>
            </div>
            <IndianRupee className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12" />
          </div>

          <div className="bg-orange-600 p-6 rounded-[32px] text-white shadow-xl shadow-orange-100 flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <p className="text-[10px] font-black uppercase text-orange-200">Total Bricks / ಇಟ್ಟಿಗೆಗಳು</p>
              <h4 className="text-3xl font-black mt-1">{results.bricks.toLocaleString()}</h4>
            </div>
            <Hammer className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-black uppercase text-slate-400 leading-tight">Cement Bags / ಸಿಮೆಂಟ್ ಮೂಟೆ</p>
              <h4 className="text-2xl font-black mt-1 text-slate-800">{results.cement}</h4>
              <IndianRupee size={24} className="absolute -right-2 -bottom-2 text-slate-50 opacity-[0.03]" />
            </div>
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <p className="text-[10px] font-black uppercase text-slate-400 leading-tight">Sand (m³) / ಮರಳು</p>
              <h4 className="text-2xl font-black mt-1 text-slate-800">{results.sand}</h4>
              <div className="absolute -right-1 -bottom-1 w-10 h-10 bg-slate-50/50 rounded-full" />
            </div>
          </div>

          <div className="bg-slate-100 p-4 rounded-2xl flex items-start gap-3">
            <Info size={16} className="text-slate-400 mt-0.5 shrink-0" />
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-wider">
              Note: This is an approximate engineering estimate. Actual site requirements may vary by 5-10%.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
