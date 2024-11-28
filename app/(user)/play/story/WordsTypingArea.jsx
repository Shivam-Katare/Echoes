import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Input } from '@/components/ui/input';
import { IterationCw } from 'lucide-react';
import useGameSettingsStore from '@/store/useGameSettings';

const WordsTypingArea = ({
  isGameActive,
  showCountdown,
  countdown,
  displayWords,
  input,
  handleStartGame,
  handleInputChange,
  handleKeyPress,
  handleRestart,
  handleTimerComplete,
}) => {
  const { time } = useGameSettingsStore();

  return (
    <div className="overflow-hidden rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6 grid place-items-center min-h-72">
        {!isGameActive && !showCountdown && (
          <motion.button
            onClick={handleStartGame}
            className="mt-2 px-6 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Game
          </motion.button>
        )}
        {showCountdown && (
          <AnimatePresence>
            <motion.div
              key={countdown}
              className="text-[64px] font-bold mt-8 text-black"
            >
              {countdown}
            </motion.div>
          </AnimatePresence>
        )}
        {isGameActive && (
          <div
            className="max-w-[56rem]"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "14rem" }}
          >
            <div
              className="h-[11rem] w-[45rem] rounded-[10px] flex justify-center items-center p-5"
              style={{
                color: "#fff",
                textAlign: "center",
              }}
            >
              <div className="flex items-center justify-center flex-wrap">
                {displayWords.map((wordObj, index) => (
                  <span
                    key={wordObj.id}
                    className={`
        mx-2 px-2 py-1 rounded
        transition-all duration-500
        ${index === 0 ? "bg-black" : "bg-gray-700"}
        ${index === 0 && input === wordObj.word ? "bg-green-500" : ""}
        ${index === 0 && input !== "" && input !== wordObj.word ? "bg-red-500" : ""}
        animate-fadeIn
      `}
                  >
                    {wordObj.word}
                  </span>
                ))}
              </div>

            </div>
          </div>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="grid grid-cols-[0.2fr_0.8fr_0.2fr] justify-items-center items-center">
          <div>
            <IterationCw className="h-8 w-8 text-white" onClick={handleRestart} />
          </div>
          <Input
            type="text"
            placeholder="Type here..."
            className="text-black"
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={!isGameActive}
          />
          {isGameActive &&
            <div>
              <CountdownCircleTimer
                isPlaying
                duration={parseInt(time)}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[10, 6, 3, 0]}
                onComplete={handleTimerComplete}
                size={30}
                strokeWidth={3}
              >
                {({ remainingTime }) => <div className="text-[12px]">{remainingTime}s</div>}
              </CountdownCircleTimer>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default WordsTypingArea;