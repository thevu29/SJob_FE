import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SimilarJob {
  id: string;
  title: string;
  company: string;
  logo: string;
  salary: string;
  location: string;
}

export default function SimilarJobs() {
  const similarJobs: SimilarJob[] = [
    {
      id: '1',
      title: 'Nhân Viên Kinh Doanh',
      company: 'Công Ty TNHH Rich Media',
      logo: '/placeholder.svg?height=48&width=48',
      salary: '10tr-30tr đ/tháng',
      location: 'Hà Nội'
    },
    {
      id: '2',
      title: 'Chuyên Viên Kinh Doanh',
      company: 'Stavian Group',
      logo: '/placeholder.svg?height=48&width=48',
      salary: '$ 500-2,000 /tháng',
      location: 'Hà Nội, Hưng Yên'
    },
    {
      id: '3',
      title: 'Nhân Viên Kinh Doanh',
      company: 'Công Ty Cổ Phần Vật Tư Chăn Nuôi',
      logo: '/placeholder.svg?height=48&width=48',
      salary: 'Tới 40,000 đ/tháng',
      location: 'Hà Nội'
    },
    {
      id: '4',
      title: 'Chuyên Viên Kinh Doanh',
      company: 'Công Ty Cổ Phần Xuất Nhập Khẩu',
      logo: '/placeholder.svg?height=48&width=48',
      salary: 'Thương lượng',
      location: 'Hà Nội'
    }
  ];

  return (
    <Card>
      <CardHeader className='pb-3'>
        <CardTitle className='text-lg'>Việc làm tương tự</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {similarJobs.map((job) => (
          <Link
            key={job.id}
            href='#'
            className='hover:bg-muted flex gap-3 rounded-md p-3 transition-colors'
          >
            <div className='shrink-0'>
              <Image
                src={job.logo || '/placeholder.svg'}
                alt={job.company}
                width={48}
                height={48}
                className='bg-muted rounded-md object-contain'
              />
            </div>
            <div className='min-w-0 flex-1'>
              <h3 className='line-clamp-1 text-sm font-medium'>{job.title}</h3>
              <p className='text-muted-foreground line-clamp-1 text-xs'>
                {job.company}
              </p>
              <p className='text-primary mt-1 text-xs font-medium'>
                {job.salary}
              </p>
              <p className='text-muted-foreground text-xs'>{job.location}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
