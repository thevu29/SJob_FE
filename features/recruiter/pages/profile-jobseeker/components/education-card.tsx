import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Education } from '@/interfaces/education';
import { Building2 } from 'lucide-react';

type EducationCardProps = {
  educations: Education[];
};

export default function EducationCard({ educations = [] }: EducationCardProps) {
  return (
    <Card className='lg:col-span-1'>
      <CardHeader>
        <CardTitle className='text-xl'>Học vấn</CardTitle>
      </CardHeader>
      {educations && educations.length > 0 ? (
        educations.map((education) => (
          <CardContent key={education?.id} className='space-y-4'>
            <div className='flex items-start gap-4'>
              <div className='bg-muted rounded-full p-3'>
                <Building2 className='h-5 w-5' />
              </div>
              <div>
                <h3 className='font-medium'>{education.school}</h3>
                <p className='text-muted-foreground text-sm'>
                  {education.degree}
                </p>
                <p className='text-muted-foreground text-sm'>{`${education.startDate} - ${education.endDate}`}</p>
              </div>
            </div>
          </CardContent>
        ))
      ) : (
        <div className='text-muted-foreground py-8 text-center'>
          <p>Chưa có học vấn nào được thêm vào</p>
        </div>
      )}
    </Card>
  );
}
