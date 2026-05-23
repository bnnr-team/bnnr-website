"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CLI_CODE = `# Zero flags — CIFAR-10 demo, ICD preset, live dashboard (~1 min)
python -m bnnr demo

# Interactive wizard (dataset, preset, sample limits)
python -m bnnr quickstart

# Full training with built-in defaults
python -m bnnr train --dataset cifar10 --preset light --with-dashboard`;

const PYTHON_CODE = `import bnnr

# One-liner when you already have model + loaders
result = bnnr.quick_run(model, train_loader, val_loader)
print(result.best_metrics)

# Smoke test: one epoch, one augmentation branch
result = bnnr.quick_run(
    model, train_loader, val_loader,
    m_epochs=1,
    max_iterations=1,
)`;

type Tab = "cli" | "python";

export function CodeShowcase() {
  const [tab, setTab] = useState<Tab>("cli");
  const [copied, setCopied] = useState(false);

  const code = tab === "cli" ? CLI_CODE : PYTHON_CODE;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center">
          Simple yet{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            powerful
          </span>{" "}
          API
        </h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Start from the CLI with <code className="text-xs">python -m bnnr demo</code>, or plug
          BNNR into your existing PyTorch training loop with <code className="text-xs">quick_run</code>.
        </p>

        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-3">
            {(
              [
                { id: "cli" as const, label: "CLI" },
                { id: "python" as const, label: "Python API" },
              ] as const
            ).map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                style={{
                  background: tab === id ? "rgba(240,160,105,0.15)" : "transparent",
                  border: `1px solid ${tab === id ? "rgba(240,160,105,0.4)" : "var(--border-color)"}`,
                  color: tab === id ? "var(--accent)" : "var(--muted)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="relative group">
            <pre className="!rounded-tl-none">
              <code className="text-sm leading-relaxed">{code}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--muted)",
              }}
              aria-label="Copy code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
