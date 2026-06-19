"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface Certificate {
  src: string;
  alt: string;
}

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificates: Certificate[];
}

export default function CertificateModal({
  isOpen,
  onClose,
  certificates,
}: CertificateModalProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Keyboard controls: Esc closes lightbox first, then the grid. Arrows navigate the lightbox.
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeIndex !== null) setActiveIndex(null);
        else onClose();
      }
      if (activeIndex !== null && e.key === "ArrowRight") {
        setActiveIndex((i) => (i === null ? i : (i + 1) % certificates.length));
      }
      if (activeIndex !== null && e.key === "ArrowLeft") {
        setActiveIndex((i) =>
          i === null ? i : (i - 1 + certificates.length) % certificates.length
        );
      }
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, activeIndex, certificates.length]);

  // Reset the lightbox whenever the whole modal closes
  useEffect(() => {
    if (!isOpen) setActiveIndex(null);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-obsidian/90 px-4 py-8 backdrop-blur-md sm:px-8"
          onClick={onClose}
        >
          {/* Bounded panel — fixed height, scrolls internally */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-electric-indigo/20 bg-bg-navy/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-white/5 px-6 py-5 sm:px-8">
              <h3 className="font-heading text-xl font-bold text-text-primary sm:text-2xl">
                My Certifications
              </h3>
              <button
                onClick={onClose}
                aria-label="Close certificates"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable grid */}
            <div className="overflow-y-auto px-6 py-6 sm:px-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert, index) => (
                  <button
                    key={cert.src}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-electric-indigo/30 bg-bg-obsidian text-left"
                  >
                    <Image
                      src={cert.src}
                      alt={cert.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-bg-obsidian/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="p-3 text-xs font-medium text-text-primary">
                        {cert.alt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Lightbox — single enlarged certificate */}
          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[110] flex items-center justify-center bg-bg-obsidian/95 p-4 backdrop-blur-lg sm:p-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(null);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIndex(null);
                  }}
                  aria-label="Close certificate"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-text-primary transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
                >
                  <X className="h-5 w-5" />
                </button>

                {certificates.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex((i) =>
                          i === null ? i : (i - 1 + certificates.length) % certificates.length
                        );
                      }}
                      aria-label="Previous certificate"
                      className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-text-primary transition-colors hover:bg-white/10 sm:left-6"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex((i) => (i === null ? i : (i + 1) % certificates.length));
                      }}
                      aria-label="Next certificate"
                      className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/5 text-text-primary transition-colors hover:bg-white/10 sm:right-6"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex max-h-full max-w-full flex-col items-center gap-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    key={activeIndex}
                    src={certificates[activeIndex].src}
                    alt={certificates[activeIndex].alt}
                    className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-text-primary">
                      {certificates[activeIndex].alt}
                    </p>
                    <p className="mt-1 font-mono text-xs text-text-secondary">
                      {activeIndex + 1} / {certificates.length}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}