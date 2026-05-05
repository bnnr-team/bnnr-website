"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Sparkles, BookOpen, ArrowRight } from "lucide-react";

const COLAB_URL =
  "https://colab.research.google.com/github/bnnr-team/bnnr/blob/main/examples/classification/bnnr_cooking_round1_butterfly.ipynb";
const GITHUB_NOTEBOOK_URL =
  "https://github.com/bnnr-team/bnnr/blob/main/examples/classification/bnnr_cooking_round1_butterfly.ipynb";

const learningPath = [
  {
    title: "Run baseline",
    description:
      "Start with a clean training run so you can compare every later decision against a clear reference point.",
  },
  {
    title: "Explore augmentations",
    description:
      "Test augmentation variants and see how data strategy changes stability, confidence, and final metrics.",
  },
  {
    title: "Inspect XAI overlays",
    description:
      "Use explanations to check what the model focuses on, and catch shortcuts before they become deployment risks.",
  },
  {
    title: "Read report + events",
    description:
      "Review report.json and the events/history log to connect training choices with concrete model behavior.",
  },
  {
    title: "Write insights for CV/portfolio",
    description:
      "Turn your experiment into a clear engineering story: what you changed, what improved, and why it matters.",
  },
];

const outcomes = [
  "A reproducible training notebook run you can show in interviews.",
  "XAI screenshots and interpretation notes that prove model understanding.",
  "A report.json and event-history narrative for experiment traceability.",
  "A compact augmentation comparison with practical conclusions.",
  "A portfolio-ready write-up from accuracy-only to model insight.",
];

const notebookWalkthrough = [
  {
    title: "Step 1: Run baseline (setup + first run)",
    body: "First, set up the environment and run a baseline training pass. This result is your reference point for every change you test later.",
    checklist: [
      "Run install and import cells without skipping.",
      "Check `DEVICE` so you know if you are on GPU.",
      "Write down baseline metrics for comparison.",
    ],
    snippet: `%pip install -q "bnnr[dashboard]" matplotlib kagglehub pillow

from bnnr import BNNRConfig, BNNRTrainer, SimpleTorchAdapter

DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Device: {DEVICE}")`,
  },
  {
    title: "Step 2: Explore augmentations",
    body: "Define augmentation candidates here. BNNR evaluates which combinations truly help the model instead of relying on guesswork.",
    checklist: [
      "Change augmentations intentionally, not all at once.",
      "Compare each trial against the baseline.",
      "Check which augmentations were finally selected.",
    ],
    snippet: `augmentations = [
    ChurchNoise(probability=0.5, intensity=0.45, random_state=SEED),
    BasicAugmentation(probability=0.5, intensity=0.5, random_state=SEED + 1),
    TorchvisionAugmentation(
        transforms.ColorJitter(brightness=0.25, contrast=0.25, saturation=0.15),
        name_override="tv_color_jitter",
        probability=0.5,
        random_state=SEED + 20,
    ),
]`,
  },
  {
    title: "Step 3: Inspect XAI overlays",
    body: "After training, inspect XAI maps to see where the model is looking in each image. This tells you whether it learns meaningful visual features.",
    checklist: [
      "Review several XAI images across different classes.",
      "Check if focus is on the object, not the background.",
      "Write 1-2 qualitative observations.",
    ],
    snippet: `xai_files = sorted(glob.glob(str(run_dir / "artifacts" / "xai" / "**" / "*.png"), recursive=True))
if xai_files:
    print(f"Found {len(xai_files)} XAI PNGs. Showing up to 6:")
    for f in xai_files[:6]:
        display(IPImage(filename=f, width=560))`,
  },
  {
    title: "Step 4: Read report + events",
    body: "In this step, connect metrics with process history. `report.json` shows the best result and path, while `events.jsonl` shows what happened during the run.",
    checklist: [
      "Read `best_metrics`, `best_path`, and `selected_augmentations`.",
      "Check whether `events.jsonl` exists and how many entries it has.",
      "Match metric changes with the event timeline.",
    ],
    snippet: `with open(result.report_json_path, encoding="utf-8") as f:
    rep = json.load(f)
print("best_metrics:", rep.get("best_metrics"))
print("best_path:", rep.get("best_path"))
print("selected_augmentations:", rep.get("selected_augmentations"))

events = load_events(run_dir / "events.jsonl")
print("Total events:", len(events))`,
  },
  {
    title: "Step 5: Write insights for CV/portfolio",
    body: "Finally, write a short engineering summary: what you tested, what worked, and why. This turns the notebook into a portfolio-ready project.",
    checklist: [
      "Compare baseline and best-performing branch.",
      "Add one insight from XAI and one from events.",
      "Propose one next experiment you would code yourself.",
    ],
    snippet: `print("Best augmentation path :", result.best_path)
print("Best metrics           :", result.best_metrics)
print("Selected augmentations :", result.selected_augmentations)
print("Report JSON            :", result.report_json_path)`,
  },
];

