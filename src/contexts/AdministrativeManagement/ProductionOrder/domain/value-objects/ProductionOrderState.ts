import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderState extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value)
    }

    setInTrue(): ProductionOrderState {
        return new ProductionOrderState(true)
    }

    setInFalse(): ProductionOrderState {
        return new ProductionOrderState(false);
    }
}