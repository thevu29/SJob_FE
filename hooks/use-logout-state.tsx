'use client';

import { create } from 'zustand';

interface LogoutState {
  isLoggingOut: boolean;
  setLoggingOut: (value: boolean) => void;
}

export const useLogoutState = create<LogoutState>((set) => ({
  isLoggingOut: false,
  setLoggingOut: (value: boolean) => set({ isLoggingOut: value }),
}));
