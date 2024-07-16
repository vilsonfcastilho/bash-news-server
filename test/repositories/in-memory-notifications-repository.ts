import { INotificationsRepository } from '@/src/domain/notifications/application/repositories/notifications-repository'
import { Notification } from '@/src/domain/notifications/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements INotificationsRepository
{
  public items: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const foundNotification = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!foundNotification) {
      return null
    }

    return foundNotification
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[notificationIndex] = notification
  }
}
