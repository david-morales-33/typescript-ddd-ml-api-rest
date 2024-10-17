import { ValueObject } from "./ValueObject";

export class CountingRecordsOrderAmount extends ValueObject<number>{
    constructor(value: number) {
        super(value)
        this.ensurePositiveValue(value)
    }
    private ensurePositiveValue(value: number): void {
        if (value< 1) {
            throw new Error(`The Records Amount <${value}> is not valid`);
        }
    }
}


