'use client';

import { ForgotPasswordProvider } from '@/context/forgot-password-context';

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ForgotPasswordProvider>
      {children}
    </ForgotPasswordProvider>
  );
}
