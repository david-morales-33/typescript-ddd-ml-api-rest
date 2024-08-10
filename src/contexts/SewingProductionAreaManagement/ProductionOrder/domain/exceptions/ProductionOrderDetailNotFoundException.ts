import { ProductionOrderId } from "../value-objects/ProductionOrderId";

export class ProductionOrderDetailNotFoundException extends Error {
    constructor(value: ProductionOrderId) {
        super(`Production Order Detail <${value.value}> not found`)
    }
}