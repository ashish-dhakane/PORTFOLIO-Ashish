import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/lib/smoothScroll";
import Navbar from "@/components/ui/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ashishdhakane.dev"),
  title: "Ashish Dhakane",
  description:
    "Full-Stack Computer Science Engineer with a strong interest in cybersecurity, specializing in production-grade systems, concurrent applications, and secure architectures.",
keywords: [
    "Ashish Dhakane",
    "Full-Stack Developer",
    "Go",
    "Node.js",
    "Cybersecurity",
    "Portfolio",
    "Computer Science",
  ],
  authors: [{ name: "Ashish Dhakane" }],
openGraph: {
    title: "Ashish Dhakane | Full-Stack Developer & CS Student",
    description:
      "Full-Stack Developer with a passion for cybersecurity. Building production-grade systems with a security-first mindset.",
    type: "website",
    locale: "en_US",
    url: "https://ashishdhakane.dev",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ashish Dhakane — Full-Stack Developer Portfolio",
      },
    ],
  },
twitter: {
    card: "summary_large_image",
    title: "Ashish Dhakane | Full-Stack Developer & CS Student",
    description:
      "Full-Stack Developer with a passion for cybersecurity. Building production-grade systems with a security-first mindset.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-bg-obsidian text-text-primary antialiased">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
