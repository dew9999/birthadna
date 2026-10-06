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
  { text: "Everyday chaos.", style: "beat" },
  { text: "Exhaustion.", style: "beat" },
  { text: "And through all of it...", style: "pause" },
  { text: "You stayed.", style: "emotional" },
  {
    text: "Between the sheer amount of noise out there, everything I'm constantly building, and the everyday chaos I navigate—",
    style: "paragraph",
  },
  {
    text: "you are the one thing that always makes absolute sense.",
    style: "emphasis",
  },
  {
    text: "You bring a kind of grounded clarity to my world that is damn near impossible to find, and having you by my side changes the entire dynamic.",
    style: "paragraph",
  },
  {
    text: "You handle my intensity, my focus, and my madness better than anyone else on the planet.",
    style: "emphasis",
  },
  {
    text: "Having you in my corner isn't something I ever take for granted; it's the anchor in all of this.",
    style: "paragraph",
  },
  {
    text: "My life is a hell of a lot better with you in it.",
    style: "emotional",
  },
];

export default function SceneStory({ onComplete }: SceneStoryProps) {
  const [currentBeat, setCurrentBeat] = useState(0);
  const [showContinue, setShowContinue] = useState(false);

  const getDelay = useCallback((style: string) => {
    switch (style) {
      case "hero": return 5500;      // +2s slower
      case "beat": return 2500;      // +0.5s slower
      case "pause": return 3500;      // +0.7s slower
      case "emotional": return 5500;  // +1.5s slower
      case "paragraph": return 11000; // +3s slower (11s total)
      case "emphasis": return 7500;   // +2s slower (7.5s total)
      default: return 3500;
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
      }, 4500);
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
        return "font-body text-lg md:text-xl font-light text-center leading-relaxed max-w-xl px-4";
      case "emphasis":
        return "font-body text-xl md:text-2xl font-normal text-center leading-relaxed max-w-xl px-4";
      default:
        return "font-body text-xl text-center px-4";
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
          background: "radial-gradient(circle, rgba(184,104,125,0.14), transparent)",
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
            duration: beat.style === "emotional" ? 1.4 : 0.9,
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
