import { Query } from "../../../../../Shared/domain/CQRS/Query";
import { QueryHandler } from "../../../../../Shared/domain/CQRS/QueryHandler";
import { ProductionModuleFinder } from "./ProductionModuleFinder";
import { SearchAllProductionModuleQuery } from "./SearchAllProductionModuleQuery";
import { SearchAllProductionModuleResponse } from "./SearchAllProductionModuleResponse";

export class SearchAllProductionModuleQueryHandler implements QueryHandler<SearchAllProductionModuleQuery, SearchAllProductionModuleResponse[]> {

    constructor(private productionModuleFinder: ProductionModuleFinder) { }

    subscribedTo(): Query {
        return SearchAllProductionModuleQuery;
    }

    async handle(): Promise<SearchAllProductionModuleResponse[]> {
        return await this.productionModuleFinder.execute();
    }
}