"use client";

import { signInWithGoogle } from '@/lib/auth';
import React from 'react';

const GoogleSignInButton = () => {
  const handleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      alert('Failed to sign in with Google');
    }
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
