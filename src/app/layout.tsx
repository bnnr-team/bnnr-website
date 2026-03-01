import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bnnr.dev"),
  title: "BNNR — Bulletproof Neural Network Recipe",
  description:
    "Automate augmentation search for PyTorch vision models. Classification, detection, XAI explainability, and a real-time dashboard.",
  keywords: [
    "BNNR",
    "PyTorch",
    "data augmentation",
    "neural network",
    "computer vision",
    "XAI",
    "explainability",
    "deep learning",
  ],
  openGraph: {
    title: "BNNR — Bulletproof Neural Network Recipe",
    description:
      "Automate augmentation search for PyTorch vision models.",
    type: "website",
    images: ["/logos/napis_logo_czarne.PNG"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BNNR — Bulletproof Neural Network Recipe",
    description: "Automate augmentation search for PyTorch vision models.",
    images: ["/logos/napis_logo_czarne.PNG"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="molecular-bg">
        <ThemeProvider>
          <Navbar />
          <main className="relative z-10 min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
