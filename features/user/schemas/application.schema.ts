import { MAX_FILE_SIZE } from '@/constants/file';
import { formatBytes } from '@/lib/utils';
import { z } from 'zod';

export const CreateApplicationSchema = z
  .object({
    resumeType: z.enum(['existing', 'new'], {
      required_error: 'Vui lòng chọn một hồ sơ'
    }),
    resumeId: z.string().optional(),
    resumeFile: z
      .any()
      .optional()
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
    message: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.resumeType === 'existing' && !data.resumeId) {
        return false;
      }
      if (data.resumeType === 'new' && !data.resumeFile) {
        return false;
      }
      return true;
    },
    {
      message: 'Vui lòng chọn một hồ sơ hoặc tải lên file mới',
      path: ['resumeType']
    }
  );

export type TCreateApplication = z.infer<typeof CreateApplicationSchema>;
