import { ProductionOrderDetailId } from "../value-objects/ProductionOrderDetailId";

export class CountingRecordsOrderHasAlreadyBeenAddedException extends Error {
    constructor(value: ProductionOrderDetailId) {
        super(`Counting Records Order has already been added in production order detail <${value.getProductionOrderDetalId()}>`);
    }
}