"use client";

import React, { useEffect } from "react";
import {
  animate,
  motion,
  useAnimate,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const ColorGradient = ({
  colors,
  duration = 10,
  className,
}: {
  colors: string[];
  duration?: number;
  className?: string;
}) => {
  const myColor = useMotionValue(colors[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(100% 70% at 50% 0%, ${myColor} 10%, rgba(0,0,0,0) 100%)`;

  useEffect(() => {
    animate(myColor, colors, {
      ease: "easeInOut",
      duration,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  return (
    <motion.div
      style={{
        backgroundImage,
      }}
      className={cn(
        "absolute h-96 w-full flex items-center justify-center",
        className
      )}
    ></motion.div>
  );
};

export default ColorGradient;
