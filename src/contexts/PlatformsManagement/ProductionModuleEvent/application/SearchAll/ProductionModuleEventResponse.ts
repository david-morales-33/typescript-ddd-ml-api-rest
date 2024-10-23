import { Response } from "../../../../Shared/domain/CQRS/Response";
import { ProductionModuleEventDTO } from "../../domain/data-transfer-objects/ProductionModuleEventDTO";
import { ProductionModuleEvent } from "../../domain/entities/ProductionModuleEvent";

export class ProductionModuleEventResponse implements Response{
    public readonly productionModuleEvents: ProductionModuleEventDTO[];
    constructor(productionModuleEvents: ProductionModuleEvent[]) {
        this.productionModuleEvents = productionModuleEvents.map(entry => entry.toPrimitives());
    }
}