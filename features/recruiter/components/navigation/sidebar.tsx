'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { User, Building2, ChevronDown, ChevronUp } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const [accountExpanded, setAccountExpanded] = useState(false);
  const [companyExpanded, setCompanyExpanded] = useState(false);

  // Xác định active item và sub-item dựa trên pathname
  const isAccountActive = pathname === '/recruiter-dashboard/my-account';
  const isCompanyActive = pathname.includes(
    '/recruiter-dashboard/company-general'
  );

  const toggleAccount = () => {
    setAccountExpanded(!accountExpanded);
  };

  const toggleCompany = () => {
    setCompanyExpanded(!companyExpanded);
  };

  return (
    <div className='flex w-full flex-col gap-4 md:w-[340px]'>
      <div className='bg-card rounded-md shadow-sm'>
        <div
          className='flex cursor-pointer items-center gap-2 border-b p-4'
          onClick={toggleAccount}
        >
          <User className='text-muted-foreground h-5 w-5' />
          <h3 className='font-medium'>Quản lý tài khoản</h3>
          <div className='ml-auto'>
            {accountExpanded ? (
              <ChevronUp className='text-muted-foreground h-4 w-4' />
            ) : (
              <ChevronDown className='text-muted-foreground h-4 w-4' />
            )}
          </div>
        </div>
        {accountExpanded && (
          <div>
            <Link
              href='/recruiter-dashboard/my-account'
              className={`block p-4 ${isAccountActive ? 'bg-accent text-accent-foreground' : ''}`}
            >
              Quản lý tài khoản
            </Link>
          </div>
        )}
      </div>

      <div className='bg-card rounded-md shadow-sm'>
        <div
          className='flex cursor-pointer items-center gap-2 border-b p-4'
          onClick={toggleCompany}
        >
          <Building2 className='text-muted-foreground h-5 w-5' />
          <h3 className='font-medium'>Thông tin công ty</h3>
          <div className='ml-auto'>
            {companyExpanded ? (
              <ChevronUp className='text-muted-foreground h-4 w-4' />
            ) : (
              <ChevronDown className='text-muted-foreground h-4 w-4' />
            )}
          </div>
        </div>
        {companyExpanded && (
          <div className='flex flex-col'>
            <Link
              href='/recruiter-dashboard/company-general'
              className={`p-4 ${isCompanyActive ? 'bg-accent text-accent-foreground' : ''}`}
            >
              Thông tin chung
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
