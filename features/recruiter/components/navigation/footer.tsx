import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Youtube,
  Linkedin,
  Music,
  AirplayIcon as Spotify,
  Phone,
  Mail
} from 'lucide-react';
import AppStore from '@/public/app-store.png';
import GooglePlay from '@/public/google-play.png';

export function Footer() {
  return (
    <footer className='bg-[#001c40] text-white'>
      <div className='mx-auto max-w-7xl px-4 py-12'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Giới Thiệu</h3>
            <ul className='space-y-3'>
              <li className='flex items-center'>
                <Phone className='mr-2 h-4 w-4' />
                <span>Hồ Chí Minh: (84 28) 3925 8456</span>
              </li>
              <li className='flex items-center'>
                <Phone className='mr-2 h-4 w-4' />
                <span>Hà Nội: (84 24) 3944 0568</span>
              </li>
              <li className='flex items-center'>
                <Mail className='mr-2 h-4 w-4' />
                <span>Jobsupport@vietnamworks.com</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Công ty</h3>
            <ul className='space-y-2'>
              <li>
                <Link href='#' className='hover:underline'>
                  Giới Thiệu
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Bảo Mật Thông Tin
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Quy Định Sử Dụng
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  HR Insider
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:underline'>
                  Hỏi Đáp
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Ứng dụng di động</h3>
            <div className='space-y-3'>
              <Link href='#' className='block'>
                <Image
                  src={AppStore}
                  alt='App Store'
                  width={120}
                  height={40}
                  className='rounded'
                />
              </Link>
              <Link href='#' className='block'>
                <Image
                  src={GooglePlay}
                  alt='Google Play'
                  width={120}
                  height={40}
                  className='rounded'
                />
              </Link>
            </div>
          </div>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>
              Kết Nối Với VietnamWorks
            </h3>
            <div className='flex flex-wrap gap-2'>
              <Link
                href='#'
                className='rounded-full bg-blue-600 p-2 hover:bg-blue-700'
              >
                <Facebook className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-red-600 p-2 hover:bg-red-700'
              >
                <Youtube className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-blue-500 p-2 hover:bg-blue-600'
              >
                <Linkedin className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-black p-2 hover:bg-gray-800'
              >
                <Music className='h-5 w-5' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-green-600 p-2 hover:bg-green-700'
              >
                <Spotify className='h-5 w-5' />
              </Link>
            </div>
          </div>
        </div>
        <div className='mt-8 text-center text-sm'>
          <p>Bản Quyền © Công Ty Cổ Phần Navigos Group Việt Nam</p>
          <p className='mt-1'>
            Tầng 20, tòa nhà E.Town Central, 11 Đoàn Văn Bơ, Phường 13, Quận 4,
            TP.HCM, Việt Nam
          </p>
        </div>
      </div>
    </footer>
  );
}
