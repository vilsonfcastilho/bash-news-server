import { Either, left, right } from '@/src/core/either'
import { NotAllowedError } from '@/src/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/src/core/errors/errors/resource-not-found-error'
import { INotificationsRepository } from '@/src/domain/notifications/application/repositories/notifications-repository'
import { Notification } from '@/src/domain/notifications/enterprise/entities/notification'

interface IReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}

type IReadNotificationUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: IReadNotificationUseCaseRequest): Promise<IReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationsRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({
      notification,
    })
  }
}
