import { ProductionOrderDetailInProgressDTO } from "../../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailInProgressDTO";
import { ProductionOrderDetailNotStartedDTO } from "../../../../ProductionOrderDetail/domain/data-transfer-objects/ProductionOrderDetailNotStartedDTO";
import { ProductionOrderINotStartedDTO } from "../../../domain/data-transfer-objects/ProductionOrderINotStartedDTO";
import { ProductionOrderInProgressDTO } from "../../../domain/data-transfer-objects/ProductionOrderInProgressDTO";
import { ProductionOrderInProgress } from "../../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";

export interface ProductionOrderPersistenceObject {
    op: string;
    referencia: string;
    tipo_referencia_id: number;
    tipo_referencia: string;
    tpo_proceso_id: number;
    tipo_proceso: string;
    tipo_op_id: string;
    tipo_op: string;
    proceso_id: number;
    proceso: string;
    cantidad_unidades_planeadas_proceso: string;
    cantidad_unidades_ejecutadas_proceso: string
    cantidad_unidades_restantes_proceso: number;
    fecha_creacion: string;
    estado_op: number | null;
    fecha_apertura_proceso: Date;
    fecha_cierre_proceso: Date
}

export class ProductionOrderQueryMapperDTO {
    static convertFromPersistenceObject(
        entity: ProductionOrderPersistenceObject,
        childs: (ProductionOrderDetailInProgressDTO | ProductionOrderDetailNotStartedDTO)[]
    ): ProductionOrderNotStarted | ProductionOrderInProgress {
        if (entity.fecha_apertura_proceso === null) {

            const ProductionOrderDetail = childs as ProductionOrderDetailNotStartedDTO[];

            return ProductionOrderNotStarted.fromPrimitives(
                new ProductionOrderINotStartedDTO(
                    entity.op,
                    entity.referencia,
                    entity.tipo_op_id,
                    29,
                    parseInt(entity.cantidad_unidades_planeadas_proceso),
                    parseInt(entity.cantidad_unidades_ejecutadas_proceso),
                    entity.fecha_apertura_proceso || null,
                    0,
                    ProductionOrderDetail,
                    'Not Asignado'
                )
            )
        }
        else {
            return ProductionOrderInProgress.fromPrimitives(
                new ProductionOrderInProgressDTO(
                    entity.op,
                    entity.referencia,
                    entity.tipo_op_id,
                    29,
                    parseInt(entity.cantidad_unidades_planeadas_proceso),
                    parseInt(entity.cantidad_unidades_ejecutadas_proceso),
                    entity.fecha_apertura_proceso,
                    entity.fecha_cierre_proceso,
                    0,
                    0,
                    '1146441925',
                    childs
                )
            )
        }
    }
}