'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserAsync } from '@/lib/store/slices/authSlice';
import { setAuthToken } from '@/lib/api/services/authService';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Set the token in the API headers
      setAuthToken(token);
      // Load user data
      dispatch(loadUserAsync());
    }
  }, [dispatch]);

  return <>{children}</>;
}
