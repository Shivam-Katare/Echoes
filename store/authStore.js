import { create } from 'zustand';
import { createClerkSupabaseClient } from '@/lib/supabaseClient';

const supabase = createClerkSupabaseClient();
const useAuthStore = create((set, get) => ({
  user: null,
  userFetched: false,
  userData: [],
  // Fetch the current session/user
  fetchUser: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({ user: session.user });
    } else {
      set({ user: null });
    }
  },

  // Fetch user-specific data
  fetchUserData: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, email')
      .eq('id', session.user.id);

    if (error) {
      console.error('Error fetching user data:', error.message);
    } else {
      set({ userData: data });
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      console.error('Google Sign-In Error:', error.message);
      return { error };
    }

    console.log('Google Sign-In Data:', data);
    await useAuthStore.getState().fetchUser(); // Refresh the user state after login
    return { data };
  },

  // Sign out
  handleSignOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      set({ user: null, userData: [] });
      window.location.href = '/'; // Redirect to login page
    } else {
      console.error('Error signing out:', error.message);
    }
  },
}));

export default useAuthStore;
