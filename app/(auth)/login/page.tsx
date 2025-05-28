import { AuthLayout } from '@/features/auth/components/auth-layout';
import { LoginForm } from '@/features/auth/components/login';

export default function LoginPage() {
  return (
    <AuthLayout title='Đăng nhập' subtitle='Chào mừng bạn trở lại!'>
      <LoginForm />
    </AuthLayout>
  );
}
