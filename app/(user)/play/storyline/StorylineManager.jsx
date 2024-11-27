import React from "react";
import { StoryChunk } from "./StoryChunk";
import { TypingGame } from "./TypingGame";
import { AnimatePresence, motion } from "motion/react"

function StorylineManagerComponent ({ stories, currentIndex, onComplete, currentChapter, onNextChapter, handleNextChapter }) {
  // const currentChunk = stories[currentIndex]?.story_chunks?.[currentIndex];
  console.log("ye story", stories)
  const currentStory = stories[0]; // Get the first story since we filtered by chapter
  const currentChunk = currentStory?.story_chunks?.[currentIndex];
  console.log("show kar bhai", currentChunk)
  const handleChunkComplete = () => {
    const nextChunkIndex = currentIndex + 1;
    const maxChunks = currentStory?.story_chunks?.length || 0;

    if (nextChunkIndex < maxChunks) {
      onComplete(nextChunkIndex); // Pass the next chunk index to onComplete
    } else {
      handleNextChapter();
    }
  };
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
          <StoryChunk chunk={currentChunk} onComplete={handleChunkComplete} />
        </motion.div>
      ) : (
        <motion.div
          key={`typing-${currentChunk.chunk_id}`}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <TypingGame chunk={currentChunk} onComplete={handleChunkComplete} currentChapter={currentChapter} onNextChapter={onNextChapter} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const StorylineManager = React.memo(StorylineManagerComponent);