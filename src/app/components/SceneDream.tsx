"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneDreamProps {
  onComplete: () => void;
}

export default function SceneDream({ onComplete }: SceneDreamProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 5000),  // 5 seconds for dream line 1
      setTimeout(() => setPhase(2), 11500), // 6.5 seconds for dream line 2
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {/* Warm ambient glow */}
      <motion.div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.12), transparent)",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
        }}
        animate={{ opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="text-center max-w-md px-6">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.p
              key="dream1"
              className="font-display text-2xl md:text-4xl italic font-light leading-relaxed"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4 }}
            >
              I dream of waking to your laugh, hand in hand, building our forever.
            </motion.p>
          )}

          {phase === 1 && (
            <motion.p
              key="dream2"
              className="font-display text-3xl md:text-5xl italic font-medium leading-tight"
              style={{ color: "var(--accent-gold)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6 }}
            >
              The day we&apos;ll become one.
            </motion.p>
          )}

          {phase === 2 && (
            <motion.div
              key="dream3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4 }}
              className="flex flex-col items-center"
            >
              <p
                className="font-display text-3xl md:text-5xl italic font-medium leading-tight mb-14"
                style={{ color: "var(--accent-gold)" }}
              >
                The day we&apos;ll become one.
              </p>
              <motion.button
                className="btn-primary"
                onClick={onComplete}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
