import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cooking 1 — Butterfly Round | BNNR",
  description:
    "Student-focused BNNR cooking: train baseline, explore augmentations, inspect XAI overlays, and analyze report.json with events history.",
  openGraph: {
    title: "Cooking 1 — Butterfly Round | BNNR",
    description:
      "A practical student walkthrough from accuracy-only thinking to model understanding with BNNR.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cooking 1 — Butterfly Round | BNNR",
    description:
      "Learn the full BNNR student flow with training, XAI, report.json, and events history.",
  },
};

export default function CookingOneLayout({ children }: { children: React.ReactNode }) {
  return children;
}
