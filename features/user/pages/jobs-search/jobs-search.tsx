'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Search, MapPin, Check, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobCard } from '@/features/user/components/common/job-card';
import {
  FilterValues,
  AdvancedFilters
} from '@/features/user/pages/jobs-search/components/advanced-filters';
import { JobType, JobStatus } from '@/interfaces/job';
import SearchInput from '@/features/user/components/common/search-input';
import JobListing from '@/features/user/components/common/job-listing';
// import { JobCard } from "@/components/job-card"
// import { JobStatus, JobType } from "@/lib/job"
// import { AdvancedFilters, type FilterValues } from "@/components/filters/advanced-filters"

const searchFormSchema = z.object({
  keyword: z.string().optional(),
  location: z.string().optional(),
  searchType: z
    .enum(['Tên việc làm', 'Tên công ty', 'Cả hai'])
    .default('Tên việc làm')
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

export default function JobsSearch() {
  const [filters, setFilters] = useState<FilterValues>({
    experience: 'all',
    salary: 'all',
    field: '',
    jobType: 'all'
  });

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: 'nodejs',
      location: 'Hồ Chí Minh',
      searchType: 'Tên việc làm'
    }
  });

  const onSubmit = (data: SearchFormValues) => {
    console.log(data);
  };

  const resetFilters = () => {
    setFilters({
      experience: 'all',
      salary: 'all',
      field: '',
      jobType: 'all'
    });
  };

  const jobs = [
    {
      id: '1',
      recruiterId: 'trident',
      recruiterName: 'CÔNG TY TNHH TRIDENT DIGITAL TECH',
      recruiterImage: '/placeholder.svg?height=80&width=80',
      name: 'Senior Fullstack Developer (VueJS, NodeJS, English)',
      description: '',
      salary: 0,
      requirement: '4 năm',
      benefit: '',
      deadline: '',
      slots: 0,
      type: JobType.FULL_TIME,
      date: '1 tuần trước',
      education: '',
      experience: '4 năm',
      closeWhenFull: false,
      status: JobStatus.OPEN
    },
    {
      id: '2',
      recruiterId: 'fpt',
      recruiterName: 'FPT SOFTWARE',
      recruiterImage: '/placeholder.svg?height=80&width=80',
      name: 'Senior Team Lead Nodejs Engineer',
      description: '',
      salary: 0,
      requirement: 'Trên 5 năm',
      benefit: '',
      deadline: '',
      slots: 0,
      type: JobType.FULL_TIME,
      date: '1 tuần trước',
      education: '',
      experience: 'Trên 5 năm',
      closeWhenFull: false,
      status: JobStatus.OPEN
    },
    {
      id: '3',
      recruiterId: 'tvt',
      recruiterName: 'CÔNG TY CỔ PHẦN TVT GROUP',
      recruiterImage: '/placeholder.svg?height=80&width=80',
      name: 'JavaScript Developer (Reactjs, Nodejs)',
      description: '',
      salary: 0,
      requirement: '4 năm',
      benefit: '',
      deadline: '',
      slots: 0,
      type: JobType.FULL_TIME,
      date: '2 tuần trước',
      education: '',
      experience: '4 năm',
      closeWhenFull: false,
      status: JobStatus.OPEN
    },
    {
      id: '4',
      recruiterId: 'haravan',
      recruiterName: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ HARAVAN',
      recruiterImage: '/placeholder.svg?height=80&width=80',
      name: 'NodeJS Engineer (React,Angular) - TP.HCM',
      description: '',
      salary: 0,
      requirement: '1 năm',
      benefit: '',
      deadline: '',
      slots: 0,
      type: JobType.FULL_TIME,
      date: '2 tuần trước',
      education: '',
      experience: '1 năm',
      closeWhenFull: false,
      status: JobStatus.OPEN
    },
    {
      id: '5',
      recruiterId: 'belleza',
      recruiterName: 'CÔNG TY TNHH BELLEZA VIỆT NAM',
      recruiterImage: '/placeholder.svg?height=80&width=80',
      name: 'Lập Trình Viên Nodejs',
      description: '',
      salary: 0,
      requirement: '3 năm',
      benefit: '',
      deadline: '',
      slots: 0,
      type: JobType.FULL_TIME,
      date: '2 tuần trước',
      education: '',
      experience: '3 năm',
      closeWhenFull: false,
      status: JobStatus.OPEN
    }
  ];

  return (
    <div className='container mx-auto px-4 py-4 md:px-6 lg:px-8'>
      <div className='bg-primary/5 mb-6 rounded-lg p-4'>
        <SearchInput />
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-4'>
        <div className='lg:col-span-1'>
          <div className='sticky top-4 space-y-6'>
            <AdvancedFilters
              filters={filters}
              onChange={setFilters}
              onReset={resetFilters}
            />
          </div>
        </div>

        <div className='space-y-4 lg:col-span-3'>
          {/* {jobs.map((job) => (
            <JobCard key={job.id} job={job} recruiter={} />
          ))} */}
          <JobListing />
        </div>
      </div>
    </div>
  );
}
