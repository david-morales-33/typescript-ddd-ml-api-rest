import { ProductionModuleEventDTO } from "../../../domain/data-transfer-objects/ProductionModuleEventDTO";
import { ProductionModuleEvent } from "../../../domain/entities/ProductionModuleEvent";

export interface ProductionModuleEventPersistenceObject {
    evt_id: string;
    etiqueta: string;
    estado: boolean;
}

export class ProductionModuleEventMapperDTO {
    static convertFromPersistenceObject(entity: ProductionModuleEventPersistenceObject): ProductionModuleEvent {
        return ProductionModuleEvent.fromPrimitives({
            id: entity.evt_id,
            name: entity.etiqueta,
            state: entity.estado
        });
    }
}