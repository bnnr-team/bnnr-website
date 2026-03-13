"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

const CLASSIFICATION_CODE = `from bnnr import quick_run, BNNRConfig

result = quick_run(
    model, train_loader, val_loader,
    config=BNNRConfig(
        m_epochs=5,
        max_iterations=3,
        device="auto",
    )
)
print(f"Best: {result.best_metrics}")
# Best: {'accuracy': 0.847, 'f1_macro': 0.845}`;

export function CodeShowcase() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(CLASSIFICATION_CODE);
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
          Whether you&apos;re doing image classification or multi-label,
          BNNR adapts to your workflow with minimal code.
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Code block */}
          <div className="relative group">
            <pre className="!rounded-tl-none">
              <code className="text-sm leading-relaxed">{CLASSIFICATION_CODE}</code>
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-color)",
                color: "var(--muted)",
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
