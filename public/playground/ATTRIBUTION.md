# Playground image credits

## Source photographs

The two base images (`vehicle_original.png`, `fish_original.png`) are downscaled and center-cropped to **512×512** in RGB, then all other PNGs in this directory are **derivatives** produced with the open-source **BNNR** library (see `scripts/generate_playground_assets.py` in the website repo).

### Urban Traffic (`vehicle_*`)

| Field | Value |
| --- | --- |
| **File** | Malaysia Federal Highway Traffic Jam |
| **Description** | Traffic jam at Federal Highway (Malaysia) |
| **Copyright** | © Countryball mys123; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Malaysia_Federal_Highway_Traffic_Jam.jpg) |
| **Author** | [Countryball mys123](https://commons.wikimedia.org/wiki/User:Countryball_mys123) |
| **Source** | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Malaysia_Federal_Highway_Traffic_Jam.jpg) |
| **License** | **CC BY 4.0** — [https://creativecommons.org/licenses/by/4.0](https://creativecommons.org/licenses/by/4.0) |

**Derivative on this site:** The image is resized and center-cropped to 512×512 for the gallery; augmented PNGs are further transformed by BNNR. CC BY 4.0 requires **attribution** and a **link to the license** when you share the original or substantial derivatives; see the license text for full terms.

You must retain attribution when reusing the **original photograph**; the BNNR-generated augmentation outputs are separate pixel layers produced by our script.

### Underwater Marine (`fish_*`)

| Field | Value |
| --- | --- |
| **File** | Coral reef fish pacific blue tan paracanthurus hepatus |
| **Credit** | Jim Maragos, U.S. Fish and Wildlife Service (no copyright assertion under U.S. law for this federal work) |
| **Source** | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Coral_reef_fish_pacific_blue_tan_paracanthurus_hepatus.jpg) |
| **License** | **Public domain** (U.S. federal government work) |

## Augmented previews

All `vehicle_*.png` and `fish_*.png` files except the two originals above are **outputs of BNNR** augmentations. Noise, texture, and distortion previews use **stronger “gallery” parameters** than typical training defaults (see `scripts/generate_playground_assets.py` and the Playground copy). ICD / AICD use the tile sizes and percentiles stated on the Playground page.

## Saliency and ICD / AICD

Saliency overlays (`*_saliency.png`) and XAI-driven masks use **OptiCAM** (via BNNR’s integration with **pytorch-grad-cam**) on a **pretrained ResNet-18** from **torchvision** ([PyTorch / torchvision](https://github.com/pytorch/vision)). ImageNet class indices used only to drive the explainer: **817** (sports car) for the traffic scene and **393** (anemone fish) for the reef scene.

## BNNR code

The **BNNR** library is under the **MIT** license; that applies to the **code**, not to an extra license on the underlying stock photos beyond what is stated above.
