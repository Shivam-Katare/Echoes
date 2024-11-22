import React from "react";

const LoadingStory = React.memo(() => (
  <div className="absolute inset-0 flex items-center justify-center text-white glow-text text-[30px]">
    Loading stories...
  </div>
));

LoadingStory.displayName = "LoadingStory";

export default LoadingStory;