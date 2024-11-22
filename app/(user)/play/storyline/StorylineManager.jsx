import React from "react";
import { StoryChunk } from "./StoryChunk";
import { TypingGame } from "./TypingGame";
import { AnimatePresence, motion } from "motion/react"

function StorylineManagerComponent ({ stories, currentIndex, onComplete }) {
  // const currentChunk = stories[currentIndex]?.story_chunks?.[currentIndex];
  console.log("ye story", stories)
  const currentStory = stories[0]; // Get the first story since we filtered by chapter
  const currentChunk = currentStory?.story_chunks?.[currentIndex];
  if (!currentChunk) return (
    <>
    {console.log("No stories", currentChunk)}
       <div className="absolute inset-0 flex items-center justify-center">
      No stories available. Please try again later.
    </div>
    </>
 
  )

  return (
    <AnimatePresence mode="wait">
      {currentChunk.type === 'story' ? (
        <motion.div
          key={`chunk-${currentChunk.chunk_id}`}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <StoryChunk chunk={currentChunk} onComplete={onComplete} />
        </motion.div>
      ) : (
        <motion.div
          key={`typing-${currentChunk.chunk_id}`}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <TypingGame chunk={currentChunk} onComplete={onComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const StorylineManager = React.memo(StorylineManagerComponent);