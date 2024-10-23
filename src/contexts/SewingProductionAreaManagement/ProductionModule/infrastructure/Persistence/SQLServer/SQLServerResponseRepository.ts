import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { ProductionModuleViewDTO } from "../../../domain/data-transfer-object/ProductionModuleViewDTO";
import { ProductionModuleResponseRepository } from "../../../domain/repositories/ProductionModuleResponseRepository";
import { ProductionModuleId } from "../../../domain/value-objects/ProductionModuleId";
import sql from 'mssql'
import { ProductionModuleMapperDTO, ProductionModulePersistenceObject } from "../Mappers/ProductionModuleMapperDTO";

export class SQLServerResponseRepository extends SQLServerRepository implements ProductionModuleResponseRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async find(productionModuleId: ProductionModuleId): Promise<ProductionModuleViewDTO | null> {
        const filtros = Filters.fromValues([
            new Map([
                ['field', 'mdl_id'],
                ['operator', '='],
                ['value', productionModuleId.value.toString()]
            ]),
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
        const params: dbParameters[] = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_confeccion_modulo'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]

        try {
            const response: ProductionModulePersistenceObject[] = await this.execute(params);
            if (response.length === 0) return null;
            return ProductionModuleMapperDTO.convertFromPersistenceObject(response[0])
        } catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async searchAll(): Promise<ProductionModuleViewDTO[]> {
        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_confeccion_modulo'
            }
        ]

        try {
            const response: ProductionModulePersistenceObject[] = await this.execute(params);
            return response.map(ProductionModuleMapperDTO.convertFromPersistenceObject);
        } catch (error) { throw (error) }
        finally { this.disconnection() }
    }

    async matching(criteria: any): Promise<ProductionModuleViewDTO[]> {
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
                value: 'vw_gestion_ml_db_proceso_confeccion_modulo'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]

        try {
            const response: ProductionModulePersistenceObject[] = await this.execute(params);
            return response.map(ProductionModuleMapperDTO.convertFromPersistenceObject);
        } catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}