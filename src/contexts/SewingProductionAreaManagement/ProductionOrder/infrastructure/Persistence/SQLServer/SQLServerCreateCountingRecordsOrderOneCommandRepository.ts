import { CountingRecordsOrderFirstQualityNotChecked } from "../../../../CountingRecordsOrder/domain/entities/CountingRecordOrderFirstQualityNotChecked";
import { TVPSchemeCountingRecordsOrderDetailOp } from "../TVPSchemes/TVPSchemeCountingRecordsOrderDetailOp";
import { TVPSchemeCountingRecordsOrderDetailOcr } from "../TVPSchemes/TVPSchemeCountingRecordsOrderDetailOcrts";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { ProductionOrderDetailInProgress } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailInProgress";
import { ProductionOrderDetailNotStarted } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderInProgress } from "../../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import sql from 'mssql'

export class SQLServerCreateCountingRecordsOrderOneCommandRepository extends SQLServerRepository implements ProductionOrderCommandRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_ocr_insersion';
    }
    async save(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): Promise<void> {
        const persistenceCountingRecordsOrder = this.convertCountingRecordsOrderToDataTVP(productionOrder.newRecordsOrderListFirstQuality);
        const productionOrderDetailFilter = this.findProductionOrdersDetailModified(productionOrder);
        const persistenceProductionOrderDetail = this.convertProductionOrderDetailToDataTVP(productionOrderDetailFilter);

        const tvp_counting_records_order_details = this.createTVPTable(
            persistenceCountingRecordsOrder,
            'tvp_gestion_ml_db_ocr_detalles_registro_insersion',
            TVPSchemeCountingRecordsOrderDetailOcr
        );

        const tvp_production_order_details = this.createTVPTable(
            persistenceProductionOrderDetail,
            'tvp_gestion_ml_db_ocr_detalles_op_insersion',
            TVPSchemeCountingRecordsOrderDetailOp
        );

        const params: dbParameters[] = [
            { name: 'id_op', type: sql.VarChar, value: productionOrder.productionOrderid.value },
            { name: 'creado_por', type: sql.VarChar, value: productionOrder.openByUser.value },
            { name: 'id_evt', type: sql.VarChar, value: null }, // revisar
            { name: 'id_ctg', type: sql.Int, value: 1 },
            { name: 'cantidad_unidades_actualizadas_op_maestra', type: sql.Int, value: productionOrder.executedAmount },
            { name: 'op_detalles', type: sql.TVP, value: tvp_production_order_details },
            { name: 'ocr_detalles', type: sql.TVP, value: tvp_counting_records_order_details },
            { name: 'fecha_apertura_proceso_op_maestra', type: sql.DateTime, value: productionOrder.processStartDate ? productionOrder.processStartDate.value : new Date() },
            { name: 'fecha_cierre_proceso_op_maestra', type: sql.DateTime, value: this.findProductionOrderProcessEndDate(productionOrder) },
        ];

        try { await this.execute(params) }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    private convertCountingRecordsOrderToDataTVP(details: CountingRecordsOrderFirstQualityNotChecked[]) {
        return details.map(entry => {
            return {
                id_ocr: entry.id.value,
                id_clr: entry.colorId.value,
                id_tll: entry.garmentSize.value,
                id_hrp: entry.productionScheduleId.value,
                cantidad_registros: entry.recordsAmount.value,
                inicio_operacion: entry.initialTime.value,
                fin_operacion: entry.finalTime.value
            }
        })
    }

    private convertProductionOrderDetailToDataTVP(detail: (ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[]) {
        return detail.map(entry => {
            if (entry.toPrimitives().className === 'ProductionOrderDetail.notStartedDTO') {
                const detail = entry as ProductionOrderDetailNotStarted;
                return {
                    clr_id: detail.colorId.value,
                    tll_id: detail.garmentSize.value,
                    fecha_apertura_proceso_op_detalles: detail.processStartDate ? detail.processStartDate.value : new Date(),
                    fecha_cierre_proceso_op_detalles: null,
                    cantidad_registros_actualizados_op_detalles: detail.recordsOrderCounter.value,
                    cantidad_unidades_actualizadas_op_detalles: detail.executedAmount.value
                }
            }
            else {
                const detail = entry as ProductionOrderDetailInProgress;
                return {
                    clr_id: detail.colorId.value,
                    tll_id: detail.garmentSize.value,
                    fecha_apertura_proceso_op_detalles: detail.processStartDate,
                    fecha_cierre_proceso_op_detalles: detail.processEndDate ? detail.processEndDate.value : null,
                    cantidad_registros_actualizados_op_detalles: detail.recordsOrderCounter.value,
                    cantidad_unidades_actualizadas_op_detalles: detail.executedAmount.value
                }
            }
        })
    }

    private findProductionOrdersDetailModified(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): (ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[] {
        let modifiedElements: (ProductionOrderDetailNotStarted | ProductionOrderDetailInProgress)[] = []
        productionOrder.newRecordsOrderListFirstQuality.forEach(entry => {
            const elementfinded = productionOrder.productionOrderDetailList.find(element => element.colorId.value === entry.colorId.value && element.garmentSize.value === entry.garmentSize.value);

            if (!modifiedElements.some(element => element.colorId.value === entry.colorId.value && element.garmentSize.value === entry.garmentSize.value) && elementfinded !== undefined) {
                modifiedElements = [...modifiedElements, elementfinded]
            }
        })
        return modifiedElements;
    }

    private findProductionOrderProcessEndDate(productionOrder: ProductionOrderNotStarted | ProductionOrderInProgress): Date | null {
        if (productionOrder.toPrimitives().className === 'ProductionOrder.inProgressDTO') {
            const entity = productionOrder as ProductionOrderInProgress;
            if (entity.processEndDate !== null) { return entity.processEndDate.value }
            return null;
        }
        return null;
    }
} 