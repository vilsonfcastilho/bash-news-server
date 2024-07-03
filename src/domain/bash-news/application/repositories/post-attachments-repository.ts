import { PostAttachment } from '@/src/domain/bash-news/enterprise/entities/post-attachment'

export interface IPostAttachmentsRepository {
  findManyByPostId(postId: string): Promise<PostAttachment[]>
  deleteManyByPostId(postId: string): Promise<void>
}
