import { SignUpForm } from '@/features/auth/components/sign-up';
import { AuthLayout } from '@/features/auth/components/auth-layout';

export default function SignUpPage() {
  return (
    <AuthLayout title='Đăng ký' subtitle='Chào mừng bạn đến với SJob!'>
      <SignUpForm />
    </AuthLayout>
  );
}
