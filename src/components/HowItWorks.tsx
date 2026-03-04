"use client";

import { motion } from "framer-motion";
import { Play, Brain, Wrench, FileCheck } from "lucide-react";

const steps = [
  {
    icon: <Play size={28} />,
    label: "Train",
    title: "Train your model",
    description:
      "Start with your PyTorch model and data. BNNR trains a baseline, then iteratively evaluates candidate augmentations — keeping only those that measurably improve performance.",
  },
  {
    icon: <Brain size={28} />,
    label: "Explain",
    title: "Understand with XAI",
    description:
      "OptiCAM, GradCAM, NMF, and CRAFT saliency maps reveal what the model focuses on. Per-class diagnoses expose blind spots and biases invisible to accuracy alone.",
  },
  {
    icon: <Wrench size={28} />,
    label: "Improve",
    title: "Fix with ICD / AICD",
    description:
      "Intelligent Coarse Dropout (ICD) masks salient regions, forcing the model to learn from context. Anti-ICD (AICD) sharpens focus on key features. Both are XAI-driven and automatic.",
  },
  {
    icon: <FileCheck size={28} />,
    label: "Prove",
    title: "Prove with evidence",
    description:
      "A structured report with metrics, XAI heatmaps, branch decisions, and before/after comparisons. Shareable, auditable, and ready for stakeholders or regulatory review.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">
          How{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            BNNR
          </span>{" "}
          works
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          A closed-loop pipeline that trains, diagnoses, repairs, and proves —
          so you ship models that actually work in production.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative"
            >
              {/* Connector arrow (between cards, desktop only) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-12 -right-3 z-10 text-lg"
                  style={{ color: "var(--accent)" }}
                >
                  →
                </div>
              )}

              <div className="card h-full group hover:border-[var(--accent)] transition-all duration-300">
                {/* Step number + icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "rgba(240,160,105,0.1)",
                      color: "var(--accent)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      Step {i + 1}
                    </div>
                    <div
                      className="text-lg font-bold"
                      style={{ color: "var(--fg)" }}
                    >
                      {step.label}
                    </div>
                  </div>
                </div>

                <h3
                  className="text-sm font-semibold mb-2"
                  style={{ color: "var(--fg)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--muted)" }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
