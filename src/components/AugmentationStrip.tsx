"use client";

import { motion } from "framer-motion";

const augmentations = [
  { name: "ChurchNoise", description: "Regional noise profiles simulating sensor artifacts" },
  { name: "DifPresets", description: "Circular diffusion-like effects (warm, cold, sharpen)" },
  { name: "ProCAM", description: "Camera lens defects: vignette, chromatic aberration" },
  { name: "TeaStains", description: "Dried liquid stain watermark overlays" },
  { name: "LuxferGlass", description: "Frosted glass refraction distortion" },
  { name: "Smugs", description: "Fingerprint smudges and grease streaks" },
  { name: "Drust", description: "Dust and debris particle overlay on the lens" },
  { name: "ICD", description: "Intelligent Coarse Dropout using XAI saliency maps" },
  { name: "AICD", description: "Anti-ICD: keeps salient regions, perturbs background" },
];

export function AugmentationStrip() {
  return (
    <section className="section overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">
          Novel{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            augmentations
          </span>
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Beyond standard flips and crops — texture-rich transforms and
          XAI-driven augmentations that force your model to learn better features.
        </p>

        {/* Scrollable strip */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin">
          {augmentations.map((aug, i) => (
            <motion.div
              key={aug.name}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card shrink-0 w-64 snap-start"
            >
              {/* Color accent bar */}
              <div
                className="w-full h-1 rounded-full mb-4"
                style={{
                  background: `linear-gradient(90deg, var(--accent), rgba(240,160,105,0.3))`,
                }}
              />
              <h3 className="text-base font-semibold mb-2" style={{ color: "var(--fg)" }}>
                {aug.name}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                {aug.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
