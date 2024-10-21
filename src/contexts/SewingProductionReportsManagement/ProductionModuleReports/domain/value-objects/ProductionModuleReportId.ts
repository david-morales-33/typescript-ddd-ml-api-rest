import { ProductionModuleReportModuleId } from './ProductionModuleReportModuleId'
import { ProductionModuleReportReference } from './ProductionModuleReportReference'

export class ProductionModuleReportId {
    constructor(
        readonly Reference: ProductionModuleReportReference,
        readonly productionModule: ProductionModuleReportModuleId,
    ) { }

    public getProductionModuleReportId(): string {
        return `${this.Reference.value}-production-module-${this.productionModule.value.toString()}`
    }
}