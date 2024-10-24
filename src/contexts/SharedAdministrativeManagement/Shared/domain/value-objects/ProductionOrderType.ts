import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ProductionOrderType extends ValueObject<string> {
    constructor(value: string) {
        super(value);
        this.ensureValidateContent(value)
    }

    private ensureValidateContent(value: string) {
        if (!(value.includes('MOP') || value.includes('MOB') || value.includes('MOC')))
            throw Error('Value object not valid');
    }
}