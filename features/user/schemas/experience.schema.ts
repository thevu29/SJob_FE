import { EmployeeType, LocationType } from '@/interfaces/experience';
import { optional, z } from 'zod';

// export interface Experience {
//   id: string;
//   company: string;
//   position: string;
//   location: string;
//   locationType: LocationType;
//   description: string;
//   employeeType: EmployeeType;
//   startDate: string;
//   endDate: string;
//   jobSeekerId: string;
// }

export const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  location: z.string().optional(),
  locationType: z.string(),
  description: z.string().optional(),
  employeeType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  jobSeekerId: z.string()
});

export type TExperience = z.infer<typeof ExperienceSchema>;

export const CreateExperienceSchema = z
  .object({
    company: z.string().min(1, { message: 'Tên công ty không được để trống' }),
    position: z.string().min(1, { message: 'Vị trí không được để trống' }),
    location: z.string().optional(),
    locationType: z
      .string()
      .min(1, { message: 'Hình thức làm việc không được để trống' }), // z.nativeEnum(LocationType),
    description: z.string().optional(),
    employeeType: z
      .string()
      .min(1, { message: 'Loại hình làm việc không được để trống' }), //z.nativeEnum(EmployeeType),
    startDate: z
      .string()
      .min(1, { message: 'Ngày bắt đầu không được để trống' }),
    endDate: z.string().min(1, { message: 'Ngày kết thúc không được để trống' })
  })
  .refine(
    (data) =>
      data.startDate !== undefined &&
      data.endDate !== undefined &&
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      path: ['endDate']
    }
  );

export type TCreateExperience = z.infer<typeof CreateExperienceSchema>;

export const UpdateExperienceSchema = z
  .object({
    company: z.string().optional(),
    position: z.string().optional(),
    location: z.string().optional(),
    locationType: z.string().optional(),
    description: z.string().optional(),
    employeeType: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional()
  })
  .refine(
    (data) =>
      data.startDate !== undefined &&
      data.endDate !== undefined &&
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: 'Ngày kết thúc phải lớn hơn ngày bắt đầu',
      path: ['endDate']
    }
  );

export type TUpdateExperience = z.infer<typeof UpdateExperienceSchema>;
