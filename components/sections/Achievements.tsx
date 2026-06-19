"use client";

import { motion } from "framer-motion";
import { Award, Trophy, GraduationCap, Calendar } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/motionVariants";

const achievements = [
  {
    icon: Award,
    title: "Outstanding Creativity Award (2024)",
    description:
      "Won at PCET's Pimpri Chinchwad University project exhibition for a Smart Air Quality Monitoring System with a real-time dashboard.",
    color: "#2DE2E6",
  },
  {
    icon: Trophy,
    title: "AVINYA 3.0 Hackathon (2024)",
    description:
      "Built an AI-powered Interview Simulation Module at JSPM's RSCOE featuring mock interviews and real-time AI feedback, competing against 30+ teams.",
    color: "#8B5CF6",
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading
          title="Achievements & Education"
          subtitle="Milestones"
        />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Achievements */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <h3 className="mb-6 font-heading text-xl font-semibold text-text-primary">
              Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div key={achievement.title} variants={staggerItem}>
                  <GlowCard className="p-5" glowColor={`${achievement.color}12`}>
                    <div className="flex gap-4">
                      <div
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${achievement.color}10` }}
                      >
                        <achievement.icon
                          className="h-5 w-5"
                          style={{ color: achievement.color }}
                        />
                      </div>
                      <div>
                        <h4 className="mb-1 font-heading text-base font-semibold text-text-primary">
                          {achievement.title}
                        </h4>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <h3 className="mb-6 font-heading text-xl font-semibold text-text-primary">
              Education
            </h3>
            <motion.div variants={staggerItem}>
              <GlowCard className="p-6" glowColor="#2DE2E612">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-neon-cyan/10">
                    <GraduationCap className="h-6 w-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-heading text-lg font-semibold text-text-primary">
                      B.Tech in Computer Science Engineering
                    </h4>
                    <p className="mb-1 text-sm font-medium text-text-secondary">
                      PCET&apos;s Pimpri Chinchwad University
                    </p>
                    <div className="flex items-center gap-2 font-mono text-xs text-text-secondary/60">
                      <Calendar className="h-3 w-3" />
                      <span>Aug 2023 – Present</span>
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
