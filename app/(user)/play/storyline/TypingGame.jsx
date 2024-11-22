import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TypingGameComponent ({ chunk, onComplete }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(parseInt(chunk.time_limit || '90'));
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      onComplete();
    }
  }, [timeLeft, gameStarted, onComplete]);

  const handleInput = (e) => {
    try {
      if (!gameStarted) setGameStarted(true);
      setInput(e.target.value);
  
      if (!chunk || !chunk.words || !Array.isArray(chunk.words)) {
        throw new Error('Invalid chunk data');
      }
  
      if (e.target.value === chunk.words[currentWordIndex]) {
        setInput('');
        if (currentWordIndex === chunk.words.length - 1) {
          onComplete();
        } else {
          setCurrentWordIndex(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Error handling input:', error);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-black/40 backdrop-blur-md rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl text-white mb-4">{chunk.prompt}</h3>
        <div className="text-xl text-indigo-300 mb-4">Time left: {timeLeft}s</div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        {chunk.words?.map((word, index) => (
          <motion.span
            key={word}
            className={`px-4 py-2 rounded ${
              index === currentWordIndex
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

      <div className="flex justify-center">
        <input
          type="text"
          value={input}
          onChange={handleInput}
          className="w-64 px-4 py-2 text-lg bg-gray-800 text-white border-2 border-indigo-500 rounded-lg focus:outline-none focus:border-indigo-400"
          placeholder="Type the highlighted word..."
          autoFocus
        />
      </div>
    </motion.div>
  );
}

export const TypingGame = React.memo(TypingGameComponent);