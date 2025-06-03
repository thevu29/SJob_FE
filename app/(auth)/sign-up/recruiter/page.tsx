import { AuthLayout } from '@/features/auth/components/auth-layout';
import { SignUpRecruiterForm } from '@/features/auth/components/sign-up-recruiter';

export default function SignUpRecruiterPage() {
  return (
    <AuthLayout title='Đăng ký' subtitle='Chào mừng bạn đến với SJob!'>
      <SignUpRecruiterForm />
    </AuthLayout>
  );
}
