"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const methods = [
  {
    name: "ICD",
    title: "Intelligent Coarse Dropout",
    description:
      "Masks high-saliency regions the model already relies on, forcing it to learn from surrounding context instead of shortcuts.",
  },
  {
    name: "AICD",
    title: "Anti-ICD",
    description:
      "Masks low-saliency background and irrelevant textures, sharpening focus on the features that actually discriminate classes.",
  },
] as const;

export function XaiProofSection() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center">
          XAI-driven{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            augmentations
          </span>
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          ICD and AICD use saliency maps to guide augmentation — not random flips and crops.
          See interactive before/after previews on the{" "}
          <Link href="/playground/" className="underline" style={{ color: "var(--accent)" }}>
            playground
          </Link>
          .
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
          {methods.map((method, i) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card"
            >
              <div
                className="text-xs font-mono uppercase tracking-wider mb-2"
                style={{ color: "var(--accent)" }}
              >
                {method.name}
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>
                {method.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
