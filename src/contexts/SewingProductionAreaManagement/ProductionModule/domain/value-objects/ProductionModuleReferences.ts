import { ProductionOrderReference } from "../../../ProductionOrder/domain/value-objects/ProductionOrderReference";

export class ProductionModuleReferences extends ProductionOrderReference {
    constructor(value: string) {
        super(value)
    }
    setValue(value: string): ProductionModuleReferences {
        return new ProductionModuleReferences(value);
    }
}