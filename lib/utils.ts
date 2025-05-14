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
