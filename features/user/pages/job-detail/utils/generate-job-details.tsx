import { FieldDetail } from '@/interfaces';
import { JobType, JobStatus, Job } from '@/interfaces/job';
import { formatExperience, formatSalary } from '@/lib/utils';
import {
  Calendar,
  Clock,
  Briefcase,
  GraduationCap,
  Building,
  Users,
  Banknote,
  CalendarDays,
  Timer,
  Globe,
  UserCircle,
  Heart,
  User,
  BadgeCheck
} from 'lucide-react';

// Map job type to icon and display text
export const getJobTypeInfo = (type: string) => {
  const formatedType = JobType[type as unknown as keyof typeof JobType];
  switch (formatedType) {
    case JobType.FULL_TIME:
      return { icon: <Timer className='h-4 w-4' />, text: JobType.FULL_TIME };
    case JobType.PART_TIME:
      return { icon: <Timer className='h-4 w-4' />, text: JobType.PART_TIME };
    case JobType.INTERNSHIP:
      return {
        icon: <GraduationCap className='h-4 w-4' />,
        text: JobType.INTERNSHIP
      };
    case JobType.FREELANCE:
      return { icon: <User className='h-4 w-4' />, text: JobType.FREELANCE };
    default:
      return { icon: <Briefcase className='h-4 w-4' />, text: formatedType };
  }
};

export const generateJobDetails = (job: Job, fieldDetails: FieldDetail[]) => {
  const jobTypeInfo = getJobTypeInfo(job.type);

  return [
    {
      label: 'NGÀY ĐĂNG',
      value: job.date,
      icon: <Calendar className='h-4 w-4' />
    },
    {
      label: 'NGÀNH NGHỀ',
      value: Array.isArray(fieldDetails)
        ? fieldDetails.map((item) => item.name).join(', ')
        : 'Không có dữ liệu',
      icon: <Building className='h-4 w-4' />
    },
    {
      label: 'MỨC LƯƠNG',
      value: formatSalary(job.salary),
      icon: <Banknote className='h-4 w-4' />
    },
    // {
    //   label: 'LĨNH VỰC',
    //   value: 'Phần Mềm CNTT/Dịch vụ Phần mềm',
    //   icon: <Briefcase className='h-4 w-4' />
    // },
    {
      label: 'SỐ LƯỢNG TUYỂN DỤNG',
      value: job.slots > 0 ? job.slots : 'Không hiển thị',
      icon: <Users className='h-4 w-4' />
    },
    {
      label: 'KINH NGHIỆM',
      value: formatExperience(job.experience),
      icon: <UserCircle className='h-4 w-4' />
    },
    // {
    //   label: 'QUỐC TỊCH',
    //   value: 'Không hiển thị',
    //   icon: <Globe className='h-4 w-4' />
    // },
    {
      label: 'TRÌNH ĐỘ HỌC VẤN',
      value: job.education || 'Không yêu cầu',
      icon: <GraduationCap className='h-4 w-4' />
    },
    // {
    //   label: 'GIỚI TÍNH',
    //   value: 'Không hiển thị',
    //   icon: <User className='h-4 w-4' />
    // },
    {
      label: 'THỜI HẠN',
      value: job.deadline,
      icon: <Clock className='h-4 w-4' />
    },
    // {
    //   label: 'TÌNH TRẠNG HÔN NHÂN',
    //   value: 'Không hiển thị',
    //   icon: <Heart className='h-4 w-4' />
    // },
    {
      label: 'LOẠI HÌNH LÀM VIỆC',
      value: jobTypeInfo.text,
      icon: jobTypeInfo.icon
    }
    // {
    //   label: 'NGÀY LÀM VIỆC',
    //   value: 'T2 - T6',
    //   icon: <CalendarDays className='h-4 w-4' />
    // },
    // {
    //   label: 'GIỜ LÀM VIỆC',
    //   value: '09:00 - 18:00',
    //   icon: <Clock className='h-4 w-4' />
    // }
  ];
};
