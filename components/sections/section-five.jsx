import { playfair } from "@/app/(user)/layout";
import React from "react";

export default function SectionFive() {
  return (
    <div className="overflow-hidden gradient-hero-3 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
          <div className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Not in mood to play Story Mode?</h2>
              <p className={`${playfair.className} mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl`}>
                Play Free Typing Mode
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">
                Enjoy the 2 different types of free typing modes. Choose your way and test your typing skills. Choose words or sentences and type them as fast as you can.
              </p>
            </div>
          </div>
          <div className="sm:px-6 lg:px-0">
            <div className="relative isolate overflow-hidden gradient-hero-5 px-6 pt-8 sm:mx-auto sm:max-w-2xl sm:rounded-3xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
              />
              <div className="max-w-2xl sm:mx-0 sm:max-w-none">
                <img
                  alt="Product screenshot"
                  src="https://mmtybpddrcnkqqdxfuzm.supabase.co/storage/v1/object/public/scenes-img/Hashnode%20Covers%20(2).png"
                  width={2432}
                  height={1442}
                  className="-mb-12 w-[57rem] max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                />
              </div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}