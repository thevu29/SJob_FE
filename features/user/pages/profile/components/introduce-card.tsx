'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IntroduceCardProps {
  about: string;
}
export function IntroduceCard({ about }: IntroduceCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Giới thiệu</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{about}</p>
      </CardContent>
    </Card>
  );
}
