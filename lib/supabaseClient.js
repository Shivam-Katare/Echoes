// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

// export const supabaseClient = createClient(supabaseUrl, supabaseKey);


import { createClient } from '@supabase/supabase-js';
// Function to create a Supabase client with Clerk authentication
export function createClerkSupabaseClient(session) {  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      global: {
        fetch: async (url, options = {}) => {
          const clerkToken = await session?.getToken({
            template: "supabase-echoes",
          });
          console.log("clerkToken", clerkToken);
          const headers = new Headers(options?.headers);
          headers.set("Authorization", `Bearer ${clerkToken}`);
          return fetch(url, { ...options, headers });
        },
      },
    }
  );
}

// // Create the Supabase client
// const supabase = createClerkSupabaseClient();

// export { supabase };