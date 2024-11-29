import { playfair } from "@/app/(user)/layout";
import React from "react";

const LoadingStory = React.memo(({ textToShow }) => (
  <div className={`${playfair.className} absolute inset-0 flex items-center justify-center text-white glow-text text-[30px]`}>
    {textToShow || "Listning echoes..."}
  </div>
));

LoadingStory.displayName = "LoadingStory";

export default LoadingStory;