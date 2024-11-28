import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import usePlayStore from '@/store/playStore';
import { useSession } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { nunito } from '../../layout';

function TypingGameComponent({ chunk, onComplete, currentChapter, onNextChapter, chapterStory }) {
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

  console.log("bhai ye chunk chuck chuck kar check kar warna chuccy chuck chunk hoga", chapterStory)
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
        // Find current chunk index in story_chunks array
        const currentChunkIndex = chapterStory.story_chunks.findIndex(
          (storyChunk) => Number(storyChunk.chunk_id) === Number(chunk.chunk_id)
        );
  
        let nextChunkId;
        let nextChapterId = currentChapter;
  
        // Check if there is a next chunk in the array
        if (currentChunkIndex < chapterStory.story_chunks.length - 1) {
          // If there is a next chunk, increment chunk_id normally
          nextChunkId = Number(chunk.chunk_id) + 1;
        } else {
          // If this is the last chunk, set chunk_id to 1 and increment chapter
          nextChunkId = 0;
          nextChapterId = currentChapter + 1;
        }
  
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
  }, [gameResult, onComplete, session, userId, currentChapter, updateCheckpoint, chapterStory, chunk]);
  

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
       <div className="text-center mb-12 relative">
          <div className="inline-block px-6 py-2 rounded-full bg-indigo-500/20 backdrop-blur-sm mb-6">
            <h3 className={`${nunito.className} text-xl text-indigo-300 font-medium`}>
              Challenge
            </h3>
          </div>
          <p className="text-2xl text-gray-200 mb-6 leading-relaxed max-w-2xl mx-auto">
            {chunk.prompt}
          </p>
          <div className="flex justify-center items-center gap-6">
            <div className="bg-indigo-900/30 px-6 py-3 rounded-xl border border-indigo-500/30">
              <span className="text-2xl font-bold text-indigo-300">{timeLeft}</span>
              <span className="text-indigo-400 ml-2">seconds left</span>
            </div>
          </div>
        </div>

      {/* Word Display */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {chunk.words?.map((word, index) => (
          <motion.span
            key={index}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${index === currentWordIndex
                ? 'bg-indigo-600/80 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-transparent'
                : index < currentWordIndex
                  ? 'bg-green-600/300 text-white line-through'
                  : 'bg-gray-800/50 text-gray-400'
              }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex justify-center mb-8">
          <motion.div
            className="relative w-96"
            animate={shake ? { x: [-10, 10, -10, 0] } : {}}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <input
              type="text"
              value={input}
              onChange={handleInput}
              className="w-full px-6 py-4 text-lg bg-gray-900/50 text-white border-2 border-indigo-500/50 rounded-xl focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 backdrop-blur-sm"
              placeholder="Type the highlighted word..."
              autoFocus
            />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300"></div>
          </motion.div>
        </div>

      {/* Game Result */}
      {gameResult && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              {gameResult === 'win' ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <h2 className="text-4xl text-green-400 font-bold mb-6">Victory!</h2>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 mb-2">Time</p>
                      <p className="text-2xl text-white">{completionTime || chunk.time_limit - timeLeft}s</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 mb-2">Words</p>
                      <p className="text-2xl text-white">{totalWordsTyped}</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <p className="text-gray-400 mb-2">Errors</p>
                      <p className="text-2xl text-white">{incorrectWords}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-3xl text-red-400 font-bold">Challenge Failed</h2>
                  <button
                    onClick={handleRetry}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export const TypingGame = React.memo(TypingGameComponent);
