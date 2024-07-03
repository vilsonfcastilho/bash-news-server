import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import {
  IPostProps,
  Post,
} from '@/src/domain/bash-news/enterprise/entities/post'
import { faker } from '@faker-js/faker'

export function makePost(
  override: Partial<IPostProps> = {},
  id?: UniqueEntityId,
) {
  const post = Post.create(
    {
      source: faker.internet.url(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return post
}
