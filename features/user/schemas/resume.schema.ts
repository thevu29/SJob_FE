import { MAX_FILE_SIZE } from '@/constants/file';
import { formatBytes } from '@/lib/utils';
import { z } from 'zod';

export const CreateResumeSchema = z.object({
  name: z.string(),
  file: z
    .any()
    .refine((file) => file !== '', {
      message: 'Vui lòng tải lên tệp PDF.'
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Tệp quá lớn. Vui lòng chọn file có kích thước nhỏ hơn ${formatBytes(
        MAX_FILE_SIZE
      )}.`
    })
    .refine((file) => !file || file.type === 'application/pdf', {
      message: 'Vui lòng tải lên tệp hợp lệ (PDF).'
    }),
  main: z.boolean().default(false)
});

export type TCreateResume = z.infer<typeof CreateResumeSchema>;

export const UpdateResumeSchema = z.object({
  name: z.string().optional(),
  file: z
    .any()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Tệp quá lớn. Vui lòng chọn file có kích thước nhỏ hơn ${formatBytes(
        MAX_FILE_SIZE
      )}.`
    })
    .refine((file) => !file || file.type === 'application/pdf', {
      message: 'Vui lòng tải lên tệp hợp lệ (PDF).'
    }),
  main: z.boolean().optional()
});
export type TUpdateResume = z.infer<typeof UpdateResumeSchema>;
