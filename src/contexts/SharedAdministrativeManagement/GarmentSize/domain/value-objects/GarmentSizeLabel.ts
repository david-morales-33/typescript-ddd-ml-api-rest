import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";
import { GarmentSize } from "../../../../Shared/domain/value-object/GarmentSize";

export class GarmentSizeLabel  extends GarmentSize{ 
    constructor(value: string){
        super(value)
    }
    setValue(value:string){
        return new GarmentSizeLabel(value)
    }
}