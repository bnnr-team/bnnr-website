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

const DETECTION_CODE = `from bnnr import BNNRConfig, BNNRTrainer
from bnnr.detection_adapter import DetectionAdapter
from bnnr.detection_augmentations import (
    DetectionHorizontalFlip, DetectionVerticalFlip
)

adapter = DetectionAdapter(
    model=my_fasterrcnn,
    optimizer=optimizer,
    device="cuda",
)

config = BNNRConfig(
    task="detection",
    m_epochs=3,
    max_iterations=3,
)
# Auto-sets: selection_metric="map_50"

trainer = BNNRTrainer(
    adapter, train_loader, val_loader,
    augmentations, config,
)
result = trainer.run()`;

export function CodeShowcase() {
  const [tab, setTab] = useState<"classification" | "detection">("classification");
  const [copied, setCopied] = useState(false);

  const code = tab === "classification" ? CLASSIFICATION_CODE : DETECTION_CODE;

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
          Whether you&apos;re doing image classification or object detection,
          BNNR adapts to your workflow with minimal code.
        </p>

        <div className="max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 mb-4">
            <button
              onClick={() => setTab("classification")}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                tab === "classification"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
              style={{
                background: tab === "classification" ? "var(--code-bg)" : "transparent",
                borderBottom: tab === "classification" ? "2px solid var(--accent)" : "2px solid transparent",
              }}
            >
              Classification
            </button>
            <button
              onClick={() => setTab("detection")}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                tab === "detection"
                  ? "text-[var(--accent)]"
                  : "text-[var(--muted)] hover:text-[var(--fg)]"
              }`}
              style={{
                background: tab === "detection" ? "var(--code-bg)" : "transparent",
                borderBottom: tab === "detection" ? "2px solid var(--accent)" : "2px solid transparent",
              }}
            >
              Detection
            </button>
          </div>

          {/* Code block */}
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
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
