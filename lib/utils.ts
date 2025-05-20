import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}

export function formatDate(date: Date): string {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

export function formatGender(
  gender: boolean | null | undefined | string
): string {
  if (gender === true) return 'Nam';
  if (gender === false) return 'Nữ';
  return 'Khác';
}

export const shortenName = (name?: string, maxInitials: number = 2): string => {
  if (!name) return '';

  const nameParts = name.split(' ').filter((part) => part.trim() !== '');

  if (nameParts.length === 0) return '';

  return nameParts
    .slice(0, maxInitials)
    .map((part) => part[0].toUpperCase())
    .join('');
};

export const getValueOfKeyFromEnum = <T extends Record<string, string>>(
  enums: T,
  key: string
): string => {
  return enums[key as keyof T] || key;
};

export const formatSalary = (salary: number) => {
  const salaryInTrillions = salary / 1000000;
  return `${salaryInTrillions}tr ₫/tháng`;
};

export const getExpirationMessage = (expirationDateStr: string) => {
  const expirationDate = new Date(expirationDateStr);
  const currentDate = new Date();

  expirationDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysRemaining = Math.ceil(
    (expirationDate.getTime() - currentDate.getTime()) / millisecondsPerDay
  );

  if (daysRemaining > 0) {
    return `Hết hạn trong ${daysRemaining} ngày`;
  } else if (daysRemaining === 0) {
    return 'Hết hạn hôm nay';
  } else {
    return `Hết hạn ${Math.abs(daysRemaining)} ngày trước`;
  }
};

export const formatEmployeeCount = (count: number): string => {
  if (count < 25) {
    return 'Dưới 25 nhân viên';
  } else if (count < 100) {
    return '25-99 nhân viên';
  } else if (count < 500) {
    return '100-499 nhân viên';
  } else if (count < 1000) {
    return '500-999 nhân viên';
  } else {
    return 'Trên 1000 nhân viên';
  }
};

export const formatToYearMonth = (dateString: string): string => {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  // Lấy năm và tháng
  const yearMonth =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1).toString().padStart(2, '0');

  return yearMonth;
};
