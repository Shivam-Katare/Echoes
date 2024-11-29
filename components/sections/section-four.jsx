import { playfair } from "@/app/(user)/layout";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ArrowBigRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function SectionFour() {
  return (
    <section className="relative h-screen">

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat gradient-hero-4"
      >
        {/* <Image
          src="/logo2.png"
          alt="logo"
          objectFit="contain"
          priority
          width={200}
          height={200}
          className="rounded-[12px] -z-0 absolute left-[41rem] top-16 animate-in"
        /> */}
        <div className="absolute inset-0" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">

          <h1 className={`${playfair.className} text-4xlmd:text-6xl font-bold mb-6 tracking-tight text-[black] sm:text-7xl`}>
            A tale of <span className="blur-out">few</span> words
          </h1>
          <p className="text-xl text-[#4d57e4] mb-8 font-bold">
            Experince the journey of a lifetime with Echoes. A typing game that takes you on an adventure through the power of words.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <button className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
              Get Started <ArrowBigRight className="w-4 h-4" />
            </button> */}
            <SignedOut>
            <SignInButton mode="modal">
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">Get Started  <ArrowBigRight className="w-4 h-4" /></button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}