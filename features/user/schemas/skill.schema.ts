import { z } from 'zod';

export const CreateSkillSchema = z.object({
  name: z.string().min(1, { message: 'Tên kỹ năng không được để trống' })
});

export type TCreateSkill = z.infer<typeof CreateSkillSchema>;

export const UpdateSkillSchema = z.object({
  name: z.string().optional()
});

export type TUpdateSkill = z.infer<typeof UpdateSkillSchema>;
