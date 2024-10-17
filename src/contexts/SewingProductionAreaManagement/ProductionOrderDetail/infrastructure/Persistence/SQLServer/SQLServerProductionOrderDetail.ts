import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { ProductionOrderDetailViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderDetailViewDTO";
import { ProductionOrderDetailResponseRepository } from "../../../domain/repositories/ProductionOrderDetailResponseRepository";
import sql from 'mssql';
import { ProductionOrderDetailPersistenceObject, ProductionOrderDetailViewMapperDTO } from "../Mappers/ProductionOrderDetailViewMapperDTO";
import { ProductionOrderId } from "../../../../../Shared/domain/value-object/ProductionOrderId";

export class SQLServerProductionOrderDetail extends SQLServerRepository implements ProductionOrderDetailResponseRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderDetailViewDTO[] | null> {
        const filtros = Filters.fromValues([
            new Map([['field', 'op'], ['operator', '='], ['value', productionOrderId.value]]),
        ]);
        const orden = Order.fromValues();
        const criteria = new Criteria(filtros, orden);
        const domainFilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainFilters);

        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )

        const params: dbParameters[] = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_confeccion_orden_produccion_detalles'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result: ProductionOrderDetailPersistenceObject[] = await this.execute(params);
            if (result.length === 0)
                return null;
            return result.map(ProductionOrderDetailViewMapperDTO.convertFromPersistenceObject)
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async searchAll(): Promise<ProductionOrderDetailViewDTO[]> {

        const params: dbParameters[] = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_confeccion_orden_produccion_detalles'
            }
        ]
        try {
            const result: ProductionOrderDetailPersistenceObject[] = await this.execute(params);
            return result.map(ProductionOrderDetailViewMapperDTO.convertFromPersistenceObject)
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}