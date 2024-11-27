import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IterationCcw } from "lucide-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useGameSettingsStore from "@/store/useGameSettings";

const SentenceTyping = ({
  isGameActive,
  showCountdown,
  countdown,
  text,
  currentText,
  handleInputChange,
  handleRestart,
  setShowCountdown,
  handleTimerComplete,
}) => {
  const { time } = useGameSettingsStore();
  const textContainerRef = useRef(null);

  useEffect(() => {
    if (textContainerRef.current && currentText.length > 0) {
      const container = textContainerRef.current;;
      const spans = container.getElementsByTagName('span');
      const currentIndex = currentText.length - 1;

      if(spans[currentIndex]) {
        const currentSpan = spans[currentIndex]
        const spanTop = currentSpan.offsetTop;
        const containerHeight = container.clientHeight;

        if (spanTop > containerHeight / 2) {
          container.scroll({
            top: spanTop - containerHeight / 2 + currentSpan.clientHeight,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [currentText])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-4xl"
      >
        <div className="glass rounded-2xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!isGameActive && !showCountdown && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center"
                >
                  <h1 className="text-4xl font-bold text-white mb-8 text-shadow">
                    Speed Typing Challenge
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCountdown(true)}
                    className="glow px-8 py-4 text-xl bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl text-white font-bold transition-all"
                  >
                    Start Game
                  </motion.button>
                </motion.div>
              )}

              {showCountdown && (
                <div
                  key="countdown"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="text-center"
                >
                  <p
                    className="text-7xl font-bold text-white text-shadow"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {countdown}
                  </p>
                </div>
              )}

              {isGameActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div ref={textContainerRef} className="glass rounded-xl p-8 h-[200px] overflow-hidden relative pointer-events-none">
                    <p className="text-2xl text-white font-mono leading-relaxed">
                      {text.split('').map((char, index) => {
                        let color = 'text-gray-500';
                        if (index < currentText.length) {
                          color = currentText[index] === char ? 'text-green-400' : 'text-red-400';
                        }
                        return (
                          <motion.span
                            key={index}
                            className={color}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.02 }}
                          >
                            {char}
                          </motion.span>
                        );
                      })}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 glass rounded-full"
                  onClick={handleRestart}
                >
                  <IterationCcw className="h-8 w-8 text-white" />
                </motion.button>

                <motion.div
                  className="flex-1"
                  initial={false}
                  animate={isGameActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                >
                  <input
                    type="text"
                    value={currentText}
                    onChange={handleInputChange}
                    className="w-full glass text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                    placeholder="Start typing..."
                    whileFocus={{ scale: 1.01 }}
                  />
                </motion.div>

                {isGameActive && (
                  <div className="glass rounded-full p-2">
                    <CountdownCircleTimer
                      isPlaying
                      duration={parseInt(time)}
                      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                      colorsTime={[10, 6, 3, 0]}
                      onComplete={handleTimerComplete}
                      size={40}
                      strokeWidth={4}
                    >
                      {({ remainingTime }) => <div className="text-white font-bold">{remainingTime}s</div>}
                    </CountdownCircleTimer>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SentenceTyping;