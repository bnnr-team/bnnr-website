"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Monitor, Smartphone } from "lucide-react";

const notebooks = [
  {
    title: "Classification Demo",
    description: "Full BNNR pipeline on STL-10 with XAI",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/classification/bnnr_classification_demo.ipynb",
  },
  {
    title: "Augmentations Guide",
    description: "Visual guide to every BNNR augmentation",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_augmentations_guide.ipynb",
  },
  {
    title: "Custom Data",
    description: "Bring your own images with ImageFolder-style layouts",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_custom_data.ipynb",
  },
  {
    title: "Detection Demo",
    description: "Object detection on VOC 2007 with bbox augmentations and mAP",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/detection/bnnr_detection_demo.ipynb",
  },
];

export function DashboardPreview() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">
          Real-time{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            dashboard
          </span>
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Monitor your training live with branch decision trees, metrics charts,
          augmentation previews, and XAI insights — all from your browser or phone.
        </p>
        <p className="text-center text-xs max-w-xl mx-auto -mt-4 mb-6" style={{ color: "var(--muted)" }}>
          Preview below mirrors the{" "}
          <span className="font-medium" style={{ color: "var(--fg)" }}>
            real dashboard KPI layout
          </span>{" "}
          (sample numbers only — your session shows live metrics).
        </p>

        {/* Dashboard mockup — structure matches bnnr/dashboard_web overview KPI row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card mb-12 p-0 overflow-hidden"
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-subtle)]"
            style={{ background: "var(--card-solid)" }}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#eab308" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
            </div>
            <div className="flex-1 mx-4 px-3 py-1 rounded-lg text-xs font-mono text-center"
              style={{ background: "var(--code-bg)", color: "var(--muted)" }}>
              http://127.0.0.1:8080
            </div>
          </div>

          {/* Dashboard content — same KPI labels as dashboard_web App.tsx overview */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              {(
                [
                  { label: "Best Accuracy ★", value: "94.1%", highlight: true as const },
                  { label: "Current Accuracy", value: "91.2%", highlight: false as const },
                  { label: "Best F1 (macro) ★", value: "89.8%", highlight: true as const },
                  {
                    label: "BNNR Gain vs Baseline",
                    value: "+2.8pp",
                    highlight: false as const,
                    valueColor: "var(--accent)" as const,
                  },
                  { label: "Decisions Made", value: "6", highlight: false as const },
                  { label: "Branches Evaluated", value: "9", highlight: false as const },
                ] as const
              ).map((kpi) => (
                <div
                  key={kpi.label}
                  className="rounded-bnnr p-3 text-center min-w-0"
                  style={{
                    background: kpi.highlight
                      ? "rgba(240, 160, 105, 0.08)"
                      : "var(--code-bg)",
                    border: kpi.highlight
                      ? "1px solid rgba(240, 160, 105, 0.3)"
                      : "1px solid var(--border-subtle)",
                  }}
                >
                  <div
                    className="text-lg sm:text-xl font-extrabold leading-tight tabular-nums"
                    style={{
                      color:
                        "valueColor" in kpi
                          ? kpi.valueColor
                          : kpi.highlight
                            ? "var(--accent)"
                            : "var(--fg)",
                    }}
                  >
                    {kpi.value}
                  </div>
                  <div
                    className="text-[10px] sm:text-[11px] mt-1.5 uppercase tracking-wide leading-snug"
                    style={{ color: "var(--muted)" }}
                  >
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stylized chart strip (suggests Training Progress + branch markers, not fake data) */}
            <div
              className="rounded-bnnr p-4 mb-6"
              style={{
                background: "var(--code-bg)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>
                  Training progress (selected path)
                </span>
                <span className="text-[10px]" style={{ color: "var(--muted)" }}>
                  accuracy · F1 · loss
                </span>
              </div>
              <svg
                className="w-full h-16 sm:h-20"
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
                aria-hidden
              >
                <line x1="0" y1="60" x2="400" y2="60" stroke="var(--border-subtle)" strokeWidth="1" />
                <path
                  d="M 0 52 L 40 48 L 80 44 L 120 38 L 160 35 L 200 32 L 240 28 L 280 26 L 320 22 L 360 18 L 400 14"
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.85)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M 0 58 L 60 54 L 120 50 L 180 42 L 240 36 L 300 30 L 360 24 L 400 20"
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.75)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
                {[100, 200, 300].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="8"
                    x2={x}
                    y2="72"
                    stroke="rgba(240, 160, 105, 0.35)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>
            </div>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-bnnr p-4" style={{ background: "var(--code-bg)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Monitor size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                    Branch Decision Tree
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Interactive visualization of the augmentation search tree. Click nodes for details, hover for metrics.
                </p>
              </div>
              <div className="rounded-bnnr p-4" style={{ background: "var(--code-bg)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                    Mobile Access
                  </span>
                </div>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  Scan the QR code printed in your terminal to monitor training from your phone. Full dashboard, responsive layout.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Colab notebooks */}
        <h3 className="text-xl font-semibold text-center mb-6" style={{ color: "var(--fg)" }}>
          Try it in Google Colab
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {notebooks.map((nb, i) => (
            <motion.a
              key={nb.title}
              href={nb.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card group cursor-pointer hover:border-[var(--accent)] transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  {nb.title}
                </h4>
                <ExternalLink size={14} style={{ color: "var(--muted)" }}
                  className="group-hover:text-[var(--accent)] transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {nb.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
