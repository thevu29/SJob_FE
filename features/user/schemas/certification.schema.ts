import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/file';
import { formatBytes } from '@/lib/utils';
import { z } from 'zod';

export const CreateCertificationSchema = z
  .object({
    name: z.string().min(1, { message: 'Tên chứng chỉ không được để trống' }),
    issueDate: z.string().min(1, { message: 'Ngày cấp không được để trống' }),
    expireDate: z.string().optional(),
    imageOrFile: z
      .any()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: `Hình ảnh quá lớn. Vui lòng chọn hình ảnh có kích thước nhỏ hơn ${formatBytes(MAX_FILE_SIZE)}.`
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Vui lòng tải lên tệp hình ảnh hợp lệ (JPEG, PNG, hoặc WebP).'
      })
  })
  .refine(
    (data) =>
      data.issueDate !== undefined &&
      data.expireDate !== undefined &&
      new Date(data.expireDate) > new Date(data.issueDate),
    {
      message: 'Ngày hết hạn phải lớn hơn ngày cấp',
      path: ['expireDate']
    }
  );

export type TCreateCertification = z.infer<typeof CreateCertificationSchema>;

export const UpdateCertificationSchema = z
  .object({
    name: z.string().optional(),
    issueDate: z.string().optional(),
    expireDate: z.string().optional(),
    imageOrFile: z
      .union([z.instanceof(File), z.literal('')])
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: `Hình ảnh quá lớn. Vui lòng chọn hình ảnh có kích thước nhỏ hơn ${formatBytes(
          MAX_FILE_SIZE
        )}.`
      })
      .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Vui lòng tải lên tệp hình ảnh hợp lệ (JPEG, PNG, hoặc WebP).'
      })
  })
  .refine(
    (data) =>
      data.issueDate !== undefined &&
      data.expireDate !== undefined &&
      new Date(data.expireDate) > new Date(data.issueDate),
    {
      message: 'Ngày hết hạn phải lớn hơn ngày cấp',
      path: ['expireDate']
    }
  );
export type TUpdateCertification = z.infer<typeof UpdateCertificationSchema>;
