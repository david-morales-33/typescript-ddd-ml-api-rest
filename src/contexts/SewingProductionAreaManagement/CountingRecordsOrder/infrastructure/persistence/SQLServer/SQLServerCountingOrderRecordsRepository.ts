import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFields } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFields";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";
import { CountingRecordsOrderResponseRepository } from "../../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";
import sql from 'mssql';
import { CountingRecordsOrderViewMapperDTO, PersistenceObject } from "../Mappers/CountingRecordsOrderViewMapperDTO";
import { TVPSchemeCountingRecordsOrder } from "../TVPSchemes/TVPSchemeCountingRecordsOrder";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";


export class SQLServerCountingOrderRecordsRepository extends SQLServerRepository implements CountingRecordsOrderResponseRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async find(countingRecordsOrderId: CountingRecordsOrderId): Promise<CountingRecordsOrderViewDTO | null> {
        const filtros = Filters.fromValues([
            new Map([['field', 'ocr_id'], ['operator', '='], ['value', countingRecordsOrderId.value]]),
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
                value: 'vw_gestion_ml_db_proceso_produccion_orden_conteo_registro'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result: PersistenceObject[] = await this.execute(params);
            if(result.length===0)
                return null;
            return CountingRecordsOrderViewMapperDTO.convertFromPersistenceObject(result[0])
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async match(criteria: Criteria): Promise<CountingRecordsOrderViewDTO[]> {
        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters);

        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )

        const tvp_filds = this.createTVPTable(
            TVPSchemeCountingRecordsOrder,
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
        ]
        try {
            const result: PersistenceObject[] = await this.execute(params)
            return result.map(CountingRecordsOrderViewMapperDTO.convertFromPersistenceObject);
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}