"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SceneIntro from "./components/SceneIntro";
import SceneStory from "./components/SceneStory";
import SceneReasons from "./components/SceneReasons";
import SceneLetter from "./components/SceneLetter";
import SceneDream from "./components/SceneDream";
import SceneFinale from "./components/SceneFinale";
import MusicButton from "./components/MusicButton";
import FloatingHearts from "./components/FloatingHearts";

type Scene = "intro" | "story" | "reasons" | "letter" | "dream" | "finale";

export default function Home() {
  const [currentScene, setCurrentScene] = useState<Scene>("intro");
  const [overlayVisible, setOverlayVisible] = useState(false);

  const transitionTo = (scene: Scene) => {
    // Step 1: Fade overlay in (covers current scene)
    setOverlayVisible(true);
    // Step 2: After overlay is fully opaque, swap the scene
    setTimeout(() => {
      setCurrentScene(scene);
      // Step 3: After new scene mounts, fade overlay out
      setTimeout(() => {
        setOverlayVisible(false);
      }, 200);
    }, 700);
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#0D0D10]">
      {/* Background Floating Hearts */}
      <FloatingHearts />

      {/* Scene content */}
      {currentScene === "intro" && (
        <SceneIntro onBegin={() => transitionTo("story")} />
      )}

      {currentScene === "story" && (
        <SceneStory onComplete={() => transitionTo("reasons")} />
      )}

      {currentScene === "reasons" && (
        <SceneReasons onComplete={() => transitionTo("letter")} />
      )}

      {currentScene === "letter" && (
        <SceneLetter onComplete={() => transitionTo("dream")} />
      )}

      {currentScene === "dream" && (
        <SceneDream onComplete={() => transitionTo("finale")} />
      )}

      {currentScene === "finale" && <SceneFinale />}

      {/* Transition overlay — sits on top of everything */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        style={{ background: "var(--bg-primary)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: overlayVisible ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />

      {/* Music button — always visible */}
      <MusicButton />
    </main>
  );
}
