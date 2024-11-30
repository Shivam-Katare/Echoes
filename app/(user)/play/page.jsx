"use client";

import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { GitCompareIcon, Info, Newspaper, Volume2, VolumeOff, XCircle } from 'lucide-react';
import { useSession, useUser } from '@clerk/nextjs';
import { BackgroundParticles } from '@/components/background-particles';
import Image from 'next/image';
import useLeaderboardStore from '@/store/leaderboardStore';
import ProfileCardDialog from '@/components/dialogs/profile-card';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

function Play() {
  const { isLoading, globalLeaderboard, profileData, fetchGlobalLeaderboard, fetchProfileData } = useLeaderboardStore();
  const { session } = useSession();
  const [isPlaying, setIsPlaying] = useState(true);
  const [sound, setSound] = useState(null);
  const user = useUser().user;
  const userId = user?.id ?? '';
  const username = useUser().user?.fullName;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      if (session && userId) {
        await fetchGlobalLeaderboard(session);
        await fetchProfileData(session, userId);
      }
    };

    fetchData();
  }, [session, userId]);

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

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  }

  useEffect(() => {
    setShowWelcome(true);
  }, []);


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
          href="https://github.com/Shivam-Katare/echoes"
          target="_blank"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <GitCompareIcon size={24} className="text-white" />
        </Link>

        <Link
          href="https://x.com/Shivamkatare_27"
          target="_blank"
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <XCircle size={24} className="text-white" />
        </Link>

        <Link
          href="https://shivamkatareblog.hashnode.dev/introducing-echoes-step-into-the-world-of-memories-and-emotions"
          target='_blank'
          className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <Newspaper size={24} className="text-white" />
        </Link>

        {
          session && (
            <Drawer>
          <DrawerTrigger asChild>
            <button
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 transition"
            >
              <Info size={24} className="text-white" />
            </button>
          </DrawerTrigger>
          <DrawerContent>
            <ProfileCardDialog profileData={profileData} />
          </DrawerContent>
        </Drawer>
          )
        }

      </div>

      {/* Memory Orbs */}
      <BackgroundParticles />

      {/* Hero Section */}
      {
        userId && session && (
          <>
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
          </>
        )
      }


      {/* Buttons */}
      <div className="flex gap-8 mb-auto mt-16">
        <Link href="/play/storyline">
          <Button className="bg-[#ffa13d] hover:bg-[#ffbb3b] px-6 py-3 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
            Story Mode
          </Button>
        </Link>
        <Link href="/play/story">
          <Button className="bg-[#ff0000] hover:bg-[#c42323] px-6 py-3 rounded-lg text-lg shadow-lg transition-transform transform hover:scale-105">
            Free Play
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Play;
