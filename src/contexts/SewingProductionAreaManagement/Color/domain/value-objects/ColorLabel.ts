import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ColorLabel extends ValueObject<string>{
    constructor(value: string ){
        super(value)
        this.ensureLengthIsLessThan20Characters(value)
    }
    
    private ensureLengthIsLessThan20Characters (value :string){
        if (value.length > 20)
            throw Error(`The Color label <${value}> has more 4 characters`);
    }
}