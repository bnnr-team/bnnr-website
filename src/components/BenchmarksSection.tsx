"use client";

import { motion } from "framer-motion";

export function BenchmarksSection() {
  return (
    <section className="section" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title text-center">Benchmarks</h2>
        <p className="section-subtitle text-center mb-8">
          Reproducible results on CIFAR-10, STL-10, and Fashion-MNIST — coming soon.
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="card overflow-x-auto"
        >
          <table className="w-full text-sm text-left">
            <thead>
              <tr style={{ color: "var(--muted)" }}>
                <th className="py-2 pr-4">Dataset</th>
                <th className="py-2 pr-4">Baseline</th>
                <th className="py-2 pr-4">+ BNNR</th>
                <th className="py-2">Gain</th>
              </tr>
            </thead>
            <tbody style={{ color: "var(--fg)" }}>
              <tr>
                <td className="py-2 italic" colSpan={4} style={{ color: "var(--muted)" }}>
                  Coming soon — track progress on{" "}
                  <a
                    href="https://github.com/bnnr-team/bnnr/issues"
                    className="underline"
                    style={{ color: "var(--accent)" }}
                  >
                    GitHub Issues
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
