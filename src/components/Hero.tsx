"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import { TerminalAnimation } from "./TerminalAnimation";

export function Hero() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/logos/logo-icon-dark.png"
    : "/logos/logo-icon-white.png";

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg)]" />
        {isDark && (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(240,160,105,0.15) 0%, transparent 70%)",
              }}
            />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
              style={{
                background: "radial-gradient(circle, rgba(240,160,105,0.2) 0%, transparent 70%)",
              }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - text */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="mb-6">
              {mounted ? (
                <Image
                  src={logoSrc}
                  alt="BNNR"
                  width={180}
                  height={180}
                  className="neon-logo h-auto"
                  style={{ width: "180px" }}
                  priority
                />
              ) : (
                <div className="text-5xl font-black" style={{ color: "var(--accent)" }}>
                  BNNR
                </div>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--accent)" }}>
                Open-source PyTorch · MIT
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
                style={{ color: "var(--fg)" }}>
                Audit why your vision model{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
                  fails
                </span>
                {" "}— then fix it with XAI-guided augmentation
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
                <strong style={{ color: "var(--fg)" }}>BNNR</strong> (Bulletproof Neural Network Recipe) —
                structured reports, a live dashboard, and saliency-driven augmentations (ICD / AICD)
                that test what actually improves your metrics.
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Lowest-friction start:{" "}
                <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--code-bg)" }}>
                  bnnr analyze
                </code>{" "}
                on a checkpoint you already have — metrics, XAI, failure patterns, HTML report.{" "}
                <Link href="/docs/analyze/" className="underline" style={{ color: "var(--accent)" }}>
                  Audit in 60s
                </Link>
              </p>

              {/* Pipeline one-liner */}
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                {[
                  { step: "Train", desc: "your model" },
                  { step: "Explain", desc: "with XAI" },
                  { step: "Improve", desc: "via ICD/AICD" },
                  { step: "Prove", desc: "with reports" },
                ].map((item, i) => (
                  <span key={item.step} className="flex items-center gap-2">
                    {i > 0 && (
                      <span style={{ color: "var(--accent)" }}>→</span>
                    )}
                    <span
                      className="px-3 py-1.5 rounded-lg"
                      style={{
                        background: "rgba(240,160,105,0.1)",
                        border: "1px solid rgba(240,160,105,0.2)",
                        color: "var(--accent)",
                      }}
                    >
                      {item.step}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/docs/analyze/" className="btn-primary">
                Audit a model
                <ArrowRight size={18} />
              </Link>
              <Link href="/docs/getting-started/" className="btn-outline">
                Run demo
              </Link>
              <a
                href="https://github.com/bnnr-team/bnnr"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github size={18} />
                GitHub
              </a>
            </div>

            {/* Quick install */}
            <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
              <code className="px-4 py-2 rounded-lg text-sm font-mono"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--code-border)",
                  color: "var(--fg)",
                }}>
                pip install &quot;bnnr[dashboard]&quot;
              </code>
              <code className="px-4 py-2 rounded-lg text-sm font-mono"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--code-border)",
                  color: "var(--fg)",
                }}>
                python -m bnnr demo
              </code>
            </div>
          </div>

          {/* Right side - terminal */}
          <div className="hidden md:block">
            <TerminalAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
