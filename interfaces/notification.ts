export enum NotificationChannel {
  EMAIL = 'EMAIL',
  IN_APP = 'IN_APP'
}

export enum NotificationType {
  JOB_APPLICATION = 'JOB_APPLICATION',
  APPLICATION_STATUS = 'APPLICATION_STATUS',
  JOB_RECOMMENDATION = 'JOB_RECOMMENDATION',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  JOB_INVITATION = 'JOB_INVITATION',
  JOB_EXPIRY = 'JOB_EXPIRY'
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  url: string;
  channels: NotificationChannel[];
  read: boolean;
  createdAt: string;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  enabledNotificationTypes: Record<string, boolean>;
}

export interface IUpdateNotificationPreferencesData {
  notificationTypeUpdates: Record<string, boolean>;
}
