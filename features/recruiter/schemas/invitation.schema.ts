import z from 'zod';

export const CreateInvitationSchema = z.object({
  jobId: z.string().min(1, { message: 'Vui lòng chọn công việc' }),
  message: z.string().min(1, { message: 'Vui lòng nhập nội dung email' })
});
export type TCreateInvitation = z.TypeOf<typeof CreateInvitationSchema>;
