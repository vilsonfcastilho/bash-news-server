import { AggregateRoot } from '@/src/core/entities/aggregate-root'
import { UniqueEntityId } from '@/src/core/entities/unique-entity-id'
import { IDomainEvent } from '@/src/core/events/domain-event'
import { DomainEvents } from '@/src/core/events/domain-events'
import { vi } from 'vitest'

class CustomAggregateCreatedEvent implements IDomainEvent {
  private aggregate: CustomAggregate // eslint-disable-line
  public ocurredAt: Date

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreatedEvent(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and listen to events', () => {
    const callbackSpy = vi.fn()

    // Registering Subcriber (listening to the "create-answer" event)
    DomainEvents.register(callbackSpy, CustomAggregateCreatedEvent.name)

    // The "create-answer" event was created, but without saving to the DB
    const aggregate = CustomAggregate.create()

    // Ensuring that the "create-answer" event was created but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving the "create-answer" event on DB and them dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    expect(callbackSpy).toBeCalled()
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
