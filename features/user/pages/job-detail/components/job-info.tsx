import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateJobDetails } from '@/features/user/pages/job-detail/utils/generate-job-details';
import { Recruiter } from '@/interfaces';
import { Job } from '@/interfaces/job';
import { formatSalary, getExpirationMessage } from '@/lib/utils';
import { Clock, MapPin } from 'lucide-react';

interface JobInfoProps {
  job: Job;
  recruiter: Recruiter;
}

export default function JobInfo({ job, recruiter }: JobInfoProps) {
  // const details = [
  //   {
  //     label: "NGÀY ĐĂNG",
  //     value: job.date,
  //     icon: <Calendar className="h-4 w-4" />,
  //   },
  //   {
  //     label: "TRẠNG THÁI",
  //     value: <span className={statusInfo.color}>{statusInfo.text}</span>,
  //     icon: <BadgeCheck className="h-4 w-4" />,
  //   },
  //   {
  //     label: "NGÀNH NGHỀ",
  //     value: "Kinh Doanh > Bán Hàng/Phát Triển Kinh Doanh",
  //     icon: <Building className="h-4 w-4" />,
  //   },
  //   {
  //     label: "MỨC LƯƠNG",
  //     value: formatSalary(job.salary),
  //     icon: <Banknote className="h-4 w-4" />,
  //   },
  //   {
  //     label: "LĨNH VỰC",
  //     value: "Phần Mềm CNTT/Dịch vụ Phần mềm",
  //     icon: <Briefcase className="h-4 w-4" />,
  //   },
  //   {
  //     label: "SỐ LƯỢNG TUYỂN DỤNG",
  //     value: job.slots > 0 ? job.slots : "Không hiển thị",
  //     icon: <Users className="h-4 w-4" />,
  //   },
  //   {
  //     label: "KINH NGHIỆM",
  //     value: job.experience || "Không yêu cầu",
  //     icon: <UserCircle className="h-4 w-4" />,
  //   },
  //   {
  //     label: "QUỐC TỊCH",
  //     value: "Không hiển thị",
  //     icon: <Globe className="h-4 w-4" />,
  //   },
  //   {
  //     label: "TRÌNH ĐỘ HỌC VẤN",
  //     value: job.education || "Không yêu cầu",
  //     icon: <GraduationCap className="h-4 w-4" />,
  //   },
  //   {
  //     label: "GIỚI TÍNH",
  //     value: "Không hiển thị",
  //     icon: <User className="h-4 w-4" />,
  //   },
  //   {
  //     label: "THỜI HẠN",
  //     value: job.deadline,
  //     icon: <Clock className="h-4 w-4" />,
  //   },
  //   {
  //     label: "TÌNH TRẠNG HÔN NHÂN",
  //     value: "Không hiển thị",
  //     icon: <Heart className="h-4 w-4" />,
  //   },
  //   {
  //     label: "LOẠI HÌNH LÀM VIỆC",
  //     value: jobTypeInfo.text,
  //     icon: jobTypeInfo.icon,
  //   },
  //   {
  //     label: "NGÀY LÀM VIỆC",
  //     value: "T2 - T6",
  //     icon: <CalendarDays className="h-4 w-4" />,
  //   },
  //   {
  //     label: "GIỜ LÀM VIỆC",
  //     value: "09:00 - 18:00",
  //     icon: <Clock className="h-4 w-4" />,
  //   },
  // ]
  const details = generateJobDetails(job);

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Mô tả công việc</CardTitle>
      </CardHeader> */}
      <CardContent className='space-y-4'>
        <div className='space-y-4'>
          <h1 className='text-2xl font-bold md:text-3xl'>{job.name}</h1>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='text-color-5 flex items-center text-lg font-semibold'>
              {formatSalary(job.salary)}
            </div>
            {/* <div className='flex items-center gap-1 text-sm'>
              <span className='bg-primary/10 text-primary-foreground inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium'>
                Urgent
              </span>
            </div> */}
          </div>

          <div className='flex flex-wrap gap-4'>
            <div className='text-muted-foreground flex items-center gap-1 text-sm'>
              <Clock className='h-4 w-4' />
              <span>{getExpirationMessage(job.deadline)}</span>
            </div>
            {/* <div className='text-muted-foreground flex items-center gap-1 text-sm'>
              <MapPin className='h-4 w-4' />
              <span>Hà Nội</span>
            </div> */}
          </div>

          <div className='mt-4 flex w-full gap-2 sm:w-auto'>
            <Button className='flex-1 bg-[#ff7a59] text-white hover:bg-[#ff7a59]/90 sm:flex-none'>
              Nộp đơn
            </Button>
            <Button
              variant='outline'
              className='flex-1 sm:flex-none'
              // onClick={toggleSave}
            >
              {/* {isSaved ? 'Đã lưu' : 'Lưu công việc này'} */}
              Lưu công việc này
            </Button>
          </div>
        </div>

        <h3 className='pt-4 text-lg font-semibold'>Mô tả công việc</h3>
        <div>{job.description}</div>

        <h3 className='pt-4 text-lg font-semibold'>Yêu cầu công việc</h3>
        <div>{job.requirement}</div>

        <h3 className='pt-4 text-lg font-semibold'>
          Các phúc lợi dành cho bạn
        </h3>
        <div>{job.benefit}</div>

        <h3 className='pt-4 text-lg font-semibold'>Thông tin việc làm</h3>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {details.map((detail, index) => (
            <div key={index} className='flex items-start gap-3'>
              <div className='bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full'>
                <span>{detail.icon}</span>
              </div>
              <div>
                <p className='text-muted-foreground text-xs'>{detail.label}</p>
                <p className='font-medium'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className='pt-4 text-lg font-semibold'>Địa điểm làm việc</h3>
        <div className='flex items-start gap-3'>
          <MapPin className='text-muted-foreground mt-0.5 h-5 w-5' />
          <p>{recruiter.address}</p>
        </div>
      </CardContent>
    </Card>
  );
}
