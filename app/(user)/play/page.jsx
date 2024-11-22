"use client";

import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import Keyboard from '@/components/keyboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Volume2, VolumeOff } from 'lucide-react';

function Play() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState(null);

  // Initialize Howler.js instance
 // Initialize Howler.js instance
 useEffect(() => {
  const soundInstance = new Howl({
    src: ['/audio/mainbg.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.03,
  });

  setSound(soundInstance);

  // Cleanup Howler instance on component unmount
  return () => {
    soundInstance.stop();
  };
}, []);


  // Play/Pause toggle handler
  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gradient-to-b from-[#3c3416] to-[#ff9e1e] text-white relative overflow-hidden">
      {/* Music Toggle Button */}
      <button
        onClick={togglePlay}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <Volume2 size={24} className="text-white" />
        ) : (
          <VolumeOff size={24} className="text-white" />
        )}
      </button>

      {/* Memory Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {[...Array(15)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#f7e7e7] to-[#fddedf] blur-lg opacity-40 animate-floating`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 8 + 4}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Hero Section */}
      <div className="text-center mt-6">
        <p className="text-[38px] font-[100] mb-[5.5rem] animate-fadeIn">
          Step into a world of memories and emotions
        </p>
      </div>

      {/* Keyboard */}
      <div className="mb-10 shadow-lg p-4 bg-[#0000002e] rounded-lg w-[56rem] sm:w-max scale-50 sm:scale-50 md:scale-100">
        <Keyboard />
      </div>

      {/* Buttons */}
      <div className="flex gap-8">
        <Link href="/play/storyline">
          <Button className="bg-[#ffa13d] hover:bg-[#ffbb3b] px-6 py-3 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
            Story Mode
          </Button>
        </Link>
        <Link href="/play/free">
          <Button className="bg-[#ff0000] hover:bg-[#c42323] px-6 py-3 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
            Free Play
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Play;
