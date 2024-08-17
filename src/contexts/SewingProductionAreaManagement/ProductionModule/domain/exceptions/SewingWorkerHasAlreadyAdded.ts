import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";

export class SewingWorkerHasAlreadyAdded extends Error {
    constructor(sewingWorkerId: ProductionModuleSewingWorkerId){
        super(`The Sewing Worker <${sewingWorkerId.value}> has already added`)
    }
}