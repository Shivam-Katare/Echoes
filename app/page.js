"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/lib/auth'
import useAuthStore from '@/store/authStore';
import Hero from '@/components/hero';
import SectionTwo from '@/components/sections/section-two';
import SectionOne from '@/components/sections/section-one';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import SectionFour from '@/components/sections/section-four';
import SectionThree from '@/components/sections/section-three';
import SectionFive from '@/components/sections/section-five';
import { GitCompareArrows, Heart } from 'lucide-react';


export default function LandingPage() {

  const { user, fetchUser } = useAuthStore();
  const router = useRouter();
  const [isLocalhost, setIsLocalhost] = useState(true);

  useEffect(() => {
    fetchUser(); // Fetch user details on component mount
  }, []);

  useEffect(() => {
    setIsLocalhost(window.location.hostname === 'localhost');
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      {
        !isLocalhost ? (
          <div className="w-full bg-black text-center h-screen">
            <div className='h-screen flex flex-col justify-center'>
              <h1 className="text-[45px] font-bold text-white">Echoes</h1>
              <p className="text-white text-[45px] font-[fantasy]">Comming Soon.</p>
            </div>
          </div>
        ) :

          <div>
            <main className="flex-1">
              <SectionFour />
              <Hero />
              <SectionOne />
              <SectionThree />
              <SectionFive />
              <SectionTwo />
              <section id="how-it-works" className="w-full py-12 gradient-hero-5 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                  <h2 className="text-white text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
                  <div className="grid gap-6 lg:grid-cols-4">
                    {[
                      { title: "Choose Your Mode", description: "Log in and play storyline or free type mode." },
                      { title: "Type to Win", description: "Defeat challenges with your typing skills." },
                      { title: "Progress & Unlock", description: "Level up and reveal memories in story mode." },
                      { title: "Climb the Ranks", description: "Play free mode and climb on the leaderboard." }
                    ].map((step, index) => (
                      <div key={index} className="flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 text-black font-bold text-xl mb-4">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                        <p className="text-white">{step.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <section className="w-full py-12 md:py-24 lg:py-32 gradient-hero-3">
                <div className="container px-4 md:px-6">
                  <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Start Your Journey?</h2>
                      <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                        Choose your path and begin your typing adventure now!
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row">
                      <SignedOut>
                        <SignInButton mode="modal">
                          <Button variant="secondary" className="py-2 px-12 bg-black text-[#eef0f2] hover:bg-slate-800">Play it now!</Button>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <UserButton />
                      </SignedIn>
                    </div>
                  </div>
                </div>
              </section>
            </main>
            <footer className="text-center py-6 w-full px-4 md:px-6 border-t">
              <div className="grid grid-rows-2 place-items-center">
                <Link href="https://github.com/Shivam-Katare/echoes" target="_blank" className="text-xs text-white font-serif font-bold">Made with Emotions by Shivam Katare</Link>
                <p className="text-xs text-white font-serif font-bold">© 2024 Echoes. All rights reserved.</p>
              </div>
            </footer>
          </div>
      }
    </div>
  )
}