import { Either, right } from '@/src/core/either'
import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { INotificationsRepository } from '@/src/domain/notifications/application/repositories/notifications-repository'
import { Notification } from '@/src/domain/notifications/enterprise/entities/notification'

export interface ISendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type ISendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

export class SendNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: ISendNotificationUseCaseRequest): Promise<ISendNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    })

    await this.notificationsRepository.create(notification)

    return right({
      notification,
    })
  }
}
