// utils/storyManager.js
export const fetchUserStoryline = (checkpoint, stories) => {
  try {
    // Validate inputs
    if (!checkpoint || !Array.isArray(checkpoint) || checkpoint.length === 0) {
      throw new Error('Invalid checkpoint data');
    }
    
    if (!stories || !Array.isArray(stories) || stories.length === 0) {
      throw new Error('Invalid stories data');
    }

    const userCheckpoint = checkpoint[0]; // Get the first checkpoint
    
    // Validate checkpoint properties
    if (!userCheckpoint.chapter_id || !userCheckpoint.last_chunk_id || !userCheckpoint.user_id) {
      throw new Error('Invalid checkpoint structure');
    }

    // Filter stories based on checkpoint
    const relevantStories = stories.filter(story => {
      return story.chapter_id === userCheckpoint.chapter_id;
    });

    console.log('Filtered stories:', relevantStories); // Debug log

    if (relevantStories.length === 0) {
      throw new Error('No stories found for the current checkpoint');
    }

    return {
      currentChapter: userCheckpoint.chapter_id,
      lastChunkId: userCheckpoint.last_chunk_id,
      stories: relevantStories,
      currentChapterName: relevantStories[0].title,
    };
  } catch (error) {
    console.error('Error in fetchUserStoryline:', error);
    return {
      error: error.message,
      currentChapter: checkpoint?.chapter_id || null,
      lastChunkId: checkpoint?.last_chunk_id || null,
      stories: []
    };
  }
};