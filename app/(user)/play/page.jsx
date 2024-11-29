"use client";

import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GitCompareIcon, Github, Info, Newspaper, VideoIcon, Volume2, VolumeOff, XCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { BackgroundParticles } from '@/components/background-particles';
import Image from 'next/image';

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
    <div className="min-h-screen flex flex-col items-center text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://mmtybpddrcnkqqdxfuzm.supabase.co/storage/v1/object/public/scenes-img/Hashnode%20Covers%20(3).png"
          alt="poster"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      {/* Music Toggle Button */}
      <div className='absolute top-4 right-4 p-2 flex items-center flex-row gap-x-5 md:flex-col md:gap-y-5 z-50'>

        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition z-50"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Volume2 size={24} className="text-white" />
          ) : (
            <VolumeOff size={24} className="text-white" />
          )}
        </button>

        <Link
          href="https://github.com/your-repo-link"
          target="_blank"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <GitCompareIcon size={24} className="text-white" />
        </Link>

        <Link
          href="https://twitter.com/your-profile"
          target="_blank"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <XCircle size={24} className="text-white" />
        </Link>

        <Link
          href="/blog"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Newspaper size={24} className="text-white" />
        </Link>

        <Link
          href="/trailer"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <VideoIcon size={24} className="text-white" />
        </Link>

        <Link
          href="/notes"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Info size={24} className="text-white" />
        </Link>
      </div>

      {/* Memory Orbs */}
      <BackgroundParticles />

      {/* Hero Section */}
      <div className="text-center mt-40 md:mt-6">
        <p className="text-[38px] font-[100] animate-fadeIn">
          Welcome, {username}
        </p>
      </div>

      <div className="text-center mt-2">
        <p className="text-[18px] font-[100] mb-[5.5rem] animate-fadeIn">
          Step into a world of memories and emotions
        </p>
      </div>


      {/* Buttons */}
      <div className="flex gap-8 mb-auto mt-16">
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
