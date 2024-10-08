import { ProductionOrderDetailViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderDetailViewDTO";

export interface ProductionOrderDetailPersistenceObject {
    op: string;
    referencia: string;
    tipo_referencia_id: number;
    tipo_referencia: string;
    tipo_proceso_id: number;
    tipo_proceso: string;
    tipo_op_id: string;
    tipo_op: string;
    color_id: string;
    color: string;
    talla: string;
    proceso: string;
    cantidad_unidades_planeadas_proceso: number;
    cantidad_unidades_ejecutadas_proceso: number;
    cantidad_unidades_restantes_proceso: number;
    fecha_creacion: string;
    fecha_apertura_proceso: string | null;
    fecha_cierre_proceso: string | null;
}

export class ProductionOrderDetailViewMapperDTO {
    static convertFromPersistenceObject(entity: ProductionOrderDetailPersistenceObject): ProductionOrderDetailViewDTO {
        return new ProductionOrderDetailViewDTO(
            entity.op,
            entity.color_id,
            entity.color,
            entity.talla,
            entity.referencia,
            entity.cantidad_unidades_planeadas_proceso,
            entity.cantidad_unidades_ejecutadas_proceso,
            entity.cantidad_unidades_restantes_proceso,
            true,
            'no asignado',
            'No asignado',
            'no asignado',
            entity.fecha_apertura_proceso,
            entity.fecha_cierre_proceso
        )
    }
}