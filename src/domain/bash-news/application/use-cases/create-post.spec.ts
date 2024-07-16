import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { CreatePostUseCase } from '@/src/domain/bash-news/application/use-cases/create-post'
import { InMemoryPostAttachmentsRepository } from '@/test/repositories/in-memory-post-attachments-repository'
import { InMemoryPostsRepository } from '@/test/repositories/in-memory-posts-repository'

let inMemoryPostsRepository: InMemoryPostsRepository
let inMemoryPostAttachmentsRepository: InMemoryPostAttachmentsRepository
let createPost: CreatePostUseCase

describe('Create post', () => {
  beforeEach(() => {
    inMemoryPostAttachmentsRepository = new InMemoryPostAttachmentsRepository()
    inMemoryPostsRepository = new InMemoryPostsRepository(
      inMemoryPostAttachmentsRepository,
    )
    createPost = new CreatePostUseCase(inMemoryPostsRepository)
  })

  it('should be able to create a post', async () => {
    const result = await createPost.execute({
      source: 'http://post.com',
      title: 'New post',
      content: 'New post content',
      attachmentIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostsRepository.items[0]).toEqual(result.value?.post)
    expect(
      inMemoryPostsRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryPostsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  })
})
