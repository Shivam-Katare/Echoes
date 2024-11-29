import { playfair } from "@/app/(user)/layout";
import React from "react";

export default function SectionThree() {
  return(
    <div className="relative isolate -z-10 overflow-hidden gradient-hero-5 pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] gradient-hero-5 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:col-span-2 xl:col-auto">
            Feel the Realistic Voices
          </h1>
           <img
            alt=""
            src="https://mmtybpddrcnkqqdxfuzm.supabase.co/storage/v1/object/public/scenes-img/Hashnode%20Covers%20(1).png"
            className="mt-10 aspect-[3/0] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Go through the story of Ava and feel the realistic voices of the characters.
            <br /> <br />

            <span>
             With image visuals, realistic voices, and stunning storyline, bind yourself to the story of Ava.
            </span>
            </p>
          </div>
         
        </div>
      </div>
    </div>
  )
}