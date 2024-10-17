import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleAnomalyName extends ValueObject<string>{
    constructor(value: string){
        super(value);
        this.ensureLengthIsLessThan50Characters(value)
    }
    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length > 50) {
            throw new Error(`The event process Id <${value}> has more than 50 characters`);
        }
    }
}