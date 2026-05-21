"use client";

import { motion } from "framer-motion";

export function HeroPromoVideo() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-sm mb-4" style={{ color: "var(--muted)" }}>
          Original demo recording with audio (4K, ~53s) — press Play
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-bnnr overflow-hidden border border-[var(--border-subtle)]"
        >
          <video
            src="/hero-promo.mp4"
            controls
            preload="auto"
            poster="/hero-promo-poster.jpg"
            className="w-full h-auto bg-black"
            playsInline
          />
        </motion.div>
      </div>
    </section>
  );
}
