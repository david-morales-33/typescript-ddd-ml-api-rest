import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";

export class ColorLabel extends ValueObject<string>{
    constructor(value: string){
        super(value)
        this.ensureLengthLessThan50Characteres(value)
    }

    private ensureLengthLessThan50Characteres(value: string){
        if(value.length >50)
            throw new Error(`The Color Label <${value}> has more than 50 characteres`);
    }

    setValue(value: string): ColorLabel {
        return new ColorLabel(value)
    }
}