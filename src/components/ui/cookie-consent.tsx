"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto z-40 md:max-w-[340px] w-full p-4 md:p-0"
        >
          <div className="bg-[#12121a] border border-white/[0.08] p-4 md:rounded-xl rounded-xl flex flex-col gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div>
              <p className="text-[13px] text-white/80 leading-relaxed">
                We use cookies for analytics and to improve your experience. See our{" "}
                <Link href="/legal/privacy" className="text-[#0070F3] hover:text-[#3b9eff] transition-colors underline decoration-white/20">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="bg-white/10 text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1"
              >
                Accept All
              </button>
              <button
                onClick={accept}
                className="text-white/60 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-white/10 hover:border-white/20 flex-1"
              >
                Essential
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
