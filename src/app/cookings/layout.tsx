import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookings | BNNR",
  description:
    "BNNR Cookings hub: practical tutorial rounds for different audiences. Start with student-focused Cooking 1 and explore upcoming rounds.",
  openGraph: {
    title: "Cookings | BNNR",
    description:
      "Practical BNNR cooking rounds: learn by running focused tutorial workflows.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookings | BNNR",
    description:
      "Explore BNNR cooking rounds for students and future audiences.",
  },
};

export default function CookingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
