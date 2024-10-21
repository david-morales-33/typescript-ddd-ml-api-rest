import {ProductionModuleReportId} from '../../domain/value-objects/ProductionModuleReportId'

export class ProductionModuleReportsNotFound extends Error {
    constructor(productionModuleReportsId: ProductionModuleReportId){
        super(`Production Module Reports <${productionModuleReportsId.getProductionModuleReportId()}> Not Found`)
    }
}