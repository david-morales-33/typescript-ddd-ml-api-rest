import { Query } from "../../../../../Shared/domain/design-patterns/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/design-patterns/CQRS/QueryHandler";
import { ColorQueryRepository } from "../../repositories/ColorQueryRepository";
import { ColorResponse } from "./ColorResponse";
import { SearchColorQuery } from "./SearchColorQuery";

export class SearchColorQueryHandler implements QueryHandler<SearchColorQuery, ColorResponse[]> {

    constructor(private colorQueryRepository: ColorQueryRepository) { }

    subscribedTo(): Query {
        return SearchColorQuery
    }

    async handle(query: SearchColorQuery): Promise<ColorResponse[]> {
        return this.colorQueryRepository.searchAll();
    }
}