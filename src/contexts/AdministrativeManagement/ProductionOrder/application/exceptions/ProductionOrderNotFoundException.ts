import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";

export class ProductionOrderNotFoundException extends Error {
    constructor(productionOrderId: ProductionOrderId) {
        super(`The Production Order <${productionOrderId.value}> not found`)
    }
}