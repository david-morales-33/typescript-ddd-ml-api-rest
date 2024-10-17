import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";

export class ProductionOrderNotFoundException extends Error {
    constructor(productionOrderId: ProductionOrderId) {
        super(`The Production Order <${productionOrderId.value}> not found`)
    }
}