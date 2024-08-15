import { ProductionOrderId } from "../../domain/value-objects/ProductionOrderId";


export class ProductionOrderNotFoundOnDataBase extends Error {
    constructor(value: ProductionOrderId){
        super(`La OP <${value.value}> no fue encontrada en la base de datos`)
    }
}