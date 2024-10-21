import { ProductionModuleReportsQueryRepository } from '../../../domain/repositories/ProductionModuleReportsQueryRepository'
import { ProductionModuleReportId } from '../../../domain/value-objects/ProductionModuleReportId'
import { ProductionModuleReportsNotFound } from '../../exceptions/ProductionModuleReportsNotFound';

export class ProductionModuleReportsFinder {
    constructor(private productionModuleReportsQueryRepository: ProductionModuleReportsQueryRepository) { }

    async execute(productionModuleReportsId: ProductionModuleReportId) {
        const productionModuleReport = await this.productionModuleReportsQueryRepository.find(productionModuleReportsId);

        if (productionModuleReport === null)
            throw new ProductionModuleReportsNotFound(productionModuleReportsId)

        return productionModuleReport;
    }
}