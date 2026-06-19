import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import Certifications from "@/components/sections/Certifications";   // ← add
import Footer from "@/components/sections/Footer";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Certifications />   {/* ← add */}
      <Achievements />
      <Footer />
      <BackToTop />
    </main>
  );
}
