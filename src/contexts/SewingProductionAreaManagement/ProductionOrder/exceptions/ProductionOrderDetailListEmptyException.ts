import { ProductionOrderId } from "../domain/value-objects/ProductionOrderId";

export class ProductionOrderDetailListEmptyException extends Error {
    constructor(value: ProductionOrderId){
        super(`<Production Order Detail List> were not provided in Production Order ${value.value}`)
    }
}