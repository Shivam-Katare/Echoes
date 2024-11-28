import React, { useEffect, useRef, useState } from 'react';
import { Nunito, Playfair_Display, Poppins } from 'next/font/google';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import AnimatedParagraph from '@/components/animated-paragraph';
import Image from 'next/image';

export const nunito = Nunito({ subsets: ['latin'], weight: '400' });
export const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' });
export const poppins = Poppins({ subsets: ['latin'], weight: '400' });

function StoryChunkComponent({ chunk, onComplete }) {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showImageContainer, setShowImageContainer] = useState(true);

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

  useEffect(() => {
    if (chunk?.images && chunk.images.length > 0) {
      const image = chunk?.images[currentImageIndex];
      const isLastImage = currentImageIndex === chunk.images.length - 1;

      const imageTimer = setTimeout(() => {
        setShowImage(false);
        // Wait for fade out animation before completing
        setTimeout(() => {
          if (isLastImage) {
            setShowImageContainer(false);
          } else {
            setCurrentImageIndex(prev => prev + 1);
            setShowImage(true);
          }
        }, 500);
      }, image.duration);
      return () => clearTimeout(imageTimer);
    }
  }, [chunk, currentImageIndex]);

  return (
    <motion.div
      className="max-w-2xl mx-auto p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70"></div>
        <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent opacity-40"></div>

        {chunk?.images && chunk.images.length > 0 && showImageContainer && (
          <motion.div
            className="mb-6 relative h-64 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: showImage ? 1 : 0,
              height: showImage ? 256 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                scale: showImage ? 1.05 : 1,
              }}
              transition={{
                duration: chunk?.images[currentImageIndex]?.duration / 1000, // Convert to seconds
                ease: "linear"
              }}
            >
              <Image
                src={chunk.images[currentImageIndex].url}
                alt={chunk.images[currentImageIndex].description}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
          </motion.div>
        )}

        {
          chunk?.played_by === 'narrator' ? (
            <div className="space-y-6">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 backdrop-blur-sm">
                <span className={`${nunito.className} text-indigo-300 font-medium`}>
                  {chunk?.played_by}
                </span>
              </div>
              <AnimatedParagraph
                text={chunk?.content}
                fullStopCount={2}
                delay={0}
                className={`${nunito.className} text-xl text-gray-200 leading-relaxed tracking-wide`}
              />
            </div>
          ) : (
            <div className="space-y-4">
              {chunk?.played_by && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/30 flex items-center justify-center">
                    <span className="text-indigo-300 text-sm">
                      {chunk?.played_by[0]}
                    </span>
                  </div>
                  <span className="text-indigo-300 font-medium">
                    {chunk?.played_by}
                  </span>
                </div>
              )}
              <p className={`${poppins.className} text-xl text-gray-200 leading-relaxed pl-11`}>
                {chunk?.content}
              </p>
            </div>
          )
        }

      </div>

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