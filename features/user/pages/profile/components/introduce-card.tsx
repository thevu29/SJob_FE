'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IntroduceCardProps {
  about?: string;
}
export function IntroduceCard({ about }: IntroduceCardProps) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl'>Giới thiệu</CardTitle>
      </CardHeader>
      <CardContent>
        {about ? (
          <p>{about}</p>
        ) : (
          <div className='text-muted-foreground py-8 text-center'>
            <p>Chưa có thông tin giới thiệu</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
