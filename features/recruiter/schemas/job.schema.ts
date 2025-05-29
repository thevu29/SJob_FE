import z from 'zod';

export const CreateJobSchema = z.object({
  name: z
    .string()
    .min(1, 'Vui lòng nhập tên công việc')
    .max(255, 'Tên công việc không được vượt quá 255 ký tự'),
  description: z
    .string()
    .min(1, 'Vui lòng nhập mô tả công việc')
    .max(5000, 'Mô tả công việc không được vượt quá 5000 ký tự'),
  salary: z.string().min(1, 'Vui lòng nhập mức lương'),
  requirement: z
    .string()
    .min(1, 'Vui lòng nhập yêu cầu công việc')
    .max(2000, 'Yêu cầu công việc không được vượt quá 2000 ký tự'),
  benefit: z
    .string()
    .min(1, 'Vui lòng nhập quyền lợi')
    .max(2000, 'Quyền lợi không được vượt quá 2000 ký tự'),
  deadline: z
    .string()
    .min(1, 'Vui lòng chọn hạn nộp hồ sơ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Hạn nộp hồ sơ không được nhỏ hơn ngày hiện tại'
    }),
  slots: z
    .number({
      required_error: 'Vui lòng nhập số lượng cần tuyển',
      invalid_type_error: 'Số lượng cần tuyển phải là số'
    })
    .min(1, 'Số lượng cần tuyển phải lớn hơn 0'),
  type: z.string().min(1, 'Vui lòng chọn hình thức làm việc'),
  education: z.string().min(1, 'Vui lòng chọn yêu cầu học vấn'),
  experience: z.string().min(1, 'Vui lòng chọn yêu cầu kinh nghiệm'),
  fieldDetails: z.string({ message: 'Vui lòng chọn ngành nghề chi tiết' })
});

export type TCreateJob = z.TypeOf<typeof CreateJobSchema>;

export const UpdateJobSchema = z.object({
  name: z
    .string()
    .min(1, 'Vui lòng nhập tên công việc')
    .max(255, 'Tên công việc không được vượt quá 255 ký tự')
    .optional(),
  description: z
    .string()
    .min(1, 'Vui lòng nhập mô tả công việc')
    .max(5000, 'Mô tả công việc không được vượt quá 5000 ký tự')
    .optional(),
  salary: z.string().min(1, 'Vui lòng nhập mức lương').optional(),
  requirement: z
    .string()
    .min(1, 'Vui lòng nhập yêu cầu công việc')
    .max(2000, 'Yêu cầu công việc không được vượt quá 2000 ký tự')
    .optional(),
  benefit: z
    .string()
    .min(1, 'Vui lòng nhập quyền lợi')
    .max(2000, 'Quyền lợi không được vượt quá 2000 ký tự')
    .optional(),
  deadline: z
    .string()
    .min(1, 'Vui lòng chọn hạn nộp hồ sơ')
    .refine((date) => new Date(date) > new Date(), {
      message: 'Hạn nộp hồ sơ không được nhỏ hơn ngày hiện tại'
    })
    .optional(),
  slots: z
    .number({
      required_error: 'Vui lòng nhập số lượng cần tuyển',
      invalid_type_error: 'Số lượng cần tuyển phải là số'
    })
    .min(1, 'Số lượng cần tuyển phải lớn hơn 0')
    .optional(),
  type: z.string().min(1, 'Vui lòng chọn hình thức làm việc').optional(),
  education: z.string().min(1, 'Vui lòng chọn yêu cầu học vấn').optional(),
  experience: z.string().min(1, 'Vui lòng chọn yêu cầu kinh nghiệm').optional(),
  fieldDetails: z
    .string({ message: 'Vui lòng chọn ngành nghề chi tiết' })
    .optional()
});

export type TUpdateJob = z.TypeOf<typeof UpdateJobSchema>;
