import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionModuleMachineAmount extends ValueObject<number> {
    constructor(value: number) {
        super(value);
        this.ensurePositiveValue(value);
    }
    private ensurePositiveValue(value: number) {
        if (value < 0)
            throw new Error(`The Machine Amount <${this.value}> is negative`);
    }

    setValue(value: number){
        return new ProductionModuleMachineAmount(value);
    }
}