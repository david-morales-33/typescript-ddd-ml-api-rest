import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { ProductionOrderDetailNotStarted } from "../../../../ProductionOrderDetail/domain/entities/ProductionOrderDetailNotStarted";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderCommandRepository } from "../../../domain/repositories/ProductionOrderCommandRepository";
import { TVPSchemeProductionOrderDetails } from "../TVPSchemes/TVPSchemeProductionOrderDetails";
import sql from 'mssql';

export class SQLServerCreateProductionOrderCommandRepository extends SQLServerRepository implements ProductionOrderCommandRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_op_insersion';
    }

    async save(productionOrder: ProductionOrderNotStarted): Promise<void> {
        const persistenceDetails = this.convertProductionOrderDetailToDataTVP(productionOrder.productionOrderDetailList);
        const tvp_details = this.createTVPTable(
            persistenceDetails,
            'tvp_gestion_ml_db_op_detalles_insersion',
            TVPSchemeProductionOrderDetails
        );
        const params: dbParameters[] = [
            {
                name: 'id_op',
                type: sql.VarChar,
                value: productionOrder.productionOrderid.value
            },
            {
                name: 'id_referencia',
                type: sql.VarChar,
                value: productionOrder.reference.value
            },
            {
                name: 'tipo_prenda',
                type: sql.VarChar,
                value: ''
            },
            {
                name: 'id_modulo',
                type: sql.VarChar,
                value: ''
            },
            {
                name: 'creado_por',
                type: sql.VarChar,
                value: productionOrder.openByUser.value
            },
            {
                name: 'detalles',
                type: sql.TVP,
                value: tvp_details
            },
        ]

    }

    private convertProductionOrderDetailToDataTVP(details: ProductionOrderDetailNotStarted[]) {
        return details.map(entry => {
            return {
                id_talla: entry.garmentSize.value,
                id_color: entry.colorId.value,
                color_etiqueta: '',              //modificar
                ean: entry.ean.value,
                cantidad_unidades_planeadas: entry.plannedAmount.value
            }
        })
    }
}