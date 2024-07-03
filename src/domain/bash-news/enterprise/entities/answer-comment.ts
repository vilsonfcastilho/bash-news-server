import { type UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { type Optional } from '@/src/core/types/optional'
import {
  Comment,
  ICommentProps,
} from '@/src/domain/bash-news/enterprise/entities/comment'

export interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<IAnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answercomment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answercomment
  }
}
