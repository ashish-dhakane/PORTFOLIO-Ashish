"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import GlowCard from "./GlowCard";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot — hidden from users
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setStatusMessage(data.message || "Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        setErrors({});
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  };

  const inputClasses = (field: keyof FormErrors) =>
    `w-full rounded-lg border bg-white/[0.03] px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-secondary/30 transition-all focus:border-neon-cyan/50 focus:bg-white/[0.05] focus:outline-none ${
      errors[field]
        ? "border-red-500/50 focus:border-red-500/50"
        : "border-white/5 focus:border-neon-cyan/30"
    }`;

  return (
    <GlowCard className="p-6 sm:p-8" glowColor="rgba(45,226,230,0.08)">
      <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
        {/* Honeypot — hidden from real users */}
        <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-secondary/70">
              Name <span className="text-neon-cyan">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              className={inputClasses("name")}
              placeholder="John Doe"
              disabled={status === "loading"}
            />
            <AnimatePresence>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-secondary/70">
              Email <span className="text-neon-cyan">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={inputClasses("email")}
              placeholder="john@example.com"
              disabled={status === "loading"}
            />
            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-secondary/70">
            Subject <span className="text-text-secondary/30">(optional)</span>
          </label>
          <input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full rounded-lg border border-white/5 bg-white/[0.03] px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-secondary/30 transition-all focus:border-neon-cyan/30 focus:bg-white/[0.05] focus:outline-none"
            placeholder="Project collaboration, job opportunity..."
            disabled={status === "loading"}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-text-secondary/70">
            Message <span className="text-neon-cyan">*</span>
          </label>
          <textarea
            id="message"
            rows={5}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            className={`${inputClasses("message")} resize-none`}
            placeholder="Tell me about your project, opportunity, or just say hi..."
            disabled={status === "loading"}
          />
          <AnimatePresence>
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-1.5 flex items-center gap-1 text-xs text-red-400"
              >
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="group inline-flex items-center gap-2 rounded-lg bg-neon-cyan px-6 py-3 font-heading font-semibold text-bg-obsidian transition-all hover:bg-neon-cyan/90 disabled:cursor-not-allowed disabled:opacity-60"
            whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
            whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                Send Message
              </>
            )}
          </motion.button>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 text-sm font-medium text-green-400"
              >
                <CheckCircle className="h-4 w-4" />
                {statusMessage}
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 text-sm font-medium text-red-400"
              >
                <AlertCircle className="h-4 w-4" />
                {statusMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </GlowCard>
  );
}
