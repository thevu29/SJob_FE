import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar } from 'lucide-react';
import {
  EmployeeType,
  Experience,
  LocationType
} from '@/interfaces/experience';
import { formatDate, getValueOfKeyFromEnum } from '@/lib/utils';

type ExperienceCardProps = {
  experiences: Experience[];
};

export default function ExperienceCard({
  experiences = []
}: ExperienceCardProps) {
  // Function to format date
  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString('en-US', {
  //     month: 'short',
  //     year: 'numeric'
  //   });
  // };

  return (
    <Card className='lg:col-span-3'>
      <CardHeader>
        <CardTitle className='text-xl'>Kinh nghiệm</CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        {experiences.map((experience, index) => (
          <div key={experience.id}>
            <div className='flex flex-col gap-4 md:flex-row'>
              <div className='flex-shrink-0'>
                <div className='bg-muted w-fit rounded-full p-3'>
                  <Building2 className='h-5 w-5' />
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                  <h3 className='text-lg font-medium'>{experience.position}</h3>
                  <div className='flex flex-wrap gap-2'>
                    <Badge variant='default'>
                      {getValueOfKeyFromEnum(
                        EmployeeType,
                        experience.employeeType
                      )}
                    </Badge>
                    <Badge variant='default'>
                      {getValueOfKeyFromEnum(
                        LocationType,
                        experience.locationType
                      )}
                    </Badge>
                  </div>
                </div>

                <div className='text-muted-foreground mt-1 flex flex-col gap-2 md:flex-row md:items-center'>
                  <div className='flex items-center gap-1'>
                    <Building2 className='h-4 w-4' />
                    <span>{experience.company}</span>
                  </div>
                  <span className='hidden md:inline'>•</span>
                  <div className='flex items-center gap-1'>
                    <MapPin className='h-4 w-4' />
                    <span>{experience.location}</span>
                  </div>
                </div>

                <div className='text-muted-foreground mt-1 flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {experience.startDate} -{' '}
                    {experience.endDate ? experience.endDate : 'Present'}
                  </span>
                </div>

                <div className='mt-3'>
                  <p className='text-sm whitespace-pre-line'>
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
            {index < experiences.length - 1 && <Separator className='mt-8' />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
