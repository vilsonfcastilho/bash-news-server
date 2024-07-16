import { Entity } from '@/src/core/entities/entity'
import { IDomainEvent } from '@/src/core/events/domain-event'
import { DomainEvents } from '@/src/core/events/domain-events'

export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: IDomainEvent[] = []

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domainEvents = []
  }
}
