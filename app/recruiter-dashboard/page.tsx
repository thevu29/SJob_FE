import { redirect } from 'next/navigation';

export default async function page() {
  return redirect('/recruiter-dashboard/job');
}
