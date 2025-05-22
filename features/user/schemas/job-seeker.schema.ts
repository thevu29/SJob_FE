import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/file';
import { phoneRegex } from '@/constants/validation';
import { formatBytes } from '@/lib/utils';
import { z } from 'zod';

export const UpdateJobSeekerSchema = z.object({
  name: z.string().min(1, { message: 'Họ tên không được để trống' }),
  field: z.string().min(1, { message: 'Vị trí ứng tuyển không được để trống' }),
  phone: z
    .string()
    .min(1, { message: 'Số điện thoại không được để trống' })
    .regex(phoneRegex, { message: 'Số điện thoại không hợp lệ' }),
  image: z
    .union([z.instanceof(File), z.literal('')])
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: `Hình ảnh quá lớn. Vui lòng chọn hình ảnh có kích thước nhỏ hơn ${formatBytes(
        MAX_FILE_SIZE
      )}.`
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Vui lòng tải lên tệp hình ảnh hợp lệ (JPEG, PNG, hoặc WebP).'
    }),
  gender: z.union([z.boolean(), z.string()]),
  address: z.string().min(1, { message: 'Địa chỉ không được để trống' }),
  about: z.string().optional(),
  // seeking: z.boolean(),
  email: z.string().email({ message: 'Email không hợp lệ' })
});

export type TUpdateJobSeekerSchema = z.infer<typeof UpdateJobSeekerSchema>;
