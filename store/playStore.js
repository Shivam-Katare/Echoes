import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import { create } from 'zustand';

const usePlayStore = create((set) => ({
  words: [],
  gameData: [],
  checkpoint: [],
  isLoading: false,

  fetchCheckpoint: async (session) => {
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
        .order('chapter_id', { ascending: true })
      set({ checkpoint: data, isLoading: false });
    } catch (error) {
      set({ checkpoint: [], isLoading: false });
    }
  },

  fetchWords: async (difficulty) => {
    const endpoint = "https://echoes-shivam.hypermode.app/graphql"; // Replace with your Modus API endpoint
    const key = process.env.NEXT_PUBLIC_MODUS_ENV; // Replace with your Modus API key

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
      console.log("Words fetched:", words);
    } catch (error) {
      console.error("Error fetching words:", error);
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