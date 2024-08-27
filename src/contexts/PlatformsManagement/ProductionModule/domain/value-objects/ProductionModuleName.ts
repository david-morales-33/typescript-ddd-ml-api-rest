import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionModuleName extends ValueObject<string>{
    constructor(value: string){
        super(value);
        this.ensureLengthIsLessThan50Characters(value)
    }
    private ensureLengthIsLessThan50Characters(value: string): void {
        if (value.length !== 2) {
            throw new Error(`The event process Id <${value}> has more than 50 characters`);
        }
    }
}