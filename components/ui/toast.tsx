"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

let toastQueue: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

export const showToast = (
  message: string,
  type: "success" | "error" = "success"
) => {
  const toast: Toast = {
    id: Math.random().toString(36).substring(7),
    message,
    type,
  };
  toastQueue = [...toastQueue, toast];
  listeners.forEach((listener) => listener(toastQueue));

  setTimeout(() => {
    toastQueue = toastQueue.filter((t) => t.id !== toast.id);
    listeners.forEach((listener) => listener(toastQueue));
  }, 4000);
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((listener) => listener !== setToasts);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`min-w-[300px] max-w-md px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 ${
              toast.type === "success"
                ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0" />
            )}
            <p
              className={`flex-1 text-sm ${
                toast.type === "success"
                  ? "text-green-900 dark:text-green-100"
                  : "text-red-900 dark:text-red-100"
              }`}
            >
              {toast.message}
            </p>
            <button
              onClick={() => {
                toastQueue = toastQueue.filter((t) => t.id !== toast.id);
                listeners.forEach((listener) => listener(toastQueue));
              }}
              className="shrink-0 hover:opacity-70"
            >
              <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
