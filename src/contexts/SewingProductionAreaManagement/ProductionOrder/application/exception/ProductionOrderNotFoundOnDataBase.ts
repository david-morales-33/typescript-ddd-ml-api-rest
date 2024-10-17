import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";

export class ProductionOrderNotFoundOnDataBase extends Error {
    constructor(value: ProductionOrderId){
        super(`La OP <${value.value}> no fue encontrada en la base de datos`)
    }
}