import { Footer } from '@/features/recruiter/components/navigation/footer';
import { Header } from '@/features/recruiter/components/navigation/header';

export default function RecruiterDashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex min-h-screen flex-col bg-gray-50'>
      <Header />
      <main className='flex-1 p-4 md:p-6'>{children}</main>
      <Footer />
    </div>
  );
}
