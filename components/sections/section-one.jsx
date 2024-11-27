export default function SectionOne() {
  return (
    <div className="relative isolate -z-10 overflow-hidden gradient-hero-5 pt-14">
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] gradient-hero-5 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
      />
      <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
          {/* <h1 class="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl lg:col-span-2 xl:col-auto">We’re changing the way people connect</h1> */}
          <h1 className="max-w-2xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl lg:col-span-2 xl:col-auto">
            Echoes?
          </h1>
          <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
            <p className="text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Echoes is a speed-typing RPG game that follows the story of our main character, Ava. You&apos;ll need to demonstrate your typing skills to progress through each chapter. 
            <br /> <br />

            <span>
            Additionally, Echoes features a Free Play mode where you can test your typing abilities against typists from around the world.
            </span>
            </p>
          </div>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
          />
        </div>
      </div>
    </div>
  )
}
