import { UserId } from "../../../User/domain/value-objects/UserId";


export class ProductionModuleSupervisorId extends UserId {
    constructor(value: string){
        super(value)
    }

    setValue(value: string): ProductionModuleSupervisorId {
        return new ProductionModuleSupervisorId(value);
    }
}