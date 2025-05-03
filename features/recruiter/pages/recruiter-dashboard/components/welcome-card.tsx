import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function WelcomeCard() {
  return (
    <Card className='overflow-hidden bg-blue-50'>
      <CardContent className='p-6'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div className='space-y-4'>
            <div>
              <h2 className='text-xl font-medium text-gray-700'>Xin chào,</h2>
              <h1 className='text-2xl font-bold text-[#ff7452]'>Vuong Hoang</h1>
            </div>
            <p className='text-gray-600'>
              Hãy bắt đầu hành trình tuyển dụng của bạn ngay hôm nay. Chúc bạn
              có một trải nghiệm tuyển dụng hiệu quả và dễ dàng!
            </p>
          </div>
          {/* <div className='mt-6 flex justify-center md:mt-0 md:justify-end'>
            <div className='relative h-40 w-40'>
              <Image
                src='/placeholder.svg?height=160&width=160'
                alt='Illustration'
                width={160}
                height={160}
                className='object-contain'
              />
            </div>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
