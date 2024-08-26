import { ProductionModuleEvent } from "../entities/ProductionModuleEvent";

export interface ProductionModuleEventRepository{
    search(): Promise<ProductionModuleEvent[]>;
}