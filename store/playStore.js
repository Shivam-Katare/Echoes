import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import { create } from 'zustand';

const usePlayStore = create((set) => ({
  words: [],
  paras: [],
  gameData: [],
  checkpoint: [],
  isLoading: false,

  fetchCheckpoint: async (session, userId) => {
    if (!session) {
      console.error('Session is required to fetch checkpoints');
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('user_checkpoint')
        .select('*')
        .eq('user_id', userId)
        .order('chapter_id', { ascending: true });

      if (error) {
        console.error('Error fetching checkpoint:', error);
        set({
          checkpoint: [
            {
              id: 0, // Default ID
              created_at: new Date().toISOString(), // Default timestamp
              chapter_id: 1,
              last_chunk_id: 0,
              user_id: userId || "", // Use provided userId or empty string
            },
          ],
          isLoading: false,
        });
        return;
      }

      // Set default if data is empty or null
      set({
        checkpoint: data && data.length > 0
          ? data
          : [
            {
              id: 0, // Default ID
              created_at: new Date().toISOString(), // Default timestamp
              chapter_id: 1,
              last_chunk_id: 1,
              user_id: userId || "", // Use provided userId or empty string
            },
          ],
        isLoading: false,
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      set({
        checkpoint: [
          {
            id: 0, // Default ID
            created_at: new Date().toISOString(), // Default timestamp
            chapter_id: 1,
            last_chunk_id: 1,
            user_id: userId || "", // Use provided userId or empty string
          },
        ],
        isLoading: false,
      });
    }
  },

  updateCheckpoint: async (session, userId, checkpointData) => {
    if (!session) {
      console.error('Session is required to update checkpoints');
      return;
    }
  
    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });
  
    try {
      const { data, error } = await supabase
        .from('user_checkpoint')
        .select('*')
        .eq('user_id', userId);
  
      if (error) {
        console.error('Error fetching checkpoint:', error);
        set({ isLoading: false });
        return;
      }
  
      if (data && data.length > 0) {
        // Update existing checkpoint
        const { error: updateError } = await supabase
          .from('user_checkpoint')
          .update(checkpointData)
          .eq('user_id', userId);
  
        if (updateError) {
          console.error('Error updating checkpoint:', updateError);
        }
      } else {
        // Insert new checkpoint
        const { error: insertError } = await supabase
          .from('user_checkpoint')
          .insert({
            chapter_id: currentChapter + 1,
            user_id: userId,
            last_chunk_id: 1,
          });
  
        if (insertError) {
          console.error('Error inserting checkpoint:', insertError);
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchWords: async (difficulty) => {
    const endpoint = "https://echoes-shivam.hypermode.app/graphql";
    const key = process.env.NEXT_PUBLIC_MODUS_ENV; 

    const query = `
      query Words($difficulty: String!) {
        words(difficulty: $difficulty) {
          id
          word
          difficulty
          created_at
        }
      }
    `;
    set({ isLoading: true });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          query,
          variables: { difficulty },
        }),
      });

      const data = await response.json();
      const words = data?.data?.words || [];
      set({ words });
    } catch (error) {
      set({ words: [], isLoading: false });
    }
  },

  fetchParas: async () => {
    const endpoint = "https://echoes-shivam.hypermode.app/graphql";
    const key = process.env.NEXT_PUBLIC_MODUS_ENV;

    const query = `
      query Words() {
        paras {
         id
         created_at
         para
       }
      }
    `;
    set({ isLoading: true });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          query
        }),
      });

      const data = await response.json();
      const paras = data?.data?.paras || [];
      set({ paras });
    } catch (error) {
      console.error('Error fetching paras:', error);
      set({ paras: [], isLoading: false });
    }
  },

  // story mode
  fetchStory: async (session) => {
    if (!session) {
      console.error('Session is required to fetch stories');
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });

    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching stories:', error.message);
        return;
      }
      set({ gameData: data, isLoading: false });
    } catch (error) {
      console.error('Unexpected error fetching stories:', error);

      set({ gameData: [], isLoading: false });
    }
  }
}));

export default usePlayStore;