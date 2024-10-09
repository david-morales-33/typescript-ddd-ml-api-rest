import { ProductionOrderDetailInProgress } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { CountingRecordsOrderIdDTO} from "./CountingRecordsOrderIdMapperDTO";

export interface ProductionOrderDetailPersistenceObject {
    opd_id: string;
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
    ean: string;
    proceso: string;
    cantidad_unidades_planeadas_proceso: string;
    cantidad_unidades_ejecutadas_proceso: string;
    cantidad_unidades_restantes_proceso: string;
    fecha_creacion: string;
    fecha_apertura_proceso: Date | null;
    fecha_cierre_proceso: string | null;
}

export class ProductionOrderDetailQueryMapperDTO {
    static convertFromPersistenceObject(
        entity: ProductionOrderDetailPersistenceObject,
        childs: CountingRecordsOrderIdDTO[]
    ): ProductionOrderDetailInProgress | ProductionOrderDetailNotStarted {
        if (entity.fecha_apertura_proceso === null) {
            return ProductionOrderDetailNotStarted.fromPrimitives({
                productionOrderId: entity.op,
                plannedAmount: parseInt(entity.cantidad_unidades_planeadas_proceso),
                colorId: entity.color_id,
                garmentSize: entity.talla,
                ean: entity.ean
            })

        } else {
            const countingRecordsOrderIdList = childs.
                filter(elem => elem.colorId === entity.color_id && elem.garmentSizeId === entity.talla).
                map((entry) => entry.countingRecordsOrderId)

            return ProductionOrderDetailInProgress.fromPrimitives({
                productionOrderDetailId: entity.opd_id,
                productionOrderId: entity.op,
                plannedAmount: parseInt(entity.cantidad_unidades_planeadas_proceso),
                executedAmount: parseInt(entity.cantidad_unidades_ejecutadas_proceso),
                ean: entity.ean,
                colorId: entity.color_id,
                garmentSize: entity.talla,
                countingRecordsOrderListId: countingRecordsOrderIdList,
                countingRecordsOrderCheckedListId: [],
                recordsOrderCounter: 0,
                recordsOrderCheckedCounter: 0,
                processStartDate: entity.fecha_apertura_proceso,
            })
        }
    }
}