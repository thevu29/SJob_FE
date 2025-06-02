import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SkillSkeletonCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <Skeleton className='h-6 w-24' />
        <Skeleton className='h-9 w-36' />
      </CardHeader>

      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`h-8 rounded-full ${index % 3 === 0 ? 'w-20' : index % 3 === 1 ? 'w-16' : 'w-24'}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
