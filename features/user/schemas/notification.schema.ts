import { z } from 'zod';

export const UpdateNotificationPreferencesSchema = z.object({
  jobInvitations: z.boolean().default(true),
  applicationStatus: z.boolean().default(true)
  //   expiringJobs: z.boolean().default(true),
});

export type TUpdateNotificationPreferencesSchema = z.infer<
  typeof UpdateNotificationPreferencesSchema
>;
