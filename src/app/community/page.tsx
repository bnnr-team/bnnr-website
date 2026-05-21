"use client";

import { motion } from "framer-motion";
import {
  Github,
  MessageSquare,
  Bug,
  Lightbulb,
  BookOpen,
  ExternalLink,
  GitPullRequest,
  Code2,
} from "lucide-react";

const notebooks = [
  {
    title: "Classification Demo",
    description: "Full BNNR pipeline on STL-10 with XAI explainability and live dashboard.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/classification/bnnr_classification_demo.ipynb",
  },
  {
    title: "Augmentations Guide",
    description: "Visual walkthrough of every BNNR augmentation with ICD/AICD deep-dive.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_augmentations_guide.ipynb",
  },
  {
    title: "Custom Data",
    description: "Bring your own images using an ImageFolder-style layout.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_custom_data.ipynb",
  },
  {
    title: "Detection Demo",
    description:
      "YOLOv8 on COCO128 with bbox-aware augmentations, mAP metrics, and detection XAI (use bnnr ≥ 0.3.0 from PyPI).",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/detection/bnnr_detection_demo.ipynb",
  },
];

const links = [
  {
    icon: <Github size={24} />,
    title: "GitHub Repository",
    description: "Star the repo, browse source code, and track releases.",
    href: "https://github.com/bnnr-team/bnnr",
    cta: "View Repository",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Discussions",
    description: "Ask questions, share ideas, and connect with other users.",
    href: "https://github.com/bnnr-team/bnnr/discussions",
    cta: "Join Discussions",
  },
  {
    icon: <Bug size={24} />,
    title: "Report a Bug",
    description: "Found a bug? Open an issue with reproduction steps.",
    href: "https://github.com/bnnr-team/bnnr/issues/new?template=bug_report.yml",
    cta: "Report Bug",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Feature Request",
    description: "Have an idea for a new feature or improvement?",
    href: "https://github.com/bnnr-team/bnnr/issues/new?template=feature_request.yml",
    cta: "Request Feature",
  },
  {
    icon: <GitPullRequest size={24} />,
    title: "Contributing Guide",
    description: "Dev setup, tests, PR workflow, and good first issues.",
    href: "https://github.com/bnnr-team/bnnr/blob/main/CONTRIBUTING.md",
    cta: "Read CONTRIBUTING",
  },
  {
    icon: <Code2 size={24} />,
    title: "Good First Issues",
    description: "Starter tasks for new contributors.",
    href: "https://github.com/bnnr-team/bnnr/issues?q=label%3A%22good+first+issue%22",
    cta: "Browse Issues",
  },
];

export default function CommunityPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            Community
          </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          BNNR is open-source and community-driven. Get involved, contribute, or just say hello.
        </p>
      </div>

      {/* Community links */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Connect
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card group cursor-pointer hover:border-[var(--accent)] transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "rgba(240,160,105,0.1)", color: "var(--accent)" }}
                >
                  {link.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold mb-1" style={{ color: "var(--fg)" }}>
                    {link.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                    {link.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium"
                    style={{ color: "var(--accent)" }}>
                    {link.cta}
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contributing */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Contributing
        </h2>
        <div className="card">
          <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--muted)" }}>
            Full contributor guide (dev setup, tests, PR workflow, good first issues) lives in the
            library repository — kept in sync with the CLI and CI.
          </p>
          <a
            href="https://github.com/bnnr-team/bnnr/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <GitPullRequest size={16} />
            CONTRIBUTING.md on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* Colab Notebooks */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Colab Notebooks
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Run BNNR directly in Google Colab — no local setup required.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
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
                <div className="flex items-center gap-2">
                  <BookOpen size={16} style={{ color: "var(--accent)" }} />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {nb.title}
                  </h3>
                </div>
                <ExternalLink size={14} style={{ color: "var(--muted)" }}
                  className="group-hover:text-[var(--accent)] transition-colors shrink-0 mt-0.5" />
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {nb.description}
              </p>
            </motion.a>
          ))}
        </div>
      </section>
    </div>
  );
}
