'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Recruiter } from '@/interfaces';
import Image from 'next/image';
import placeholder from '@/public/placeholder.jpg';
import { useGetPaginated, useGetPaginatedPublic } from '@/hooks/use-queries';
import RecruiterListingSkeleton from '@/features/user/pages/home/components/recruiter-listing-skeleton';
import Link from 'next/link';

export default function RecruiterListings() {
  const currentPage = 1;
  const pageSize = 50;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useGetPaginated<Recruiter>(
    `recruiters`,
    currentPage,
    pageSize,
    [`home-page-recruiters`]
  );

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
  if (isLoading) {
    return <RecruiterListingSkeleton />;
  }
  return (
    <section className='container mx-auto px-4 py-8'>
      <Card className='border-border border'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold'>Nhà tuyển dụng</CardTitle>
        </CardHeader>
        <CardContent className='pt-6'>
          <div className='relative'>
            <div
              ref={scrollContainerRef}
              className='scrollbar-hide flex gap-4 overflow-x-hidden pb-4'
            >
              {data &&
                data.data &&
                data.data.length > 0 &&
                data.data.map((recruiter) => (
                  <Card
                    key={recruiter.id}
                    className='border-border w-48 flex-shrink-0 border transition-shadow duration-300 hover:shadow-md'
                  >
                    <CardContent>
                      <Link
                        href={`/recruiter/${recruiter.id}`}
                        className='flex flex-col items-center p-4'
                      >
                        <div className='bg-secondary mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
                          <Image
                            src={recruiter.image || placeholder}
                            alt='Logo'
                            width={48}
                            height={48}
                          />
                        </div>
                        <h3 className='mb-1 text-center text-sm font-medium'>
                          {recruiter.name}
                        </h3>
                      </Link>
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
