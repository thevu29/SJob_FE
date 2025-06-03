import Image from 'next/image';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HotLineImg from '@/public/hotline1.png';

export default function Hotline() {
  return (
    <div className='w-full py-12'>
      <div className='container mx-auto px-4'>
        <div className='bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm'>
          <div className='p-6 md:p-8'>
            <h2 className='text-color-5 mb-4 font-medium'>
              Dành cho người tìm việc
            </h2>

            <div className='flex flex-col gap-6 md:flex-row'>
              <div className='flex-1'>
                <h3 className='mb-4 text-xl font-bold md:text-2xl'>
                  Tìm việc khó <span className='text-color-5'>đã có SJob</span>
                </h3>

                <div className='mb-6 flex flex-col items-center gap-4 sm:flex-row'>
                  <div className='bg-color-5 flex items-center gap-2 rounded-full py-3'>
                    <Phone className='h-5 w-5' />
                    <span className='font-bold'>(024) 6680 5588</span>
                  </div>

                  <Button className='border-color-5 text-color-5 hover:bg-color-5/20 rounded-full border bg-white'>
                    GỌI NGAY
                  </Button>
                </div>

                <div className='mb-4 flex items-center gap-2'>
                  <span className='text-gray-600'>Email hỗ trợ Ứng viên:</span>
                  <a
                    href='mailto:hotro@topcv.vn'
                    className='text-color-5 hover:underline'
                  >
                    hotro@sjob.vn
                  </a>
                </div>
              </div>

              <div className='flex-1'>
                <Image
                  src={HotLineImg}
                  alt='Support'
                  width={400}
                  height={200}
                  className='h-auto w-full'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
