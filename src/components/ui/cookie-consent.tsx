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
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 max-w-sm"
        >
          <div className="glass p-5 rounded-xl flex flex-col gap-4">
            <div>
              <h4 className="font-semibold text-ink">We use cookies</h4>
              <p className="text-sm text-ink-2 mt-1">
                We use cookies to improve your experience and for analytics. By continuing to use this site, you agree to our{" "}
                <Link href="/legal/privacy" className="text-accent hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={accept}
                className="bg-accent text-on-accent px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity flex-1"
              >
                Accept All
              </button>
              <button
                onClick={accept}
                className="bg-surface-2 text-ink px-4 py-2 rounded-md text-sm font-medium hover:bg-line transition-colors flex-1"
              >
                Essential Only
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
