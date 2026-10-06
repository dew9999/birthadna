"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneStoryProps {
  onComplete: () => void;
}

const storyBeats = [
  { text: "A year isn't just a year.", style: "hero" },
  { text: "Late nights.", style: "beat" },
  { text: "Ambition.", style: "beat" },
  { text: "Stress.", style: "beat" },
  { text: "Arguments.", style: "beat" },
  { text: "Exhaustion.", style: "beat" },
  { text: "And somehow...", style: "pause" },
  { text: "You stayed.", style: "emotional" },
  {
    text: "The past year truly tested us. The sheer pressure of building a company from the ground up here in Tebessa, the exhaustion of the late-night coding sessions, and the times my focus was entirely consumed by my ambitions—",
    style: "paragraph",
  },
  {
    text: "it brought us to the edge.",
    style: "emphasis",
  },
  {
    text: "It was hard, and there were moments when the weight of everything we were dealing with could have easily broken us apart.",
    style: "paragraph",
  },
  {
    text: "But you never walked away.",
    style: "emotional",
  },
  {
    text: "You didn't just tolerate the chaos; you anchored me.",
    style: "emphasis",
  },
  {
    text: "When I was running on empty, trying to carry the weight of being the founder, the developer, and the strategist all at once—",
    style: "paragraph",
  },
  {
    text: "you were the one person who just let me drop the armor and simply be Adnen.",
    style: "emphasis",
  },
  {
    text: "You stayed through the hardest months when the stress was suffocating, and we fought through the friction instead of giving up.",
    style: "paragraph",
  },
];

export default function SceneStory({ onComplete }: SceneStoryProps) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const getDelay = useCallback((style: string) => {
    switch (style) {
      case "hero": return 3500;
      case "beat": return 2000;
      case "pause": return 2800;
      case "emotional": return 4000;
      case "paragraph": return 8000;
      case "emphasis": return 5500;
      default: return 3000;
    }
  }, []);

  useEffect(() => {
    if (currentBeat < storyBeats.length - 1) {
      const timer = setTimeout(() => {
        setCurrentBeat((prev) => prev + 1);
      }, getDelay(storyBeats[currentBeat].style));
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowContinue(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [currentBeat, getDelay]);

  const beat = storyBeats[currentBeat];

  const getTextStyle = (style: string) => {
    switch (style) {
      case "hero":
        return "font-display text-3xl md:text-5xl font-light italic text-center leading-tight";
      case "beat":
        return "font-body text-2xl md:text-3xl font-light text-center";
      case "pause":
        return "font-body text-xl md:text-2xl font-light italic text-center";
      case "emotional":
        return "font-display text-3xl md:text-5xl font-medium italic text-center leading-tight";
      case "paragraph":
        return "font-body text-lg md:text-xl font-light text-center leading-relaxed max-w-lg";
      case "emphasis":
        return "font-body text-xl md:text-2xl font-normal text-center leading-relaxed max-w-lg";
      default:
        return "font-body text-xl text-center";
    }
  };

  const getTextColor = (style: string) => {
    switch (style) {
      case "emotional":
        return "var(--accent-gold)";
      case "emphasis":
        return "var(--text-primary)";
      case "pause":
        return "var(--text-secondary)";
      default:
        return "var(--text-primary)";
    }
  };

  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(184,104,125,0.12), transparent)",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <AnimatePresence mode="wait">
        <motion.p
          key={currentBeat}
          className={getTextStyle(beat.style)}
          style={{ color: getTextColor(beat.style) }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{
            duration: beat.style === "emotional" ? 1.2 : 0.8,
            ease: "easeOut",
          }}
        >
          {beat.text}
        </motion.p>
      </AnimatePresence>

      <AnimatePresence>
        {showContinue && (
          <motion.button
            className="btn-primary mt-16"
            onClick={onComplete}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue →
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
