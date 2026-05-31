#!/usr/bin/env python3
"""Sync MDX doc pages from the bnnr repo docs/ tree (code-verified source)."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BNNR_DOCS = ROOT.parent / "bnnr" / "docs"
OUT_DOCS = ROOT / "src" / "app" / "docs"

# bnnr/docs/*.md -> website src/app/docs/<slug>/page.mdx
FULL_SYNC: dict[str, str] = {
    "cli.md": "cli/page.mdx",
    "configuration.md": "configuration/page.mdx",
    "api_reference.md": "api-reference/page.mdx",
    "artifacts.md": "artifacts/page.mdx",
    "detection.md": "detection/page.mdx",
    "getting_started.md": "getting-started/page.mdx",
    "golden_path.md": "golden-path/page.mdx",
    "examples.md": "examples/page.mdx",
    "dashboard.md": "dashboard/page.mdx",
    "notebooks.md": "notebooks/page.mdx",
    "troubleshooting.md": "troubleshooting/page.mdx",
}

DOC_TO_PATH: dict[str, str] = {
    "getting_started.md": "/docs/getting-started/",
    "golden_path.md": "/docs/golden-path/",
    "cli.md": "/docs/cli/",
    "configuration.md": "/docs/configuration/",
    "api_reference.md": "/docs/api-reference/",
    "analyze.md": "/docs/analyze/",
    "detection.md": "/docs/detection/",
    "augmentations.md": "/docs/augmentations/",
    "artifacts.md": "/docs/artifacts/",
    "dashboard.md": "/docs/dashboard/",
    "examples.md": "/docs/examples/",
    "notebooks.md": "/docs/notebooks/",
    "troubleshooting.md": "/docs/troubleshooting/",
    "quickstart_api.md": "/docs/api-reference/",
    "integrations.md": "https://github.com/bnnr-team/bnnr/blob/main/docs/integrations.md",
    "plugin_icd.md": "https://github.com/bnnr-team/bnnr/blob/main/docs/plugin_icd.md",
    "benchmarks.md": "https://github.com/bnnr-team/bnnr/blob/main/benchmarks/README.md",
}

LINK_LABELS: dict[str, str] = {
    "getting_started.md": "Getting Started",
    "golden_path.md": "Golden Path",
    "cli.md": "CLI Reference",
    "configuration.md": "Configuration",
    "api_reference.md": "API Reference",
    "analyze.md": "Model Analysis",
    "detection.md": "Detection",
    "augmentations.md": "Augmentations",
    "artifacts.md": "Artifacts & Outputs",
    "dashboard.md": "Dashboard Guide",
    "examples.md": "Examples Guide",
    "notebooks.md": "Notebooks Guide",
    "troubleshooting.md": "Troubleshooting",
    "quickstart_api.md": "API Reference",
}


def _strip_pypi_badges(text: str) -> str:
    lines: list[str] = []
    for line in text.splitlines():
        if "pepy.tech" in line:
            continue
        lines.append(line)
    out = "\n".join(lines)
    # Drop leading horizontal rules used only after removed badges
    out = re.sub(r"^\n+---\n+", "\n", out)
    return out.strip() + "\n"


def _convert_links(text: str) -> str:
    for md_name, web_path in DOC_TO_PATH.items():
        label = LINK_LABELS.get(md_name, md_name.removesuffix(".md").replace("_", " ").title())
        # [golden_path.md](golden_path.md) or [text](golden_path.md)
        text = re.sub(
            rf"\[{re.escape(md_name)}\]\({re.escape(md_name)}(#[^)]*)?\)",
            rf"[{label}]({web_path}\1)",
            text,
        )
        text = re.sub(
            rf"\]\({re.escape(md_name)}(#[^)]*)?\)",
            rf"]({web_path}\1)",
            text,
        )
    text = re.sub(
        r"\[([^\]]+)\]\(\.\./tests/[^)]+\)",
        r"[\1](https://github.com/bnnr-team/bnnr/blob/main/tests/test_backward_compat.py)",
        text,
    )
    text = re.sub(
        r"\[([^\]]+)\]\(\.\./examples/([^)]+)\)",
        r"[\1](https://github.com/bnnr-team/bnnr/blob/main/examples/\2)",
        text,
    )
    text = re.sub(
        r"\[([^\]]+)\]\(\.\./benchmarks/([^)]+)\)",
        r"[\1](https://github.com/bnnr-team/bnnr/blob/main/benchmarks/\2)",
        text,
    )
    return text


def sync_file(bnnr_name: str, out_rel: str) -> None:
    src = BNNR_DOCS / bnnr_name
    dst = OUT_DOCS / out_rel
    if not src.is_file():
        raise FileNotFoundError(src)
    body = _convert_links(_strip_pypi_badges(src.read_text(encoding="utf-8")))
    dst.parent.mkdir(parents=True, exist_ok=True)
    dst.write_text(body, encoding="utf-8")
    print(f"  synced {bnnr_name} -> {out_rel}")


def patch_augmentations() -> None:
    """Keep website's extended augmentation guide; update presets table + CLI line."""
    path = OUT_DOCS / "augmentations/page.mdx"
    text = path.read_text(encoding="utf-8")
    old_table = """| Preset | Augmentations | Best for |
|--------|-------------|----------|
| `auto` | Hardware-aware selection | Default — picks GPU or CPU set automatically |
| `light` | ChurchNoise, ProCAM | Quick experiments, smoke tests |
| `standard` | ChurchNoise, BasicAug, ProCAM, DifPresets | General-purpose training |
| `aggressive` | All 8 built-in augmentations | Maximum diversity, robust training |
| `gpu` | ChurchNoise, ProCAM, DifPresets | Fastest throughput (CUDA required) |
| `screening` | Same pool as aggressive, uniform probability | API helper for uniform exploration (not exposed as a CLI `--preset`) |"""
    new_table = """| Preset | Augmentations | Best for |
|--------|-------------|----------|
| `auto` | Hardware-aware selection | Default — picks GPU or CPU set automatically |
| `light` | ChurchNoise, ProCAM | Quick experiments, smoke tests |
| `standard` | ChurchNoise, BasicAug, ProCAM, DifPresets | General-purpose training |
| `aggressive` | All 8 built-in augmentations | Maximum diversity, robust training |
| `gpu` | ChurchNoise, ProCAM, DifPresets | Fastest throughput (CUDA required) |
| `demo` | ICD + ChurchNoise | Used by `python -m bnnr demo`; also via `get_preset("demo")` |
| `screening` | Same pool as aggressive, uniform probability | API only (`get_preset`); maps to aggressive with uniform probability |
| `none` | No augmentations | `python -m bnnr train --preset none` only (not in `list-presets`) |"""
    if "`demo`" in text and "`none`" in text and "train --preset none" in text:
        print("  augmentations/page.mdx presets already up to date")
        return
    if old_table not in text:
        raise RuntimeError("augmentations preset table block not found")
    text = text.replace(old_table, new_table)
    text = text.replace(
        "CLI `--preset` supports: `auto`, `light`, `standard`, `aggressive`, `gpu`.",
        "CLI `--preset` / `--augmentation-preset` on `train` supports: `auto`, `light`, `standard`, "
        "`aggressive`, `gpu`, `none` (unknown names fall back to `auto` with a warning). "
        "The `demo` command always uses preset `demo`.",
    )
    path.write_text(text, encoding="utf-8")
    print("  patched augmentations/page.mdx (presets)")


