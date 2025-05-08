'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code2, Pen, Star } from 'lucide-react';
import type { JSX } from 'react';
import { Skill } from '@/interfaces/skill';

type SkillsCardProps = {
  skills: Skill[];
  initialVisibleCount?: number;
};

export default function SkillsCard({
  skills = [],
  initialVisibleCount = 4
}: SkillsCardProps) {
  const [showAll, setShowAll] = useState(false);

  // Show only the first N skills when collapsed
  const skillsArray = Array.isArray(skills) ? skills : [];
  const visibleSkills = showAll
    ? skillsArray
    : skillsArray.slice(0, initialVisibleCount);
  // const visibleSkills = showAll ? skills : skills.slice(0, initialVisibleCount);

  // Toggle function
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <Card className='lg:col-span-2'>
      <CardHeader>
        <CardTitle className='text-xl'>Kỹ năng</CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          {visibleSkills.map((skill, index) => (
            <div key={skill.id}>
              {/* Skill item */}
              <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-4'>
                <div className='bg-muted w-fit rounded-full p-3'>
                  <Code2 />
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium'>{skill.name}</h3>
                  {/* <div className='mt-1 flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 5
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div> */}
                </div>
              </div>
              {/* Add separator if not the last item */}
              {index < visibleSkills.length - 1 && (
                <Separator className='my-4' />
              )}
            </div>
          ))}
        </div>

        {skills.length > initialVisibleCount && (
          <div className='flex justify-center'>
            <Button
              variant='outline'
              size='sm'
              className='bg-primary text-primary-foreground hover:bg-primary/80 cursor-pointer'
              onClick={toggleShowAll}
            >
              {showAll ? 'Thu gọn' : 'Hiển thị tất cả'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
