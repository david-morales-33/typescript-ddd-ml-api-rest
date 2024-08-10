import { ProductionOrderDetailId } from "../../../ProductionOrderDetail/domain/value-objects/ProductionOrderDetailId";

export class ProductionOrderDetailHasAlreadyBeenAddException extends Error {
    constructor(value: ProductionOrderDetailId){
        super(`The Production Order Detail <${value.getProductionOrderDetalId()}> has already been added`)
    }
}