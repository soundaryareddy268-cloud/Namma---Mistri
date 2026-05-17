import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, Plus, Maximize2, MoreVertical, HardHat, X, CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";

interface Photo {
  id: number;
  url: string;
  date: string;
  title: string;
  site?: string;
}

export function PhotosTab() {
  const [activeSite, setActiveSite] = useState("All Sites");
  const sites = ["All Sites", "City Center Mall", "Green Valley", "Residential-2"];

  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400", date: "2024-03-20", title: "Foundation Start", site: "City Center Mall" },
    { id: 2, url: "https://images.unsplash.com/photo-1503387762-592dee58c460?auto=format&fit=crop&q=80&w=400", date: "2024-03-18", title: "Brickwork Level 1", site: "Green Valley" },
    { id: 3, url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400", date: "2024-03-15", title: "Site Inspection", site: "City Center Mall" },
    { id: 4, url: "https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?auto=format&fit=crop&q=80&w=400", date: "2024-03-10", title: "Excavation", site: "Residential-2" },
  ]);

  const filteredPhotos = activeSite === "All Sites" 
    ? photos 
    : photos.filter(p => (p as any).site === activeSite);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          finishUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const finishUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newPhoto: Photo = {
        id: Date.now(),
        url: reader.result as string,
        date: new Date().toISOString().split('T')[0],
        title: file.name.replace(/\.[^/.]+$/, ""),
        site: activeSite === "All Sites" ? "City Center Mall" : activeSite
      };
      setPhotos([newPhoto, ...photos]);
      setIsUploading(false);
      setUploadProgress(0);
    };
    reader.readAsDataURL(file);
  };

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  return (
    <div className="space-y-6">
      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/95 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 m-auto w-full h-full max-w-md p-4 flex flex-col justify-center items-center z-[110] pointer-events-none"
            >
              <div className="bg-slate-900 w-full rounded-[40px] overflow-hidden pointer-events-auto relative shadow-2xl">
                <img 
                  src={selectedPhoto.url} 
                  className="w-full aspect-[4/3] object-cover" 
                  alt="Zoomed"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white">{selectedPhoto.title}</h4>
                  <p className="text-slate-400 text-sm">{selectedPhoto.date}</p>
                  <button 
                    onClick={() => setSelectedPhoto(null)}
                    className="mt-6 w-full h-14 bg-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20"
                  >
                    <X size={20} />
                    Close View
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black">Project Gallery</h3>
          <p className="text-sm font-bold text-slate-400">ಫೋಟೋ ಗ್ಯಾಲರಿ</p>
        </div>
        <button 
          onClick={handleUploadClick}
          className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-100 active:scale-95 transition-all"
        >
          <Camera size={24} />
        </button>
      </div>

      {/* Site Selector Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {sites.map(site => (
          <button
            key={site}
            onClick={() => setActiveSite(site)}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all",
              activeSite === site 
                ? "bg-slate-900 text-white shadow-md shadow-slate-100" 
                : "bg-white border border-slate-100 text-slate-400"
            )}
          >
            {site}
          </button>
        ))}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <AnimatePresence>
          {isUploading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="aspect-square bg-orange-50 border-2 border-orange-200 rounded-3xl flex flex-col items-center justify-center p-4 text-center"
            >
              <div className="relative w-16 h-16 flex items-center justify-center mb-2">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-orange-100" />
                  <circle cx="32" cy="32" r="28" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={28 * 2 * Math.PI} strokeDashoffset={28 * 2 * Math.PI * (1 - uploadProgress / 100)} className="text-orange-600" strokeLinecap="round" />
                </svg>
                <span className="absolute text-[10px] font-black text-orange-600">{uploadProgress}%</span>
              </div>
              <p className="text-[10px] font-black uppercase text-orange-600 tracking-wider leading-tight">Uploading...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredPhotos.map((photo, index) => (
          <motion.div 
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm aspect-square"
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
              <h5 className="text-white text-xs font-bold truncate">{photo.title}</h5>
              <p className="text-white/60 text-[10px]">{photo.date}</p>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
              <button 
                onClick={() => setSelectedPhoto(photo)}
                className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white"
              >
                <Maximize2 size={14} />
              </button>
              <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg text-white">
                <MoreVertical size={14} />
              </button>
            </div>
          </motion.div>
        ))}

        <button 
          onClick={handleUploadClick}
          className="aspect-square bg-slate-100 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-200 transition-all active:scale-95"
        >
          <Plus size={32} />
          <span className="text-[10px] font-black uppercase">Upload New</span>
        </button>
      </div>

      <div className="p-6 bg-slate-900 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white">
            <HardHat size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-white font-bold">Site Progress: 65%</h4>
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full mt-1 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-orange-500"
              />
            </div>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>
    </div>
  );
}
