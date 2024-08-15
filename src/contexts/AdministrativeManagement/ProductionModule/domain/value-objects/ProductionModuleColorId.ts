import { ColorId } from "../../../shared/domain/value-objects/ColorId";

export class ProductionModuleColorId extends ColorId {
    constructor(value: string) {
        super(value)
    }

    setValue(value: string): ProductionModuleColorId {
        return new ProductionModuleColorId(value);
    }
}