import { Slug } from '@/src/domain/bash-news/enterprise/entities/value-objects/slug'

test('it should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Example question title')

  expect(slug.text).toEqual('example-question-title')
})
