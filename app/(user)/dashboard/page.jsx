"use client";

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        window.location.href = '/'; // Redirect to login if not authenticated
        return;
      }
      setUser(session.user);

      // Fetch user-specific data
      const { data, error } = await supabaseClient
        .from('profiles') // Table name
        .select('full_name, email') // Select specific columns
        .eq('id', session.user.id); // Match by user ID

      if (error) {
        console.error('Error fetching user data:', error.message);
      } else {
        setUserData(data);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Welcome, {user?.email}</h1>
      <h2 className="mt-4 text-xl">Your Profile:</h2>
      {userData.length > 0 ? (
        <ul>
          {userData.map((item) => (
            <li key={item.email} className="border p-2 my-2">
              <p><strong>Full Name:</strong> {item.full_name}</p>
              <p><strong>Email:</strong> {item.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
}
