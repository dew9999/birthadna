"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneLetterProps {
  onComplete: () => void;
}

export default function SceneLetter({ onComplete }: SceneLetterProps) {
  const [phase, setPhase] = useState<"prompt" | "envelope" | "letter">("prompt");
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [customPhotoUrl, setCustomPhotoUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => setPhase("letter"), 1200);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
      setImageError(false);
    }
  };

  const photoSrc = customPhotoUrl || "/photo.jpg";

  return (
    <motion.div
      className="scene overflow-y-auto px-4 py-8"
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

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        aria-label="Upload photo"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {isZoomed && !imageError && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              className="relative max-w-xl max-h-[85vh] p-2 bg-[#1C1822] rounded-xl border border-[var(--accent-gold)]/30 shadow-2xl"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoSrc}
                alt="Us"
                className="w-full max-h-[75vh] object-contain rounded-lg"
              />
              <p className="text-center font-display italic text-sm text-[var(--accent-gold)] mt-3">
                Us ❤️ (Tap anywhere to close)
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "prompt" && (
          <motion.div
            key="prompt"
            className="text-center my-auto"
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
              One last thing for you.
            </motion.p>
            <motion.button
              className="btn-primary"
              onClick={() => setPhase("envelope")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Open Letter
            </motion.button>
          </motion.div>
        )}

        {phase === "envelope" && (
          <motion.div
            key="envelope"
            className="flex flex-col items-center my-auto"
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
                  width: "320px",
                  height: "210px",
                  background: "linear-gradient(135deg, #2A2530, #1E1A24)",
                  borderRadius: "8px",
                  border: "1px solid rgba(200, 169, 110, 0.2)",
                  boxShadow: "0 12px 45px rgba(0,0,0,0.6)",
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
                    background:
                      "linear-gradient(to bottom right, transparent 49%, rgba(200,169,110,0.06) 50%) left, linear-gradient(to bottom left, transparent 49%, rgba(200,169,110,0.06) 50%) right",
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
                  height: "105px",
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
                    width: "320px",
                    height: "105px",
                    background: "linear-gradient(180deg, #2E2838, #2A2530)",
                    border: "1px solid rgba(200, 169, 110, 0.2)",
                    borderBottom: "none",
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                  }}
                />
              </motion.div>

              {/* Wax Seal */}
              {!envelopeOpen && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                  animate={{
                    boxShadow: [
                      "0 0 15px rgba(200,169,110,0.25)",
                      "0 0 32px rgba(200,169,110,0.45)",
                      "0 0 15px rgba(200,169,110,0.25)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--accent-gold), var(--accent-warm))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      color: "#1E1A24",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                  >
                    ♥
                  </div>
                </motion.div>
              )}
            </div>

            {!envelopeOpen && (
              <motion.p
                className="font-ui text-xs tracking-[0.2em] uppercase mt-6"
                style={{ color: "var(--text-muted)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.4 }}
              >
                Tap to open
              </motion.p>
            )}
          </motion.div>
        )}

        {phase === "letter" && (
          <motion.div
            key="letter"
            className="flex flex-col items-center w-full max-w-2xl mx-auto py-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* Embedded Photo Card (Full Frame - No Cropping) */}
            <motion.div
              className="relative mb-6 group cursor-pointer"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              onClick={() => {
                if (imageError && fileInputRef.current) {
                  fileInputRef.current.click();
                } else {
                  setIsZoomed(true);
                }
              }}
            >
              {/* Decorative tape */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 z-20"
                style={{
                  background: "rgba(200, 169, 110, 0.4)",
                  backdropFilter: "blur(2px)",
                  transform: "rotate(-1deg)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                }}
              />

              <div
                className="p-3 pb-4 rounded-xl transition-all duration-300 group-hover:scale-[1.01]"
                style={{
                  background: "#1C1822",
                  border: "1px solid rgba(200, 169, 110, 0.3)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.6), 0 0 25px rgba(200, 169, 110, 0.1)",
                  width: "min(300px, 85vw)",
                }}
              >
                {/* Full aspect image frame without cropping heads */}
                <div className="relative w-full rounded-lg overflow-hidden bg-[#120F16] flex items-center justify-center max-h-[380px] min-h-[220px]">
                  {!imageError ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={photoSrc}
                      alt="Us"
                      className="w-full max-h-[360px] object-contain rounded"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div
                      className="p-6 text-center cursor-pointer hover:bg-white/5 transition-colors w-full flex flex-col items-center justify-center"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="text-3xl mb-2">🖼️</span>
                      <p className="text-xs font-ui text-[var(--accent-gold)] font-medium">
                        Click to attach photo
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1">
                        (or save as photo.jpg in public folder)
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center flex items-center justify-center gap-1.5">
                  <p
                    className="font-display italic text-sm tracking-wide"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    Us ❤️
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)] opacity-60">
                    (tap to expand)
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Letter Content */}
            <div
              className="letter w-full p-6 sm:p-10 rounded-xl"
              style={{
                background: "linear-gradient(145deg, #18141E, #14101A)",
                border: "1px solid rgba(200, 169, 110, 0.2)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
                maxHeight: "50vh",
                overflowY: "auto",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.2 }}
                className="space-y-6 text-base sm:text-lg leading-relaxed font-body"
                style={{ color: "var(--text-primary)" }}
              >
                <p style={{ textIndent: "1.2em" }}>
                  You know I’m not one to write long, cheesy speeches or hide behind forced poetry, so I’m just going to give you the plain, unvarnished truth.
                </p>
                
                <p style={{ textIndent: "1.2em" }}>
                  Between the sheer amount of noise out there, everything I&apos;m constantly building, and the everyday chaos I navigate, you are the one thing that always makes absolute sense. You bring a kind of grounded clarity to my world that is damn near impossible to find, and having you by my side changes the entire dynamic.
                </p>

                <p style={{ textIndent: "1.2em" }}>
                  You handle my intensity, my focus, and my madness better than anyone else on the planet—which probably deserves an actual award by now, but you’ll have to settle for an incredible birthday instead. Having you in my corner isn&apos;t something I ever take for granted; it’s the anchor in all of this. My life is a hell of a lot better with you in it, and there is genuinely no one else I’d rather face the world with or share the wins with.
                </p>

                <p style={{ textIndent: "1.2em" }}>
                  I know I don&apos;t always stop to say it as often as I should, but I appreciate everything you are, everything you bring to the table, and you have my absolute, unquestioned loyalty. Today is completely about stepping back from the work, turning off the stress, and celebrating you properly. Let’s go make tonight count.
                </p>

                <div className="pt-4 text-right">
                  <p
                    className="font-display italic text-lg sm:text-xl font-medium"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    — Adnen
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.button
              className="btn-primary mt-6 mb-4"
              onClick={onComplete}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
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
