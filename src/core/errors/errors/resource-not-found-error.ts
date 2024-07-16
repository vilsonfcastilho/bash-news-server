import { IUseCaseError } from '@/src/core/errors/use-case-error'

export class ResourceNotFoundError extends Error implements IUseCaseError {
  constructor() {
    super('Resource not found.')
  }
}
