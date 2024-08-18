import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";

export class ProductionModuleNotFound extends Error {
    constructor(productionModuleId: ProductionModuleId) {
        super(`The Production Module <${productionModuleId.value}> Not Found`)
    }
}