"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <Image
              src="/xai/icd-panel.png"
              alt="ICD — mask what the model looks at"
              width={720}
              height={400}
              className="rounded-bnnr w-full h-auto border border-[var(--border-subtle)]"
            />
            <figcaption className="text-sm text-center" style={{ color: "var(--muted)" }}>
              <strong style={{ color: "var(--fg)" }}>ICD</strong> — masks high-saliency regions so the model learns from context, not shortcuts.
            </figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <Image
              src="/xai/aicd-panel.png"
              alt="AICD — mask what the model ignores"
              width={720}
              height={400}
              className="rounded-bnnr w-full h-auto border border-[var(--border-subtle)]"
            />
            <figcaption className="text-sm text-center" style={{ color: "var(--muted)" }}>
              <strong style={{ color: "var(--fg)" }}>AICD</strong> — masks low-saliency background to sharpen focus on discriminative features.
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
