'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'nextjs-toploader/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

import Banner4 from '@/public/banner4.jpg';
import Banner5 from '@/public/banner5.jpg';
import Banner6 from '@/public/banner6.jpg';
import Banner7 from '@/public/banner7.jpg';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

const slides = [
  {
    id: 1,
    image: Banner4,
    alt: 'WA Projects Team'
  },
  {
    id: 2,
    image: Banner5,
    alt: 'VietnamWorks AI Banner'
  },
  {
    id: 3,
    image: Banner6,
    alt: 'WA Projects Team'
  },
  {
    id: 4,
    image: Banner7,
    alt: 'VietnamWorks AI Banner'
  }
];

export default function HeroBanner() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    replace(`${pathname}job?${params.toString()}`);
  };

  return (
    <div className='container mx-auto w-full p-4'>
      <div className='bg-card text-card-foreground relative mx-auto flex w-full flex-col gap-6 rounded-xl border p-6 shadow-sm md:p-12'>
        <div className='relative flex flex-col gap-2 md:flex-row'>
          <div className='relative flex-grow'>
            <div className='relative flex flex-col gap-2 md:flex-row'>
              <div className='relative flex-grow'>
                <Search className='absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400' />

                <Input
                  type='text'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  placeholder='Nhập tên công việc hoặc nhà tuyển dụng'
                  className='w-full rounded-md bg-white py-6 pr-4 pl-10 text-black'
                />
              </div>
              <div className='flex items-center gap-2'>
                <Button onClick={handleSearch}>Tìm kiếm</Button>
              </div>
            </div>
          </div>
        </div>
        <div className='relative h-[300px] w-full overflow-hidden md:h-[400px]'>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out ${
                index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <Image
                src={slide.image || '/placeholder.svg'}
                alt={slide.alt}
                fill
                className='object-cover'
                priority
              />
            </div>
          ))}
          <button
            className='absolute top-1/2 left-4 z-20 -translate-y-1/2 transform rounded-full bg-white/30 p-2 hover:bg-white/50'
            onClick={goToPrevSlide}
          >
            <ChevronLeft className='h-6 w-6 text-white' />
          </button>

          <button
            className='absolute top-1/2 right-4 z-20 -translate-y-1/2 transform rounded-full bg-white/30 p-2 hover:bg-white/50'
            onClick={goToNextSlide}
          >
            <ChevronRight className='h-6 w-6 text-white' />
          </button>

          <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2'>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
