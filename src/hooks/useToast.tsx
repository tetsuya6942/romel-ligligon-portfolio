import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  text: string;
  type: ToastType;
}

interface ToastContextType {
  show: (text: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const show = useCallback((text: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none select-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className={`pointer-events-auto w-full border-2 border-black dark:border-white bg-white dark:bg-zinc-950 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-start gap-3`}
            >
              {/* Icon based on notification type */}
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-black dark:text-white shrink-0 mt-0.5" />
              )}

              {/* Message content */}
              <div className="flex-1 font-mono text-[11px] uppercase tracking-wider text-black dark:text-white">
                <span className="font-bold block mb-0.5">
                  {toast.type === "success" ? "Transmission OK" : toast.type === "error" ? "System Error" : "Notification"}
                </span>
                <span className="normal-case tracking-normal block text-black/85 dark:text-white/85 text-[10px] leading-relaxed">
                  {toast.text}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => remove(toast.id)}
                className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
