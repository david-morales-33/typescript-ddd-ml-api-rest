import { CountingRecordsOrderEventIdOnProductionModule } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { ProductionModuleEvent } from "../entities/ProductionModuleEvent";

export interface ProductionModuleEventQueryRepository {
    find(productionModuleEventId: CountingRecordsOrderEventIdOnProductionModule): Promise<ProductionModuleEvent | null>
}