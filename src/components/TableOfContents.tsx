"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const article = document.querySelector(".prose");
    if (!article) return;

    const elements = article.querySelectorAll("h2, h3");
    const items: TOCItem[] = [];
    elements.forEach((el) => {
      if (el.id) {
        items.push({
          id: el.id,
          text: el.textContent || "",
          level: el.tagName === "H2" ? 2 : 3,
        });
      }
    });
    setHeadings(items);
  }, []);

  useEffect(() => {
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
