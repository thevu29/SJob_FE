'use client';

import { useState } from 'react';
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Bookmark,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import FilterSidebar from '@/features/recruiter/pages/jobseeker-search/components/filter-sidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function JobSeekerSearch() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className='bg-card mx-auto max-w-7xl rounded-md shadow-sm'>
      <div className='px-4 py-6 md:px-6 md:py-8'>
        <div className='mb-6 flex flex-col gap-4 md:flex-row'>
          <div className='relative flex-1'>
            <Search className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              placeholder='Tìm kiếm'
              className='w-full py-6 pr-4 pl-10 text-base'
            />
          </div>
          <div className='flex items-center gap-2'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='outline'>
                  <Filter className='mr-2 h-4 w-4' />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent
                side='right'
                className='w-full overflow-y-auto sm:max-w-xl'
              >
                <FilterSidebar />
              </SheetContent>
            </Sheet>
            <Button variant='default'>Tìm kiếm</Button>
          </div>
        </div>

        <div className='mb-6 flex items-center justify-between'>
          <div className='text-muted-foreground text-sm'>
            1536842 kết quả tìm kiếm
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setViewMode('list')}
              className={cn(viewMode === 'list' ? 'bg-muted' : '')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4'
              >
                <line x1='3' x2='21' y1='6' y2='6' />
                <line x1='3' x2='21' y1='12' y2='12' />
                <line x1='3' x2='21' y1='18' y2='18' />
              </svg>
              <span className='sr-only'>List view</span>
            </Button>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setViewMode('grid')}
              className={cn(viewMode === 'grid' ? 'bg-muted' : '')}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4'
              >
                <rect width='7' height='7' x='3' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='3' rx='1' />
                <rect width='7' height='7' x='14' y='14' rx='1' />
                <rect width='7' height='7' x='3' y='14' rx='1' />
              </svg>
              <span className='sr-only'>Grid view</span>
            </Button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4'>
          {candidates.map((candidate) => (
            <CandidateCard key={candidate.id} candidate={candidate} />
          ))}
        </div>

        <div className='mt-8 flex items-center justify-center'>
          <div className='flex items-center gap-1'>
            <Button variant='outline' size='icon' disabled>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4'
              >
                <path d='m15 18-6-6 6-6' />
              </svg>
              <span className='sr-only'>Previous</span>
            </Button>
            <Button
              variant='outline'
              className='bg-primary text-primary-foreground'
            >
              1
            </Button>
            <Button variant='outline'>2</Button>
            <Button variant='outline'>3</Button>
            <Button variant='outline'>4</Button>
            <Button variant='outline'>5</Button>
            <span className='px-2'>...</span>
            <Button variant='outline'>76843</Button>
            <Button variant='outline' size='icon'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='h-4 w-4'
              >
                <path d='m9 18 6-6-6-6' />
              </svg>
              <span className='sr-only'>Next</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  lastUpdated: string;
  experience: string;
  salary: string;
  location: string;
  isActive: boolean;
}

interface CandidateCardProps {
  candidate: Candidate;
}

function CandidateCard({ candidate }: CandidateCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col gap-4 p-4 md:flex-row md:items-center',
        candidate.isActive ? 'bg-background' : ''
      )}
    >
      <div className='absolute top-4 right-4'>
        <Button variant='ghost' size='icon'>
          <Bookmark className='h-4 w-4' />
          <span className='sr-only'>Bookmark</span>
        </Button>
      </div>

      <div className='flex-shrink-0'>
        <Avatar className='h-16 w-16 rounded-full'>
          <AvatarFallback className='text-lg'>
            {candidate.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className='min-w-0 flex-1'>
        <div className='flex flex-col gap-1 md:flex-row md:items-center md:gap-2'>
          <h3 className='text-primary-foreground text-lg font-semibold'>
            {candidate.name}
          </h3>
          {candidate.isActive && (
            <Badge
              variant='outline'
              className='bg-primary text-foreground w-fit border-blue-200'
            >
              Active Seeking
            </Badge>
          )}
        </div>

        <p className='text-foreground mt-1'>{candidate.position}</p>
        <p className='text-muted-foreground mt-1 text-sm'>
          Lần cập nhật gần nhất: {candidate.lastUpdated}
        </p>

        <div className='mt-3 flex flex-col gap-2 sm:flex-row sm:gap-4'>
          <div className='flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <Briefcase className='text-muted-foreground h-4 w-4' />
              <span>{candidate.experience}</span>
            </div>

            <div className='flex items-center gap-1'>
              <DollarSign className='text-muted-foreground h-4 w-4' />
              <span>${candidate.salary}</span>
            </div>

            <div className='flex items-center gap-1'>
              <MapPin className='text-muted-foreground h-4 w-4' />
              <span>{candidate.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-4 md:mt-0 md:ml-4'>
        <Button
          variant='outline'
          className='bg-primary text-foreground hover:bg-primary/80 w-full cursor-pointer md:w-auto'
        >
          Hồ sơ chi tiết
        </Button>
      </div>
    </Card>
  );
}

const candidates: Candidate[] = [
  {
    id: '1',
    name: 'Nhã Nguyễn',
    position: 'Kỹ Sư Kinh Tế Xây Dựng',
    lastUpdated: '05/05/2025',
    experience: '2 năm',
    salary: '800',
    location: 'Đà Nẵng, Hồ Chí Minh',
    isActive: true
  },
  {
    id: '2',
    name: 'Hồng Yến Nguyễn Lâm',
    position: 'Kiến Trúc Sư',
    lastUpdated: '05/05/2025',
    experience: '3 năm',
    salary: '800',
    location: 'Hồ Chí Minh',
    isActive: true
  },
  {
    id: '3',
    name: 'Ngọc Kim Anh Võ',
    position: 'Brand Manager',
    lastUpdated: '05/05/2025',
    experience: '7 năm',
    salary: '2500',
    location: 'Hồ Chí Minh',
    isActive: true
  },
  {
    id: '4',
    name: 'Đăng Cường',
    position: 'Chuyên Viên',
    lastUpdated: '05/05/2025',
    experience: '7 năm',
    salary: '2000',
    location: 'Hồ Chí Minh',
    isActive: false
  },
  {
    id: '5',
    name: 'Tịnh Quốc',
    position: 'Trưởng Nhóm Kiểm Soát Tồn Kho',
    lastUpdated: '05/05/2025',
    experience: '10 năm',
    salary: '698',
    location: 'Hồ Chí Minh',
    isActive: false
  },
  {
    id: '6',
    name: 'Thái Tương',
    position: 'Giám Đốc',
    lastUpdated: '05/05/2025',
    experience: '3 năm',
    salary: '1200',
    location: 'Hồ Chí Minh, Long An',
    isActive: true
  },
  {
    id: '7',
    name: 'Tuấn Nam Trần',
    position: 'Chuyên Viên',
    lastUpdated: '05/05/2025',
    experience: '8 năm',
    salary: '1000',
    location: 'Bắc Giang, Hà Nội, Hưng Yên',
    isActive: true
  },
  {
    id: '8',
    name: 'Thịnh Trần Đặng',
    position: 'Trưởng Phòng Nghiên Cứu Phát Triển- Kỹ Sư Dự Án',
    lastUpdated: '05/05/2025',
    experience: '10 năm',
    salary: '1000',
    location: 'Hà Nội',
    isActive: true
  }
];
