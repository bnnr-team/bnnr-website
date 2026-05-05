"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChefHat, ArrowRight, FlaskConical } from "lucide-react";

const cookingPages = [
  {
    title: "Cooking 1: Butterfly Round (Students)",
    description:
      "A guided, student-first path from baseline accuracy to model understanding with XAI, report.json, and events history.",
    href: "/cookings/cooking-1/",
    status: "Available now",
  },
  {
    title: "Cooking 2: Coming soon",
    description: "Next round is in the oven. New audience, new workflow, same BNNR core loop.",
    href: "/cookings/",
    status: "Coming soon",
  },
];

export default function CookingsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <section className="text-center space-y-5">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: "rgba(240,160,105,0.1)",
            border: "1px solid rgba(240,160,105,0.25)",
            color: "var(--accent)",
          }}
        >
          <ChefHat size={14} />
          BNNR Cookings
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--fg)" }}>
          Cookings Hub
        </h1>
        <p className="text-lg max-w-3xl mx-auto" style={{ color: "var(--muted)" }}>
          If BNNR is a recipe, then we should cook something, right? 🍳 Each cooking is a focused guide for a specific
          audience, so you can learn the BNNR workflow step by step.
        </p>
      </section>

      <section className="card">
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--fg)" }}>
          What are Cookings?
        </h2>
        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
          Cookings are practical BNNR tutorials built around real notebooks. Every round keeps the same core idea
          (train → explain → improve → prove), but changes focus depending on who it is for.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Round 1 is designed for students. Future rounds will target other audiences and use cases.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--fg)" }}>
          Available and upcoming rounds
        </h2>
        <div className="grid gap-4">
          {cookingPages.map((page, index) => (
            <motion.div
              key={page.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="card"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--fg)" }}>
                    {page.title}
                  </h3>
                  <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
                    {page.description}
                  </p>
                  <span
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(240,160,105,0.1)",
                      border: "1px solid rgba(240,160,105,0.2)",
                      color: "var(--accent)",
                    }}
                  >
                    {page.status}
                  </span>
                </div>
                {page.status === "Available now" ? (
                  <Link href={page.href} className="btn-primary shrink-0">
                    Open
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-bnnr text-sm font-medium shrink-0"
                    style={{ border: "1px solid var(--border-color)", color: "var(--muted)" }}
                  >
                    <FlaskConical size={16} />
                    In progress
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
