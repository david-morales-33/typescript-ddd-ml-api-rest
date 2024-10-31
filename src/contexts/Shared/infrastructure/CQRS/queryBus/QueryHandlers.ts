import { Query } from "../../../domain/CQRS/Query";
import { QueryHandler } from "../../../domain/CQRS/QueryHandler";
import { QueryNotRegisteredError } from "../../../domain/exceptions/QueryNotRegisteredError";

export class QueryHandlers extends Map<Query, QueryHandler<Query, Response>> {
  constructor(queryHandlers: Array<QueryHandler<Query, Response>>) {
    super();
    queryHandlers.forEach(queryHandler => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query, Response> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
