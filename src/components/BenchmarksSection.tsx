"use client";

import { motion } from "framer-motion";

const ROWS = [
  { dataset: "CIFAR-10", baseline: "TBD", bnnr: "TBD", gain: "—" },
  { dataset: "Fashion-MNIST", baseline: "TBD", bnnr: "TBD", gain: "—" },
  { dataset: "STL-10", baseline: "TBD", bnnr: "TBD", gain: "—" },
] as const;

export function BenchmarksSection() {
  return (
    <section className="section" style={{ background: "var(--bg-subtle)" }}>
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="section-title text-center">Benchmarks</h2>
        <p className="section-subtitle text-center mb-8">
          Reproducible baseline vs BNNR runs on built-in CLI datasets. Pilot results
          publish to this table after{" "}
          <code className="text-xs px-1 py-0.5 rounded" style={{ background: "var(--code-bg)" }}>
            benchmarks/run_benchmarks.py
          </code>
          .
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
              {ROWS.map((row) => (
                <tr key={row.dataset}>
                  <td className="py-2 pr-4 font-medium">{row.dataset}</td>
                  <td className="py-2 pr-4" style={{ color: "var(--muted)" }}>
                    {row.baseline}
                  </td>
                  <td className="py-2 pr-4" style={{ color: "var(--muted)" }}>
                    {row.bnnr}
                  </td>
                  <td className="py-2" style={{ color: "var(--muted)" }}>
                    {row.gain}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        <p className="text-center text-xs mt-4" style={{ color: "var(--muted)" }}>
          Reproduce locally:{" "}
          <a
            href="https://github.com/bnnr-team/bnnr/tree/main/benchmarks"
            className="underline"
            style={{ color: "var(--accent)" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/bnnr-team/bnnr/benchmarks
          </a>
        </p>
      </div>
    </section>
  );
}
