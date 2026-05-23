"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function StoryProofSection() {
  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center">
          Same accuracy.{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            Different model behavior.
          </span>
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Validation accuracy can hide shortcut learning. BNNR makes attention,
          confidence, and branch decisions visible — then keeps only measurable
          improvements.
        </p>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 space-y-3"
        >
          <Image
            src="/story/xai-same-accuracy-diff-behavior.png"
            alt="Same validation accuracy but different saliency maps and confidence"
            width={1200}
            height={600}
            className="rounded-bnnr w-full h-auto border border-[var(--border-subtle)]"
            priority
          />
          <figcaption className="text-sm text-center" style={{ color: "var(--muted)" }}>
            Same val accuracy — different where the model looks (and confidence on the sample).
          </figcaption>
        </motion.figure>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-10 space-y-3"
        >
          <Image
            src="/story/xai-measurable-gains-wrong-to-correct.png"
            alt="Wrong to correct prediction along the selected augmentation path"
            width={1200}
            height={600}
            className="rounded-bnnr w-full h-auto border border-[var(--border-subtle)]"
          />
          <figcaption className="text-sm text-center" style={{ color: "var(--muted)" }}>
            Only measurable improvements are kept along the selected path.
          </figcaption>
        </motion.figure>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/docs/analyze/" className="btn-primary">
            Audit a model (bnnr analyze)
            <ArrowRight size={18} />
          </Link>
          <Link href="/docs/getting-started/" className="btn-outline">
            Run a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
