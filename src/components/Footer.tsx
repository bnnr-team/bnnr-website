import Link from "next/link";
import { Github } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Getting Started", href: "/docs/getting-started/" },
    { label: "Benchmark", href: "/benchmark/" },
    { label: "Playground", href: "/playground/" },
    { label: "Community", href: "/community/" },
  ],
  Resources: [
    { label: "API Reference", href: "/docs/api-reference/" },
    { label: "CLI Reference", href: "/docs/cli/" },
    { label: "Configuration", href: "/docs/configuration/" },
    { label: "Augmentations", href: "/docs/augmentations/" },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com/bnnr-team/bnnr" },
    { label: "Issues", href: "https://github.com/bnnr-team/bnnr/issues" },
    { label: "Discussions", href: "https://github.com/orgs/bnnr-team/discussions" },
    { label: "Contributing", href: "/community/" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-color)]" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold mb-3" style={{ color: "var(--accent)" }}>
              BNNR
            </div>
            <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
              Bulletproof Neural Network Recipe. Automate augmentation search for PyTorch vision models.
            </p>
            <a
              href="https://github.com/bnnr-team/bnnr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--muted)" }}
            >
              <Github size={16} />
              View on GitHub
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold mb-3" style={{ color: "var(--fg)" }}>
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--muted)" }}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-[var(--accent)]"
                        style={{ color: "var(--muted)" }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            MIT License &copy; {new Date().getFullYear()} BNNR Team
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono" style={{ background: "var(--code-bg)", color: "var(--muted)", border: "1px solid var(--code-border)" }}>
              Python 3.9+
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono" style={{ background: "var(--code-bg)", color: "var(--muted)", border: "1px solid var(--code-border)" }}>
              PyTorch 2.0+
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono" style={{ background: "var(--code-bg)", color: "var(--muted)", border: "1px solid var(--code-border)" }}>
              v0.1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
