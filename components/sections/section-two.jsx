import { playfair } from "@/app/(user)/layout";
import React from "react";

export default function SectionTwo() {
  return(
    <div className="overflow-hidden gradient-hero-5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Grow on Leaderboard</h2>
              <p className={`${playfair.className} mt-2 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl`}>
                Test your skills. Prove your speed.
              </p>
              <p className="mt-6 text-lg/8 text-[#ffebe3]">
              Challenge your speed and accuracy in fast-paced typing battles. Type fast and be top of the leaderboad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}