"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import TiltCard from "@/components/ui/TiltCard";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motionVariants";

const projects = [
  {
    title: "URL Health Monitor",
    tech: ["Go"],
    description:
      "Concurrent endpoint-monitoring tool that checks N URLs simultaneously using goroutines, cutting total check time by ~70% versus sequential polling across 50+ endpoints. Tracks HTTP status codes, response times, and failure rates via Go's net/http package.",
    github: "https://github.com/ashish-dhakane/CURLSC",
    demo: "https://curlsc.vercel.app/",
    image: "/images/project-url-monitor.jpg",
    color: "#2DE2E6",
  },
{
    title: "AI Fitness Coach",
    tech: ["Next.js", "Node.js", "Express.js", "PostgreSQL", "Prisma", "Clerk", "Gemini API"],
    description:
      "AI-powered fitness platform that generates personalized workout and nutrition plans based on user goals, body metrics, and fitness level. Tracks workout schedules, calorie/protein intake, and progress over time, with REST APIs built on Express and Prisma, and Clerk handling authentication and session management.",
    github: "https://github.com/ashish-dhakane/AI-Fitness-Coach",
    //demo: "https://github.com/ashish-dhakane/AI-Fitness-Coach",
    image: "/images/project-aifitness.jpg",
    color: "#7C5CFF",
  },
  {
    title: "Sarthi AI",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Clerk", "Gemini API"],
    description:
      "Mental wellness web app offering mood tracking and AI-driven conversational support for users seeking emotional guidance. Backend built with Node.js and Express, using PostgreSQL to persist conversation history and Clerk for secure user authentication, with the Gemini API generating contextual responses.",
    github: "https://github.com/ashish-dhakane/Sarthi-AI",
    //demo: "https://github.com/ashish-dhakane/Sarthi-AI",
    image: "/images/project-sarthi.jpg",
    color: "#FF6B6B",
  },
  {
    title: "TaskFlow",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Prisma", "PostgreSQL"],
    description:
      "Dark-mode productivity app with task management, a focus timer with animated progress ring, and system notifications via Service Worker. Includes drag-and-drop task reordering, a productivity dashboard with streaks and stats, and automatic LocalStorage fallback when PostgreSQL is unavailable.",
    github: "https://github.com/ashish-dhakane/TaskFlow",
    demo: "https://task-flow-tawny-gamma.vercel.app/",
    image: "/images/project-taskflow.jpg",
    color: "#00D9A5",
  },
  {
    title: "Imprest Management System",
    tech: ["Node.js", "Express.js", "PostgreSQL", "JWT"],
    description:
      "Enterprise expense-management platform with multi-level approval workflows, role-based access control (RBAC), and real-time status tracking. Built with Node.js, Express.js, PostgreSQL, and JWT authentication, including secure file uploads and dynamic dashboards.",
    github: "https://github.com/ashishdhakane/imprest-management",
    demo: "",
    image: "/images/project-imprest.jpg",
    color: "#2DE2E6",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="Work"
        />

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={staggerItem}>
              <TiltCard tiltMaxAngleX={5} tiltMaxAngleY={5}>
                <GlowCard
                  className="h-full overflow-hidden"
                  glowColor={`${project.color}15`}
                >
                  {/* Screenshot */}
                  <div className="group relative aspect-[16/10] w-full overflow-hidden bg-bg-obsidian">
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-navy via-transparent to-transparent" />

                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-bg-obsidian/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-neon-cyan/20"
                        aria-label="View source on GitHub"
                      >
                        <Github className="h-5 w-5 text-white" />
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-neon-cyan/20"
                          aria-label="View live demo"
                        >
                          <Play className="h-5 w-5 text-white" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3 flex items-start justify-between">
                      <h3 className="font-heading text-lg font-semibold text-text-primary">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-white/5 hover:text-neon-cyan"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <Github className="h-4 w-4" />
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-white/5 hover:text-neon-cyan"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-text-secondary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
