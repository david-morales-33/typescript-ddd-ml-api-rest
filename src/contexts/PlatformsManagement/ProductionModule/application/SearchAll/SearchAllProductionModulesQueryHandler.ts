import { Query } from "../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionModuleResponse } from "./ProductionModuleResponse";
import { productionModuleSearcher } from "./productionModuleSearcher";
import { SearchAllProductionModulesQuery } from "./SearchAllProductionModulesQuery";

export class SearchAllProductionModulesQueryHandler implements QueryHandler<SearchAllProductionModulesQuery, ProductionModuleResponse> {
    constructor(private searcher: productionModuleSearcher) { }

    subscribedTo(): Query {
        return SearchAllProductionModulesQuery;
    }
    async handle(): Promise<ProductionModuleResponse> {
        return await this.searcher.execute();
    }
}