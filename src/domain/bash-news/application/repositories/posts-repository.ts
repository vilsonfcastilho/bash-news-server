import { type IPaginationParams } from '@/src/core/repositories/pagination-params'
import { type Post } from '@/src/domain/bash-news/enterprise/entities/post'

export interface IPostsRepository {
  findById: (id: string) => Promise<Post | null>
  findBySlug: (slug: string) => Promise<Post | null>
  findManyRecent: (params: IPaginationParams) => Promise<Post[]>
  save: (post: Post) => Promise<void>
  create: (post: Post) => Promise<void>
  delete: (post: Post) => Promise<void>
}
