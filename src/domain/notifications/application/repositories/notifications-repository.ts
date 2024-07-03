import { Notification } from '@/src/domain/notifications/enterprise/entities/notification'

export interface INotificationsRepository {
  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}
