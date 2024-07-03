import { DomainEvents } from '@/src/core/events/domain-events'
import { IPaginationParams } from '@/src/core/repositories/pagination-params'
import { IPostAttachmentsRepository } from '@/src/domain/bash-news/application/repositories/post-attachments-repository'
import { IPostsRepository } from '@/src/domain/bash-news/application/repositories/posts-repository'
import { Post } from '@/src/domain/bash-news/enterprise/entities/post'

export class InMemoryPostsRepository implements IPostsRepository {
  public items: Post[] = []

  constructor(private postAttachmentsRepository: IPostAttachmentsRepository) {}

  async findById(id: string): Promise<Post | null> {
    const foundPost = this.items.find((item) => item.id.toString() === id)

    if (!foundPost) {
      return null
    }

    return foundPost
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const foundPost = this.items.find((item) => item.slug.text === slug)

    if (!foundPost) {
      return null
    }

    return foundPost
  }

  async findManyRecent({ page }: IPaginationParams): Promise<Post[]> {
    const posts = this.items
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return posts
  }

  async save(post: Post): Promise<void> {
    const postIndex = this.items.findIndex((item) => item.id === post.id)

    this.items[postIndex] = post

    DomainEvents.dispatchEventsForAggregate(post.id)
  }

  async create(post: Post): Promise<void> {
    this.items.push(post)

    DomainEvents.dispatchEventsForAggregate(post.id)
  }

  async delete(post: Post): Promise<void> {
    const postIndex = this.items.findIndex((item) => item.id === post.id)

    this.items.splice(postIndex, 1)
    this.postAttachmentsRepository.deleteManyByPostId(post.id.toString())
  }
}
