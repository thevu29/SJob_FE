import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CandidateCard() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg font-medium'>
          Ứng viên vừa cập nhật
        </CardTitle>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-gray-500'>1/5</span>
          <div className='flex'>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <ChevronLeft className='h-4 w-4' />
              <span className='sr-only'>Previous</span>
            </Button>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <ChevronRight className='h-4 w-4' />
              <span className='sr-only'>Next</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <Avatar className='h-16 w-16'>
            <AvatarFallback className='bg-blue-100 text-blue-800'>
              WS
            </AvatarFallback>
          </Avatar>
          <div className='space-y-1'>
            <div>
              <span className='font-medium'>Tên: </span>
              <span>william sabino</span>
            </div>
            <div>
              <span className='font-medium'>Tiêu đề: </span>
              <span>Lawyer, Law Professor, Teacher</span>
            </div>
            <div>
              <span className='font-medium'>Kinh nghiệm: </span>
              <span>40 năm</span>
            </div>
            <div>
              <span className='font-medium'>Vị trí: </span>
              <span>Đà Nẵng, Hồ Chí Minh, Quốc tế</span>
            </div>
            <div>
              <span className='font-medium'>Lương: </span>
              <span>$2000</span>
            </div>
          </div>
        </div>
        <div className='mt-4 flex items-center justify-end text-sm text-gray-500'>
          <Clock className='mr-1 h-4 w-4' />
          <span>Cập nhật 2 phút trước</span>
        </div>
      </CardContent>
    </Card>
  );
}
