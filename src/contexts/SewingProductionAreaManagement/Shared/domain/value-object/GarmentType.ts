import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class GarmentType extends ValueObject<string> {
    constructor(value: string) {
        super(value)
        this.ensureValidValue(value)
    }

    private ensureValidValue(value: string) {
        if (value !== 'MOB' && value !== 'MOP' && value !== 'MOF')
            throw Error(`Value <${value}> not valid`)
    }
}