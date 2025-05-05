import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileSpreadsheet } from 'lucide-react';

export default function JobListingPage() {
  return (
    <div className='container mx-auto space-y-6 py-6'>
      <div className='rounded-lg bg-white p-6 shadow-sm'>
        <h1 className='text-2xl font-bold'>Công việc đăng tuyển</h1>
        <p className='text-muted-foreground mt-1'>
          Quản lý tất cả công việc đã đăng tuyển.
        </p>
      </div>

      <div className='rounded-lg bg-white shadow-sm'>
        <div className='px-4 py-6 md:px-6 md:py-8'>
          <Tabs defaultValue='expired' className='w-full'>
            <div className='overflow-x-auto pb-2'>
              <TabsList className='mb-4'>
                <TabsTrigger value='active'>Đang hiển thị (0)</TabsTrigger>
                <TabsTrigger value='registered'>Đăng ký (0)</TabsTrigger>
                <TabsTrigger value='expiring-soon'>
                  Sắp hết hạn trong 7 ngày (0)
                </TabsTrigger>
                <TabsTrigger value='expired' className=''>
                  Đã Hết hạn
                </TabsTrigger>
                <TabsTrigger value='draft'>Nháp (2)</TabsTrigger>
                <TabsTrigger value='jobs'>Việc làm đó (0)</TabsTrigger>
              </TabsList>
            </div>

            <div className='mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center'>
              <div className='w-full md:w-auto'>
                <div className='relative'>
                  <Input
                    type='search'
                    placeholder='Tìm theo tên việc làm'
                    className='w-full pl-10 md:w-[300px]'
                  />
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <svg
                      className='text-muted-foreground h-4 w-4'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 20 20'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <Button
                variant='outline'
                className='relative flex items-center gap-2'
              >
                <FileSpreadsheet className='h-4 w-4' />
                <span>Xuất ra Excel</span>
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold'>
                  5
                </span>
              </Button>
            </div>

            <TabsContent value='expired' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Không có việc làm đã hết hạn
              </div>
            </TabsContent>

            <TabsContent value='active' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Không có việc làm đang hiển thị
              </div>
            </TabsContent>

            <TabsContent value='registered' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Không có việc làm đăng ký
              </div>
            </TabsContent>

            <TabsContent value='expiring-soon' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Không có việc làm sắp hết hạn
              </div>
            </TabsContent>

            <TabsContent value='draft' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Có 2 việc làm nháp
              </div>
            </TabsContent>

            <TabsContent value='jobs' className='mt-0'>
              <div className='text-muted-foreground py-8 text-center'>
                Không có việc làm
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
