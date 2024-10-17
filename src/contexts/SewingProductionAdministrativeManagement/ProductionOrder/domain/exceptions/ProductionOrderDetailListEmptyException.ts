import { ProductionOrderId } from '../../../../Shared/domain/value-object/ProductionOrderId';

export class ProductionOrderDetailListEmptyException extends Error {
    constructor(value: ProductionOrderId){
        super(`<Production Order Detail List> were not provided in Production Order ${value.value}`)
    }
}