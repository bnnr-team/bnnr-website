"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Cpu,
  Zap,
  Sparkles,
  Eye,
  Shield,
  ChevronRight,
} from "lucide-react";

/* ================================================================
   DATA
   ================================================================ */

interface AugmentationType {
  id: string;
  name: string;
  category: string;
  runtime: "GPU" | "CPU";
  tagline: string;
  description: string;
  benefit: string;
  xaiDriven?: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: AugmentationType[];
}

const allAugmentations: AugmentationType[] = [
  {
    id: "church_noise",
    name: "ChurchNoise",
    category: "noise",
    runtime: "GPU",
    tagline: "Spatially-varying sensor noise",
    description:
      "Partitions the image into regions using random lines, then applies a different noise profile (white, Gaussian, or pink) per region with configurable strength. Intensity blending controls how much of the augmented image replaces the original. Previews on this page use a stronger marketing preset: bnnr.augmentations.ChurchNoise (probability=1.0, intensity=1.0, num_lines=5, noise_strength_range=(12, 32)).",
    benefit:
      "Helps models tolerate noise that varies spatially across the frame — typical of cheap cameras, low-light capture, or mixed sensor readouts — without assuming a single global noise profile.",
  },
  {
    id: "procam",
    name: "ProCAM",
    category: "noise",
    runtime: "GPU",
    tagline: "Camera hardware simulation",
    description:
      "Simulates different camera hardware profiles by applying white balance shifts and gamma correction. Built-in profiles: cheap, smartphone, pro, webcam, darkroom. Runs on CUDA tensors for maximum throughput. Previews use bnnr.augmentations.ProCAM (probability=1.0, intensity=1.85) so the color shift reads clearly in the gallery.",
    benefit:
      "Useful when training data comes from one camera family but deployment spans different white balance, gamma, and color response — it encourages invariance to those shifts.",
  },
  {
    id: "drust",
    name: "Drust",
    category: "texture",
    runtime: "CPU",
    tagline: "Dust and debris on lens",
    description:
      "Generates multi-layer particle overlays with per-particle Gaussian blur, simulating dust, dirt, and debris on a lens. Each particle has randomized size, opacity, position, and blur radius. Previews use a denser preset: bnnr.augmentations.Drust (probability=1.0, intensity=2.0, layers=6, base_particles=6500).",
    benefit:
      "Makes models robust to dirty lenses in outdoor and industrial environments — surveillance cameras, factory inspection, agriculture drones, autonomous vehicles.",
  },
  {
    id: "smugs",
    name: "Smugs",
    category: "texture",
    runtime: "CPU",
    tagline: "Fingerprint smudges and grease",
    description:
      "Creates elongated, streak-based HSV modifications that mimic fingerprint smudges and grease marks on a lens. The streaks follow natural finger motion patterns with directional color shifts. Previews use bnnr.augmentations.Smugs (probability=1.0, intensity=2.0, num_streaks=14).",
    benefit:
      "Reduces sensitivity to fingerprints, grease, and streaks on the lens — common in handheld devices, kiosks, and field-deployed cameras.",
  },
  {
    id: "tea_stains",
    name: "TeaStains",
    category: "texture",
    runtime: "CPU",
    tagline: "Stain and watermark overlays",
    description:
      "Applies palette-based stain overlays with organic texture masks, simulating dried liquid marks, watermarks, or natural blemishes. Each stain has a unique shape derived from image palette colors. Previews use bnnr.augmentations.TeaStains (probability=1.0, intensity=1.35).",
    benefit:
      "Adds controlled stain-like overlays that mimic smudges, dried liquid marks, or uneven surface texture — relevant for documents, microscopy-style imagery, and worn surfaces.",
  },
  {
    id: "luxfer_glass",
    name: "LuxferGlass",
    category: "distortion",
    runtime: "CPU",
    tagline: "Frosted glass refraction",
    description:
      "Divides the image into a configurable grid and applies localized refraction-like displacement with wave effects. Simulates viewing through textured or frosted glass — preserves overall structure while distorting fine details. Previews use a stronger grid/wave preset: bnnr.augmentations.LuxferGlass (probability=1.0, intensity=1.0, grid_range=(48, 96), glass_thickness=(0.07, 0.16), wave_strength=(0.55, 1.15), blur_kernel=(3, 9)).",
    benefit:
      "Simulates imaging through protective covers, plastic housings, or underwater enclosures — common in industrial inspection, underwater robotics, and security cameras.",
  },
  {
    id: "dif_presets",
    name: "DifPresets",
    category: "distortion",
    runtime: "GPU",
    tagline: "Color temperature circles",
    description:
      "Randomly places circular regions on the image and applies color temperature shifts inside them — warm, cold, vivid, faded, sharpened, or blurred. Runs natively on CUDA tensors. Previews use more/larger circles: bnnr.augmentations.DifPresets (probability=1.0, intensity=1.5, num_circles_range=(6, 11), radius_range=(28, 100), feather=26).",
    benefit:
      "Supports mixed-lighting deployment: warm indoor, cold outdoor, fluorescent, or LED — local color temperature pockets without relighting the whole scene.",
  },
  {
    id: "basic_augmentation",
    name: "BasicAugmentation",
    category: "distortion",
    runtime: "CPU",
    tagline: "General-purpose regional transforms",
    description:
      "Applies chromatic aberration or HSV adjustments to random rectangular regions, with an optional global Gaussian blur. A mild, versatile transform for general use. Previews use a stronger gallery preset: bnnr.augmentations.BasicAugmentation (probability=1.0, intensity=1.2, global_blur_sigma=0.65).",
    benefit:
      "A safe baseline augmentation that adds diversity without strong domain assumptions. Good starting point when you're unsure which degradation matters most for your use case.",
  },
  {
    id: "icd",
    name: "ICD",
    category: "xai",
    runtime: "GPU",
    tagline: "Mask what the model looks at",
    description:
      "Intelligent Coarse Dropout uses BNNR's OptiCAM explainer to compute a saliency map, then masks the highest-saliency tiles with Gaussian blur. This forces the model to learn from contextual features instead of relying on shortcuts. Previews generated with bnnr.icd.ICD (threshold_percentile=70, tile_size=8, fill_strategy=gaussian_blur) on a pretrained ResNet-18.",
    benefit:
      "Fixes models that over-focus on one region. When the XAI heatmap shows a single hotspot, ICD redistributes attention across the entire image, improving generalization on unseen data.",
    xaiDriven: true,
  },
  {
    id: "aicd",
    name: "AICD",
    category: "xai",
    runtime: "GPU",
    tagline: "Mask what the model ignores",
    description:
      "Anti-ICD is the complement of ICD: it masks the least salient tiles (background, irrelevant textures), preserving only the regions the model considers important. Previews generated with bnnr.icd.AICD (threshold_percentile=15, tile_size=16, fill_strategy=gaussian_blur) on a pretrained ResNet-18.",
    benefit:
      "Fixes models with diffuse attention spread across the whole image. AICD concentrates learning on genuinely discriminative features, boosting per-class accuracy on fine-grained recognition tasks.",
    xaiDriven: true,
  },
];

