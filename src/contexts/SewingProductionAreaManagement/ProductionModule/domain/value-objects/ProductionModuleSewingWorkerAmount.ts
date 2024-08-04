import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionModuleSewingWorkerCounter extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value)
    }

    private ensurePositiveValue(value: number) {
        if (value < 0)
            throw new Error('The Sewing Worker Counter is less than 0')
    }

    increment(): ProductionModuleSewingWorkerCounter {
        return new ProductionModuleSewingWorkerCounter(this.value + 1);
    }

    decrement(): ProductionModuleSewingWorkerCounter {
        return new ProductionModuleSewingWorkerCounter(this.value - 1);
    }

    static initialize(): ProductionModuleSewingWorkerCounter {
        return new ProductionModuleSewingWorkerCounter(0);
    }
}