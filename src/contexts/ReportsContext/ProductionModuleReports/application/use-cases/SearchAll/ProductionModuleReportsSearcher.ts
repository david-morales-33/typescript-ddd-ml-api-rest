import { ProductionModuleReportsQueryRepository } from '../../../domain/repositories/ProductionModuleReportsQueryRepository';
import { ProductionModuleReportModuleId } from '../../../domain/value-objects/ProductionModuleReportModuleId';

export class ProductionModuleReportsSearcher {
    constructor(private productionModuleReportsRepository: ProductionModuleReportsQueryRepository) { }

    async execute(productionModuleReportId: ProductionModuleReportModuleId) {
        const productionModuleReportsList = await this.productionModuleReportsRepository.searchAll(productionModuleReportId);
        return productionModuleReportsList;
    }
}