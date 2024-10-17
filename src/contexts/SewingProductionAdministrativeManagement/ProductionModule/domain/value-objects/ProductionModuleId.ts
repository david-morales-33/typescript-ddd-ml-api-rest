import { ValueObject } from "../../../../Shared/domain/value-object/ValueObject";


export class ProductionModuleId extends ValueObject<number> {
    constructor(value: number){
        super(value)
        this.ensureProductionModuleExisting(value);
    }

    private ensureProductionModuleExisting(value: number){
        if(value<1 || value >30){
            throw new Error(`The production module <${value}> not exists`);
        }
    }
}