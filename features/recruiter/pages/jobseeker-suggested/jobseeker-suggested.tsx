'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { JobSeeker } from '@/interfaces';
import { useGet } from '@/hooks';
import type { Job } from '@/interfaces/job';
import { useParams } from 'next/navigation';
import JobHeaderSkeleton from '@/features/recruiter/pages/jobseeker-suggested/components/job-header-skeleton';
import JobSeekerGridSkeleton from '@/features/recruiter/pages/jobseeker-suggested/components/job-seeker-grid-skeleton';
import JobSeekerSuggestedCard from '@/features/recruiter/pages/jobseeker-suggested/components/jobseeker-suggested-card';

const CARDS_PER_SLIDE = 6; // 2 rows × 3 columns on large screens

export default function JobSeekersSuggested() {
  const params = useParams();
  const jobId = params.jobId as string;

  const { data: jobSeeker, isLoading: isJobSeekerLoading } = useGet<
    JobSeeker[]
  >(`jobs/suggest-job-seekers/${jobId}`, ['jobs/suggest-job-seekers', jobId]);
  const { data: job, isLoading: isJobLoading } = useGet<Job>(`jobs/${jobId}`, [
    'jobs/',
    jobId
  ]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <div className='bg-background min-h-screen'>
      {/* Simplified Header */}
      <div className='bg-card border-border border-b px-4 py-8 sm:px-6 lg:px-8'>
        <div className='container mx-auto'>
          {isJobLoading ? (
            <JobHeaderSkeleton />
          ) : (
            job &&
            job.data && (
              <div className='mb-2 text-center'>
                <h2 className='text-foreground mb-4 text-3xl font-bold'>
                  Gợi ý ứng viên phù hợp cho công việc {job.data.name}
                </h2>
                <p className='text-muted-foreground text-lg'>
                  Hệ thống sẽ phân tích các yêu cầu công việc và đề xuất các ứng
                  viên có hồ sơ phù hợp
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        {/* Embla Carousel */}
        <div className='relative'>
          <div className='overflow-hidden' ref={emblaRef}>
            <div className='flex'>
              {/* Dynamically calculate slides here */}
              {isJobSeekerLoading ? (
                <div className='w-full flex-none'>
                  <JobSeekerGridSkeleton />
                </div>
              ) : jobSeeker && jobSeeker.data && jobSeeker.data.length > 0 ? (
                <>
                  {Array.from(
                    {
                      length: Math.ceil(jobSeeker.data.length / CARDS_PER_SLIDE)
                    },
                    (_, slideIndex) => (
                      <div key={slideIndex} className='w-full flex-none'>
                        <div className='grid grid-cols-1 gap-6 px-2 sm:grid-cols-2 lg:grid-cols-3'>
                          {jobSeeker.data
                            .slice(
                              slideIndex * CARDS_PER_SLIDE,
                              (slideIndex + 1) * CARDS_PER_SLIDE
                            )
                            .filter((jobSeeker) => jobSeeker.seeking === true)
                            .map((jobSeeker) => (
                              <JobSeekerSuggestedCard
                                key={jobSeeker.id}
                                jobSeeker={jobSeeker}
                              />
                            ))}
                        </div>
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className='mt-8 flex w-full items-center justify-center'>
                  Không có ứng viên nào phù hợp
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          {jobSeeker && jobSeeker.data && jobSeeker.data.length > 0 && (
            <>
              <Button
                variant='outline'
                size='icon'
                className='bg-background/80 border-border/50 absolute top-1/2 left-0 h-12 w-12 -translate-x-4 -translate-y-1/2 rounded-full shadow-lg backdrop-blur-sm'
                onClick={scrollPrev}
                disabled={prevBtnDisabled}
              >
                <ChevronLeft className='h-5 w-5' />
              </Button>

              <Button
                variant='outline'
                size='icon'
                className='bg-background/80 border-border/50 absolute top-1/2 right-0 h-12 w-12 translate-x-4 -translate-y-1/2 rounded-full shadow-lg backdrop-blur-sm'
                onClick={scrollNext}
                disabled={nextBtnDisabled}
              >
                <ChevronRight className='h-5 w-5' />
              </Button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {jobSeeker && jobSeeker.data && jobSeeker.data.length > 0 && (
          <div className='mt-8 flex justify-center gap-2'>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-200 ${
                  index === selectedIndex
                    ? 'bg-primary scale-110'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
