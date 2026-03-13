"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, ArrowRight, FlaskConical } from "lucide-react";

export default function BenchmarkPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <div
          className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ background: "rgba(240,160,105,0.1)" }}
        >
          <BarChart3 size={40} style={{ color: "var(--accent)" }} />
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          style={{ color: "var(--fg)" }}
        >
          Benchmark{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            Coming Soon
          </span>
        </h1>

        <p
          className="text-lg leading-relaxed mb-8"
          style={{ color: "var(--muted)" }}
        >
          We are running comprehensive benchmarks comparing BNNR augmentations
          against Albumentations and Torchvision across multiple datasets and
          tasks. Full results with reproducible methodology, per-dataset
          breakdowns, and interactive visualizations will be published here.
        </p>

        <div
          className="card inline-flex items-center gap-3 mb-10"
          style={{ borderColor: "rgba(240,160,105,0.3)" }}
        >
          <FlaskConical size={18} style={{ color: "var(--accent)" }} />
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            Classification and multi-label benchmarks in progress
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/docs/augmentations/" className="btn-primary">
            View Augmentations
            <ArrowRight size={18} />
          </Link>
          <Link href="/docs/getting-started/" className="btn-outline">
            Get Started
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
