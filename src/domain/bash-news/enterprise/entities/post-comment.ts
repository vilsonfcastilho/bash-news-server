import { type UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { type Optional } from '@/src/core/types/optional'
import {
  Comment,
  ICommentProps,
} from '@/src/domain/bash-news/enterprise/entities/comment'

export interface IPostCommentProps extends ICommentProps {
  postId: UniqueEntityId
}

export class PostComment extends Comment<IPostCommentProps> {
  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<IPostCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const postcomment = new PostComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return postcomment
  }
}
