"use client";

import { motion } from "framer-motion";
import { fadeInUp, easeOutExpo } from "@/lib/motionVariants";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 },
        },
      }}
    >
      <motion.div
        className={cn(
          "mb-4 inline-flex items-center gap-2",
          align === "center" ? "justify-center" : "justify-start"
        )}
        variants={fadeInUp}
      >
        <span className="h-px w-8 bg-neon-cyan/50" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
          {subtitle}
        </span>
        <span className="h-px w-8 bg-neon-cyan/50" />
      </motion.div>

      <motion.h2
        className="font-heading text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>

      <motion.div
        className={cn(
          "mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-neon-cyan to-electric-indigo",
          align === "center" ? "mx-auto" : ""
        )}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: easeOutExpo, delay: 0.3 },
          },
        }}
      />
    </motion.div>
  );
}
