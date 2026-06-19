"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CertificateModal, { Certificate } from "@/components/ui/CertificateModal";
import { fadeInUp } from "@/lib/motionVariants";

const certificates: Certificate[] = [
  { src: "/images/certificates/cert1.jpg", alt: "" },
  { src: "/images/certificates/cert2.jpg", alt: "" },
  { src: "/images/certificates/cert3.jpg", alt: "" },
  { src: "/images/certificates/cert4.jpg", alt: "" },
  { src: "/images/certificates/cert5.jpg", alt: "" },
  { src: "/images/certificates/cert6.jpg", alt: "" },
  { src: "/images/certificates/cert7.jpg", alt: "" },
  { src: "/images/certificates/cert8.jpg", alt: "" },
  { src: "/images/certificates/cert9.jpg", alt: "" },
  {src: "/images/certificates/cert10.jpg", alt: "" },
  {src: "/images/certificates/cert11.jpg", alt: "" },
  {src: "/images/certificates/cert12.jpg", alt: "" },
  {src: "/images/certificates/cert13.jpg", alt: "" },

];

export default function Certifications() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6">
        <SectionHeading title="Certifications" subtitle="Credentials" />

        <motion.button
          type="button"
          onClick={() => setIsModalOpen(true)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeInUp}
          whileHover={{ y: -4 }}
          className="mx-auto flex w-full max-w-md flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-electric-indigo/40 bg-bg-navy/60 px-8 py-12 text-center transition-colors hover:border-electric-indigo/70 hover:bg-bg-navy"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-electric-indigo/10">
            <Award className="h-7 w-7 text-electric-indigo" />
          </span>
          <span className="font-heading text-xl font-semibold text-text-primary">
            View My Certificates
          </span>
          <span className="text-sm text-text-secondary">
            Click to browse all certifications
          </span>
        </motion.button>
      </div>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificates={certificates}
      />
    </section>
  );
}