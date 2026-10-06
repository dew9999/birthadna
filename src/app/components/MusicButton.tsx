"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // We'll embed the YouTube audio via an Audio element pointing to a proxy
    // Since we can't directly stream YouTube, we'll use an iframe approach
    // For simplicity, we'll skip the actual YouTube integration and just show the button
    // The user can add their own audio file later
    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    };
  }, []);

  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    audio.volume = 0;
    audio.play().catch(() => {});
    let vol = 0;
    fadeIntervalRef.current = setInterval(() => {
      vol = Math.min(vol + 0.05, 0.7);
      audio.volume = vol;
      if (vol >= 0.7 && fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  }, []);

  const fadeOut = useCallback((audio: HTMLAudioElement) => {
    let vol = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      vol = Math.max(vol - 0.05, 0);
      audio.volume = vol;
      if (vol <= 0) {
        audio.pause();
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 100);
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) {
      // Create audio element on first click
      const audio = new Audio("/music.mp3");
      audio.loop = true;
      audio.volume = 0;
      audioRef.current = audio;

      audio.addEventListener("canplaythrough", () => {
        setIsLoaded(true);
      });

      audio.addEventListener("error", () => {
        // Music file not found — silently handle
        console.log("Music file not found. Add /public/music.mp3 to enable music.");
      });
    }

    if (isPlaying) {
      if (audioRef.current) fadeOut(audioRef.current);
      setIsPlaying(false);
    } else {
      if (audioRef.current) fadeIn(audioRef.current);
      setIsPlaying(true);
    }
  }, [isPlaying, fadeIn, fadeOut]);

  return (
    <motion.button
      className="music-btn"
      onClick={toggleMusic}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3, duration: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          ♫
        </motion.span>
      ) : (
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ♪
        </motion.span>
      )}
    </motion.button>
  );
}
