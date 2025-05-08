import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Award, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Certification } from '@/interfaces/certification';

type CertificationCardProps = {
  certifications: Certification[];
};

export default function CertificationCard({
  certifications = []
}: CertificationCardProps) {
  return (
    <Card className='lg:col-span-3'>
      <CardHeader>
        <CardTitle className='text-xl'>Chứng chỉ</CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        {certifications.map((certification, index) => (
          <div key={certification.id}>
            <div className='flex flex-col gap-4 md:flex-row'>
              <div className='flex-shrink-0'>
                <div className='bg-muted w-fit rounded-full p-3'>
                  <Award className='h-5 w-5' />
                </div>
              </div>
              <div className='flex-1'>
                <div className='flex flex-col justify-between gap-2 md:flex-row md:items-center'>
                  <h3 className='text-lg font-medium'>{certification.name}</h3>
                </div>

                <div className='text-muted-foreground mt-1 flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  <span>
                    {certification.issueDate}
                    {certification.expireDate &&
                      ` - ${certification.expireDate}`}
                  </span>
                </div>

                {certification.imageOrFile && (
                  <div className='mt-4 overflow-hidden rounded-lg border'>
                    <div className='relative mx-auto aspect-[16/9] w-full max-w-md'>
                      <Image
                        src={
                          certification.imageOrFile ||
                          '/placeholder.svg?height=200&width=350'
                        }
                        alt={certification.name}
                        fill
                        className='object-contain'
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {index < certifications.length - 1 && (
              <Separator className='mt-8' />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
