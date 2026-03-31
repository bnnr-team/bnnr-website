#!/usr/bin/env python3
"""Regenerate public/playground/*.png for the marketing Playground.

Requires the BNNR library (sibling repo ``bnnr``) on PYTHONPATH or installed,
plus torch, torchvision, opencv-python, grad-cam (BNNR dependencies).

Example::

    cd /path/to/bnnr && .venv/bin/python ../bnnr-website/scripts/generate_playground_assets.py

Override source URLs (optional)::

    VEHICLE_URL=... FISH_URL=... python scripts/generate_playground_assets.py
"""

from __future__ import annotations

import os
import sys
import warnings
from pathlib import Path
from typing import Callable
from urllib.request import Request, urlopen

import cv2
import numpy as np
import torch
from torchvision.models import ResNet18_Weights, resnet18

# ── BNNR import path (sibling checkout) ─────────────────────────────
_SCRIPT_DIR = Path(__file__).resolve().parent
_WEBSITE_ROOT = _SCRIPT_DIR.parent
_BNNR_SRC = _WEBSITE_ROOT.parent / "bnnr" / "src"
if _BNNR_SRC.is_dir():
    sys.path.insert(0, str(_BNNR_SRC))

from bnnr.augmentations import (  # noqa: E402
    BasicAugmentation,
    ChurchNoise,
    DifPresets,
    Drust,
    LuxferGlass,
    ProCAM,
    Smugs,
    TeaStains,
)
from bnnr.icd import AICD, ICD  # noqa: E402
from bnnr.xai import OptiCAMExplainer, generate_saliency_maps  # noqa: E402

# Defaults: documented licenses (see public/playground/ATTRIBUTION.md)
DEFAULT_VEHICLE_URL = (
    "https://upload.wikimedia.org/wikipedia/commons/3/32/"
    "Malaysia_Federal_Highway_Traffic_Jam.jpg"
)
DEFAULT_FISH_URL = (
    "https://upload.wikimedia.org/wikipedia/commons/f/f0/"
    "Coral_reef_fish_pacific_blue_tan_paracanthurus_hepatus.jpg"
)

OUT_SIZE = 512
PLAYGROUND_DIR = _WEBSITE_ROOT / "public" / "playground"

# ImageNet class indices for saliency (rough match to scene content)
IMAGENET_LABEL = {"vehicle": 817, "fish": 393}  # sports car, anemone fish


def _download_rgb(url: str) -> np.ndarray:
    req = Request(
        url,
        headers={
            "User-Agent": "BNNR-playground-generator/1.0 (https://github.com/bnnr-team/bnnr-website; asset regeneration)",
        },
        method="GET",
    )
    with urlopen(req, timeout=120) as resp:  # noqa: S310 — intentional URL fetch
        data = resp.read()
    arr = np.frombuffer(data, dtype=np.uint8)
    bgr = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if bgr is None:
        raise RuntimeError(f"Could not decode image from {url!r}")
    return cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)


