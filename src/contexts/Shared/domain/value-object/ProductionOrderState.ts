import { ValueObject } from "./ValueObject";

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