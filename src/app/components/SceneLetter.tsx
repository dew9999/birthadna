"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneLetterProps {
  onComplete: () => void;
}

export default function SceneLetter({ onComplete }: SceneLetterProps) {
  const [phase, setPhase] = useState<"prompt" | "envelope" | "letter">("prompt");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setPhase("letter"), 1200);
  };

  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.08), transparent)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <AnimatePresence mode="wait">
        {phase === "prompt" && (
          <motion.div
            key="prompt"
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="font-display text-3xl md:text-4xl italic font-light mb-12"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              One last thing.
            </motion.p>
            <motion.button
              className="btn-primary"
              onClick={() => setPhase("envelope")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open
            </motion.button>
          </motion.div>
        )}

        {phase === "envelope" && (
          <motion.div
            key="envelope"
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            {/* Envelope */}
            <div
              className="relative cursor-pointer"
              onClick={handleOpenEnvelope}
              style={{ perspective: "1000px" }}
            >
              {/* Envelope body */}
              <div
                className="relative overflow-hidden"
                style={{
                  width: "300px",
                  height: "200px",
                  background: "linear-gradient(135deg, #2A2530, #1E1A24)",
                  borderRadius: "6px",
                  border: "1px solid rgba(200, 169, 110, 0.15)",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
                }}
              >
                {/* Inner V shape */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "100%",
                    background: "linear-gradient(to bottom right, transparent 49%, rgba(200,169,110,0.05) 50%) left, linear-gradient(to bottom left, transparent 49%, rgba(200,169,110,0.05) 50%) right",
                    backgroundSize: "50% 100%",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </div>

              {/* Flap */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "100px",
                  transformOrigin: "top center",
                  zIndex: 2,
                }}
                animate={{
                  rotateX: envelopeOpen ? 180 : 0,
                }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              >
                <div
                  style={{
                    width: "300px",
                    height: "100px",
                    background: "linear-gradient(180deg, #2E2838, #2A2530)",
                    border: "1px solid rgba(200, 169, 110, 0.15)",
                    borderBottom: "none",
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  }}
                />
              </motion.div>

              {/* Seal */}
              {!envelopeOpen && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(200,169,110,0.2)",
                      "0 0 30px rgba(200,169,110,0.35)",
                      "0 0 15px rgba(200,169,110,0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--accent-gold), var(--accent-warm))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                    }}
                  >
                    ♥
                  </div>
                </motion.div>
              )}
            </div>

            {!envelopeOpen && (
              <motion.p
                className="font-ui text-xs tracking-[0.15em] uppercase mt-6"
                style={{ color: "var(--text-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
              >
                Tap to open
              </motion.p>
            )}
          </motion.div>
        )}

        {phase === "letter" && (
          <motion.div
            key="letter"
            className="flex flex-col items-center w-full px-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="letter" style={{ overflow: "auto", maxHeight: "70vh" }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
              >
                <p className="mb-6 leading-relaxed" style={{ textIndent: "1.5em" }}>
                  The past year truly tested us. The sheer pressure of building a company from the ground up here in Tebessa, the exhaustion of the late-night coding sessions, and the times my focus was entirely consumed by my ambitions—it brought us to the edge. It was hard, and there were moments when the weight of everything we were dealing with could have easily broken us apart.
                </p>
                <p className="mb-6 leading-relaxed font-medium text-lg" style={{ color: "#4A3548" }}>
                  But you never walked away.
                </p>
                <p className="mb-8 leading-relaxed" style={{ textIndent: "1.5em" }}>
                  You didn&apos;t just tolerate the chaos; you anchored me. When I was running on empty, trying to carry the weight of being the founder, the developer, and the strategist all at once, you were the one person who just let me drop the armor and simply be Adnen. You stayed through the hardest months when the stress was suffocating, and we fought through the friction instead of giving up.
                </p>
                <p
                  className="text-right italic text-sm mt-6"
                  style={{ color: "#6B5B68", fontFamily: "var(--font-body)" }}
                >
                  — Adnen
                </p>
              </motion.div>
            </div>

            <motion.button
              className="btn-primary mt-10"
              onClick={onComplete}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