def _resize_cover(rgb: np.ndarray, size: int) -> np.ndarray:
    h, w = rgb.shape[:2]
    scale = max(size / h, size / w)
    nh, nw = int(round(h * scale)), int(round(w * scale))
    resized = cv2.resize(rgb, (nw, nh), interpolation=cv2.INTER_AREA)
    y0 = max(0, (nh - size) // 2)
    x0 = max(0, (nw - size) // 2)
    return resized[y0 : y0 + size, x0 : x0 + size]


def _apply_batch_single(aug, img: np.ndarray) -> np.ndarray:
    batch = img[np.newaxis, ...].copy()
    out = aug.apply_batch(batch)
    return np.asarray(out[0])


def _procam_gallery_strong(img: np.ndarray, random_state: int) -> np.ndarray:
    """Stack two ProCAM passes — intensity≥1.0 skips blending in BNNR, so a single
    pass is already 100% augmented; stacking makes the color cast obvious in previews."""
    first = ProCAM(probability=1.0, intensity=1.0, random_state=random_state)
    second = ProCAM(probability=1.0, intensity=1.0, random_state=random_state + 791)
    return _apply_batch_single(second, _apply_batch_single(first, img))


def _saliency_overlay(
    img: np.ndarray,
    label: int,
    model: torch.nn.Module,
    target_layers: list,
    device: torch.device,
    use_cuda: bool,
) -> np.ndarray:
    tensor = (
        torch.as_tensor(img.astype(np.float32) / 255.0)
        .permute(2, 0, 1)
        .unsqueeze(0)
        .to(device)
    )
    labels = torch.tensor([label], dtype=torch.long, device=device)
    maps = generate_saliency_maps(
        model, tensor, labels, target_layers, method="opticam"
    )
    explainer = OptiCAMExplainer(use_cuda=use_cuda)
    vis = explainer.visualize(img[np.newaxis, ...], maps, alpha=0.5)
    return np.asarray(vis[0])


def main() -> None:
    warnings.filterwarnings(
        "ignore",
        message=".*without XAICache.*",
        category=RuntimeWarning,
    )

    vehicle_url = os.environ.get("VEHICLE_URL", DEFAULT_VEHICLE_URL)
    fish_url = os.environ.get("FISH_URL", DEFAULT_FISH_URL)

    use_cuda = torch.cuda.is_available()
    device = torch.device("cuda" if use_cuda else "cpu")

    model = resnet18(weights=ResNet18_Weights.IMAGENET1K_V1)
    model.eval()
    model.to(device)
    target_layers = [model.layer4[-1]]

    PLAYGROUND_DIR.mkdir(parents=True, exist_ok=True)

    sources = {
        "vehicle": vehicle_url,
        "fish": fish_url,
    }

    for d_idx, (domain, url) in enumerate(sources.items()):
        print(f"[{domain}] download …")
        rgb = _resize_cover(_download_rgb(url), OUT_SIZE)
        cv2.imwrite(
            str(PLAYGROUND_DIR / f"{domain}_original.png"),
            cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR),
        )

        base_seed = 910_000 + d_idx * 10_000

        # Stronger noise / texture / distortion than default training presets so
        # marketing previews read clearly on the Playground (still valid BNNR APIs).
        augs: dict[str, Callable[[], object]] = {
            "church_noise": lambda s=base_seed + 1: ChurchNoise(
                probability=1.0,
                intensity=1.0,
                num_lines=5,
                noise_strength_range=(12.0, 32.0),
                random_state=s,
            ),
            "drust": lambda s=base_seed + 3: Drust(
                probability=1.0,
                intensity=2.0,
                layers=6,
                base_particles=6500,
                random_state=s,
            ),
            "smugs": lambda s=base_seed + 4: Smugs(
                probability=1.0,
                intensity=2.0,
                num_streaks=14,
                random_state=s,
            ),
            "tea_stains": lambda s=base_seed + 5: TeaStains(
                probability=1.0,
                intensity=1.35,
                random_state=s,
            ),
            "luxfer_glass": lambda s=base_seed + 6: LuxferGlass(
                probability=1.0,
                intensity=1.0,
                grid_range=(48, 96),
                glass_thickness=(0.07, 0.16),
                wave_strength=(0.55, 1.15),
                blur_kernel=(3, 9),
                random_state=s,
            ),
            "dif_presets": lambda s=base_seed + 7: DifPresets(
                probability=1.0,
                intensity=1.5,
                num_circles_range=(6, 11),
                radius_range=(28, 100),
                feather=26,
                random_state=s,
            ),
            "basic_augmentation": lambda s=base_seed + 8: BasicAugmentation(
                probability=1.0,
                intensity=1.2,
                global_blur_sigma=0.65,
                random_state=s,
            ),
        }
        aug_order = (
            "church_noise",
            "procam",
            "drust",
            "smugs",
            "tea_stains",
            "luxfer_glass",
            "dif_presets",
            "basic_augmentation",
        )

        label = IMAGENET_LABEL[domain]
        sal = _saliency_overlay(
            rgb, label, model, target_layers, device, use_cuda
        )
        cv2.imwrite(
            str(PLAYGROUND_DIR / f"{domain}_saliency.png"),
            cv2.cvtColor(sal, cv2.COLOR_RGB2BGR),
        )

        icd = ICD(
            model=model,
            target_layers=target_layers,
            threshold_percentile=70.0,
            tile_size=8,
            fill_strategy="gaussian_blur",
            probability=1.0,
            use_cuda=use_cuda,
            cache=None,
            explainer="opticam",
            random_state=base_seed + 90,
        )
        aicd = AICD(
            model=model,
            target_layers=target_layers,
            threshold_percentile=15.0,
            tile_size=16,
            fill_strategy="gaussian_blur",
            probability=1.0,
            use_cuda=use_cuda,
            cache=None,
            explainer="opticam",
            random_state=base_seed + 91,
        )

        for aid in aug_order:
            if aid == "procam":
                out = _procam_gallery_strong(rgb, base_seed + 2)
            else:
                aug = augs[aid]()
                out = _apply_batch_single(aug, rgb)
            path = PLAYGROUND_DIR / f"{domain}_{aid}.png"
            cv2.imwrite(str(path), cv2.cvtColor(out, cv2.COLOR_RGB2BGR))
            print(f"  wrote {path.name}")

        for aid, aug in (("icd", icd), ("aicd", aicd)):
            batch = rgb[np.newaxis, ...].copy()
            labels = np.array([label], dtype=np.int64)
            out = aug.apply_batch_with_labels(batch, labels)
            path = PLAYGROUND_DIR / f"{domain}_{aid}.png"
            cv2.imwrite(
                str(path), cv2.cvtColor(out[0], cv2.COLOR_RGB2BGR)
            )
            print(f"  wrote {path.name}")

        print(f"  wrote {domain}_original.png, {domain}_saliency.png")

    print(f"Done. Output directory: {PLAYGROUND_DIR}")


if __name__ == "__main__":
    main()
