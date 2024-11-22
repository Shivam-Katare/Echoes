import React, { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';

function StoryChunkComponent({ chunk, onComplete }) {

  const soundRef = useRef(null);
  useEffect(() => {
    if (!chunk.audio_url) {
      // If no audio, wait for reading time based on content length
      const readingTime = Math.max(chunk.content.length * 50, 3000); // Min 3 seconds
      const timer = setTimeout(onComplete, readingTime);
      console.log("StoryChunk: readingTime", readingTime);
      return () => clearTimeout(timer);
    }

    // Initialize audio with preload
    console.log("StoryChunk:", chunk.audio_url);
    soundRef.current = new Howl({
      src: [chunk.audio_url],
      html5: true,
      preload: true,
      volume: 1,
      onload: () => {
        console.log("StoryChunk: Audio loaded, playing...");
        soundRef.current.play();
      },
      onend: () => {
        console.log("StoryChunk: onend"); 
        onComplete();
      },
      onloaderror: (id, error) => {
        console.error('Audio loading error:', error);
        // Fallback to timeout if audio fails
        const fallbackTimer = setTimeout(onComplete, 5000);
        return () => clearTimeout(fallbackTimer);
      }
    });

    return () => {
      if (soundRef.current) {
        console.log("StoryChunk: Cleaning up audio");
        soundRef.current.unload();
      }
    };
  }, [chunk, onComplete]);

  return (
    <motion.div
      className="max-w-2xl mx-auto p-8 bg-black/30 backdrop-blur-sm rounded-lg shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        {chunk.played_by && (
          <span className="text-indigo-300 font-semibold">{chunk.played_by}:</span>
        )}
      </div>
      <p className="text-xl text-white leading-relaxed">{chunk.content}</p>
    </motion.div>
  );
}

export const StoryChunk = React.memo(StoryChunkComponent);