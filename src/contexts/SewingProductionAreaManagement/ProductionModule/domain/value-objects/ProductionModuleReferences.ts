import { ReferenceId } from "../../../../Shared/domain/value-object/ReferenceId";

export class ProductionModuleReferences extends ReferenceId {
    constructor(value: string) {
        super(value)
    }
    setValue(value: string): ProductionModuleReferences {
        return new ProductionModuleReferences(value);
    }
}