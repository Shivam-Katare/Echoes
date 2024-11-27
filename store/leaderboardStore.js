import { create } from 'zustand';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

const useLeaderboardStore = create((set, get) => ({
  userId: null,
  username: null,
  score: 0,
  words_typed: 0,
  accuracy: 0,
  difficulty: 'easy',
  timePlayed: 0,
  isGameOver: false,
  leaderboard: [],
  globalLeaderboard: [],
  isLoading: false,

  // Set user details (from Clerk)
  setUserDetails: (userId, username) => set({ userId, username }),

  // Set game state
  setGameState: (state) => set(state),

  // Reset game state
  resetGame: () => set({
    score: 0,
    words_typed: 0,
    accuracy: 0,
    timePlayed: 0,
    isGameOver: false,
  }),

  fetchGlobalLeaderboard: async (session) => {
    if (!session) {
      console.error('Session is required to fetch the leaderboard');
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });

    try {
      const { data, error } = await supabase.rpc('global_board'); // Use RPC if creating a stored function

      if (error) {
        console.error('Error fetching global leaderboard:', error);
        return null;
      }

      set({ globalLeaderboard: data });
      return data;
    } catch (err) {
      console.error('Unexpected error fetching global leaderboard:', err);
    } finally {
      set({ isLoading: false });
    }
  },


  fetchLeaderboard: async (session) => {
    if (!session) {
      console.error('Session is required to fetch the leaderboard');
      return;
    }
  
    const supabase = createClerkSupabaseClient(session);
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('LeaderBoard')
        .select('*', { count: 'exact' })
        .order('score', { ascending: false });
  
      if (error) {
        console.error('Error fetching leaderboard:', error.message);
        return null;
      }
  
      set({ leaderboard: data });

      //real time setup
      supabase
       .from('LeaderBoard')
       .on('INSERT', payload => {
        console.log('Leaderboard updated:', payload.new);
        set(state => ({
          leaderboard: [payload.new, ...state.leaderboard].sort((a, b) => b.score - a.score)
        }))
       })
       .on('UPDATE', payload => {
        console.log('Leaderboard updated:', payload.new);
        set(state => ({
          leaderboard: state.leaderboard.map(entry => entry.id === payload.new.id ? payload.new : entry)
        }))
       })
       .subscribe();

      return data; // Return data for further use
    } catch (err) {
      console.error('Unexpected error fetching leaderboard:', err);
    } finally {
      set({ isLoading: false });
    }
  },

  saveLeaderboard: async (session, userId, payload) => {
    if (!session) {
      toast.error("Login required to save leaderboard entry. Please login and try again.");
      return;
    }

    const supabase = createClerkSupabaseClient(session);
    try {
      await toast.promise(
        supabase.from("LeaderBoard").insert({
          user_id: userId,
          userName: payload.userName,
          difficulty: payload.difficulty,
          words_typed: payload.words_typed,
          correct_words_typed: payload.correct_words_typed,
          incorrect_words_typed: payload.incorrect_words_typed,
        }),
        {
          loading: "Saving leaderboard entry...",
          success: "Leaderboard entry saved successfully!",
          error: "Error saving leaderboard entry",
        }
      );
      get().fetchLeaderboard(session);
      get().fetchGlobalLeaderboard(session);
    } catch (err) {
      console.error("Unexpected error saving leaderboard entry:", err);
    }
  },
  
}));
export default useLeaderboardStore;
