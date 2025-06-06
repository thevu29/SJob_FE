import { z } from 'zod';

export const CreateEducationSchema = z
  .object({
    school: z.string().min(1, { message: 'Tên trường không được để trống' }),
    major: z.string().min(1, { message: 'Chuyên ngành không được để trống' }),
    degree: z.string().min(1, { message: 'Bằng cấp không được để trống' }),
    description: z.string().optional(),
    startDate: z
      .string()
      .min(1, { message: 'Ngày bắt đầu không được để trống' }),
    endDate: z.string().nullable()
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;
      return new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      path: ['endDate']
    }
  );

export type TCreateEducation = z.infer<typeof CreateEducationSchema>;

export const UpdateEducationSchema = z
  .object({
    school: z.string().optional(),
    major: z.string().optional(),
    degree: z.string().optional(),
    description: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })
  .refine(
    (data) => {
      if (!data.endDate) return true;

      data.startDate &&
        data.endDate &&
        new Date(data.endDate) > new Date(data.startDate);
    },
    {
      message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      path: ['endDate']
    }
  );

export type TUpdateEducation = z.infer<typeof UpdateEducationSchema>;
