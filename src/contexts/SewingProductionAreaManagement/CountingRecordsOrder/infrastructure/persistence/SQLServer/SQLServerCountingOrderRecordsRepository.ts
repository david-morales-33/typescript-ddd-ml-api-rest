import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { CountingRecordsOrderViewDTO } from "../../../domain/data-transfer-object/CountingRecordsOrderViewDTO";
import { CountingRecordsOrderResponseRepository } from "../../../domain/repositories/CountingRecordsOrderResponseRepository";
import { CountingRecordsOrderId } from "../../../domain/value-objects/CountingRecordsOrderId";
import sql, { ConnectionPool } from 'mssql';


export class SQLServerCountingOrderRecordsRepository extends SQLServerRepository implements CountingRecordsOrderResponseRepository {

    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async find(countingRecordsOrderId: any): Promise<CountingRecordsOrderViewDTO | null> {
        console.log(countingRecordsOrderId)
        const params: Array<dbParameters> = [
            {
                name: 'offset',
                type: sql.Int,
                value: 0
            },
            {
                name: 'cantidad',
                type: sql.Int,
                value: 20
            }

        ]
        try {
            const result = await this.execute(params)
            console.log(result.recordset)
        } catch (error) {
            console.log(error)
        } finally {
            this.disconnection();
        }
        return new CountingRecordsOrderViewDTO('uaays-asas-a4s7-ruhebebaas-ttgtd',
            'MOP3547', 'MAR3548', 'XL', '1000', 'BLANCO', 80, '7777844544545', '12:20:14', '01:15:03', 1, 'PRIMERA', 1, 'MODULO-1', true, null, null, '1146441925', 'David Morales', new Date(), null, null, null, null)
    }

    async match(criteria: Criteria): Promise<CountingRecordsOrderViewDTO[]> {

        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters)
        console.log(persistenceFilters)
        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            [
                { name: 'operador_logico', type: sql.VarChar },
                { name: 'campo', type: sql.VarChar },
                { name: 'operador_comparacion', type: sql.VarChar },
                { name: 'valor', type: sql.VarChar },
            ]
        )
        const tvp_filds = this.createTVPTable(
            [
                { campo: 'ocr_id', alias: null },
                { campo: 'op', alias: null },
                { campo: 'referencia', alias: null },

            ],
            'tvp_gestion_ml_db_filtro_campo_solicitud',
            [
                { name: 'campo', type: sql.VarChar },
                { name: 'alias', type: sql.VarChar },
            ]
        )
        // console.log(tvp_filds)
        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_produccion_orden_conteo_registro'
            },
            {
                name: 'campos',
                type: sql.TVP,
                value: tvp_filds
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result = await this.execute(params)
            console.log(result.recordsets)
        } catch (error) {
            console.log(error)
        } finally {
            this.disconnection();
        }

        return [];
    }
}