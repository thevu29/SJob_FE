'use client';
import HeroBanner from '@/components/common/hero-banner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import JobListings from '@/features/user/pages/home/components/job-listing';
import { Search, MapPin } from 'lucide-react';
import React from 'react';
import { useGet, useGetPaginated } from '@/hooks/useQueries';
import { Job } from '@/interfaces/job';
import FieldListings from '@/features/user/pages/home/components/field-listing';
import { FieldDetailCount } from '@/interfaces/field';
import Image from 'next/image';
import Banner3 from '@/public/banner3.jpg';
import Hotline from '@/features/user/pages/home/components/hotline';

export default function HomePage() {
  // Fetch dữ liệu công việc từ API
  const { data: jobData } = useGet<Job[]>(`jobs/all`, [`jobs/all`]);
  const jobs = jobData?.data || [];
  const { data: fieldDetailCountData } = useGet<FieldDetailCount[]>(
    `field-details/counts`,
    [`field-details/counts`]
  );
  const fieldDetailCounts = fieldDetailCountData?.data || [];
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Job Listing  */}
      <JobListings title='Việc làm mới nhất' jobs={jobs} />

      {/* Field Listing  */}
      <FieldListings fieldDetailCounts={fieldDetailCounts} />

      {/* Job Listing  */}
      <JobListings title='Việc làm gợi ý' jobs={jobs} />

      {/* Hotline*/}
      <Hotline />

      {/* Content  */}
      {/* Content Section */}
      <div className='container mx-auto mt-12 mb-12 px-4 md:px-6'>
        <h2 className='mb-4 text-xl font-bold text-gray-800'>
          Cơ hội ứng tuyển việc làm với đãi ngộ hấp dẫn tại các công ty hàng đầu
        </h2>
        <p className='mb-4 text-gray-700'>
          Trước sự phát triển vượt bậc của nền kinh tế, rất nhiều ngành nghề trở
          nên khan hiếm nhân lực hoặc thiếu nhân lực giỏi. Vì vậy, hầu hết các
          trường Đại học đều liên kết với các công ty, doanh nghiệp, cơ quan để
          tạo cơ hội cho các bạn sinh viên được học tập, rèn luyện bản thân và
          làm quen với môi trường làm việc từ sớm.
        </p>

        <h3 className='mt-6 mb-2 text-lg font-bold text-gray-800'>
          Vậy tại sao nên tìm việc làm tại SJob?
        </h3>
        <h4 className='mt-4 mb-2 text-base font-bold text-gray-800'>
          Việc làm Chất lượng
        </h4>
        <ul className='list-disc space-y-2 pl-6 text-gray-700'>
          <li>
            Hàng ngàn tin tuyển dụng chất lượng cao được cập nhật thường xuyên
            để đáp ứng nhu cầu tìm việc của ứng viên.
          </li>
          <li>
            Hệ thống thông minh tự động gợi ý các công việc phù hợp theo CV của
            bạn.
          </li>
        </ul>
      </div>
    </div>
  );
}
