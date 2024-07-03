import { Entity } from '@/src/core/entities/entity'
import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'

export interface IPostAttachmentProps {
  postId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class PostAttachment extends Entity<IPostAttachmentProps> {
  get postId() {
    return this.props.postId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: IPostAttachmentProps, id?: UniqueEntityId) {
    const attachment = new PostAttachment(props, id)

    return attachment
  }
}
