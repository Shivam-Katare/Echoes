"use client";

import usePlayStore from '@/store/playStore';
import { useSession } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "motion/react"
import { ChapterTitle } from './ChapterTitle';
import { useUser } from '@clerk/nextjs';
import { fetchUserStoryline } from '@/lib/storyManager';
import {StorylineManager} from './StorylineManager';
import LoadingStory from '@/components/loading-story';

function Storyline() {
  const { session } = useSession();
  const { fetchStory, gameData, isLoading, fetchCheckpoint, checkpoint } = usePlayStore();
  const [showTitle, setShowTitle] = useState(true);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(-1);
  const user = useUser().user;
  const user_id = user?.id ?? '';
  const [storylineData, setStorylineData] = useState({
    currentChapter: null,
    lastChunkId: null,
    stories: [],
    currentChapterName: '',
  });

  const handleTitleComplete = () => {
    setShowTitle(false);
    setCurrentChunkIndex(storylineData.lastChunkId || 0);
  };

  const handleNextChapter = () => {
    const nextChapterId = storylineData.currentChapter + 1;
    const nextChapterStories = gameData.filter(
      (story) => story.chapter_id === nextChapterId
    );
  
    if (nextChapterStories.length > 0) {
      setStorylineData({
        currentChapter: nextChapterId,
        lastChunkId: 1,
        stories: nextChapterStories,
        currentChapterName: nextChapterStories[0].title,
      });
      setShowTitle(true);
      setCurrentChunkIndex(-1);
    } else {
      setStorylineData({ ...storylineData, stories: [] });
    }
  };

  const handleChunkComplete = (nextChunkIndex) => {
    const maxChunks = storylineData.stories[0]?.story_chunks?.length || 0;
    if (nextChunkIndex < maxChunks) {
      setCurrentChunkIndex(nextChunkIndex);
    } else {
      handleNextChapter();
    }
  };
  

  
  useEffect(() => {
    let isMounted = true;

    const initializeData = async () => {
      if (!session) return;

      try {
        console.log('Fetching story...');
        await fetchStory(session);
      } catch (error) {
        console.error('Error fetching story:', error);
      }
    };

    initializeData();
    return () => {
      isMounted = false;
    };
  }, [session, fetchStory]);

  useEffect(() => {
    let isMounted = true;

    const fetchCheckpointData = async () => {
      if (!gameData?.length) return;

      try {
        console.log('Fetching checkpoint...');
        await fetchCheckpoint(session, user_id);
      } catch (error) {
        console.error('Error fetching checkpoint:', error);
      }
    };

    fetchCheckpointData();
    return () => {
      isMounted = false;
    };
  }, [gameData, session, fetchCheckpoint]);

  useEffect(() => {
    if (!gameData?.length || !checkpoint?.length) return;
    console.log("aree bhai", checkpoint);
    console.log('Processing storyline data...');
    const storylineResult = fetchUserStoryline(checkpoint, gameData);

    if (storylineResult.error) {
      console.error('Error processing storyline:', storylineResult.error);
    }

    if(storylineResult) {
      setStorylineData(storylineResult);
    setCurrentChunkIndex(storylineResult.lastChunkId || 0);
    console.log("storylineData chunk ke liye", storylineData);
    }
    
  }, [gameData, checkpoint]);

  const currentChunk = !showTitle && storylineData.stories[0]?.story_chunks?.[currentChunkIndex];

  if (isLoading || !gameData?.length || !checkpoint?.length) {
    return <LoadingStory />
  }

  if (!storylineData.stories.length) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        To be continued...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden bg-gray-700"
    // style={{
    //   backgroundImage: 'url(https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80)',
    // }}
    >
      {/* Dynamic background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/70"
        animate={{
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {showTitle && storylineData.currentChapter && (
            <>
              <ChapterTitle
                chapterId={storylineData.currentChapter}
                title={`${storylineData.currentChapterName}`}
                onComplete={handleTitleComplete}
              />
            </>

          )}

          {!showTitle && currentChunk && !isLoading && (
            <StorylineManager
              stories={storylineData.stories}
              currentIndex={currentChunkIndex}
              onComplete={handleChunkComplete}
              currentChapter={storylineData.currentChapter}
              onNextChapter={handleNextChapter}
              handleNextChapter={handleNextChapter} // Pass the handleNextChapter function
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default React.memo(Storyline);