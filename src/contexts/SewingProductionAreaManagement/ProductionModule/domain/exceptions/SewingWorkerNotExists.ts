import { ProductionModuleSewingWorkerId } from "../value-objects/ProductionModuleSewingWorkerId";

export class SewingWorkerNotExists extends Error {
    constructor(sewingWorkerId: ProductionModuleSewingWorkerId){
        super(`The Sewing Worker <${sewingWorkerId.value}> was not added`)
    }
}