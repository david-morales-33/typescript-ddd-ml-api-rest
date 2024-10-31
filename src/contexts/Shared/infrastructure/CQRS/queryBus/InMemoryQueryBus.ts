import { Query } from "../../../domain/CQRS/Query";
import { QueryBus } from "../../../domain/CQRS/QueryBus";
import { QueryHandlers } from "./QueryHandlers";
import { Response } from '../../../domain/CQRS/Response'

export class InMemoryQueryBus implements QueryBus {
    constructor(private queryHandlersInformation: QueryHandlers) { }

    async ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.get(query);
        return (await handler.handle(query) as unknown) as Promise<R>;
    }
}
