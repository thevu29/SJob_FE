import { fi } from '@faker-js/faker';
import z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpg', 'image/png'];

export const RecruiterSchema = z.object({
  id: z.number(),
  userId: z.number(),
  fieldId: z.number(),
  name: z.string(),
  about: z.string(),
  image: z.string().nullable(),
  website: z.string().url(),
  address: z.string(),
  members: z.number(),
  status: z.boolean()
});

export type TRecruiter = z.TypeOf<typeof RecruiterSchema>;

export const UpdateRecruiterSchema = z.object({
  fieldId: z.string(),
  name: z
    .string()
    .min(5, {
      message: 'Tên công ty phải chứa ít nhất 5 kí tự.'
    })
    .max(100, {
      message: 'Tên công ty không được vượt quá 100 kí tự.'
    }),
  about: z
    .string()
    .min(10, {
      message: 'Giới thiệu về công ty phải chứa ít nhất 10 kí tự.'
    })
    .max(500, {
      message: 'Giới thiệu công ty không được vượt quá 500 kí tự.'
    }),
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Vui lòng chọn ảnh.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Kích thước file tối đa là 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Chỉ hỗ trợ định dạng file: .jpg, .jpeg, .png, .webp.'
    ),
  website: z.string().url('URL cung cấp không hợp lệ'),
  address: z
    .string()
    .min(5, { message: 'Địa chỉ phải chứa ít nhất 5 kí tự.' })
    .max(200, { message: 'Địa chỉ không được vượt quá 200 kí tự.' }),
  members: z.coerce
    .number()
    .min(1, { message: 'Ít nhất 1 nhân sự là bắt buộc.' }),
  status: z.boolean()
});

export type TUpdateRecruiter = z.TypeOf<typeof UpdateRecruiterSchema>;
