"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";

const LAUNCH_DATE = new Date("2026-03-31T18:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({
  value,
  label,
  mounted,
}: {
  value: number;
  label: string;
  mounted: boolean;
}) {
  const display = mounted ? String(value).padStart(2, "0") : "00";

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-[72px] h-[80px] sm:w-[90px] sm:h-[96px] rounded-bnnr flex items-center justify-center overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          boxShadow:
            "0 0 20px rgba(240, 160, 105, 0.08), 0 4px 24px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(240,160,105,0.4), transparent)",
          }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={mounted ? value : "ssr"}
            initial={{ y: -20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="text-3xl sm:text-4xl font-black tabular-nums"
            style={{
              background: "linear-gradient(135deg, #f5b888, #f0a069, #c96a35)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-2 text-xs sm:text-sm font-medium uppercase tracking-widest"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function FloatingOrb({
  size,
  x,
  y,
  delay,
  duration,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background:
          "radial-gradient(circle, rgba(240,160,105,0.12) 0%, transparent 70%)",
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        scale: [1, 1.1, 1, 0.9, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function PipelineStep({
  step,
  desc,
  index,
}: {
  step: string;
  desc: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 + index * 0.15, duration: 0.5 }}
      className="flex items-center gap-2"
    >
      {index > 0 && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 + index * 0.15 }}
          style={{ color: "var(--accent)" }}
          className="hidden sm:inline"
        >
          →
        </motion.span>
      )}
      <span
        className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap"
        style={{
          background: "rgba(240,160,105,0.1)",
          border: "1px solid rgba(240,160,105,0.2)",
          color: "var(--accent)",
        }}
      >
        {step}
        <span className="hidden sm:inline" style={{ color: "var(--muted)" }}>
          {" "}
          {desc}
        </span>
      </span>
    </motion.div>
  );
}

export function CountdownPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark
    ? "/logos/logo_czarne.PNG"
    : "/logos/logo_biale.PNG";

  const pipeline = useMemo(
    () => [
      { step: "Train", desc: "your model" },
      { step: "Explain", desc: "with XAI" },
      { step: "Improve", desc: "via ICD/AICD" },
      { step: "Prove", desc: "with reports" },
    ],
    []
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background orbs */}
      <FloatingOrb size={600} x="10%" y="20%" delay={0} duration={20} />
      <FloatingOrb size={400} x="70%" y="10%" delay={2} duration={15} />
      <FloatingOrb size={300} x="50%" y="60%" delay={4} duration={18} />
      <FloatingOrb size={200} x="85%" y="75%" delay={1} duration={12} />
      <FloatingOrb size={350} x="25%" y="80%" delay={3} duration={16} />

      {/* Radial spotlight */}
      {isDark && (
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(240,160,105,0.08) 0%, transparent 60%)",
          }}
        />
      )}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          {mounted ? (
            <Image
              src={logoSrc}
              alt="BNNR"
              width={180}
              height={180}
              className="neon-logo h-auto"
              style={{ width: "180px" }}
              priority
            />
          ) : (
            <div
              className="text-5xl font-black"
              style={{ color: "var(--accent)" }}
            >
              BNNR
            </div>
          )}
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: "rgba(240,160,105,0.1)",
              border: "1px solid rgba(240,160,105,0.2)",
              color: "var(--accent)",
            }}
          >
            <Rocket size={14} />
            Something big is coming
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-4"
        >
          Launching{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #f5b888, #f0a069, #c96a35)",
            }}
          >
            Soon
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          style={{ color: "var(--muted)" }}
        >
          Make PyTorch vision models production&#8209;ready. XAI diagnostics,
          intelligent augmentation, and evidence&#8209;based reporting — in one
          closed&#8209;loop toolkit.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-3 sm:gap-5 mb-10"
        >
          <CountdownUnit value={timeLeft.days} label="Days" mounted={mounted} />
          <div
            className="flex items-center text-2xl sm:text-3xl font-bold self-start mt-6 sm:mt-7"
            style={{ color: "var(--accent)" }}
          >
            :
          </div>
          <CountdownUnit value={timeLeft.hours} label="Hours" mounted={mounted} />
          <div
            className="flex items-center text-2xl sm:text-3xl font-bold self-start mt-6 sm:mt-7"
            style={{ color: "var(--accent)" }}
          >
            :
          </div>
          <CountdownUnit value={timeLeft.minutes} label="Min" mounted={mounted} />
          <div
            className="flex items-center text-2xl sm:text-3xl font-bold self-start mt-6 sm:mt-7"
            style={{ color: "var(--accent)" }}
          >
            :
          </div>
          <CountdownUnit value={timeLeft.seconds} label="Sec" mounted={mounted} />
        </motion.div>

        {/* Pipeline steps */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {pipeline.map((item, i) => (
            <PipelineStep
              key={item.step}
              step={item.step}
              desc={item.desc}
              index={i}
            />
          ))}
        </div>

      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute bottom-6 flex items-center gap-4 text-xs"
        style={{ color: "var(--muted)" }}
      >
        <span>&copy; {new Date().getFullYear()} BNNR Team</span>
        <span style={{ color: "var(--border-color)" }}>|</span>
        <span>Bulletproof Neural Network Recipe</span>
      </motion.div>
    </div>
  );
}
