"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    // Auto dismiss tiap toast setelah 3 detik
    toasts.forEach((t) => {
      if (!t.timeoutId) {
        const id = setTimeout(() => {
          dismiss(t.id);
        }, 3000);

        // simpan id ke toast biar ga bikin loop
        t.timeoutId = id;
      }
    });

    return () => {
      toasts.forEach((t) => clearTimeout(t.timeoutId));
    };
  }, [toasts, dismiss]);

  return (
    <div className="fixed top-6 right-6 flex flex-col gap-3 z-[9999]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`p-4 rounded-lg shadow-lg bg-white border w-72
              ${t.variant === "destructive" ? "border-red-500" : "border-gray-200"}
            `}
          >
            <strong className="block text-gray-900">{t.title}</strong>
            {t.description && (
              <p className="text-sm text-gray-600">{t.description}</p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}