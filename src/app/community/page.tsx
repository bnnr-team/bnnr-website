"use client";

import { motion } from "framer-motion";
import {
  Github,
  MessageSquare,
  Bug,
  Lightbulb,
  BookOpen,
  ExternalLink,
  Terminal,
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
    title: "Detection Demo",
    description: "Object detection with Faster R-CNN, mAP metrics, and bbox-aware augmentations.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/detection/bnnr_detection_demo.ipynb",
  },
  {
    title: "Augmentations Guide",
    description: "Visual walkthrough of every BNNR augmentation with ICD/AICD deep-dive.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_augmentations_guide.ipynb",
  },
  {
    title: "Custom Data",
    description: "Bring your own images using ImageFolder or YOLO format.",
    link: "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/bnnr_custom_data.ipynb",
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
    href: "https://github.com/orgs/bnnr-team/discussions",
    cta: "Join Discussions",
  },
  {
    icon: <Bug size={24} />,
    title: "Report a Bug",
    description: "Found a bug? Open an issue with reproduction steps.",
    href: "https://github.com/bnnr-team/bnnr/issues/new?template=bug_report.md",
    cta: "Report Bug",
  },
  {
    icon: <Lightbulb size={24} />,
    title: "Feature Request",
    description: "Have an idea for a new feature or improvement?",
    href: "https://github.com/bnnr-team/bnnr/issues/new?template=feature_request.md",
    cta: "Request Feature",
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
          <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--muted)" }}>
            We welcome contributions of all sizes. Here is how to get started:
          </p>

          <div className="space-y-6">
            {/* Dev setup */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Terminal size={16} style={{ color: "var(--accent)" }} />
                <h4 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Development Setup
                </h4>
              </div>
              <pre className="!text-xs">
                <code>{`# Clone the repository
git clone https://github.com/bnnr-team/bnnr.git
cd bnnr

# Install in editable mode with dev dependencies
pip install -e ".[dev,dashboard,gpu]"

# Run tests
pytest tests/ -v

# Run linting
ruff check src/
mypy src/bnnr/`}</code>
              </pre>
            </div>

            {/* Guidelines */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <GitPullRequest size={16} style={{ color: "var(--accent)" }} />
                <h4 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Pull Request Guidelines
                </h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Fork the repo and create a feature branch",
                  "Write tests for new functionality",
                  "Ensure all tests pass before submitting",
                  "Follow the existing code style",
                  "Update documentation for API changes",
                  "Keep PRs focused and well-scoped",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 p-2 rounded-lg"
                    style={{ background: "var(--code-bg)" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: "var(--accent)" }} />
                    <span className="text-xs" style={{ color: "var(--fg)" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} style={{ color: "var(--accent)" }} />
                <h4 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Areas for Contribution
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "New augmentations",
                  "Additional XAI methods",
                  "Detection model adapters",
                  "Dashboard enhancements",
                  "Documentation improvements",
                  "Example notebooks",
                  "Performance optimizations",
                  "Bug fixes",
                ].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(240,160,105,0.1)",
                      border: "1px solid rgba(240,160,105,0.2)",
                      color: "var(--accent)",
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colab Notebooks */}
      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Colab Notebooks
          <span className="ml-3 text-xs font-normal px-2 py-1 rounded-full"
            style={{ background: "rgba(240,160,105,0.1)", color: "var(--accent)", verticalAlign: "middle" }}>
            Coming Soon
          </span>
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Interactive notebooks are being prepared. Once published, they will be directly runnable on Google Colab.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {notebooks.map((nb, i) => (
            <motion.div
              key={nb.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="card opacity-75"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} style={{ color: "var(--accent)" }} />
                  <h3 className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    {nb.title}
                  </h3>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full shrink-0"
                  style={{ background: "rgba(240,160,105,0.1)", color: "var(--accent)" }}>
                  Soon
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {nb.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
