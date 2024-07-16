import { AggregateRoot } from '@/src/core/entities/aggregate-root'
import { type UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { type Optional } from '@/src/core/types/optional'
import { PostAttachmentList } from '@/src/domain/bash-news/enterprise/entities/post-attachment-list'
import { Slug } from '@/src/domain/bash-news/enterprise/entities/value-objects/slug'
import { PostBestCommentChosenEvent } from '@/src/domain/bash-news/enterprise/events/post-best-comment-chosen-event'

export interface IPostProps {
  source: string
  bestCommentId?: UniqueEntityId
  title: string
  slug: Slug
  content: string
  attachments: PostAttachmentList
  createdAt: Date
  updatedAt?: Date
}

export class Post extends AggregateRoot<IPostProps> {
  get source() {
    return this.props.source
  }

  get bestCommentId() {
    return this.props.bestCommentId
  }

  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get content() {
    return this.props.content
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set bestCommentId(bestCommentId: UniqueEntityId | undefined) {
    if (bestCommentId && bestCommentId !== this.props.bestCommentId) {
      this.addDomainEvent(new PostBestCommentChosenEvent(this, bestCommentId))
    }

    this.props.bestCommentId = bestCommentId

    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)

    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: PostAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<IPostProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new PostAttachmentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return post
  }
}
