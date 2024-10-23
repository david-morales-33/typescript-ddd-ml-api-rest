import { ProductionModuleViewDTO } from "../../../domain/data-transfer-object/ProductionModuleViewDTO";

export interface ProductionModulePersistenceObject {
    mdl_id: number;
    modulo: string;
    maquinas_catidad: number;
    estado_operacion: boolean;
    op_actual: string | null;
    referencia_actual: string | null;
    color_actual: string | null;
    talla_actual: string | null;
    fecha_ultima_modificacion: Date | null;
    sam_actual: number | null;
    eventualidad_actual: string | null;
}

export class ProductionModuleMapperDTO {
    static convertFromPersistenceObject(entity: ProductionModulePersistenceObject): ProductionModuleViewDTO {
        return new ProductionModuleViewDTO(
            entity.mdl_id,
            entity.maquinas_catidad,
            entity.estado_operacion,
            0,
            entity.op_actual || 'No Asignado',
            entity.referencia_actual || 'No Asignado',
            entity.talla_actual || 'No Asignado',
            entity.color_actual || 'No Asignado',
            entity.eventualidad_actual,
            'No Asignado'
        )
    }
}