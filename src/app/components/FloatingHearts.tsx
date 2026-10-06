"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotate: number;
  color: string;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(200, 169, 110, 0.4)", // warm gold
      "rgba(184, 104, 125, 0.45)", // rose gold
      "rgba(212, 165, 116, 0.35)", // soft amber
      "rgba(168, 124, 159, 0.35)", // soft violet
      "rgba(245, 240, 235, 0.3)",  // warm white
    ];

    const generatedHearts: HeartParticle[] = Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: Math.random() * 95, // percentage
      size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
      duration: Math.random() * 12 + 14, // 14s to 26s
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.2,
      rotate: (Math.random() - 0.5) * 40,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setHearts(generatedHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute font-serif"
          style={{
            left: `${heart.x}%`,
            bottom: "-40px",
            fontSize: `${heart.size}px`,
            color: heart.color,
            filter: "drop-shadow(0 0 6px rgba(200, 169, 110, 0.25))",
            userSelect: "none",
          }}
          animate={{
            y: [0, -1100],
            x: [0, Math.sin(heart.id) * 45, 0],
            rotate: [heart.rotate, heart.rotate + 360],
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
