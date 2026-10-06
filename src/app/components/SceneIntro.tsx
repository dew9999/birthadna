"use client";

import { motion } from "framer-motion";

interface SceneIntroProps {
  onBegin: () => void;
}

export default function SceneIntro({ onBegin }: SceneIntroProps) {
  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.15), transparent)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Sound suggestion */}
      <motion.p
        className="font-ui text-xs tracking-[0.2em] uppercase mb-16"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        This experience is better with sound ♫
      </motion.p>

      {/* Date */}
      <motion.p
        className="font-ui text-sm tracking-[0.3em] uppercase mb-6"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        07 / 10
      </motion.p>

      {/* Title */}
      <motion.h1
        className="font-display text-5xl md:text-7xl font-light italic mb-6"
        style={{ color: "var(--text-primary)" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1.2 }}
      >
        For Ranuchtyyy
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="font-body text-lg md:text-xl mb-16"
        style={{ color: "var(--text-secondary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      >
        I made you something.
      </motion.p>

      {/* Begin button */}
      <motion.button
        className="btn-primary"
        onClick={onBegin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Begin →
      </motion.button>
    </motion.div>
  );
}