export default function CookingOnePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-20">
      <section className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: "rgba(240,160,105,0.1)",
              border: "1px solid rgba(240,160,105,0.25)",
              color: "var(--accent)",
            }}
          >
            <Sparkles size={14} />
            Summer learning series
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
            Cookings: Butterfly Round 1
          </h1>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--muted)" }}>
            A student-friendly computer vision journey for summer: move from &quot;I only have accuracy&quot; to
            &quot;I understand my model&quot; through guided experiments.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={COLAB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
              Open in Colab
              <ExternalLink size={16} />
            </a>
            <a
              href={GITHUB_NOTEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline w-full sm:w-auto"
            >
              View Notebook in GitHub
              <ExternalLink size={16} />
            </a>
          </div>

          <p className="text-sm max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
            Launch the notebook directly in{" "}
            <a
              href={COLAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-[var(--accent)] transition-colors"
              style={{ color: "var(--accent)" }}
            >
              Google Colab
            </a>{" "}
            and follow each step from training to explainability and experiment reporting.
          </p>
        </motion.div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Why this cooking?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>
              The common student pain
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              Many first CV projects stop at one number. Accuracy goes up, but you still do not know whether the model
              learned meaningful features or just lucky shortcuts.
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--fg)" }}>
              The BNNR mindset
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              This cooking teaches a practical loop: train, test augmentations, inspect XAI overlays, and connect
              outcomes through <code>report.json</code> plus events/history. You learn what changed and why.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Educational path: from baseline to insight
        </h2>
        <div className="space-y-4">
          {learningPath.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="card"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{
                    background: "rgba(240,160,105,0.15)",
                    border: "1px solid rgba(240,160,105,0.3)",
                    color: "var(--accent)",
                  }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-semibold mb-1" style={{ color: "var(--fg)" }}>
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
          Notebook walkthrough for students (what and why)
        </h2>
        <p className="text-sm mb-6 max-w-3xl" style={{ color: "var(--muted)" }}>
          Read this once before running the notebook. Then execute cell-by-cell and compare your observations with what
          the code is designed to do.
        </p>
        <div className="space-y-5">
          {notebookWalkthrough.map((part) => (
            <div key={part.title} className="card space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>
                  {part.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {part.body}
                </p>
              </div>
              <ul className="space-y-2">
                {part.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: "var(--accent)" }}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <pre
                className="!text-xs !leading-relaxed !p-4 !rounded-bnnr overflow-x-auto"
                style={{ background: "var(--code-bg)", border: "1px solid var(--code-border)" }}
              >
                <code>{part.snippet}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
          Student tips before and during Colab run
        </h2>
        <div className="card space-y-3 text-sm" style={{ color: "var(--muted)" }}>
          <p>
            First pass: do not run yet. Mark where model is defined, where config is created, where training starts, and
            where `report.json` / `events.jsonl` are analyzed.
          </p>
          <p>
            Second pass: run cell-by-cell and keep a mini lab note with 3 lines per step: what changed, what you
            expected, what actually happened.
          </p>
          <p>
            Best portfolio format for this round: baseline metrics, strongest augmentation branch, one XAI insight, and
            one next experiment you would code yourself.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          What you&apos;ll ship after this
        </h2>
        <div className="card">
          <ul className="space-y-3">
            {outcomes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--muted)" }}>
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                  style={{ background: "var(--accent)" }}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card text-center space-y-4">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center bg-[rgba(240,160,105,0.12)]">
          <BookOpen size={28} style={{ color: "var(--accent)" }} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--fg)" }}>
          Ready for Cooking Round 1?
        </h2>
        <p className="text-sm max-w-2xl mx-auto" style={{ color: "var(--muted)" }}>
          Start now in Colab, then continue in the docs to prepare for future rounds and deeper experiments.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href={COLAB_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto">
            Open in Colab
            <ExternalLink size={16} />
          </a>
          <Link href="/docs/notebooks/" className="btn-outline w-full sm:w-auto">
            Explore notebooks in docs
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
