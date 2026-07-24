// components/sections/Hero.tsx
"use client";

import { useRef, useState, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem, easeOutExpo } from "@/lib/motionVariants";

const ParticleField = lazy(() => import("@/components/three/ParticleField"));
const HeroObject = lazy(() => import("@/components/three/HeroObject"));

function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-navy to-bg-obsidian" />
  );
}

export default function Hero() {
  const [showLinks, setShowLinks] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <Suspense fallback={<HeroFallback />}>
        <ParticleField />
      </Suspense>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-content px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          {/* Profile Photo */}
          <motion.div
            variants={staggerItem}
            className="relative mb-6"
          >
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 border-neon-cyan/30 shadow-[0_0_30px_rgba(45,226,230,0.15)] sm:h-32 sm:w-32">
              <Image
                src="/images/profile.jpg"
                alt="Ashish Dhakane"
                fill
                className="object-cover"
                priority
                sizes="128px"
              />
            </div>
            {/* Pulsing online indicator */}
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-bg-obsidian bg-green-500">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
              </span>
            </div>
          </motion.div>

          {/* 3D Centerpiece */}
          <motion.div
            variants={staggerItem}
            className="mb-6 h-48 w-48 sm:h-56 sm:w-56 md:h-72 md:w-72"
          >
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
              >
                <HeroObject />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Label */}
          <motion.div
            variants={staggerItem}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-bg-navy/60 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-neon-cyan">
              Open to Full-Stack & SDE Roles
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={staggerItem}
            className="mb-6 font-heading text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Building Full-Stack{" "}
            <span className="gradient-text">Products</span>
            <br />
            with a Security-First Mindset
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={staggerItem}
            className="mb-10 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Hi, I&apos;m{" "}
            <span className="font-semibold text-text-primary">Ashish Dhakane</span>{" "}
            — a Full-Stack Computer Science Engineer with a strong interest in
            cybersecurity, specializing in production-grade systems, concurrent
            applications, and secure architectures.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <motion.button
              onClick={scrollToProjects}
              className="group relative inline-flex items-center gap-2 rounded-lg bg-neon-cyan px-8 py-3 font-heading font-semibold text-bg-obsidian transition-all hover:bg-neon-cyan/90 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-bg-obsidian"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => setShowLinks(!showLinks)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-bg-navy/60 px-8 py-3 font-heading font-medium text-text-primary backdrop-blur-sm transition-all hover:border-neon-cyan/30 hover:bg-bg-navy focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-bg-obsidian"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Connect
              </motion.button>

              {/* Connect dropdown */}
              <motion.div
                initial={false}
                animate={{
                  opacity: showLinks ? 1 : 0,
                  y: showLinks ? 0 : -10,
                  pointerEvents: showLinks ? "auto" : "none",
                }}
                transition={{ duration: 0.2, ease: easeOutExpo }}
                className="absolute top-full left-1/2 mt-3 flex -translate-x-1/2 items-center gap-3 rounded-lg border border-white/10 bg-bg-navy/95 p-3 backdrop-blur-md"
              >
                <a
                  href="https://github.com/ashish-dhakane"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-white/5 hover:text-neon-cyan"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ashish-dhakane/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-white/5 hover:text-neon-cyan"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:dhakneashish110@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-white/5 hover:text-neon-cyan"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: easeOutExpo }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-text-secondary/60">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 text-text-secondary/60" />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-bg-obsidian to-transparent" />
    </section>
  );
}
