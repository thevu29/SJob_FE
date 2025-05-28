'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Recruiter } from '@/interfaces';
import Image from 'next/image';
import { useGet } from '@/hooks/use-queries';

interface RecruiterListingsProps {
  recruiters: Recruiter[];
}

export default function RecruiterListings({
  recruiters
}: RecruiterListingsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data } = useGet<Recruiter[]>(`recruiters/all`, [`recruiters/all`]);
  console.log(data?.data);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Adjust this value as needed
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Adjust this value as needed
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <section className='container mx-auto px-4 py-8'>
      <Card className='border-border border'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold'>
            CÁC NHÀ TUYỂN DỤNG ĐÃ XUẤT HIỆN TRÊN SJOB
          </CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              className='scrollbar-hide flex gap-4 overflow-x-hidden pb-4'
            >
              {recruiters.map((recruiter) => (
                <Card
                  key={recruiter.id}
                  className='border-border w-48 flex-shrink-0 border transition-shadow duration-300 hover:shadow-md'
                >
                  <CardContent className='flex flex-col items-center p-4'>
                    <div className='bg-secondary mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                      {/* <category.icon className='text-color-5 h-8 w-8' /> */}
                      {/* <div className='text-color-5 flex h-8 w-8 items-center justify-center'>
                          {fieldDetailIcons[fieldDetail.name]}
                        </div> */}
                      <Image
                        src={recruiter.image}
                        alt='Logo'
                        width={48}
                        height={48}
                      />
                    </div>
                    <h3 className='mb-1 text-center text-sm font-medium'>
                      {recruiter.name}
                    </h3>
                    {/* <p className='text-muted-foreground text-sm'>
                        {fieldDetail.count} Việc Làm
                      </p> */}
                  </CardContent>
                </Card>
              ))}
            </div>

            <button
              className='bg-background hover:bg-secondary active:bg-secondary/80 border-border absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full border p-2 shadow-md transition-colors'
              onClick={scrollLeft}
              aria-label='Scroll left'
            >
              <ChevronLeft className='text-foreground h-5 w-5' />
            </button>

            <button
              className='bg-background hover:bg-secondary active:bg-secondary/80 border-border absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full border p-2 shadow-md transition-colors'
              onClick={scrollRight}
              aria-label='Scroll right'
            >
              <ChevronRight className='text-foreground h-5 w-5' />
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
