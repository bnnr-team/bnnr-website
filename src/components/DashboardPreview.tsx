"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const DASHBOARD_SHOTS = [
  { src: "/dashboard/dashboard-overview.png", alt: "Dashboard overview" },
  {
    src: "/dashboard/branch-tree-improvements.png",
    alt: "Branch tree — test improvements before you commit",
  },
  { src: "/dashboard/dashboard-metrics.png", alt: "Metrics" },
  { src: "/dashboard/dashboard-samples.png", alt: "Samples and XAI" },
  { src: "/dashboard/dashboard-analysis.png", alt: "Analysis" },
  { src: "/dashboard/dashboard-insight.png", alt: "Dataset insight" },
] as const;

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
    description:
      "YOLOv8 on COCO128: bbox-aware augmentations, mAP, and three-panel detection XAI (install bnnr ≥ 0.3.0 on Colab)",
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
          Screenshots from a real BNNR training run — your session shows live metrics at{" "}
          <code className="text-[var(--fg)]">http://127.0.0.1:8080</code>.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {DASHBOARD_SHOTS.map((shot, i) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-bnnr overflow-hidden border border-[var(--border-subtle)]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={640}
                height={400}
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>

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
