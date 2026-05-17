import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Send, 
  Mic, 
  Bot, 
  User, 
  Sparkles, 
  ArrowRight,
  Calculator as CalculatorIcon,
  Hammer,
  HelpCircle,
  Lightbulb,
  MicOff,
  AlertCircle
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { cn } from "../lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
}

const SUGGESTIONS = [
  { text: "How many bricks for 12x10 wall?", icon: CalculatorIcon, kn: "ಗೋಡೆಯ ಇಟ್ಟಿಗೆ ಲೆಕ್ಕ" },
  { text: "Estimate cement for 1 bedroom", icon: Sparkles, kn: "ಸಿಮೆಂಟ್ ಅಂದಾಜು" },
  { text: "Daily wage calculation help", icon: Hammer, kn: "ದಿನಗೂಲಿ ಸಹಾಯ" },
];

export function AIAssistantTab() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Namaste! I'm your Namma-Mistri AI. How can I help with your construction project today? 👷‍♂️" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Mock voice detected
      setTimeout(() => {
        setInput("Estimate materials for a 10x10 room");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Gemini API key is not configured.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const result = await (ai as any).getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are Namma-Mistri, a professional construction assistant for contractors in India. Provide quick, accurate estimates for materials (bricks, cement, sand) and advice on site management. Keep responses concise, helpful, and use construction terminology common in India. Use emojis occasionally. Address the user as 'Sir' or 'Boss'."
      }).generateContent({
        contents: [{ role: "user", parts: [{ text: text }] }],
        generationConfig: {
          maxOutputTokens: 500,
        }
      });
      const response = await result.response;
      const botMessage: Message = { 
        role: "bot", 
        content: response.text() || "I'm sorry, I couldn't process that. Can you try again?" 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      console.error("AI Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: "⚠️ I'm having trouble connecting right now. Please check your connection or try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-230px)]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-black">AI Assistant</h3>
          <p className="text-sm font-bold text-slate-400">AI ಸಹಾಯಕ</p>
        </div>
        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
          <Bot size={24} />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-hide py-2">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex w-full mb-2",
              msg.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className={cn(
              "max-w-[85%] p-4 rounded-3xl shadow-sm relative",
              msg.role === "user" 
                ? "bg-orange-600 text-white rounded-br-none" 
                : "bg-white text-slate-800 border border-slate-100 rounded-bl-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            )}>
              <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 flex gap-2 shadow-sm">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }} 
                className="w-2 h-2 bg-orange-400 rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} 
                className="w-2 h-2 bg-orange-400 rounded-full" 
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} 
                className="w-2 h-2 bg-orange-400 rounded-full" 
              />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-2 text-red-600 text-xs font-bold animate-shake">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {/* Suggestions */}
      {messages.length < 3 && !isLoading && (
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s.text)}
              className="flex-col items-start whitespace-nowrap px-4 py-3 bg-white border border-slate-100 rounded-2xl text-left shadow-sm active:scale-95 group"
            >
              <div className="flex items-center gap-2 mb-1">
                <s.icon size={12} className="text-orange-500" />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{s.text}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-400">{(s as any).kn}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute inset-0 bg-orange-500/10 blur-xl group-focus-within:bg-orange-500/20 transition-all rounded-[32px]" />
        <div className="relative bg-white border border-slate-100 rounded-[32px] p-2 flex items-center gap-1 shadow-lg shadow-black/[0.03]">
          <button 
            onClick={toggleRecording}
            className={cn(
              "p-3 rounded-2xl transition-all relative overflow-hidden",
              isRecording ? "bg-red-50 text-red-600" : "text-slate-300 hover:text-orange-600"
            )}
          >
            {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
            {isRecording && (
              <motion.div 
                layoutId="recording-wave"
                className="absolute inset-0 bg-red-100/50 -z-10"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </button>
          <input 
            type="text" 
            placeholder={isRecording ? "Listening..." : "How can I help, Sir?"}
            className="flex-1 h-12 bg-transparent border-none focus:ring-0 font-bold text-slate-800 placeholder:text-slate-300"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isRecording}
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading || isRecording}
            className="w-12 h-12 bg-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100 disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
