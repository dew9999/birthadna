"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

interface SceneReasonsProps {
  onComplete: () => void;
}

const reasons = [
  "I love the peace I feel when I'm with you.",
  "I love that I never have to pretend to be someone else around you.",
  "I love the way you understand things I don't always know how to explain.",
  "I love how naturally you became an important part of my life.",
  "I love talking to you, even when we have absolutely nothing important to say.",
  "I love the person I am when I'm with you.",
  "I love how you make ordinary moments worth remembering.",
  "I love your way of thinking, even when we don't see things the same way.",
  "I love that I can disagree with you and still feel close to you.",
  "I love how much there is to discover about you.",
  "I love your honesty, especially when it's not necessarily what I want to hear.",
  "I love the little things about you that I've learned without you ever having to tell me.",
  "I love how familiar you feel to me, without ever becoming ordinary.",
  "I love that I can miss you even after we've just talked.",
  "I love the comfort of knowing you're there.",
  "I love how seriously you take the things that matter to you.",
  "I love your imperfections, because they are part of the person I fell for.",
  "I love the conversations that somehow become hours without us noticing.",
  "I love how you challenge me to see things differently.",
  "I love that being close to you never feels like a responsibility.",
  "I love the trust we've built between us.",
  "I love the little pieces of your life that you've chosen to share with me.",
  "I love how you can make me think about things long after our conversations end.",
  "I love that I don't just want your good days; I want to be there for the difficult ones too.",
  "I love how comfortable silence can be with you.",
  "I love that you have your own life, your own ambitions, and your own way of being.",
  "I love watching you become more of yourself.",
  "I love that you make me look forward to what's ahead.",
  "I love the memories we've already made, even the ones that seemed insignificant at the time.",
  "I love that some of my favorite memories now have your name somewhere in them.",
  "I love how much your opinion matters to me.",
  "I love that you can still surprise me.",
  "I love how easily you can turn a normal conversation into something I'll remember.",
  "I love that I don't need a special occasion to appreciate having you in my life.",
  "I love the way our relationship continues to change and grow.",
  "I love that you're someone I can be serious with and completely stupid with.",
  "I love knowing that there's still so much of you I haven't discovered yet.",
  "I love you for who you are, not for some ideal version of you I've imagined.",
  "I love choosing you, not just in the easy moments, but in the ordinary ones too.",
];

const SWIPE_THRESHOLD = 70;

function Card({
  reason,
  cardIndex,
  offset,
  isTop,
  onSwipe,
}: {
  reason: string;
  cardIndex: number;
  offset: number;
  isTop: boolean;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-18, 0, 18]);
  const dragOpacity = useTransform(x, [-200, -100, 0, 100, 200], [0.6, 1, 1, 1, 0.6]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
      if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 400) {
        onSwipe();
      }
    },
    [onSwipe]
  );

  const stackY = offset * 8;
  const stackScale = 1 - offset * 0.04;
  const stackRotate = isTop ? 0 : offset % 2 === 1 ? -2.5 : 2.5;

  return (
    <motion.div
      ref={containerRef}
      className="reason-card"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : stackRotate,
        opacity: isTop ? dragOpacity : Math.max(0.3, 1 - offset * 0.25),
        scale: stackScale,
        y: stackY,
        zIndex: 50 - offset,
        pointerEvents: isTop ? "auto" : "none",
        backgroundColor: "#16161D",
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.85}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{
        scale: stackScale,
        y: stackY,
        opacity: isTop ? 1 : Math.max(0.3, 1 - offset * 0.25),
      }}
      exit={{
        x: 350,
        opacity: 0,
        rotate: 25,
        transition: { duration: 0.35, ease: "easeIn" },
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => {
        if (isTop) onSwipe();
      }}
    >
      <span className="card-number">
        {String(cardIndex + 1).padStart(2, "0")} / 40
      </span>
      <p className="card-text">{reason}</p>
    </motion.div>
  );
}

export default function SceneReasons({ onComplete }: SceneReasonsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFinal, setShowFinal] = useState(false);
  const [finalPhase, setFinalPhase] = useState(0);

  const handleSwipe = useCallback(() => {
    if (currentIndex < reasons.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowFinal(true);
      setTimeout(() => setFinalPhase(1), 1500);
      setTimeout(() => setFinalPhase(2), 3500);
      setTimeout(() => setFinalPhase(3), 6000);
    }
  }, [currentIndex]);

  if (showFinal) {
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
            background: "radial-gradient(circle, rgba(200,169,110,0.12), transparent)",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="text-center max-w-lg px-6">
          <motion.p
            className="font-ui text-xs tracking-[0.2em] uppercase mb-8"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            40 / 40
          </motion.p>

          <AnimatePresence mode="wait">
            {finalPhase >= 0 && finalPhase < 1 && (
              <motion.p
                key="f0"
                className="font-display text-2xl md:text-3xl italic font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                And after all these reasons...
              </motion.p>
            )}
            {finalPhase >= 1 && finalPhase < 2 && (
              <motion.p
                key="f1"
                className="font-display text-2xl md:text-3xl italic font-light"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                the simplest one is still the most honest.
              </motion.p>
            )}
            {finalPhase >= 2 && finalPhase < 3 && (
              <motion.p
                key="f2"
                className="font-body text-xl md:text-2xl font-light leading-relaxed"
                style={{ color: "var(--accent-gold)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
              >
                I love you because somewhere along the way, loving you became one of the most natural things in my life.
              </motion.p>
            )}
            {finalPhase >= 3 && (
              <motion.div
                key="f3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <p
                  className="font-body text-xl md:text-2xl font-light leading-relaxed mb-12"
                  style={{ color: "var(--accent-gold)" }}
                >
                  I love you because somewhere along the way, loving you became one of the most natural things in my life.
                </p>
                <motion.button
                  className="btn-primary"
                  onClick={onComplete}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
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

  // Slice up to 3 cards starting from currentIndex
  const stackCount = Math.min(3, reasons.length - currentIndex);
  const visibleCards = Array.from({ length: stackCount }, (_, offset) => ({
    cardIndex: currentIndex + offset,
    reason: reasons[currentIndex + offset],
    offset,
  }));

  return (
    <motion.div
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="ambient-glow"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.1), transparent)",
          top: "35%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Progress */}
      <motion.p
        className="font-ui text-xs tracking-[0.2em] uppercase mb-8"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {String(currentIndex + 1).padStart(2, "0")} / 40
      </motion.p>

      {/* Card Stack */}
      <div className="card-stack">
        <AnimatePresence initial={false}>
          {visibleCards.map(({ cardIndex, reason, offset }) => (
            <Card
              key={cardIndex}
              reason={reason}
              cardIndex={cardIndex}
              offset={offset}
              isTop={offset === 0}
              onSwipe={handleSwipe}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Swipe hint */}
      <motion.p
        className="font-ui text-xs tracking-[0.15em] uppercase mt-8 swipe-hint"
        style={{ color: "var(--text-muted)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: currentIndex === 0 ? 0.6 : 0.3 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        Swipe or tap →
      </motion.p>
    </motion.div>
  );
}