def patch_analyze() -> None:
    """Sync limitations + artifacts cross-refs from audited analyze.md."""
    src = BNNR_DOCS / "analyze.md"
    dst = OUT_DOCS / "analyze/page.mdx"
    audited = src.read_text(encoding="utf-8")
    lim_match = re.search(
        r"(## Limitations \(current code\)\n(?:.*\n)*?)(?=## See also)",
        audited,
    )
    if not lim_match:
        raise RuntimeError("analyze.md limitations section not found")
    new_lim = _convert_links(lim_match.group(1)).strip()
    new_lim = new_lim.replace("## See also", "").replace(
        "`analyze.md`", "[Model Analysis](/docs/analyze/)"
    ).replace(
        "`api_reference.md`", "[API Reference](/docs/api-reference/)"
    ).replace(
        "`cli.md`", "[CLI Reference](/docs/cli/)"
    ).replace(
        "`artifacts.md`", "[Artifacts & Outputs](/docs/artifacts/)"
    )
    text = dst.read_text(encoding="utf-8")
    text = re.sub(
        r"## Limitations[^\n]*\n(?:.*\n)*?(?=## See [Aa]lso|\Z)",
        new_lim + "\n\n",
        text,
        count=1,
    )
    text = text.replace(
        "`detection_xai_method`: saliency",
        "`detection_xai_method`: activation",
    )
    dst.write_text(text, encoding="utf-8")
    print("  patched analyze/page.mdx (limitations)")


def fix_link_labels_in_tree() -> None:
    """Normalize [foo.md](/docs/...) left over from older sync runs."""
    for mdx in OUT_DOCS.rglob("page.mdx"):
        text = mdx.read_text(encoding="utf-8")
        for md_name, web_path in DOC_TO_PATH.items():
            if not web_path.startswith("/docs/"):
                continue
            label = LINK_LABELS.get(md_name, md_name.removesuffix(".md"))
            text = text.replace(f"[{md_name}]({web_path})", f"[{label}]({web_path})")
        mdx.write_text(text, encoding="utf-8")
    print("  fixed link labels in all page.mdx files")


def main() -> int:
    if not BNNR_DOCS.is_dir():
        print(f"Missing bnnr docs dir: {BNNR_DOCS}", file=sys.stderr)
        return 1
    print("Full sync from bnnr/docs:")
    for bnnr_name, out_rel in FULL_SYNC.items():
        sync_file(bnnr_name, out_rel)
    print("Partial patches:")
    patch_augmentations()
    patch_analyze()
    fix_link_labels_in_tree()
    print("Done.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
