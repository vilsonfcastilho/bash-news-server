import { IPaginationParams } from '@/src/core/repositories/pagination-params'
import { AnswerComment } from '@/src/domain/bash-news/enterprise/entities/answer-comment'

export interface IAnswerCommentsRepository {
  findById(id: string): Promise<AnswerComment | null>
  findManyByAnswerId(
    answerId: string,
    params: IPaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
