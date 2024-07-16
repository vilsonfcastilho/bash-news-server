import { IPaginationParams } from '@/src/core/repositories/pagination-params'
import { IPostCommentsRepository } from '@/src/domain/bash-news/application/repositories/post-comments-repository'
import { PostComment } from '@/src/domain/bash-news/enterprise/entities/post-comment'

export class InMemoryPostCommentsRepository implements IPostCommentsRepository {
  public items: PostComment[] = []

  async findById(id: string): Promise<PostComment | null> {
    const postComment = this.items.find((item) => item.id.toString() === id)

    if (!postComment) {
      return null
    }

    return postComment
  }

  async findManyByPostId(
    postId: string,
    { page }: IPaginationParams,
  ): Promise<PostComment[]> {
    const postComments = this.items
      .filter((item) => item.postId.toString() === postId)
      .slice((page - 1) * 20, page * 20)

    return postComments
  }

  async create(postComment: PostComment): Promise<void> {
    this.items.push(postComment)
  }

  async delete(postComment: PostComment): Promise<void> {
    const postCommentIndex = this.items.findIndex(
      (item) => item.id === postComment.id,
    )

    this.items.splice(postCommentIndex, 1)
  }
}
