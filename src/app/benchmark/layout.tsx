import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benchmark — BNNR",
  description:
    "Comprehensive benchmark of BNNR augmentations against Albumentations and Torchvision. Coming soon.",
};

export default function BenchmarkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
