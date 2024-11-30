"use client";

import { Flower2, GitCompareArrows, Heart, NewspaperIcon, Video, Volume2, VolumeOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Howl } from 'howler';

export default function Credits() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState(null);
  useEffect(() => {
    const soundInstance = new Howl({
      src: ['/audio/credsbg.mp3'],
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
    <>

      <div className='absolute top-16 right-4 p-2 flex items-center flex-row gap-x-5 md:flex-col md:gap-y-5 z-50'>
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-white hover:bg-white/80 transition z-50"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Volume2 size={24} className="text-black" />
          ) : (
            <VolumeOff size={24} className="text-black" />
          )}
        </button>
      </div>


      <div className="gradient-hero-5 min-h-screen overflow-hidden relative">
        <div className="credits-container absolute w-full animate-scroll">
          <div className="text-center text-white py-20 space-y-12">
            <section className="mb-16">
              <h2 className="text-4xl font-bold mb-6">Echoes</h2>
              <p className="text-xl">Type your way through emotions and memories.</p>
            </section>

            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">Music</h3>
              <p className="text-lg mb-2">What is Loving Anymore</p>
              <p className="text-xl font-medium mb-6">Song by Fiona Harte and Ryan O&apos;Shaughnessy </p>

              <p className="text-lg mb-2">Springs Magnatic</p>
              <p className="text-xl font-medium mb-6">Music by Plug GNV</p>

              <p className="text-lg mb-2">Incorrect / Correct letters</p>
              <p className="text-xl font-medium mb-6">Sound effect via Pixabay</p>

              <p className="text-lg mb-2">Voice Over</p>
              <p className="text-xl font-medium mb-6">Multiple AI speech platforms</p>
            </section>

            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-red-400">Special Thanks</h3>
              <p className="text-lg mb-4">Hypermode for smooth serverless APIs</p>
              <p className="text-lg mb-4">Hashnode for organizing ModusHack</p>
            </section>

            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Technologies Used</h3>
              <p className="text-lg mb-2">Hypermode for creating APIs</p>
              <p className="text-lg mb-2">Supabase for Database</p>
              <p className="text-lg mb-2">Clerk for smooth user Authentication</p>
              <p className="text-lg mb-2">Next.js for fast Frontend Development</p>
              <p className="text-lg mb-2">TailwindCSS for beautiful UI</p>
              <p className="text-lg mb-2">Framer Motion for animations</p>
            </section>

            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">Made with Emotions by Shivam Katare</h3>
              <p className="text-xl mb-4">Proudly Open Source</p>
              <p className="text-xl mb-4">© 2024 Echoes</p>
              <p className="text-lg">All Rights Reserved</p>
            </section>

            <section className="mb-16">
              <h3 className="text-2xl font-semibold mb-4 text-blue-300 caveat-gallery-1">Thank you</h3>
            </section>
          </div>
        </div>
      </div>
    </>

  )
}