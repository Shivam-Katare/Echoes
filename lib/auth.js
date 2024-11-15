import { supabaseClient } from "@/lib/supabaseClient";

export const signInWithGoogle = async () => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Google Sign-In Error:', error.message);
    return { error };
  }

  console.log('Google Sign-In Data:', data);
  return { data };
};


export const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) {
    console.error('Sign-out error:', error.message);
    return { error };
  }
  console.log('User signed out');
  return { success: true };
};