const categories: Category[] = [
  {
    id: "noise",
    label: "Noise & Sensor",
    icon: <Sparkles size={15} />,
    items: allAugmentations.filter((a) => a.category === "noise"),
  },
  {
    id: "texture",
    label: "Texture & Overlay",
    icon: <Eye size={15} />,
    items: allAugmentations.filter((a) => a.category === "texture"),
  },
  {
    id: "distortion",
    label: "Distortion & Color",
    icon: <Shield size={15} />,
    items: allAugmentations.filter((a) => a.category === "distortion"),
  },
  {
    id: "xai",
    label: "XAI-Driven",
    icon: <Brain size={15} />,
    items: allAugmentations.filter((a) => a.category === "xai"),
  },
];

const domains = [
  { id: "vehicle", name: "Urban Traffic" },
  { id: "fish", name: "Underwater Marine" },
];

/* ================================================================
   COMPONENT
   ================================================================ */

export function AugmentationGallery() {
  const [expandedCats, setExpandedCats] = useState<Set<string>>(
    new Set(["noise"])
  );
  const [selectedAug, setSelectedAug] = useState(allAugmentations[0]);
  const [activeDomain, setActiveDomain] = useState(domains[0]);

  const toggleCategory = (catId: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(catId)) next.delete(catId);
      else next.add(catId);
      return next;
    });
  };

  const selectAug = (aug: AugmentationType) => {
    setSelectedAug(aug);
    if (!expandedCats.has(aug.category)) {
      setExpandedCats((prev) => new Set(prev).add(aug.category));
    }
  };

  const isXai = selectedAug.xaiDriven;

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-0 min-h-[600px]">
      {/* ════════════════════════════════════════════════════════
         SIDEBAR — docs-style collapsible navigation
         ════════════════════════════════════════════════════════ */}
      <nav
        className="lg:border-r py-5 px-3 space-y-1 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto lg:sticky lg:top-24"
        style={{ borderColor: "var(--border-subtle)" }}
      >
        <div
          className="text-[11px] font-semibold uppercase tracking-widest mb-4 px-2"
          style={{ color: "var(--muted)" }}
        >
          Augmentations
        </div>

        {categories.map((cat) => {
          const isExpanded = expandedCats.has(cat.id);

          return (
            <div key={cat.id} className="mb-0.5">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(cat.id)}
                className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[rgba(240,160,105,0.06)]"
                style={{ color: isExpanded ? "var(--accent)" : "var(--fg)" }}
              >
                <ChevronRight
                  size={13}
                  className="transition-transform duration-200 shrink-0"
                  style={{
                    transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
                    color: isExpanded ? "var(--accent)" : "var(--muted)",
                  }}
                />
                <span className="flex items-center gap-1.5">
                  {cat.icon}
                  {cat.label}
                </span>
              </button>

              {/* Collapsible items */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="ml-5 border-l py-1 space-y-0.5" style={{ borderColor: "var(--border-subtle)" }}>
                      {cat.items.map((aug) => {
                        const isActive = selectedAug.id === aug.id;
                        return (
                          <button
                            key={aug.id}
                            onClick={() => selectAug(aug)}
                            className="w-full text-left flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-r-lg text-[13px] transition-all"
                            style={{
                              color: isActive ? "var(--accent)" : "var(--muted)",
                              background: isActive
                                ? "rgba(240,160,105,0.10)"
                                : "transparent",
                              borderLeft: isActive
                                ? "2px solid var(--accent)"
                                : "2px solid transparent",
                              fontWeight: isActive ? 600 : 400,
                              marginLeft: "-1px",
                            }}
                          >
                            <span className="font-mono">{aug.name}</span>
                            <span
                              className="ml-auto text-[9px] px-1 py-0.5 rounded font-semibold flex items-center gap-0.5 shrink-0"
                              style={{
                                background:
                                  aug.runtime === "GPU"
                                    ? "rgba(34,197,94,0.1)"
                                    : "rgba(96,165,250,0.1)",
                                color:
                                  aug.runtime === "GPU" ? "#22c55e" : "#60a5fa",
                              }}
                            >
                              {aug.runtime === "GPU" ? (
                                <Zap size={8} />
                              ) : (
                                <Cpu size={8} />
                              )}
                              {aug.runtime}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* ════════════════════════════════════════════════════════
         MAIN CONTENT — images + detail
         ════════════════════════════════════════════════════════ */}
      <div className="py-5 lg:pl-8 space-y-6">
        {/* ── Header row: aug name + domain picker ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={selectedAug.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-bold font-mono"
                style={{ color: "var(--fg)" }}
              >
                {selectedAug.name}
              </motion.h2>
            </AnimatePresence>
            <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
              {selectedAug.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Sample
            </span>
            {domains.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDomain(d)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background:
                    activeDomain.id === d.id
                      ? "rgba(240,160,105,0.15)"
                      : "var(--code-bg)",
                  border: `1px solid ${activeDomain.id === d.id ? "rgba(240,160,105,0.4)" : "var(--border-color)"}`,
                  color:
                    activeDomain.id === d.id ? "var(--accent)" : "var(--fg)",
                }}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>

        {/* ── Image comparison ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedAug.id}-${activeDomain.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {isXai ? (
              <div className="grid md:grid-cols-3 gap-4">
                <ImagePanel
                  src={`/playground/${activeDomain.id}_original.png`}
                  label="Original"
                />
                <ImagePanel
                  src={`/playground/${activeDomain.id}_saliency.png`}
                  label="XAI Saliency Map"
                  accent
                />
                <ImagePanel
                  src={`/playground/${activeDomain.id}_${selectedAug.id}.png`}
                  label={`After ${selectedAug.name}`}
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-5">
                <ImagePanel
                  src={`/playground/${activeDomain.id}_original.png`}
                  label="Original"
                />
                <ImagePanel
                  src={`/playground/${activeDomain.id}_${selectedAug.id}.png`}
                  label={`After ${selectedAug.name}`}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Detail card ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAug.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="grid md:grid-cols-2 gap-4"
          >
            {/* Description */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "var(--code-bg)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {selectedAug.description}
              </p>
            </div>

            {/* Why use it */}
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(240,160,105,0.04)",
                border: "1px solid rgba(240,160,105,0.15)",
              }}
            >
              <span
                className="text-[11px] font-bold uppercase tracking-wider block mb-2"
                style={{ color: "var(--accent)" }}
              >
                Why use it
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {selectedAug.benefit}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── XAI explanation (only for ICD/AICD) ── */}
        {isXai && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            className="rounded-xl p-5"
            style={{
              background: "var(--code-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain size={16} style={{ color: "var(--accent)" }} />
              <span
                className="text-sm font-bold"
                style={{ color: "var(--accent)" }}
              >
                How {selectedAug.name} works
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              {selectedAug.id === "icd"
                ? "The saliency map (center) was computed by bnnr.xai.generate_saliency_maps() using the OptiCAM method on a pretrained ResNet-18. Red/warm regions indicate where the model focuses most. ICD (bnnr.icd.ICD) identifies those highest-saliency 8×8 tiles and replaces them with Gaussian blur, forcing the model to learn from surrounding context instead of memorizing shortcut features."
                : "The saliency map (center) was computed by bnnr.xai.generate_saliency_maps() using the OptiCAM method on a pretrained ResNet-18. Red/warm regions indicate where the model focuses most. AICD (bnnr.icd.AICD) masks the lowest-saliency tiles — cold/blue areas representing background and irrelevant textures — sharpening the training signal on the genuinely discriminative features."}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   IMAGE PANEL
   ================================================================ */

function ImagePanel({
  src,
  label,
  accent,
}: {
  src: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div className="space-y-2.5">
      <span
        className="text-xs font-semibold block text-center uppercase tracking-wider"
        style={{ color: accent ? "var(--accent)" : "var(--muted)" }}
      >
        {label}
      </span>
      <div
        className="rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg"
        style={{
          border: accent
            ? "2px solid var(--accent)"
            : "1px solid var(--border-color)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="w-full aspect-[4/3] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
