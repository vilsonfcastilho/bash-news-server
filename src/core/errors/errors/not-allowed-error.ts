import { IUseCaseError } from '@/src/core/errors/use-case-error'

export class NotAllowedError extends Error implements IUseCaseError {
  constructor() {
    super('Not allowed.')
  }
}
