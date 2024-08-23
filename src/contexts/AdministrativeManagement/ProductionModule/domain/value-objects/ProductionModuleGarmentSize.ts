import { GarmentSize } from "../../../shared/domain/value-objects/GarmentSize";

export class ProductionModuleGarmentSize extends GarmentSize {

    constructor(value: string) {
        super(value)
    }

    setValue(value: string): ProductionModuleGarmentSize {
        return new ProductionModuleGarmentSize(value);
    }
}