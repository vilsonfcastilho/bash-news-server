import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import {
  IPostCommentProps,
  PostComment,
} from '@/src/domain/bash-news/enterprise/entities/post-comment'
import { faker } from '@faker-js/faker'

export function makePostComment(
  override: Partial<IPostCommentProps> = {},
  id?: UniqueEntityId,
) {
  const postcomment = PostComment.create(
    {
      authorId: new UniqueEntityId(),
      postId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return postcomment
}
