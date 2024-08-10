import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";

export class ProductionOrderDetailNotFoundException extends Error {
    constructor(value:ProductionOrderDetailId) {
        super(`Production Order Detail <${value.getProductionOrderDetalId()}> not found`)
    }
}