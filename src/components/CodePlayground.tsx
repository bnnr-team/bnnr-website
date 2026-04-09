"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface Template {
  title: string;
  description: string;
  code: string;
}

const templates: Record<string, Template> = {
  classification: {
    title: "Classification",
    description:
      "Full classification pipeline with XAI explainability. Trains a baseline, then iteratively searches for the best augmentation stack.",
    code: `# pip install "bnnr[dashboard]"
from bnnr import quick_run, BNNRConfig

import torch.nn as nn

model = nn.Sequential(
    nn.Conv2d(3, 32, 3, padding=1),
    nn.BatchNorm2d(32),
    nn.ReLU(),
    nn.AdaptiveAvgPool2d(1),
    nn.Flatten(),
    nn.Linear(32, 10),
)

from torchvision import datasets, transforms
from torch.utils.data import DataLoader

transform = transforms.Compose([
    transforms.Resize(96),
    transforms.ToTensor(),   # [0, 1] range — do NOT normalize
])
train_ds = datasets.STL10("data", split="train", download=True, transform=transform)
val_ds   = datasets.STL10("data", split="test",  download=True, transform=transform)
train_loader = DataLoader(train_ds, batch_size=64, shuffle=True)
val_loader   = DataLoader(val_ds,   batch_size=64)

result = quick_run(
    model, train_loader, val_loader,
    config=BNNRConfig(
        m_epochs=5,
        max_iterations=3,
        device="auto",
        xai_enabled=True,
        report_preview_size=512,
        report_xai_size=512,
    )
)

print(f"Best accuracy: {result.best_metrics}")
print(f"Aug path:      {result.best_path}")`,
  },
  detection: {
    title: "Object Detection",
    description:
      "Detection pipeline with torchvision RetinaNet. Supports any torchvision or Ultralytics YOLO model via DetectionAdapter.",
    code: `# pip install "bnnr[dashboard]"
from bnnr import (
    BNNRConfig, BNNRTrainer, DetectionAdapter,
    DetectionHorizontalFlip, DetectionRandomScale,
    DetectionICD, detection_collate_fn_with_index,
)

import torch
from torch.utils.data import DataLoader
from torchvision.models.detection import retinanet_resnet50_fpn

model = retinanet_resnet50_fpn(weights="DEFAULT")

adapter = DetectionAdapter(
    model=model,
    optimizer=torch.optim.AdamW(model.parameters(), lr=1e-4),
    device="auto",
)

augmentations = [
    DetectionHorizontalFlip(probability=0.5),
    DetectionRandomScale(probability=0.5, scale_range=(0.8, 1.2)),
    DetectionICD(probability=0.3),
]

config = BNNRConfig(
    task="detection",
    m_epochs=5,
    max_iterations=3,
    metrics=["map_50", "map_50_95", "loss"],
)

trainer = BNNRTrainer(
    adapter, train_loader, val_loader,
    augmentations, config,
)
result = trainer.run()
print(f"Best mAP@50: {result.best_metrics}")`,
  },
  icd_aicd: {
    title: "ICD / AICD",
    description:
      "XAI-driven augmentations that use saliency maps to intelligently mask image regions. ICD masks high-attention areas; AICD masks low-attention areas.",
    code: `# pip install "bnnr[dashboard]"
from bnnr import quick_run, BNNRConfig
from bnnr.icd import ICD, AICD

import torchvision.models as models
import torch.nn as nn

model = models.resnet18(weights="DEFAULT")
model.fc = nn.Linear(model.fc.in_features, 10)

# ICD and AICD need the model and its target layers
# for computing saliency maps during training.
target_layers = [model.layer4[-1]]

icd = ICD(
    model=model,
    target_layers=target_layers,
    threshold_percentile=70.0,
    tile_size=8,
    fill_strategy="gaussian_blur",
    probability=0.5,
)

aicd = AICD(
    model=model,
    target_layers=target_layers,
    threshold_percentile=70.0,
    tile_size=8,
    fill_strategy="gaussian_blur",
    probability=0.5,
)

result = quick_run(
    model, train_loader, val_loader,
    config=BNNRConfig(
        m_epochs=5,
        max_iterations=3,
        device="auto",
        xai_enabled=True,  # required for ICD/AICD
    ),
    extra_augmentations=[icd, aicd],
)`,
  },
  custom_aug: {
    title: "Custom Augmentation",
    description:
      "Register your own augmentation with the BNNR registry. It automatically gets probability, intensity, and batch support.",
    code: `# pip install bnnr
import numpy as np
from bnnr.augmentations import BaseAugmentation, AugmentationRegistry

@AugmentationRegistry.register("my_custom_aug")
class MyCustomAug(BaseAugmentation):
    """Custom augmentation — inherits probability, intensity, batch support."""

    def __init__(self, strength: float = 0.5, **kwargs):
        super().__init__(**kwargs)
        self.strength = strength

    def apply(self, image: np.ndarray) -> np.ndarray:
        image = self.validate_input(image)
        noise = np.random.randint(
            0, int(255 * self.strength),
            image.shape, dtype=np.uint8,
        )
        return np.clip(
            image.astype(np.int16) + noise, 0, 255
        ).astype(np.uint8)


# Create via registry
aug = AugmentationRegistry.create(
    "my_custom_aug",
    probability=0.5,
    strength=0.3,
)

# Add to a preset
from bnnr import auto_select_augmentations
augmentations = auto_select_augmentations()
augmentations.append(aug)`,
  },
};

type TemplateKey = keyof typeof templates;

export function CodePlayground() {
  const [activeTemplate, setActiveTemplate] =
    useState<TemplateKey>("classification");
  const [copied, setCopied] = useState(false);

  const template = templates[activeTemplate];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--fg)" }}
        >
          Code Playground
        </h3>
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          Copy-paste ready templates for every BNNR workflow. Each example is
          self-contained and runnable as-is.
        </p>
      </div>

      {/* Template tabs */}
      <div className="flex flex-wrap gap-2">
        {(Object.keys(templates) as TemplateKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTemplate(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTemplate === key ? "shadow-glow" : "hover:border-[var(--accent)]"
            }`}
            style={{
              background:
                activeTemplate === key
                  ? "rgba(240,160,105,0.15)"
                  : "var(--code-bg)",
              border: `1px solid ${
                activeTemplate === key
                  ? "var(--accent)"
                  : "var(--border-color)"
              }`,
              color:
                activeTemplate === key ? "var(--accent)" : "var(--muted)",
            }}
          >
            {templates[key].title}
          </button>
        ))}
      </div>

      {/* Template description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {template.description}
      </p>

      {/* Code display */}
      <div className="relative group">
        <pre className="!max-h-[500px] overflow-auto">
          <code className="text-sm leading-relaxed">{template.code}</code>
        </pre>
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: copied ? "#22c55e" : "var(--muted)",
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button onClick={handleCopy} className="btn-primary text-sm">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    </div>
  );
}
