"use client";

import {
  GitBranch,
  Crosshair,
  Brain,
  LayoutDashboard,
  Palette,
  Zap,
  Shield,
  Scan,
  Box,
} from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <GitBranch size={24} />,
    title: "Auto-Augment Search",
    description:
      "Iterative branching strategy tests augmentations against a baseline, keeping only those that improve performance. No manual tuning needed.",
    phase: "Train",
  },
  {
    icon: <Crosshair size={24} />,
    title: "Image Classification",
    description:
      "End-to-end workflow from baseline training to stakeholder-ready reports, metrics, and dashboard views.",
    phase: "Train",
  },
  {
    icon: <Box size={24} />,
    title: "Object Detection",
    description:
      "Full detection pipeline with YOLO and torchvision models (Faster R-CNN, RetinaNet, SSD). Bbox-aware augmentations, detection ICD/AICD, mAP metrics, and XAI saliency.",
    phase: "Train",
  },
  {
    icon: <Brain size={24} />,
    title: "XAI Explainability",
    description:
      "OptiCAM, GradCAM, NMF, and CRAFT heatmaps show why the model improves. Per-class diagnoses with severity and trend analysis.",
    phase: "Explain",
  },
  {
    icon: <Scan size={24} />,
    title: "ICD & AICD Augmentations",
    description:
      "XAI-driven augmentations that use saliency maps to intelligently mask or focus regions. Forces the model to learn robust features instead of shortcuts.",
    phase: "Improve",
  },
  {
    icon: <Palette size={24} />,
    title: "8 Novel Augmentations",
    description:
      "Unique texture-rich transforms: ChurchNoise, TeaStains, LuxferGlass, ProCAM, DifPresets, Smugs, Drust, and BasicAugmentation — designed for real-world domains.",
    phase: "Improve",
  },
  {
    icon: <Zap size={24} />,
    title: "GPU-Native Speed",
    description:
      "ChurchNoise, ProCAM, DifPresets, ICD, and AICD run natively on CUDA tensors. Kornia integration for differentiable augmentations.",
    phase: "Improve",
  },
  {
    icon: <LayoutDashboard size={24} />,
    title: "Real-time Dashboard",
    description:
      "Live monitoring with 512×512 high-res previews, branch decision trees, per-class metrics, and XAI insights. Accessible from your phone via QR code.",
    phase: "Prove",
  },
  {
    icon: <Shield size={24} />,
    title: "Auditable Reports",
    description:
      "Structured JSON reports with metrics, XAI heatmaps, and augmentation decisions. Export static dashboards for stakeholder review or regulatory compliance.",
    phase: "Prove",
  },
];

const phases = ["Train", "Explain", "Improve", "Prove"] as const;

export function FeaturesSection() {
  return (
    <section className="section" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">
          Everything you need for{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            better models
          </span>
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          BNNR combines XAI diagnostics, intelligent augmentation, and real-time
          monitoring into a single, cohesive toolkit.
        </p>

        {phases.map((phase) => {
          const phaseFeatures = features.filter((f) => f.phase === phase);
          if (phaseFeatures.length === 0) return null;
          return (
            <div key={phase} className="mb-10 last:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(240,160,105,0.1)",
                    border: "1px solid rgba(240,160,105,0.2)",
                    color: "var(--accent)",
                  }}
                >
                  {phase}
                </span>
              </div>
              <div className={`grid gap-6 ${phaseFeatures.length === 1 ? "md:grid-cols-1 max-w-lg" : phaseFeatures.length === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
                {phaseFeatures.map((feature, i) => (
                  <FeatureCard key={feature.title} {...feature} delay={i * 0.1} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
