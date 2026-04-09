"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Getting Started", href: "/docs/getting-started/" },
  { title: "Dashboard Guide", href: "/docs/dashboard/" },
  { title: "CLI Reference", href: "/docs/cli/" },
  { title: "Configuration", href: "/docs/configuration/" },
  { title: "API Reference", href: "/docs/api-reference/" },
  { title: "Golden Path", href: "/docs/golden-path/" },
  {
    title: "Augmentations",
    href: "/docs/augmentations/"
  },
  { title: "Detection", href: "/docs/detection/" },
  { title: "Examples Guide", href: "/docs/examples/" },
  { title: "Notebooks Guide", href: "/docs/notebooks/" },
  { title: "Artifacts & Outputs", href: "/docs/artifacts/" },
  { title: "Troubleshooting", href: "/docs/troubleshooting/" },
];

function NavItemComponent({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname === item.href.replace(/\/$/, "");

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={item.href}
          className={`block py-1.5 px-2 rounded-lg text-sm transition-colors flex-1 ${
            isActive
              ? "font-medium"
              : "hover:text-[var(--fg)]"
          }`}
          style={{
            color: isActive ? "var(--accent)" : "var(--muted)",
            background: isActive ? "rgba(240, 160, 105, 0.08)" : "transparent",
            paddingLeft: `${depth * 12 + 8}px`,
          }}
        >
          {item.title}
        </Link>
      </div>
    </div>
  );
}

export function DocsSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg"
        style={{
          background: "var(--accent)",
          color: "white",
        }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 z-40
          w-72 h-[calc(100vh-4rem)] overflow-y-auto
          border-r border-[var(--border-subtle)]
          transition-transform duration-300
          lg:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{ background: "var(--bg)" }}
      >
        <div className="p-4 space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider mb-4 px-2"
            style={{ color: "var(--muted)" }}>
            Documentation
          </div>
          {navItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
