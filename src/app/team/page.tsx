"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Shield, Code2 } from "lucide-react";

const techStack = [
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "PyTorch", icon: "🔥", color: "#ee4c2c" },
  { name: "React", icon: "⚛️", color: "#61dafb" },
  { name: "TypeScript", icon: "📘", color: "#3178c6" },
  { name: "FastAPI", icon: "⚡", color: "#009688" },
  { name: "Kornia", icon: "📐", color: "#f0a069" },
  { name: "Tailwind CSS", icon: "🎨", color: "#38bdf8" },
  { name: "Vite", icon: "⚡", color: "#646cff" },
];

const teamMembers = [
  {
    name: "Mateusz Walo",
    role: "Founder & Lead Developer",
    bio: "Architect behind BNNR's core engine, XAI pipeline, and model improvement loop. Passionate about making neural networks more robust and explainable.",
    avatar: "/team/mateusz.jpeg",
    links: {
      github: "https://github.com/mateuszwalo",
    },
  },
  {
    name: "Diana Morzhak",
    role: "Software Developer & QA Engineer",
    bio: "Responsible for feature development, quality assurance, and end-to-end testing — ensuring reliability across classification and detection workflows.",
    avatar: "/team/diana.jpg",
    links: {},
  },
  {
    name: "Dominika Zydorczyk",
    role: "Community & Communications Specialist",
    bio: "Drives community outreach, content strategy, and project awareness for BNNR across social channels and developer communities.",
    avatar: "/team/dominika.webp",
    links: {},
  },
  {
    name: "Zuzanna Saczuk",
    role: "Graphic Designer & Brand Lead",
    bio: "Creator of BNNR's visual identity — from the molecular logo and neon branding to UI design and all visual assets.",
    avatar: "/team/zuzanna.jpg",
    links: {},
  },
];

export default function TeamPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
          About{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            BNNR
          </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          The team, the mission, and the technology behind Bulletproof Neural Network Recipe.
        </p>
      </div>

      {/* About section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--fg)" }}>
            What is BNNR?
          </h2>
          <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
            <p>
              <strong style={{ color: "var(--fg)" }}>BNNR</strong> (Bulletproof Neural Network Recipe) is an open-source toolkit that
              makes PyTorch vision models production-ready through a closed-loop pipeline:
              <strong style={{ color: "var(--fg)" }}> Train → Explain → Improve → Prove</strong>.
            </p>
            <p>
              BNNR trains a baseline model, explains its decisions with XAI, iteratively
              improves it with intelligent augmentation, and proves the result with structured
              reports and a live dashboard. Only changes that measurably improve performance
              are kept — no guesswork, no manual tuning.
            </p>
            <p>
              What makes BNNR unique is its combination of
              <strong style={{ color: "var(--fg)" }}> novel augmentations</strong> (ChurchNoise, ProCAM, DifPresets, and more),
              <strong style={{ color: "var(--fg)" }}> XAI explainability</strong> (OptiCAM heatmaps showing why the model improves),
              <strong style={{ color: "var(--fg)" }}> XAI-driven augmentations</strong> (ICD and AICD that use saliency maps to intelligently modify training images), and a
              <strong style={{ color: "var(--fg)" }}> real-time dashboard</strong> for monitoring the entire pipeline.
            </p>
            <p>
              BNNR supports <strong style={{ color: "var(--fg)" }}>classification</strong>,
              <strong style={{ color: "var(--fg)" }}> object detection</strong>, and
              <strong style={{ color: "var(--fg)" }}> multi-label classification</strong> tasks, with bbox-aware augmentations and
              task-specific metrics.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--fg)" }}>
          Team
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card text-center"
            >
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden"
                style={{
                  border: "2px solid rgba(240,160,105,0.3)",
                }}
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold mb-1" style={{ color: "var(--fg)" }}>
                {member.name}
              </h3>
              <p className="text-xs mb-3" style={{ color: "var(--accent)" }}>
                {member.role}
              </p>
              <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
                {member.bio}
              </p>

              {/* Links */}
              <div className="flex justify-center gap-2">
                {member.links.github && (
                  <a
                    href={member.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
                    style={{ color: "var(--muted)" }}
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--fg)" }}>
          Tech Stack
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{ background: "var(--code-bg)" }}
              >
                <span className="text-xl">{tech.icon}</span>
                <span className="text-sm font-medium" style={{ color: "var(--fg)" }}>
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* License */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: "rgba(240,160,105,0.1)", color: "var(--accent)" }}
          >
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)" }}>
            MIT License
          </h3>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "var(--muted)" }}>
            BNNR is free and open-source software released under the MIT License.
            Use it freely in any project — academic, personal, or otherwise.
            Contributions are always welcome.
          </p>
          <div className="mt-4">
            <a
              href="https://github.com/bnnr-team/bnnr/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--muted)" }}
            >
              <Code2 size={14} />
              View License
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
