import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionModuleSewingWorkerId extends ValueObject<string>{
    constructor(value : string){
        super(value)
        this.ensureValueLenght(value);
    }

    private ensureValueLenght(value: string){
        if(value.length!==3){
            throw new Error (`The value lenght of <${value}> is different to 3`)
        }
    }
}