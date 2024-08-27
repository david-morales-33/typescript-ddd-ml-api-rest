import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderId extends ValueObject<string> {
    constructor(value: string) {
        super(value)
        this.ensureValidateContent(value);
        this.ensureLengthIsMoreThan4Characters(value);
    }

    private ensureValidateContent( value : string){
        if (!(value.includes('MOP') || value.includes('MOB') || value.includes('MOC')))
            throw Error('Value object not valid');
    }

    private ensureLengthIsMoreThan4Characters (value :string){
        if (value.length < 4)
            throw Error(`The Production Order Id <${value}> has less 4 characters`);
    }
}