"use client";

import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Volume2, VolumeOff } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

function Play() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState(null);
  const username = useUser().user?.fullName;

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
    <div className="h-screen flex flex-col items-center gradient-hero-4 text-white relative overflow-hidden">
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
        {[...Array(25)].map((_, index) => (
          <div
            key={index}
            className={`absolute w-16 h-16 rounded-full bg-gradient-to-r from-[#f7e7e7] to-[#dc8888] blur-lg opacity-40 animate-floating`}
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
        <p className="text-[38px] font-[100] animate-fadeIn">
          Welcome, {username}
        </p>
      </div>

      <div className="text-center mt-2">
        <p className="text-[18px] font-[100] mb-[5.5rem] animate-fadeIn">
          Step into a world of memories and emotions
        </p>
      </div>

      <div className="absolute inset-0 flex justify-center items-center">
      <img
        alt="Product screenshot"
        src="https://mmtybpddrcnkqqdxfuzm.supabase.co/storage/v1/object/public/game-img/char-tweleve.png"
        className="max-w-full max-h-full object-contain"
      />
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
