"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeInUp, easeOutExpo } from "@/lib/motionVariants";

const experiences = [
  {
    company: "Maha Metro Rail Corporation",
    role: "Backend Intern",
    period: "May 2025 – June 2025",
    bullets: [
      "Developed REST API endpoints for internal enterprise modules using Node.js, enabling reliable data exchange between 3+ backend services.",
      "Resolved critical bugs in database query logic and API response handling, reducing error frequency in two high-use workflows.",
      "Actively participated in code reviews and architecture discussions, contributing backend design suggestions adopted by the team.",
    ],
  },
];

function TimelineItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative pl-8 sm:pl-12">
      {/* Timeline line */}
      <motion.div
        className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neon-cyan/50 via-electric-indigo/30 to-transparent"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.2, ease: easeOutExpo, delay: index * 0.2 }}
        style={{ originY: 0 }}
      />

      {/* Timeline dot */}
      <motion.div
        className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-neon-cyan bg-bg-obsidian"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: index * 0.2 }}
      />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.3 },
          },
        }}
      >
        <motion.div variants={fadeInUp} className="mb-2 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10">
            <Briefcase className="h-5 w-5 text-neon-cyan" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-semibold text-text-primary">
              {experience.company}
            </h3>
            <p className="font-mono text-sm text-neon-cyan">
              {experience.role}
            </p>
          </div>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mb-4 font-mono text-xs uppercase tracking-wider text-text-secondary/60"
        >
          {experience.period}
        </motion.p>

        <ul className="space-y-3">
          {experience.bullets.map((bullet, i) => (
            <motion.li
              key={i}
              variants={fadeInUp}
              className="flex gap-3 text-text-secondary"
            >
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neon-cyan/60" />
              <span className="leading-relaxed">{bullet}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          title="Professional Experience"
          subtitle="Career"
        />

        <div className="mx-auto max-w-3xl">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.company} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
