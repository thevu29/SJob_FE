'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChevronDown, ChevronUp, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { JobDescriptionSection } from '@/features/recruiter/pages/job-posting/components/job-description-section';

const formSchema = z.object({
  // Job Description Fields
  jobTitle: z.string().min(1, { message: 'Vui lòng nhập chức danh' }),
  positionLevel: z.string().optional(),
  workType: z.string().optional(),
  industry: z.string().optional(),
  jobNature: z.string().optional(),
  workLocation: z.string().optional(),
  jobDescription: z.string().optional(),
  jobRequirements: z.string().optional(),
  salaryMin: z.string().optional(),
  salaryMax: z.string().optional(),
  showSalary: z.boolean().default(false),

  // Recruitment Details
  positions: z.number().min(1).default(1),
  recruiterName: z.string().optional(),
  recruiterEmail: z.string().email().optional(),
  isAnonymous: z.boolean().default(false),
  campaign: z.string().optional(),

  // Candidate Expectations
  skills: z.array(z.string()).default([]),
  experienceYears: z.number().min(0).default(1),
  experienceLevel: z.string().optional(),
  nationality: z.enum(['local', 'foreign']).default('local'),
  gender: z.enum(['any', 'male', 'female']).default('any'),
  maritalStatus: z.enum(['any', 'single', 'married']).default('any'),
  ageMin: z.number().min(15).max(100).default(18),
  ageMax: z.number().min(15).max(100).default(60),
  showAge: z.boolean().default(false),
  requirementsMandatory: z.boolean().default(true),
  showRequirementsMandatory: z.boolean().default(false),
  languages: z.array(z.string()).default([])
});

export default function JobPostingForm() {
  const [openJobDescription, setOpenJobDescription] = useState(true);
  const [openCandidateExpectations, setOpenCandidateExpectations] =
    useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      positions: 1,
      experienceYears: 1,
      nationality: 'local',
      gender: 'any',
      maritalStatus: 'any',
      ageMin: 18,
      ageMax: 60,
      showSalary: false,
      isAnonymous: false,
      showAge: false,
      requirementsMandatory: true,
      showRequirementsMandatory: false
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const toggleJobDescription = () => {
    setOpenJobDescription(!openJobDescription);
  };

  const toggleCandidateExpectations = () => {
    setOpenCandidateExpectations(!openCandidateExpectations);
  };

  return (
    <div className='mx-auto max-w-4xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className='mb-8 shadow-sm'>
            <CardHeader className='flex flex-row items-center gap-2 pb-2'>
              <Pencil className='text-muted-foreground h-5 w-5' />
              <CardTitle className='text-2xl font-bold'>
                Đăng Tin Tuyển Dụng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground mb-6'>
                Tạo mô tả công việc và kỳ vọng để tìm kiếm ứng viên phù hợp.
              </p>

              <div className='space-y-4'>
                <div className='w-full'>
                  <Button
                    variant='ghost'
                    className='bg-muted/50 hover:bg-muted/70 h-auto w-full justify-between rounded-lg px-6 py-4'
                    onClick={toggleJobDescription}
                    type='button'
                  >
                    <span className='text-lg font-semibold'>
                      Mô tả công việc
                    </span>
                    {openJobDescription ? (
                      <ChevronUp className='h-5 w-5' />
                    ) : (
                      <ChevronDown className='h-5 w-5' />
                    )}
                  </Button>
                  {openJobDescription && (
                    <div className='mt-4 transition-all duration-300 ease-in-out'>
                      <Card>
                        <CardContent className='pt-6'>
                          <JobDescriptionSection form={form} />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>

                {/* <div className='w-full'>
                  <Button
                    variant='ghost'
                    className='bg-muted/50 hover:bg-muted/70 h-auto w-full justify-between rounded-lg px-6 py-4'
                    onClick={toggleCandidateExpectations}
                    type='button'
                  >
                    <span className='text-lg font-semibold'>
                      Kỳ vọng về ứng viên
                    </span>
                    {openCandidateExpectations ? (
                      <ChevronUp className='h-5 w-5' />
                    ) : (
                      <ChevronDown className='h-5 w-5' />
                    )}
                  </Button>
                  {openCandidateExpectations && (
                    <div className='mt-4 transition-all duration-300 ease-in-out'>
                      <Card>
                        <CardContent className='pt-6'>
                          <CandidateExpectationsSection form={form} />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div> */}
              </div>

              <div className='mt-8 flex justify-between gap-4'>
                <Button variant='outline' className='flex-1' type='button'>
                  Hủy
                </Button>
                <Button
                  className='bg-primary text-primary-foreground flex-1'
                  type='submit'
                >
                  Đăng tuyển dụng
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
