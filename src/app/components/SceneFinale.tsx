"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SceneFinale() {
  const [phase, setPhase] = useState(0);
  const [candleLit, setCandleLit] = useState(true);
  const [smoke, setSmoke] = useState(false);
  const [confetti, setConfetti] = useState<
    { id: number; x: number; y: number; color: string; delay: number; rotation: number; size: number }[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase(1), 2200);
    return () => clearTimeout(timer);
  }, []);

  const blowCandle = useCallback(() => {
    if (!candleLit) return;
    setCandleLit(false);
    setSmoke(true);

    // Generate vibrant confetti shower
    const pieces = Array.from({ length: 65 }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
      y: -30,
      size: Math.floor(Math.random() * 8) + 6,
      color: [
        "#C8A96E", // gold
        "#B8687D", // rose gold
        "#E8C8A0", // champagne
        "#F5F0EB", // pearl
        "#D4A574", // warm amber
        "#A87C9F", // soft violet
        "#FF6B8B", // vibrant pink
      ][Math.floor(Math.random() * 7)],
      delay: Math.random() * 0.7,
      rotation: Math.random() * 360,
    }));
    setConfetti(pieces);

    // Phase transitions after blowing candle
    setTimeout(() => setSmoke(false), 2500);
    setTimeout(() => setPhase(2), 2200);
    setTimeout(() => setPhase(3), 5000);
  }, [candleLit]);

  return (
    <motion.div
      className="scene overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      style={{
        background:
          phase >= 2
            ? "radial-gradient(ellipse at center, #1E1624 0%, #0D0D10 100%)"
            : "var(--bg-primary)",
        transition: "background 2s ease",
      }}
    >
      {/* Background glow */}
      <motion.div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.18), transparent)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: candleLit ? [1, 1.1, 1] : 0.8,
          opacity: phase >= 2 ? 0.2 : candleLit ? 0.15 : 0.05,
        }}
        transition={{ duration: 3, repeat: candleLit ? Infinity : 0 }}
      />

      {/* Confetti Rain */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="fixed pointer-events-none z-50 rounded-sm"
            style={{
              left: piece.x,
              top: piece.y,
              width: `${piece.size}px`,
              height: `${piece.size * 1.4}px`,
              backgroundColor: piece.color,
              boxShadow: `0 0 8px ${piece.color}`,
            }}
            initial={{ y: -30, opacity: 1, rotate: piece.rotation }}
            animate={{
              y: (typeof window !== "undefined" ? window.innerHeight : 800) + 40,
              x: piece.x + (Math.random() - 0.5) * 220,
              rotate: piece.rotation + 1080,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2.5,
              delay: piece.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />
        ))}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center max-w-md px-6 z-10 my-auto">
        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.div
              key="greeting"
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2 }}
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
                Ranuchtyyy ❤️
              </p>
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="candle"
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1 }}
            >
              <motion.p
                className="font-display text-3xl md:text-4xl italic font-light mb-8"
                style={{ color: "var(--text-primary)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {candleLit ? "Make a wish..." : "Wish granted ✨"}
              </motion.p>

              {/* Multi-tier Elegant Birthday Cake */}
              <div
                className="relative cursor-pointer group my-4 flex flex-col items-center select-none"
                onClick={blowCandle}
              >
                {/* Flame & Glow Container */}
                <div className="relative h-12 flex justify-center items-end mb-[-2px]">
                  <AnimatePresence>
                    {candleLit && (
                      <motion.div
                        className="relative flex flex-col items-center"
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {/* Outer Flame Glow */}
                        <div
                          className="absolute -top-3 w-10 h-10 rounded-full animate-pulse"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(255, 200, 80, 0.6) 0%, rgba(255, 120, 50, 0.2) 60%, transparent 100%)",
                            filter: "blur(4px)",
                          }}
                        />

                        {/* Animated Flame */}
                        <motion.div
                          className="relative w-4 h-7 rounded-full"
                          style={{
                            background:
                              "linear-gradient(180deg, #FFFFFF 0%, #FFE600 30%, #FF6600 70%, #FF3300 100%)",
                            boxShadow: "0 0 14px rgba(255, 200, 50, 0.9)",
                            borderRadius: "50% 50% 35% 35% / 80% 80% 30% 30%",
                          }}
                          animate={{
                            scaleY: [1, 1.15, 0.95, 1.05, 1],
                            scaleX: [1, 0.9, 1.1, 0.95, 1],
                            rotate: [-2, 2, -1, 1, 0],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Rising Smoke Effect when blown */}
                  <AnimatePresence>
                    {smoke && (
                      <motion.div
                        className="absolute bottom-2 flex flex-col items-center pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-white/40 blur-[2px] mb-1"
                            initial={{ y: 0, opacity: 0.8, scale: 0.8 }}
                            animate={{
                              y: -40 - i * 15,
                              x: (i % 2 === 0 ? 1 : -1) * (10 + i * 5),
                              opacity: 0,
                              scale: 2.2,
                            }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.2,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Candle Wick */}
                <div
                  className="w-[3px] h-3 bg-[#3A3030] rounded-t-sm"
                  style={{ boxShadow: "0 0 2px rgba(0,0,0,0.5)" }}
                />

                {/* Candle Body */}
                <div
                  className="w-4 h-12 rounded-t-sm relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, #F9F1E6 0%, #FFFFFF 50%, #E6D8C8 100%)",
                    boxShadow: candleLit
                      ? "0 -10px 25px rgba(255, 200, 100, 0.4), 0 2px 8px rgba(0,0,0,0.4)"
                      : "0 2px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Candle Spiral Stripes */}
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      background:
                        "repeating-linear-gradient(45deg, #C8A96E 0px, #C8A96E 3px, transparent 3px, transparent 8px)",
                    }}
                  />
                </div>

                {/* Cake Tier 1 (Top Tier) */}
                <div
                  className="relative w-28 h-10 rounded-t-lg flex flex-col items-center justify-between"
                  style={{
                    background: "linear-gradient(180deg, #382A36 0%, #2A1E28 100%)",
                    border: "1px solid rgba(200, 169, 110, 0.3)",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Top Frosting Cream Drips */}
                  <div className="w-full flex justify-around px-1 pt-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-2 rounded-b-full"
                        style={{ background: "#C8A96E", opacity: 0.8 }}
                      />
                    ))}
                  </div>
                  {/* Tier Accent Band */}
                  <div
                    className="w-full h-1"
                    style={{ background: "linear-gradient(90deg, transparent, #C8A96E, transparent)" }}
                  />
                </div>

                {/* Cake Tier 2 (Middle Tier) */}
                <div
                  className="relative w-40 h-12 rounded-t-lg flex flex-col items-center justify-between -mt-1 z-10"
                  style={{
                    background: "linear-gradient(180deg, #2E2230 0%, #221824 100%)",
                    border: "1px solid rgba(200, 169, 110, 0.35)",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                  }}
                >
                  {/* Decorative Pearls */}
                  <div className="w-full flex justify-between px-3 pt-1 text-[8px] opacity-70">
                    <span>♥</span>
                    <span>✨</span>
                    <span>♥</span>
                    <span>✨</span>
                    <span>♥</span>
                  </div>
                  {/* Tier Accent Ribbon */}
                  <div
                    className="w-full h-1.5"
                    style={{ background: "linear-gradient(90deg, #B8687D, #C8A96E, #B8687D)" }}
                  />
                </div>

                {/* Cake Tier 3 (Bottom Base Tier) */}
                <div
                  className="relative w-56 h-14 rounded-t-lg flex flex-col items-center justify-between -mt-1 z-20"
                  style={{
                    background: "linear-gradient(180deg, #241A28 0%, #1A121E 100%)",
                    border: "1px solid rgba(200, 169, 110, 0.4)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  {/* Bottom Frosting Pattern */}
                  <div className="w-full flex justify-around px-2 pt-1.5">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-4 h-2.5 rounded-b-full"
                        style={{
                          background: "linear-gradient(180deg, #C8A96E, #9A7B42)",
                          opacity: 0.9,
                        }}
                      />
                    ))}
                  </div>
                  {/* Bottom Gold Bead Border */}
                  <div
                    className="w-full h-2 mb-1 flex justify-around px-2"
                  >
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#C8A96E" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Shiny Metallic Cake Plate */}
                <div
                  className="w-64 h-4 rounded-full -mt-2 z-30"
                  style={{
                    background:
                      "linear-gradient(90deg, #8A7347 0%, #F5E6D3 30%, #C8A96E 50%, #F5E6D3 70%, #8A7347 100%)",
                    boxShadow:
                      "0 8px 25px rgba(0, 0, 0, 0.7), 0 0 15px rgba(200, 169, 110, 0.3)",
                  }}
                />
              </div>

              {candleLit && (
                <motion.p
                  className="font-ui text-xs tracking-[0.2em] uppercase mt-6"
                  style={{ color: "var(--text-muted)" }}
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Tap cake to blow candle 💨
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
                Ranuchtyyy.
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
                Happy Birthday, Ranuchtyyy.
              </p>
              <motion.p
                className="font-display text-3xl md:text-4xl italic font-light mt-8"
                style={{ color: "var(--accent-rose)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1.2 }}
              >
                I love you.
              </motion.p>
              <motion.p
                className="font-body text-xl mt-12"
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
