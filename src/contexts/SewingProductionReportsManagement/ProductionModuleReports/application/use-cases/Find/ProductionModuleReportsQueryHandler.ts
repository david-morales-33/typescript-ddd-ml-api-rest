import { ProductionModuleReportsQuery } from './ProductionModuleReportsQuery'
import { ProductionModuleReportsResponse } from './ProductionModuleReportsResponse'
import { ProductionModuleReportsFinder } from './ProductionModuleReportsFinder'
import { ProductionModuleReportReference } from '../../../domain/value-objects/ProductionModuleReportReference'
import { ProductionModuleReportModuleId } from '../../../domain/value-objects/ProductionModuleReportModuleId'
import { ProductionModuleReportId } from '../../../domain/value-objects/ProductionModuleReportId'
import { QueryHandler } from '../../../../../Shared/domain/CQRS/QueryHandler'
import { Query } from '../../../../../Shared/domain/CQRS/Query'

export class ProductionModuleReportsQueryHandler implements QueryHandler<ProductionModuleReportsQuery, ProductionModuleReportsResponse> {
    constructor(private productionModuleReportsFinder: ProductionModuleReportsFinder) { }

    subscribedTo(): Query {
        return ProductionModuleReportsQuery;
    }
    async handle(query: ProductionModuleReportsQuery): Promise<ProductionModuleReportsResponse> {

        const productionModuleReportsId = new ProductionModuleReportId(
            new ProductionModuleReportReference(query.reference),
            new ProductionModuleReportModuleId(query.productionModuleId)
        );

        return await this.productionModuleReportsFinder.execute(productionModuleReportsId)
    }
}