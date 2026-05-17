import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  MapPin, 
  Phone, 
  Globe, 
  Shield, 
  ChevronRight, 
  LogOut, 
  Camera,
  Briefcase,
  Languages,
  Bell,
  Image as ImageIcon,
  IndianRupee
} from "lucide-react";
import { cn } from "../lib/utils";

export function ProfileTab({ onLogout }: { onLogout: () => void }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("English");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [profile, setProfile] = useState({
    name: "Soundarya D",
    phone: "7625023268",
    role: "Head Contractor",
    sites: 3,
  });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col items-center">
        <div className="relative group">
          <div className="w-32 h-32 bg-slate-100 rounded-[40px] overflow-hidden border-4 border-white shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&q=80&w=200" 
              className="w-full h-full object-cover"
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>
          <button className="absolute -right-2 bottom-2 w-10 h-10 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all border-4 border-white">
            <Camera size={18} />
          </button>
        </div>
        <h3 className="text-2xl font-black mt-4">{profile.name}</h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{profile.role}</p>
      </div>

      <div className="space-y-4 px-1">
        {/* Contact Info */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Mobile Number</p>
                <p className="font-bold">{profile.phone}</p>
              </div>
            </div>
            <button className="text-orange-600 text-[10px] font-black uppercase tracking-widest">Update</button>
          </div>

          <div className="h-px bg-slate-50 w-full" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400">Primary Site Location</p>
                <p className="font-bold">Bangalore, Karnataka</p>
              </div>
            </div>
            <button className="text-orange-600 text-[10px] font-black uppercase tracking-widest">Change</button>
          </div>
        </div>

        {/* Business Settings */}
        <div className="space-y-2 mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2">My Business Tools</h4>
          
          <button 
            onClick={() => navigate("/dashboard/gallery")}
            className="w-full bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                <ImageIcon size={20} />
              </div>
              <span className="font-bold text-slate-700">Project Gallery</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>

          <button 
            onClick={() => navigate("/dashboard/rates")}
            className="w-full bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                <IndianRupee size={20} />
              </div>
              <span className="font-bold text-slate-700">Market Rates</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>

          <button className="w-full bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                <Briefcase size={20} />
              </div>
              <span className="font-bold text-slate-700">Site Management</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-orange-100 text-orange-600 px-2 py-1 rounded-lg">3 ACTIVE</span>
              <ChevronRight size={20} className="text-slate-300" />
            </div>
          </button>
        </div>

        {/* App Settings */}
        <div className="space-y-3 mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2">App Settings</h4>
          
          <div className="bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                 <Languages size={20} />
              </div>
              <span className="font-bold text-slate-700">Language</span>
            </div>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent border-none focus:ring-0 font-bold text-orange-600 text-sm cursor-pointer"
            >
              <option>English</option>
              <option>ಕನ್ನಡ (Kannada)</option>
              <option>Hindi</option>
            </select>
          </div>

          <div className="bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                 <Bell size={20} />
              </div>
              <span className="font-bold text-slate-700">Notifications</span>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={cn(
                "w-12 h-6 rounded-full transition-all relative p-1",
                notifications ? "bg-orange-500" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full shadow-sm transition-all",
                notifications ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
          </div>

          <button className="w-full bg-white px-6 py-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between group active:bg-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                <Shield size={20} />
              </div>
              <span className="font-bold text-slate-700">Privacy & Security</span>
            </div>
            <ChevronRight size={20} className="text-slate-300" />
          </button>
        </div>

        <button 
          onClick={onLogout}
          className="w-full h-16 mt-4 rounded-3xl border-2 border-red-100 text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-all active:scale-95"
        >
          <LogOut size={20} />
          Sign Out of Namma-Mistri
        </button>
      </div>
    </div>
  );
}
