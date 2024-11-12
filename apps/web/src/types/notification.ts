export interface Notification {
    notification_id: number;
    user_id: number;
    subject?: string;
    message: string;
    is_read: boolean;
    type: 'application' | 'interview' | 'subscription';
    related_id: number | null;
    link: string | null;
    created_at: string;
    updated_at: string;
  }
  