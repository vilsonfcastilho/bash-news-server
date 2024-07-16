import { Entity } from '@/src/core/entities/entity'
import { type UniqueEntityId } from '@/src/core/entities/unique-entity-id'

interface IUserProps {
  name: string
}

export class User extends Entity<IUserProps> {
  static create(props: IUserProps, id?: UniqueEntityId) {
    const user = new User(props, id)

    return user
  }
}
