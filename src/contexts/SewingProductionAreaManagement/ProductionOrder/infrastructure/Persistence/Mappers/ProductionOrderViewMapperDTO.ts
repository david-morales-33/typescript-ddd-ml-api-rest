import { ProductionOrderViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderViewDTO";

export interface ProductionOrderPersistenceObject {
    op: string;
    referencia: string;
    tipo_referencia_id: number;
    tipo_referencia: string;
    tpo_proceso_id: number;
    tipo_proceso: string;
    tipo_op_id: number;
    tipo_op: string;
    proceso_id: number;
    proceso: string;
    cantidad_unidades_planeadas_proceso: number;
    cantidad_unidades_ejecutadas_proceso: number
    cantidad_unidades_restantes_proceso: number;
    fecha_creacion: string;
    estado_op: number | null;
    fecha_apertura_proceso: string;
    fecha_cierre_proceso: string
}

export class ProductionOrderViewMapperDTO {
    static convertFromPersistenceObject(entity: ProductionOrderPersistenceObject): ProductionOrderViewDTO {
        return new ProductionOrderViewDTO(
            entity.op,
            entity.referencia,
            0,
            entity.cantidad_unidades_planeadas_proceso,
            entity.cantidad_unidades_ejecutadas_proceso,
            entity.cantidad_unidades_restantes_proceso,
            true,
            'No asignado',
            'No asignado',
            'No asignado',
            entity.fecha_apertura_proceso,
            entity.fecha_cierre_proceso
        )
    }
}