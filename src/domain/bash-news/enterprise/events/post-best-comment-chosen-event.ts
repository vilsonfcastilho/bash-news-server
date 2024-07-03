import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { IDomainEvent } from '@/src/core/events/domain-event'
import { Post } from '@/src/domain/bash-news/enterprise/entities/post'

export class PostBestCommentChosenEvent implements IDomainEvent {
  public post: Post
  public bestCommentId: UniqueEntityId
  public ocurredAt: Date

  constructor(post: Post, bestCommentId: UniqueEntityId) {
    this.post = post
    this.bestCommentId = bestCommentId
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.post.id
  }
}
