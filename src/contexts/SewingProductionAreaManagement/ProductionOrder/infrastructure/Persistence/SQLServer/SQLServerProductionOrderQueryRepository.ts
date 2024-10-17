import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { ProductionOrderInProgress } from "../../../domain/entities/ProductionOrderInProgress";
import { ProductionOrderNotStarted } from "../../../domain/entities/ProductionOrderNotStarted";
import { ProductionOrderQueryRepository } from "../../../domain/repositories/ProductionOrderQueryRepository";
import { ProductionOrderId } from "../../../domain/value-objects/ProductionOrderId";
import sql from 'mssql';
import { ProductionOrderQueryMapperDTO } from "../Mappers/ProductionOrderQueryMapperDTO";
import { ProductionOrderPersistenceObject } from "../Mappers/ProductionOrderQueryMapperDTO";
import { TVPSchemeCountingRecordsOrderIdList } from "../TVPSchemes/TVPSchemeCountingRecordsOrderId";
import { TVPSchemeFields } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFields";
import { CountingRecordsOrderIdDTO, CountingRecordsOrderIdMapperDTO, CountingRecordsOrderIdPersistenceObject } from "../Mappers/CountingRecordsOrderIdMapperDTO";
import { ProductionOrderDetailPersistenceObject, ProductionOrderDetailQueryMapperDTO } from "../Mappers/ProductionOrderDetailQueryMapperDTO";

export class SQLServerProductionOrderQueryRepository extends SQLServerRepository implements ProductionOrderQueryRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async find(productionOrderId: ProductionOrderId): Promise<ProductionOrderNotStarted | ProductionOrderInProgress | null> {

        const filtros = Filters.fromValues([
            new Map([['field', 'op'], ['operator', '='], ['value', productionOrderId.value]]),
            new Map([['field', 'proceso_id'], ['operator', '='], ['value', '4']]),
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
            const result1 = await this.getProductionOrderDetailsById(productionOrderId.value)
            const result: ProductionOrderPersistenceObject[] = await this.execute(params);
            if (result.length === 0)
                return null;
            const productionOrder = ProductionOrderQueryMapperDTO.convertFromPersistenceObject(result[0], result1.map(entry => entry.toPrimitives()));
            return productionOrder;
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    private async getProductionOrderDetailsById(productionOrderId: string) {
        const filtros = Filters.fromValues([
            new Map([['field', 'op'], ['operator', '='], ['value', productionOrderId]])
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
                value: 'vw_gestion_ml_db_proceso_confeccion_orden_produccion_detalles'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            }
        ];
        try {
            const result: ProductionOrderDetailPersistenceObject[] = await this.execute(params);
            const CountingRecordsOrdeIdList = await this.getCountingRecordsOrderByOp(productionOrderId)
            return result.map(entry => ProductionOrderDetailQueryMapperDTO.convertFromPersistenceObject(entry, CountingRecordsOrdeIdList));
        }
        catch (error) { throw (error) }

    }

    private async getCountingRecordsOrderByOp(productionOrderId: string): Promise<CountingRecordsOrderIdDTO[] | []> {
        const filtros = Filters.fromValues([
            new Map([['field', 'op'], ['operator', '='], ['value', productionOrderId]])
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

        const tvp_fields = this.createTVPTable(
            TVPSchemeCountingRecordsOrderIdList,
            'tvp_gestion_ml_db_filtro_campo_solicitud',
            TVPSchemeFields
        )

        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_produccion_orden_conteo_registro'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
            {
                name: 'campos',
                type: sql.TVP,
                value: tvp_fields
            }
        ]
        try {
            const result: CountingRecordsOrderIdPersistenceObject[] = await this.execute(params);
            return result.map(CountingRecordsOrderIdMapperDTO.convertFromPersistenceObject)
        }
        catch (error) { throw (error) }

    }
}