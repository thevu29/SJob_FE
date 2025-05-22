'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { Job, JobStatus } from '@/interfaces/job';
import { JobCard } from '@/features/user/pages/home/components/job-card';

interface JobListingsProps {
  title: string;
  viewAllLink?: string;
  jobs: Job[];
}

export default function JobListings({
  title,
  viewAllLink = '#',
  jobs
}: JobListingsProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [desktopPage, setDesktopPage] = useState(0);
  const itemsPerPage = 9;

  const totalDesktopPages = Math.ceil(jobs?.length / itemsPerPage);

  // Handle mobile carousel slide change
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Function to handle dot click for mobile
  const scrollToSlide = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setActiveSlide(index);
    },
    [emblaApi]
  );

  // Function to handle desktop pagination
  const goToDesktopPage = (page: number) => {
    if (page >= 0 && page < totalDesktopPages) {
      setDesktopPage(page);
    }
  };

  // Get current desktop page items
  // const currentDesktopItems = displayJobs.slice(
  //   desktopPage * itemsPerPage,
  //   (desktopPage + 1) * itemsPerPage
  // );
  const currentDesktopItems = jobs.slice(
    desktopPage * itemsPerPage,
    (desktopPage + 1) * itemsPerPage
  );

  // Calculate actual number of slides for mobile (excluding placeholders)
  const actualJobCount = jobs?.length;
  const mobileSlideCount = Math.max(actualJobCount, 1);

  return (
    <section className='w-full py-8'>
      <div className='container mx-auto px-4'>
        <Card className='overflow-hidden border shadow-sm'>
          <CardContent className='p-6'>
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div className='mr-2 h-12 w-3 rounded-sm bg-gradient-to-b from-orange-500 to-blue-500'></div>
                <h2 className='text-xl font-bold md:text-2xl'>{title}</h2>
              </div>
              <a
                href={viewAllLink}
                className='text-primary-foreground font-medium uppercase hover:underline'
              >
                Xem tất cả
              </a>
            </div>

            {/* Desktop view - Grid layout */}
            <div className='hidden gap-4 lg:grid lg:grid-cols-3'>
              {currentDesktopItems.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Mobile view - Carousel */}
            <div className='lg:hidden'>
              <div className='overflow-hidden' ref={emblaRef}>
                <div className='flex'>
                  {jobs &&
                    jobs.map((job) => (
                      <div
                        key={job.id}
                        className='min-w-0 flex-[0_0_100%] pl-4 first:pl-0 md:flex-[0_0_50%]'
                      >
                        <JobCard job={job} />
                      </div>
                    ))}
                </div>
              </div>

              {/* Mobile pagination dots */}
              <div className='mt-4 flex flex-wrap items-center justify-center'>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                  disabled={mobileSlideCount <= 1}
                >
                  <ChevronLeft className='h-4 w-4' />
                </Button>

                {Array.from({ length: mobileSlideCount }).map((_, i) => (
                  <Button
                    key={i}
                    variant='ghost'
                    size='icon'
                    className={cn(
                      'mx-1 h-2 w-2 rounded-full p-0 transition-colors duration-200',
                      activeSlide === i ? 'bg-primary' : 'bg-muted'
                    )}
                    onClick={() => scrollToSlide(i)}
                  />
                ))}

                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() =>
                    scrollToSlide(
                      Math.min(mobileSlideCount - 1, activeSlide + 1)
                    )
                  }
                  disabled={mobileSlideCount <= 1}
                >
                  <ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>

            {/* Desktop pagination dots */}
            <div className='mt-8 hidden items-center justify-center lg:flex'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => goToDesktopPage(desktopPage - 1)}
                disabled={desktopPage === 0 || totalDesktopPages <= 1}
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              {Array.from({ length: Math.max(totalDesktopPages, 1) }).map(
                (_, i) => (
                  <Button
                    key={i}
                    variant='ghost'
                    size='icon'
                    className={cn(
                      'mx-1 h-2 w-2 rounded-full p-0 transition-colors duration-200',
                      desktopPage === i ? 'bg-primary' : 'bg-muted'
                    )}
                    onClick={() => goToDesktopPage(i)}
                  />
                )
              )}

              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8'
                onClick={() => goToDesktopPage(desktopPage + 1)}
                disabled={
                  desktopPage === totalDesktopPages - 1 ||
                  totalDesktopPages <= 1
                }
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
