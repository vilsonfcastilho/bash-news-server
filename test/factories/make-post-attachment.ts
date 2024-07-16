import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import {
  IPostAttachmentProps,
  PostAttachment,
} from '@/src/domain/bash-news/enterprise/entities/post-attachment'

export function makePostAttachment(
  override: Partial<IPostAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const postattachment = PostAttachment.create(
    {
      postId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return postattachment
}
