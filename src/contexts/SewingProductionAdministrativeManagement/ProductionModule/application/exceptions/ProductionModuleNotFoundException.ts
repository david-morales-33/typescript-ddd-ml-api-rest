import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";

export class ProductionModuleNotFoundException extends Error {
    constructor(value : ProductionModuleId){
        super(`The Production Module <${value.value}> not found`)
    }
}