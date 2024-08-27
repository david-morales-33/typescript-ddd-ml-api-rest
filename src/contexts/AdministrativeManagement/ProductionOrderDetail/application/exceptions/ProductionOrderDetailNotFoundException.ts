import { ProductionOrderId } from "../../../shared/domain/value-objects/ProductionOrderId";
import { ProductionOrderDetailId } from "../../domain/value-objects/ProductionOrderDetailId";

export class ProductionOrderDetailNotFoundException extends Error {
    constructor(productionOrderDetailId: ProductionOrderDetailId) {
        super(`The Production Order <${productionOrderDetailId.getProductionOrderDetalId()}> not found`)
    }
}