import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { ColorResponse } from "./ColorResponse";
import { ColorSearcher } from "./ColorSearcher";
import { SearchColorQuery } from "./SearchColorQuery";

export class SearchColorQueryHandler implements QueryHandler<SearchColorQuery, ColorResponse[]> {

    constructor(private colorQuerySearcher : ColorSearcher) { }

    subscribedTo(): Query {
        return SearchColorQuery
    }

    async handle(): Promise<ColorResponse[]> {
        return this.colorQuerySearcher.execute();
    }
}