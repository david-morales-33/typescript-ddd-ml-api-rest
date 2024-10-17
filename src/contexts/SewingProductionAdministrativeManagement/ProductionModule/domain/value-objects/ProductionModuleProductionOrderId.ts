import { ProductionOrderId } from "../../../../Shared/domain/value-object/ProductionOrderId";

export class ProductionModuleProductionOrderId extends ProductionOrderId {
    constructor(value: string){
        super(value)
    }
    setValue(value: string): ProductionModuleProductionOrderId {
        return new ProductionModuleProductionOrderId(value);
    }
}