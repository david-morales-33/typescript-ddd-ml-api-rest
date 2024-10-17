import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";

export class CountingRecordsOrderListEmptyException extends Error {
    constructor(value: ProductionOrderDetailId) {
        super(`<Counting Records Order Id List> was not provided in Production Order Detail <${value.getProductionOrderDetalId()}>`)
    }
}