"use client";

import { useEffect, useState, useCallback, type MouseEvent } from "react";
import { usePathname } from "next/navigation";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

function collectHeadings(): TOCItem[] {
  const root = document.querySelector("article .prose");
  if (!root) return [];

  const elements = root.querySelectorAll("h2, h3");
  const items: TOCItem[] = [];
  elements.forEach((el) => {
    if (el.id) {
      items.push({
        id: el.id,
        text: el.textContent?.trim() || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    }
  });
  return items;
}

export function TableOfContents() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  /* Layout stays mounted across /docs/* routes — must rescan when the page changes.
     MDX may paint after the first frame, so schedule a follow-up scan. */
  useEffect(() => {
    setHeadings(collectHeadings());

    const id = requestAnimationFrame(() => {
      setHeadings(collectHeadings());
    });
    const t = window.setTimeout(() => setHeadings(collectHeadings()), 120);

    return () => {
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const onTocClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, id: string) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
        return;
      }
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const path = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", `${path}#${id}`);
    },
    []
  );

  if (headings.length === 0) return null;

  return (
    <nav className="hidden xl:block sticky top-20 w-56 shrink-0 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "var(--muted)" }}>
        On this page
      </div>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => onTocClick(e, heading.id)}
              className={`block py-1 text-xs transition-colors leading-relaxed ${
                activeId === heading.id
                  ? "font-medium"
                  : "hover:text-[var(--fg)]"
              }`}
              style={{
                color: activeId === heading.id ? "var(--accent)" : "var(--muted)",
                paddingLeft: heading.level === 3 ? "12px" : "0",
                borderLeft: activeId === heading.id
                  ? "2px solid var(--accent)"
                  : "2px solid transparent",
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
