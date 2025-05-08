'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Resume } from '@/interfaces/resume';
import { formatDate } from '@/lib/utils';

type ResumeCardProps = {
  resumes: Resume[];
};

export default function ResumeCard({ resumes = [] }: ResumeCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Filter to only show main resumes
  const mainResumes = resumes.filter((resume) => resume.main);

  if (mainResumes.length === 0) {
    return null;
  }

  return (
    <Card className='lg:col-span-3'>
      <CardHeader>
        <CardTitle className='text-xl'>Hồ sơ đính kèm</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {mainResumes.map((resume) => (
          <div key={resume.id} className='space-y-4'>
            <div className='flex items-start gap-4'>
              <div className='bg-muted rounded-full p-3'>
                <FileText className='h-5 w-5' />
              </div>
              <div className='flex-1'>
                <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                  <h3 className='text-lg font-medium'>{resume.name}</h3>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => window.open(resume.url, '_blank')}
                      className='flex items-center gap-1'
                    >
                      <ExternalLink className='h-3.5 w-3.5' />
                      <span className='hidden sm:inline'>Open</span>
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => setIsExpanded(!isExpanded)}
                      className='flex items-center gap-1'
                    >
                      {isExpanded ? (
                        <>
                          <EyeOff className='h-3.5 w-3.5' />
                          <span className='hidden sm:inline'>Hide</span>
                        </>
                      ) : (
                        <>
                          <Eye className='h-3.5 w-3.5' />
                          <span className='hidden sm:inline'>View</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <p className='text-muted-foreground text-sm'>
                  {formatDate(new Date(resume.uploadedAt))}
                </p>
              </div>
            </div>

            {isExpanded && (
              <div className='overflow-hidden rounded-lg border'>
                <Tabs defaultValue='preview' className='w-full'>
                  <div className='border-b px-4'>
                    <TabsList className='h-10'>
                      <TabsTrigger value='preview'>Preview</TabsTrigger>
                      <TabsTrigger value='fullscreen'>Fullscreen</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value='preview' className='mt-0'>
                    <div className='h-[600px] w-full'>
                      <iframe
                        src={`${resume.url}#toolbar=0&navpanes=0`}
                        className='h-full w-full'
                        title={resume.name}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value='fullscreen' className='mt-0'>
                    <div className='h-[80vh] w-full'>
                      <iframe
                        src={resume.url}
                        className='h-full w-full'
                        title={resume.name}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
