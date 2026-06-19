"use client";

import { ReactNode } from "react";
import ParallaxTilt from "react-parallax-tilt";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
}

export default function TiltCard({
  children,
  className,
  tiltMaxAngleX = 8,
  tiltMaxAngleY = 8,
}: TiltCardProps) {
  return (
    <ParallaxTilt
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      perspective={1000}
      scale={1.02}
      transitionSpeed={400}
      glareEnable={true}
      glareMaxOpacity={0.08}
      glareColor="#2DE2E6"
      glarePosition="all"
      className={cn("transform-gpu", className)}
    >
      {children}
    </ParallaxTilt>
  );
}
