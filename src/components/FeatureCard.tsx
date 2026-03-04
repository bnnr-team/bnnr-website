"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="card group hover:border-[var(--accent)] transition-all duration-300"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: "rgba(240, 160, 105, 0.1)",
          color: "var(--accent)",
        }}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </motion.div>
  );
}
