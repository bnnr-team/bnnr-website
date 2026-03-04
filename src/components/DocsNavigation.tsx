"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const docsOrder = [
  { href: "/docs/getting-started/", title: "Getting Started" },
  { href: "/docs/dashboard/", title: "Dashboard Guide" },
  { href: "/docs/cli/", title: "CLI Reference" },
  { href: "/docs/configuration/", title: "Configuration" },
  { href: "/docs/api-reference/", title: "API Reference" },
  { href: "/docs/golden-path/", title: "Golden Path" },
  { href: "/docs/augmentations/", title: "Augmentations" },
  { href: "/docs/examples/", title: "Examples Guide" },
  { href: "/docs/notebooks/", title: "Notebooks Guide" },
  { href: "/docs/artifacts/", title: "Artifacts & Outputs" },
  { href: "/docs/troubleshooting/", title: "Troubleshooting" },
];

export function DocsNavigation() {
  const pathname = usePathname();
  const currentIndex = docsOrder.findIndex(
    (d) => pathname === d.href || pathname === d.href.replace(/\/$/, "")
  );

  const prev = currentIndex > 0 ? docsOrder[currentIndex - 1] : null;
  const next = currentIndex < docsOrder.length - 1 ? docsOrder[currentIndex + 1] : null;

  if (currentIndex === -1) return null;

  return (
    <nav className="flex justify-between items-center mt-16 pt-6 border-t border-[var(--border-subtle)]">
      {prev ? (
        <Link
          href={prev.href}
          className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          <ChevronLeft size={16} />
          <div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>Previous</div>
            <div style={{ color: "var(--fg)" }}>{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="flex items-center gap-2 text-sm text-right transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          <div>
            <div className="text-xs" style={{ color: "var(--muted)" }}>Next</div>
            <div style={{ color: "var(--fg)" }}>{next.title}</div>
          </div>
          <ChevronRight size={16} />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
