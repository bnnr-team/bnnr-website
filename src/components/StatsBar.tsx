"use client";

import { motion } from "framer-motion";
import { Shield, Code2, Cpu, FileCode } from "lucide-react";

const stats = [
  { icon: <Shield size={20} />, label: "MIT License", value: "Open Source" },
  { icon: <Code2 size={20} />, label: "Python", value: "3.10+" },
  { icon: <Cpu size={20} />, label: "PyTorch", value: "2.0+" },
  { icon: <FileCode size={20} />, label: "Version", value: "0.2.1" },
];

export function StatsBar() {
  return (
    <section className="section" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(240, 160, 105, 0.1)",
                    color: "var(--accent)",
                  }}
                >
                  {stat.icon}
                </div>
                <div className="text-lg font-bold" style={{ color: "var(--fg)" }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
