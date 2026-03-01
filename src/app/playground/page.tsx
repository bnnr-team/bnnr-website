import { AugmentationGallery } from "@/components/AugmentationGallery";
import { CodePlayground } from "@/components/CodePlayground";

export const metadata = {
  title: "Playground — BNNR",
  description: "Try BNNR augmentations interactively and grab copy-paste code templates.",
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ color: "var(--fg)" }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-bnnr-300 to-bnnr-500">
            Playground
          </span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          Explore every BNNR augmentation visually — including XAI-driven
          ICD and AICD — then grab ready-to-run code templates.
        </p>
      </div>

      {/* Section A: Augmentation Gallery */}
      <section id="augmentation-gallery">
        <AugmentationGallery />
      </section>

      {/* Divider */}
      <hr style={{ borderColor: "var(--border-color)" }} />

      {/* Section B: Code Playground */}
      <section id="code-playground">
        <CodePlayground />
      </section>
    </div>
  );
}
