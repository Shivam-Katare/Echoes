"use client";

import useAuthStore from '@/store/authStore';
import React from 'react';

const GoogleSignInButton = () => {

  const { signInWithGoogle } = useAuthStore();

  const handleSignIn = async () => {
    signInWithGoogle();
  };

  return (
    <button
      onClick={handleSignIn}
      style={{
        padding: '10px 20px',
        backgroundColor: '#4285F4',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
