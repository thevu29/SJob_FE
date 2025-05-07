import { SidebarInset } from '@/components/ui/sidebar';
import { Footer } from '@/features/recruiter/components/navigation/footer';
import { Header } from '@/features/recruiter/components/navigation/header';

export default function RecruiterDashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-secondary flex min-h-screen flex-col'>
      <Header />
      <main className='relative flex-1 p-4 md:p-6'>{children}</main>
      <Footer />
    </div>
  );
}
