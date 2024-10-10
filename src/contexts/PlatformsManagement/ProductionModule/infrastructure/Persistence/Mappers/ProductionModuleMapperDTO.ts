import { ProductionModuleDTO } from "../../../domain/data-transfer-objects/ProductionModuleDTO";
import { ProductionModule } from "../../../domain/entities/ProductionModule";

export interface ProductionOrderPersistenceObject {
    mdl_id: number;
    modulo: string;
    estado: boolean;
}

export class ProductionModuleMapperDTO {
    static convertFromPersistenceObject(entity: ProductionOrderPersistenceObject): ProductionModule {
        return ProductionModule.fromPrimitives(new ProductionModuleDTO(entity.mdl_id, entity.modulo, entity.estado))
    }
}