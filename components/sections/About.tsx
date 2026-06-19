"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Database, Server, Layout } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motionVariants";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Go", "Python", "JavaScript (Node.js)", "Java", "C"],
    color: "#2DE2E6",
  },
  {
    icon: Server,
    title: "Backend & Databases",
    skills: ["REST API Design", "Express.js", "PostgreSQL", "MySQL", "SQL"],
    color: "#8B5CF6",
  },
  {
    icon: Database,
    title: "DevOps & Tools",
    skills: ["Git", "GitHub", "Linux (Ubuntu)", "AWS (EC2, S3)", "Postman", "Docker"],
    color: "#2DE2E6",
  },
  {
    icon: Layout,
    title: "Frontend & Core Concepts",
    skills: [
      "React.js",
      "Next.js",
      "Concurrent & Parallel Programming",
      "System Design",
      "Cybersecurity Fundamentals",
    ],
    color: "#8B5CF6",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          title="About & Technical Core"
          subtitle="Profile"
        />

        {/* About row: photo + summary */}
        <motion.div
          className="mb-16 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Profile photo — larger, framed */}
          <motion.div
            variants={staggerItem}
            className="relative flex-shrink-0"
          >
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl border border-neon-cyan/20 shadow-[0_0_40px_rgba(45,226,230,0.1)] sm:h-72 sm:w-72">
              <Image
                src="/images/profile.jpg"
                alt="Ashish Dhakane"
                fill
                className="object-cover"
                sizes="288px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-obsidian/40 to-transparent" />
            </div>
            {/* Decorative corner accents */}
            <div className="absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2 border-neon-cyan/40" />
            <div className="absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-neon-cyan/40" />
          </motion.div>

          {/* Summary text */}
          <motion.div variants={staggerItem} className="max-w-xl text-center lg:text-left">
            <h3 className="mb-4 font-heading text-2xl font-bold text-text-primary sm:text-3xl">
              Backend Engineer with a{" "}
              <span className="gradient-text">Systems Mindset</span>
            </h3>
            <p className="mb-6 text-base leading-relaxed text-text-secondary">
              Currently interning at{" "}
              <span className="font-semibold text-text-primary">Maha Metro</span>,
              building REST APIs and enterprise backend infrastructure. Proven
              ability to design production-grade systems independently with a
              focus on clean architecture, testability, and performance.
            </p>
            <p className="text-base leading-relaxed text-text-secondary">
              I enjoy working at the intersection of performance and security —
              whether that means optimizing goroutine concurrency in Go, designing
              resilient PostgreSQL schemas, or automating file-integrity checks
              for Linux deployments.
            </p>
          </motion.div>
        </motion.div>

        {/* Skill Matrix */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={staggerItem}>
              <GlowCard
                className="h-full p-6"
                glowColor={`${category.color}15`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/5">
                  <category.icon
                    className="h-5 w-5"
                    style={{ color: category.color }}
                  />
                </div>
                <h3 className="mb-4 font-heading text-lg font-semibold text-text-primary">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-text-secondary transition-colors hover:border-neon-cyan/20 hover:text-neon-cyan"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
