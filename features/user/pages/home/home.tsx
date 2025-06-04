'use client';

import HeroBanner from '@/components/common/hero-banner';
import React from 'react';
import FieldListings from '@/features/user/pages/home/components/field-listing';
import Hotline from '@/features/user/pages/home/components/hotline';
import HomePageJobs from '@/features/user/pages/home/components/home-page-jobs';
import HomePageSuggestedJobs from '@/features/user/pages/home/components/home-page-suggested-jobs';
import RecruiterListings from '@/features/user/pages/home/components/recruiter-listing';

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Recruiters Listing  */}
      <RecruiterListings />

      {/* Home Page Jobs Listing  */}
      <HomePageJobs />

      {/* Field Listing  */}

      <FieldListings />

      {/* Home Page Suggested Jobs Listing  */}
      <HomePageSuggestedJobs />

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
