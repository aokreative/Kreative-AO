"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  staggerChildren = 0.07,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, delay, staggerChildren }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
