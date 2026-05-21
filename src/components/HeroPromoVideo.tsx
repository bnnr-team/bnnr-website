"use client";

import { motion } from "framer-motion";

export function HeroPromoVideo() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-bnnr overflow-hidden border border-[var(--border-subtle)]"
        >
          <video
            src="/hero-promo.mp4"
            controls
            poster="/hero-promo-poster.jpg"
            className="w-full h-auto"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
