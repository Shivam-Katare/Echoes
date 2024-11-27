import React, { useEffect, useRef } from 'react';
import { Nunito, Playfair_Display, Poppins } from 'next/font/google';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import AnimatedParagraph from '@/components/animated-paragraph';

export const nunito = Nunito({ subsets: ['latin'], weight: '400' });
export const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });
export const poppins = Poppins({ subsets: ['latin'], weight: '400' });

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
      className="max-w-2xl mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >

      {
        chunk?.played_by === 'narrator' ? (
          <div className="mb-4">
            <AnimatedParagraph text={chunk?.played_by} fullStopCount={2} delay={100} className={`${nunito.className}text-xl text-white leading-relaxed`} />
            <AnimatedParagraph text={chunk?.content} fullStopCount={2} delay={200} className={`${nunito.className}text-xl text-white leading-relaxed`} />
          </div>
        ) : (
          <div className="mb-4">
            {chunk?.played_by && (
              <span className="text-indigo-300 font-semibold">{chunk?.played_by}:</span>
            )}
            <p className={`${poppins.className}text-xl text-white leading-relaxed`}>{chunk?.content}</p>
          </div>
        )
      }
{/* 
      <div className="mb-4">
        {chunk?.played_by && (
          <span className="text-indigo-300 font-semibold">{chunk?.played_by}:</span>
        )}
      </div>
      <p className={`${poppins.className}text-xl text-white leading-relaxed`}>{chunk?.content}</p> */}
    </motion.div>
  );
}

export const StoryChunk = React.memo(StoryChunkComponent);