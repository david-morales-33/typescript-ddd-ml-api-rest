import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { SQLServerRepository, dbParameters } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { ProductionOrderViewDTO } from "../../../domain/data-transfer-objects/ProductionOrderViewDTO";
import { ProductionOrderResponseRepository } from "../../../domain/repositories/ProductionOrderResponseRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import sql from 'mssql';
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { ProductionOrderPersistenceObject, ProductionOrderViewMapperDTO } from "../Mappers/ProductionOrderViewMapperDTO";

export class SQLServerProductionOrderResponseRepository extends SQLServerRepository implements ProductionOrderResponseRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderViewDTO | null> {
        const filtros = Filters.fromValues([
            new Map([['field', 'op'], ['operator', '='], ['value', productionOrderId.value]]),
        ]);
        const orden = Order.fromValues();
        const criteria = new Criteria(filtros, orden);
        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters);

        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )
        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_produccion_orden_produccion_maestra'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result: ProductionOrderPersistenceObject[] = await this.execute(params);
            if(result.length===0)
                return null;
            return ProductionOrderViewMapperDTO.convertFromPersistenceObject(result[0])
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async searchAll(): Promise<ProductionOrderViewDTO[]> {
        const params: Array<dbParameters> = [{
            name: 'entidad',
            type: sql.VarChar,
            value: 'vw_gestion_ml_db_proceso_produccion_orden_produccion_maestra'
        }]
        try {
            const result: ProductionOrderPersistenceObject[] = await this.execute(params)
            return result.map(ProductionOrderViewMapperDTO.convertFromPersistenceObject);
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async match(criteria: Criteria): Promise<ProductionOrderViewDTO[]> {
        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters);
        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )

        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_produccion_orden_produccion_maestra'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result: ProductionOrderPersistenceObject[] = await this.execute(params)
            return result.map(ProductionOrderViewMapperDTO.convertFromPersistenceObject);
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}