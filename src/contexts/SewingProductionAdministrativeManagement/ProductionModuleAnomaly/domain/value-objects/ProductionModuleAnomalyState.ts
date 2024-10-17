import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleAnomalyState extends ValueObject<boolean> {
    constructor(value: boolean) {
        super(value);
    }

    setToEnable(): ProductionModuleAnomalyState {
        this.ensureProductionModuleAnomalyState(true);
        return new ProductionModuleAnomalyState(true);
    }

    setToDisable(): ProductionModuleAnomalyState {
        this.ensureProductionModuleAnomalyState(false);
        return new ProductionModuleAnomalyState(false);
    }

    private ensureProductionModuleAnomalyState(value: boolean): void {
        if (this.value === value)
            throw new Error(`The <Production Module Anomaly State> has already been to <${value}>`)
    }
}