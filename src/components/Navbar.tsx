"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Github } from "lucide-react";

const NAV_LINKS = [
  { href: "/docs/getting-started/", label: "Docs" },
  { href: "/benchmark/", label: "Benchmark" },
  { href: "/playground/", label: "Playground" },
  { href: "/community/", label: "Community" },
  { href: "/team/", label: "Team" },
];

export function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const logoSrc = isDark ? "/logos/napis_czarne.PNG" : "/logos/napis_biale.PNG";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-[var(--border-color)]"
      style={{ background: "var(--card-bg)" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          {mounted ? (
            <Image
              src={logoSrc}
              alt="BNNR"
              width={100}
              height={40}
              className="h-8 w-auto"
              priority
            />
          ) : (
            <span className="text-xl font-bold" style={{ color: "var(--accent)" }}>
              BNNR
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--muted)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/bnnr-team/bnnr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "var(--muted)" }}
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
              style={{ color: "var(--muted)" }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg transition-colors hover:bg-[var(--border-subtle)]"
            style={{ color: "var(--muted)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[var(--border-subtle)] px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-[var(--accent)]"
              style={{ color: "var(--muted)" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
