import { CountingRecordsOrderEventIdOnProductionModule } from "../../../CountingRecordsOrder/domain/value-objects/CountingRecordsOrderEventIdOnProductionModule";
import { ProductionModuleEventRoot } from "../entities/ProductionModuleEventRoot";


export interface ProductionModuleEventRepository {
    find(productionModuleId: CountingRecordsOrderEventIdOnProductionModule): Promise<ProductionModuleEventRoot | null | undefined>
    searchAll(): Promise<ProductionModuleEventRoot[]>;
}