import { notifications } from '@prisma/client';

export class NotificationsEntity implements notifications {
  id: string;
  created_date: Date;
  user_id: string;
  status: string;
  title: string;
  name: string;
  description: string;
  reference: string;
  urgent: boolean;

  constructor(partial: Partial<NotificationsEntity>) {
    Object.assign(this, partial);
  }
}
