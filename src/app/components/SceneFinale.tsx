"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SceneFinale() {
  const [phase, setPhase] = useState(0);
  const [candleLit, setCandleLit] = useState(true);
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; color: string; delay: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 2000);
    return () => clearTimeout(timer);
  }, []);

  const blowCandle = useCallback(() => {
    if (!candleLit) return;
    setCandleLit(false);

    // Generate confetti
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      color: [
        "#C8A96E",
        "#B8687D",
        "#D4A574",
        "#F5F0EB",
        "#8B7DA8",
        "#E8C8A0",
        "#A87C9F",
      ][Math.floor(Math.random() * 7)],
      delay: Math.random() * 0.5,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);

    setTimeout(() => setPhase(2), 2000);
    setTimeout(() => setPhase(3), 4500);
  }, [candleLit]);

  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        background: phase >= 2
          ? "radial-gradient(ellipse at center, #1A1520 0%, #0D0D10 100%)"
          : "var(--bg-primary)",
        transition: "background 2s ease",
      }}
    >
      {/* Warm ambient glow */}
      <motion.div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.15), transparent)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          opacity: phase >= 2 ? 0.15 : 0.08,
        }}
        transition={{ duration: 2 }}
      />

      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: piece.x,
              top: piece.y,
              backgroundColor: piece.color,
              rotate: piece.rotation,
            }}
            initial={{ y: -20, opacity: 1 }}
            animate={{
              y: window.innerHeight + 20,
              x: (Math.random() - 0.5) * 200,
              rotate: piece.rotation + 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: piece.delay,
              ease: "easeIn",
            }}
          />
        ))}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center max-w-md px-6">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="greeting"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p
                className="font-display text-4xl md:text-6xl italic font-light mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Happy Birthday
              </p>
              <p
                className="font-display text-4xl md:text-6xl italic font-medium"
                style={{ color: "var(--accent-gold)" }}
              >
                Ranu ❤️
              </p>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="candle"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p
                className="font-display text-3xl md:text-4xl italic font-light mb-12"
                style={{ color: "var(--text-primary)" }}
              >
                Make a wish.
              </p>

              {/* Candle */}
              <div
                className="candle-container mb-10 cursor-pointer"
                onClick={blowCandle}
              >
                {/* Flame */}
                <AnimatePresence>
                  {candleLit && (
                    <motion.div
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "relative", height: "28px", display: "flex", justifyContent: "center" }}
                    >
                      <div className="flame" style={{ position: "relative", top: "auto" }} />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wick */}
                <div
                  style={{
                    width: "2px",
                    height: "10px",
                    background: "#4A4040",
                    margin: "0 auto",
                    borderRadius: "1px",
                  }}
                />

                {/* Candle body */}
                <div
                  style={{
                    width: "18px",
                    height: "70px",
                    background: "linear-gradient(180deg, #F5E6D3 0%, #E8D5BC 50%, #DEC8AD 100%)",
                    borderRadius: "3px 3px 0 0",
                    margin: "0 auto",
                    boxShadow: candleLit
                      ? "0 -20px 40px rgba(255,200,50,0.15)"
                      : "none",
                    transition: "box-shadow 0.5s ease",
                  }}
                />

                {/* Simple cake base */}
                <div
                  style={{
                    width: "80px",
                    height: "30px",
                    background: "linear-gradient(180deg, #3A2E38, #2A2230)",
                    borderRadius: "4px",
                    margin: "0 auto",
                    border: "1px solid rgba(200,169,110,0.15)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      right: "8px",
                      height: "1px",
                      background: "rgba(200,169,110,0.2)",
                    }}
                  />
                </div>
              </div>

              {candleLit && (
                <motion.p
                  className="font-ui text-xs tracking-[0.15em] uppercase"
                  style={{ color: "var(--text-muted)" }}
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap to blow
                </motion.p>
              )}
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="final-birthday"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <p
                className="font-display text-4xl md:text-6xl italic font-light mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Happy Birthday,
              </p>
              <p
                className="font-display text-4xl md:text-6xl italic font-medium"
                style={{ color: "var(--accent-gold)" }}
              >
                Ranu.
              </p>
            </motion.div>
          )}

          {phase === 3 && (
            <motion.div
              key="always-yours"
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              <p
                className="font-display text-4xl md:text-6xl italic font-light mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Happy Birthday, Ranu.
              </p>
              <motion.p
                className="font-display text-2xl md:text-3xl italic font-light mt-8"
                style={{ color: "var(--accent-rose)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2 }}
              >
                I love you.
              </motion.p>
              <motion.p
                className="font-body text-lg mt-12"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                Always yours. ❤️
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
