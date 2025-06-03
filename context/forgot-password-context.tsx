'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ForgotPasswordContextType {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

const ForgotPasswordContext = createContext<
  ForgotPasswordContextType | undefined
>(undefined);

interface ForgotPasswordProviderProps {
  children: ReactNode;
}

export function ForgotPasswordProvider({
  children
}: ForgotPasswordProviderProps) {
  const [email, setEmailState] = useState<string>('');

  const setEmail = (email: string) => {
    setEmailState(email);
  };

  const clearEmail = () => {
    setEmailState('');
  };

  return (
    <ForgotPasswordContext.Provider
      value={{
        email,
        setEmail,
        clearEmail
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
}

export function useForgotPassword() {
  const context = useContext(ForgotPasswordContext);

  if (context === undefined) {
    throw new Error(
      'useForgotPassword must be used within a ForgotPasswordProvider'
    );
  }

  return context;
}
