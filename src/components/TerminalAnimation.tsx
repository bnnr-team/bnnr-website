"use client";

import { useEffect, useState } from "react";

const LINES = [
  { type: "prompt", text: "$ " },
  { type: "command", text: 'pip install "bnnr[dashboard]"' },
  { type: "output", text: "Successfully installed bnnr-0.1.0" },
  { type: "blank", text: "" },
  { type: "prompt", text: "$ " },
  { type: "command", text: "python -m bnnr train --dataset cifar10 --with-dashboard" },
  { type: "blank", text: "" },
  { type: "banner", text: "BNNR v0.1 - Train → Explain → Improve → Prove" },
  { type: "blank", text: "" },
  { type: "output", text: "▸ Dataset:    CIFAR-10 (32×32, 10 classes)" },
  { type: "output", text: "▸ Device:     auto" },
  { type: "output", text: "▸ Dashboard:  http://127.0.0.1:8080" },
  { type: "blank", text: "" },
  { type: "accent", text: "━━━ Iteration 1/5 ━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: "  Baseline:             training complete" },
  { type: "success", text: "  ✓ church_noise:       candidate evaluated" },
  { type: "dim", text: "  ✗ basic_augmentation: candidate evaluated" },
  { type: "success", text: "  → Selected branch:    church_noise" },
  { type: "blank", text: "" },
  { type: "accent", text: "━━━ Iteration 2/5 ━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: "  Evaluating next candidate set…" },
  { type: "success", text: "  ✓ dif_presets:        candidate evaluated" },
  { type: "success", text: "  → Selected branch:    dif_presets" },
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
            {line.type === "banner" && (
              <div
                style={{
                  display: "inline-block",
                  margin: "2px 0 2px 0",
                  padding: "4px 12px",
                  border: "3px double #94a3b8",
                  color: "#94a3b8",
                }}
              >
                {line.text}
              </div>
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
