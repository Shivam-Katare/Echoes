import React from "react";
import { StoryChunk } from "./StoryChunk";
import { TypingGame } from "./TypingGame";
import { AnimatePresence, motion } from "motion/react"
import LoadingStory from "@/components/loading-story";
import LoadingSpinner from "@/components/loading-spinner";

function StorylineManagerComponent ({ stories, currentIndex, onComplete, currentChapter, onNextChapter, handleNextChapter }) {
  // const currentChunk = stories[currentIndex]?.story_chunks?.[currentIndex];
  const currentStory = stories[0]; // Get the first story since we filtered by chapter
  const currentChunk = currentStory?.story_chunks?.[currentIndex];
  const handleChunkComplete = () => {
    const currentChunkIndex = currentStory.story_chunks.findIndex(
      (storyChunk) => Number(storyChunk.chunk_id) === Number(currentChunk.chunk_id)
    );

    if (currentChunkIndex < currentStory.story_chunks.length - 1) {
      // If there is a next chunk, increment chunk_id normally
      onComplete(currentIndex + 1);
    } else {
      // If this is the last chunk, move to next chapter
      handleNextChapter();
    }
  }
  if (!currentChunk) return (
    <>
    <div className="absolute inset-0 flex items-center justify-center">
      No stories available. Please try again later.
    </div>
    </>
 
  )

  return (
    <AnimatePresence mode="wait">
      {currentChunk?.type === 'story' ? (
        <motion.div
          key={`chunk-${currentChunk.chunk_id}`}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <StoryChunk chunk={currentChunk} onComplete={handleChunkComplete} />
        </motion.div>
      ) : (
         currentChunk?.type === "typing_game" ? (
          <motion.div
          key={`typing-${currentChunk.chunk_id}`}
          className="min-h-screen flex items-center justify-center p-4"
        >
          <TypingGame chapterStory={currentStory} chunk={currentChunk} onComplete={handleChunkComplete} currentChapter={currentChapter} onNextChapter={onNextChapter} />
        </motion.div>
         ) : (
          <LoadingSpinner />
         )
      )}
    </AnimatePresence>
  );
};

export const StorylineManager = React.memo(StorylineManagerComponent);