import { IPaginationParams } from '@/src/core/repositories/pagination-params'
import { PostComment } from '@/src/domain/bash-news/enterprise/entities/post-comment'

export interface IPostCommentsRepository {
  findById(id: string): Promise<PostComment | null>
  findManyByPostId(
    postId: string,
    params: IPaginationParams,
  ): Promise<PostComment[]>
  create(postComment: PostComment): Promise<void>
  delete(postComment: PostComment): Promise<void>
}
