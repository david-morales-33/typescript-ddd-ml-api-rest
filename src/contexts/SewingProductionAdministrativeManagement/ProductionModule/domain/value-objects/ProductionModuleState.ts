import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleState extends ValueObject<boolean> {
    constructor(value: boolean){
        super(value)
    }

    setInTrue() : ProductionModuleState{
        return new ProductionModuleState(true);
    }

    setInFalse() : ProductionModuleState{
        return new ProductionModuleState(false);
    }

}