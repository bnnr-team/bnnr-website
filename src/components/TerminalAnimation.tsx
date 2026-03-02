"use client";

import { useEffect, useState } from "react";

const LINES = [
  { type: "prompt", text: "$ " },
  { type: "command", text: 'pip install "bnnr[dashboard]"' },
  { type: "output", text: "Successfully installed bnnr-0.1.0" },
  { type: "blank", text: "" },
  { type: "prompt", text: "$ " },
  { type: "command", text: "bnnr train --dataset stl10 --with-dashboard" },
  { type: "output", text: "" },
  { type: "output", text: "  ╔══════════════════════════════════════╗" },
  { type: "output", text: "  ║  BNNR v0.1 — Train·Explain·Improve  ║" },
  { type: "output", text: "  ╚══════════════════════════════════════╝" },
  { type: "blank", text: "" },
  { type: "output", text: "▸ Dataset:    STL-10 (96×96, 10 classes)" },
  { type: "output", text: "▸ Device:     CUDA (RTX 4090)" },
  { type: "output", text: "▸ Dashboard:  http://127.0.0.1:8080" },
  { type: "blank", text: "" },
  { type: "accent", text: "━━━ Iteration 1/5 ━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: "  Baseline accuracy:    72.4%" },
  { type: "success", text: "  ✓ church_noise:       74.1% (+1.7pp)" },
  { type: "dim", text: "  ✗ basic_augmentation: 71.8% (-0.6pp)" },
  { type: "success", text: "  → Selected: church_noise" },
  { type: "blank", text: "" },
  { type: "accent", text: "━━━ Iteration 2/5 ━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: "  Current best:         74.1%" },
  { type: "success", text: "  ✓ dif_presets:        76.8% (+2.7pp)" },
  { type: "success", text: "  → Selected: dif_presets" },
];

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= LINES.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dot" style={{ background: "#ef4444" }} />
        <div className="terminal-dot" style={{ background: "#eab308" }} />
        <div className="terminal-dot" style={{ background: "#22c55e" }} />
        <span className="ml-3 text-xs" style={{ color: "var(--muted)" }}>
          Terminal
        </span>
      </div>
      <div className="terminal-body min-h-[400px]">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="leading-6">
            {line.type === "blank" && <br />}
            {line.type === "prompt" && (
              <span>
                <span className="prompt">{line.text}</span>
              </span>
            )}
            {line.type === "command" && (
              <span className="command">{line.text}</span>
            )}
            {line.type === "output" && (
              <span style={{ color: "#94a3b8" }}>{line.text}</span>
            )}
            {line.type === "success" && (
              <span style={{ color: "#22c55e" }}>{line.text}</span>
            )}
            {line.type === "accent" && (
              <span style={{ color: "#f0a069" }}>{line.text}</span>
            )}
            {line.type === "dim" && (
              <span style={{ color: "#64748b" }}>{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < LINES.length && <span className="terminal-cursor" />}
      </div>
    </div>
  );
}
