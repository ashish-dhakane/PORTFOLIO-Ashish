"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, ArrowUpRight, MessageSquare } from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motionVariants";

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 bg-bg-navy/30 py-24">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />

      <div className="mx-auto max-w-content px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-px w-8 bg-neon-cyan/50" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
                Get in Touch
              </span>
              <span className="h-px w-8 bg-neon-cyan/50" />
            </div>
            <h2 className="mb-4 font-heading text-3xl font-bold text-text-primary sm:text-4xl md:text-5xl">
              Let&apos;s Build Something{" "}
              <span className="gradient-text">Together</span>
            </h2>
            <p className="mx-auto max-w-xl text-base text-text-secondary">
              Have a project, opportunity, or just want to chat? Drop me a message —
              I&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>

          {/* Contact Form + Info Grid */}
          <div className="mb-20 grid gap-10 lg:grid-cols-5">
            {/* Form — takes 3 columns */}
            <motion.div variants={fadeInUp} className="lg:col-span-3">
              <ContactForm />
            </motion.div>

            {/* Side info — takes 2 columns */}
            <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-6 lg:col-span-2">
              <div>
                <h3 className="mb-3 font-heading text-lg font-semibold text-text-primary">
                  Prefer direct contact?
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  You can also reach me via email or phone. I&apos;m based in Pune, India
                  and open to remote opportunities worldwide.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:dhakneashish110@gmail.com"
                  className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-neon-cyan/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10 transition-colors group-hover:bg-neon-cyan/20">
                    <Mail className="h-4 w-4 text-neon-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary/60">
                      Email
                    </p>
                    <p className="truncate text-sm font-medium text-text-primary transition-colors group-hover:text-neon-cyan">
                      dhakneashish110@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918830533848"
                  className="group flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-neon-cyan/20 hover:bg-white/[0.04]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon-cyan/10 transition-colors group-hover:bg-neon-cyan/20">
                    <Phone className="h-4 w-4 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-text-secondary/60">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-text-primary transition-colors group-hover:text-neon-cyan">
                      +91 8830533848
                    </p>
                  </div>
                </a>
              </div>

              {/* Social links */}
              <div>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-text-secondary/60">
                  Socials
                </p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/ashish-dhakane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 transition-all hover:border-neon-cyan/20 hover:bg-white/[0.04]"
                  >
                    <Github className="h-4 w-4 text-text-secondary transition-colors group-hover:text-neon-cyan" />
                    <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-neon-cyan">
                      GitHub
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-text-secondary/30 transition-colors group-hover:text-neon-cyan" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ashish-dhakane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 transition-all hover:border-neon-cyan/20 hover:bg-white/[0.04]"
                  >
                    <Linkedin className="h-4 w-4 text-text-secondary transition-colors group-hover:text-neon-cyan" />
                    <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-neon-cyan">
                      LinkedIn
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-text-secondary/30 transition-colors group-hover:text-neon-cyan" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row"
          >
            <div className="flex items-center gap-3">
              <span className="font-heading text-xl font-bold text-text-primary">
                Ashish Dhakane
              </span>
              <span className="h-4 w-px bg-white/10" />
              <span className="font-mono text-xs text-text-secondary/50">
                Full-Stack Developer
              </span>
            </div>

            <p className="font-mono text-xs text-text-secondary/40">
              Built with Next.js, Three.js & Tailwind CSS
            </p>

            <p className="font-mono text-xs text-text-secondary/40">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
