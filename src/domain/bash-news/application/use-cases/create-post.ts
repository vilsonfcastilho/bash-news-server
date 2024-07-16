import { Either, right } from '@/src/core/either'
import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { type IPostsRepository } from '@/src/domain/bash-news/application/repositories/posts-repository'
import { Post } from '@/src/domain/bash-news/enterprise/entities/post'
import { PostAttachment } from '@/src/domain/bash-news/enterprise/entities/post-attachment'
import { PostAttachmentList } from '@/src/domain/bash-news/enterprise/entities/post-attachment-list'

interface ICreatePostUseCaseRequest {
  source: string
  title: string
  content: string
  attachmentIds: string[]
}

type ICreatePostUseCaseResponse = Either<
  null,
  {
    post: Post
  }
>

export class CreatePostUseCase {
  constructor(private readonly postsRepository: IPostsRepository) {}

  async execute({
    source,
    title,
    content,
    attachmentIds,
  }: ICreatePostUseCaseRequest): Promise<ICreatePostUseCaseResponse> {
    const post = Post.create({
      source,
      title,
      content,
    })

    const postAttachments = attachmentIds.map((attachmentId) => {
      return PostAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        postId: post.id,
      })
    })

    post.attachments = new PostAttachmentList(postAttachments)

    await this.postsRepository.create(post)

    return right({
      post,
    })
  }
}
