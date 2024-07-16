import { IPostAttachmentsRepository } from '@/src/domain/bash-news/application/repositories/post-attachments-repository'
import { PostAttachment } from '@/src/domain/bash-news/enterprise/entities/post-attachment'

export class InMemoryPostAttachmentsRepository
  implements IPostAttachmentsRepository
{
  public items: PostAttachment[] = []

  async findManyByPostId(postId: string): Promise<PostAttachment[]> {
    const postAttachment = this.items.filter(
      (item) => item.postId.toString() === postId,
    )

    return postAttachment
  }

  async deleteManyByPostId(postId: string): Promise<void> {
    const postAttachment = this.items.filter(
      (item) => item.postId.toString() !== postId,
    )

    this.items = postAttachment
  }
}
