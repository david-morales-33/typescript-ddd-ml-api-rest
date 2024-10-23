import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionModuleEventResponse } from "./ProductionModuleEventResponse";
import { ProductionModuleEventSearcher } from "./ProductionModuleEventSearcher";
import { SearchAllProductionModuleEventQuery } from "./SearchAllProductionModuleEventQuery";

export class SearchAllProductionModuleEventQueryHandler implements QueryHandler<SearchAllProductionModuleEventQuery, ProductionModuleEventResponse> {

    constructor(private searcher: ProductionModuleEventSearcher) { }

    subscribedTo(): Query {
        return SearchAllProductionModuleEventQuery;
    }
    async handle(): Promise<ProductionModuleEventResponse> {
        return await this.searcher.execute();
    }
}