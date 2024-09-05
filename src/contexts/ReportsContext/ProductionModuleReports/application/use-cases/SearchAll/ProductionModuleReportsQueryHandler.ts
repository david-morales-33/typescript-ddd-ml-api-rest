import { QueryHandler } from '../../../../../Shared/domain/QueryHandler'
import { ProductionModuleReportsSearcherResponse } from './ProductionModuleReportsResponse'
import { ProductionModuleReportsQuery } from './ProductionModuleReportsQuery'
import { Query } from '../../../../../Shared/domain/Query'
import { ProductionModuleReportModuleId } from '../../../domain/value-objects/ProductionModuleReportModuleId'
import { ProductionModuleReportsQueryRepository } from '../../../domain/repositories/ProductionModuleReportsQueryRepository'

export class ProductionModuleReportsQueryHandler implements QueryHandler<ProductionModuleReportsQuery, ProductionModuleReportsSearcherResponse[]> {

    constructor(private productionModuleReportsQueryRepository: ProductionModuleReportsQueryRepository) { }
    subscribedTo(): Query {
        return ProductionModuleReportsQuery;
    }

    async handle(query: ProductionModuleReportsQuery): Promise<ProductionModuleReportsSearcherResponse[]> {
        return await this.productionModuleReportsQueryRepository.searchAll(new ProductionModuleReportModuleId(query.productionModuleId))
    }
}