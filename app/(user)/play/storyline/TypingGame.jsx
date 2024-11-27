import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import usePlayStore from '@/store/playStore';
import { useSession } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';

function TypingGameComponent({ chunk, onComplete, currentChapter, onNextChapter }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(parseInt(chunk.time_limit || '90'));
  const [gameStarted, setGameStarted] = useState(false);
  const [totalWordsTyped, setTotalWordsTyped] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [completionTime, setCompletionTime] = useState(null);
  const [gameResult, setGameResult] = useState(null);
  const [shake, setShake] = useState(false);

  const { updateCheckpoint } = usePlayStore();
  const { session } = useSession();
  const user = useUser().user;
  const userId = user?.id ?? '';

  // Countdown Timer
  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameResult) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameResult('lose');
    }
  }, [timeLeft, gameStarted, gameResult]);

  // Handle Input
  const handleInput = (e) => {
    if (!gameStarted) setGameStarted(true);

    const value = e.target.value.trim();
    setInput(value);
    setTotalWordsTyped((prev) => prev + 1);

    // Check if the input matches the current word
    if (value === chunk.words[currentWordIndex]) {
      setInput('');
      setShake(false);

      if (currentWordIndex === chunk.words.length - 1) {
        setCompletionTime(chunk.time_limit - timeLeft);
        setGameResult('win');
      } else {
        setCurrentWordIndex((prev) => prev + 1);
      }
    } else if (!chunk.words[currentWordIndex].startsWith(value)) {
      // Shake animation for incorrect input
      setShake(true);
      setTimeout(() => setShake(false), 500); // Reset shake animation
      setIncorrectWords((prev) => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentWordIndex(0);
    setInput('');
    setTimeLeft(parseInt(chunk?.time_limit || '30'));
    setGameStarted(false);
    setTotalWordsTyped(0);
    setIncorrectWords(0);
    setCompletionTime(null);
    setGameResult(null); // Clear game result to start fresh
  };

  // Reset game on completion
  useEffect(() => {
    if (gameResult) {
      if (gameResult === 'win') {
        const nextChunkId = Number(chunk.chunk_id) + 1;
        const nextChapterId = currentChapter;

        // Save checkpoint with updated chapter and chunk
        console.log('TypingGame: Saving checkpoint...', nextChapterId, nextChunkId);
        updateCheckpoint(session, userId, {
          chapter_id: nextChapterId,
          last_chunk_id: nextChunkId,
        });

        setTimeout(() => {
          onComplete();
        }, 3000);
      }
    }
  }, [gameResult, onComplete, session, userId, currentChapter, updateCheckpoint]);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-black/40 backdrop-blur-md rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl text-white mb-4">{chunk.prompt}</h3>
        <div className="text-xl text-indigo-300 mb-4">Time left: {timeLeft}s</div>
      </div>

      {/* Word Display */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {chunk.words?.map((word, index) => (
          <motion.span
            key={index}
            className={`px-4 py-2 rounded ${index === currentWordIndex
                ? 'bg-indigo-600 text-white'
                : index < currentWordIndex
                  ? 'bg-green-600 text-white line-through'
                  : 'bg-gray-700 text-gray-300'
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex justify-center">
        <motion.input
          type="text"
          value={input}
          onChange={handleInput}
          className="w-64 px-4 py-2 text-lg bg-gray-800 text-white border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-400"
          placeholder="Type the highlighted word..."
          autoFocus
          animate={shake ? { x: [-10, 10, -10, 0] } : {}}
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </div>

      {/* Game Result */}
      {gameResult && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {gameResult === 'win' ? (
            <h2 className="text-3xl text-green-400 font-bold">You Win!</h2>
          ) : (
            <>
              <h2 className="text-3xl text-red-400 font-bold">You Lose! Try Again.</h2>
              <button
                onClick={handleRetry}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
              >
                Retry
              </button>
            </>
          )}

          <p className="text-white mt-4">
            Time Taken: {completionTime || chunk.time_limit - timeLeft}s
          </p>
          <p className="text-white">Total Words Typed: {totalWordsTyped}</p>
          <p className="text-white">Incorrect Words: {incorrectWords}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export const TypingGame = React.memo(TypingGameComponent);
