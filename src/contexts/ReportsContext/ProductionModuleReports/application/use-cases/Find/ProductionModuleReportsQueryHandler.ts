import { Query } from '../../../../../Shared/domain/Query';
import { QueryHandler } from '../../../../../Shared/domain/QueryHandler';
import { ProductionModuleReportsQuery } from '../Find/ProductionModuleReportsQuery'
import { ProductionModuleReportsResponse } from '../Find/ProductionModuleReportsResponse'
import { ProductionModuleReportsFinder } from '../Find/ProductionModuleReportsFinder'
import { ProductionModuleReportReference } from '../../../domain/value-objects/ProductionModuleReportReference'
import { ProductionModuleReportModuleId } from '../../../domain/value-objects/ProductionModuleReportModuleId'
import { ProductionModuleReportId } from '../../../domain/value-objects/ProductionModuleReportId'

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