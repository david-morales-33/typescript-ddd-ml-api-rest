import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionModuleResponse } from "./ProductionModuleResponse";
import { ProductionModuleSearcher } from "./productionModuleSearcher";
import { SearchAllProductionModulesQuery } from "./SearchAllProductionModulesQuery";

export class SearchAllProductionModulesQueryHandler implements QueryHandler<SearchAllProductionModulesQuery, ProductionModuleResponse> {
    constructor(private searcher: ProductionModuleSearcher) { }

    subscribedTo(): Query {
        return SearchAllProductionModulesQuery;
    }
    async handle(): Promise<ProductionModuleResponse> {
        return await this.searcher.execute();
    }
}