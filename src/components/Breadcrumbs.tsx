"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const labelMap: Record<string, string> = {
  docs: "Documentation",
  "getting-started": "Getting Started",
  dashboard: "Dashboard Guide",
  "golden-path": "Golden Path",
  configuration: "Configuration",
  cli: "CLI Reference",
  augmentations: "Augmentations",
  examples: "Examples Guide",
  notebooks: "Notebooks Guide",
  artifacts: "Artifacts & Outputs",
  "api-reference": "API Reference",
  troubleshooting: "Troubleshooting",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-xs mb-6" style={{ color: "var(--muted)" }}>
      <Link href="/" className="hover:text-[var(--accent)] transition-colors">
        <Home size={14} />
      </Link>
      {segments.map((segment, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/") + "/";
        const label = labelMap[segment] || segment;
        const isLast = i === segments.length - 1;

        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight size={12} />
            {isLast ? (
              <span style={{ color: "var(--fg)" }}>{label}</span>
            ) : (
              <Link href={href} className="hover:text-[var(--accent)] transition-colors">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
