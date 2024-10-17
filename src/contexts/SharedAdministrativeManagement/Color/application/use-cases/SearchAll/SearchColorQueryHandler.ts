import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
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