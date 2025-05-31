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
    <footer className='bg-secondary text-foreground'>
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
                <span>Jobsupport@sjob.com</span>
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
            <h3 className='mb-4 text-lg font-semibold'>Kết Nối Với SJob</h3>
            <div className='flex flex-wrap gap-2'>
              <Link
                href='#'
                className='rounded-full bg-[#1877F2] p-2 transition hover:brightness-110'
              >
                <Facebook className='h-5 w-5 text-white' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-[#FF0000] p-2 transition hover:brightness-110'
              >
                <Youtube className='h-5 w-5 text-white' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-[#0A66C2] p-2 transition hover:brightness-110'
              >
                <Linkedin className='h-5 w-5 text-white' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-[#010101] p-2 transition hover:brightness-110'
              >
                <Music className='h-5 w-5 text-white' />
              </Link>
              <Link
                href='#'
                className='rounded-full bg-[#1DB954] p-2 transition hover:brightness-110'
              >
                <Spotify className='h-5 w-5 text-white' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
