import { ProductionModuleReportModuleId } from '../value-objects/ProductionModuleReportModuleId'
import { ProductionModuleReportReference } from '../value-objects/ProductionModuleReportReference'

export class ProductionModuleReportId {
    constructor(
        readonly Reference: ProductionModuleReportReference,
        readonly productionModule: ProductionModuleReportModuleId,
    ) { }

    public getProductionModuleReportId(): string {
        return `${this.Reference.value}-production-module-${this.productionModule.value.toString()}`
    }
}