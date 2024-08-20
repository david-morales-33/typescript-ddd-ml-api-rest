import { ProductionModuleId } from "../../domain/value-objects/ProductionModuleId";

export class ProductionModuleAlreadyExistsException extends Error {
    constructor(value: ProductionModuleId) {
        super(`The Production Module Id <${value.value}> already exists`)
    }
}