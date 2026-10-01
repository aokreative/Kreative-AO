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
          <div className="bg-surface border border-line p-4 md:rounded-xl rounded-xl flex flex-col gap-3 shadow-e1">
            <div>
              <p className="text-[13px] text-ink leading-relaxed">
                We use cookies for analytics and to improve your experience. See our{" "}
                <Link href="/legal/privacy" className="text-accent hover:text-accent-ink transition-colors underline">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="bg-accent text-on-accent hover:opacity-90 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1"
              >
                Accept All
              </button>
              <button
                onClick={accept}
                className="text-ink-2 hover:text-ink px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border border-line hover:border-ink-3 flex-1"
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
