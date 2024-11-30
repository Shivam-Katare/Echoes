import { AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

// utils/storyManager.js
export const fetchUserStoryline = (checkpoint, stories) => {
  try {
    // Validate inputs
    if (!checkpoint || !Array.isArray(checkpoint) || checkpoint.length === 0) {
      toast.error('Something went wrong. Please refresh the page and try again.', {
        duration: 5000,
        icon: <AlertCircle size={35} />
      });
      throw new Error('Invalid checkpoint input');
    }

    if (!stories || !Array.isArray(stories) || stories.length === 0) {
      toast.error('No stories found for the current checkpoint.', {
        duration: 5000,
        icon: <AlertCircle size={35} />
      });
      throw new Error('Invalid stories input');
    }

    const userCheckpoint = checkpoint[0]; // Get the first checkpoint

    // Validate checkpoint properties
    if (typeof userCheckpoint.chapter_id !== 'number' ||
      typeof userCheckpoint.last_chunk_id !== 'number' ||
      typeof userCheckpoint.user_id !== 'string') {
      toast.error('Invalid checkpoint data. Please refresh the page and try again.', {
        duration: 5000,
        icon: <AlertCircle size={35} />
      });
    }

    // Filter stories based on checkpoint
    const relevantStories = stories.filter(story => {
      return story.chapter_id === userCheckpoint.chapter_id;
    });


    if (relevantStories.length === 0) {
      throw new Error('No stories found for the current checkpoint');
    }

    return {
      currentChapter: userCheckpoint.chapter_id,
      lastChunkId: userCheckpoint.last_chunk_id,
      stories: relevantStories,
      currentChapterName: relevantStories[0].title,
      currentChunkIndex: userCheckpoint.last_chunk_id, // Adjust to start from the correct chunk
    };
  } catch (error) {
    return {
      error: error.message,
      currentChapter: checkpoint?.[0]?.chapter_id || null,
      lastChunkId: checkpoint?.[0]?.last_chunk_id || null,
      stories: []
    };
  }
};