import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFields } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFields";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { Operation } from "../../../domain/entities/Operation";
import { OperationRepository } from "../../../domain/repositories/OperationRepository";
import { OperationMapperDTO, OperationPersistenceObject } from "../Mappers/OperationMapperDTO";
import { TVPSchemeOperation } from "../TVPSchemes/TVPSchemeOperation";
import sql from 'mssql';

export class SQLServerOperationRepository extends SQLServerRepository implements OperationRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async match(criteria: Criteria): Promise<Operation[]> {
        const domainfilters = this.criteriaConverter.convert(criteria);
        const persistenceFilters = this.convertToPersistenceFilters(domainfilters);

        const tvp_filters = this.createTVPTable(
            persistenceFilters,
            'tvp_gestion_ml_db_filtro_criterio_solicitud',
            TVPSchemeFilters
        )
        const tvp_filds = this.createTVPTable(
            TVPSchemeOperation,
            'tvp_gestion_ml_db_filtro_campo_solicitud',
            TVPSchemeFields
        );

        const params: dbParameters[] = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_plataformas_operaciones'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
            {
                name: 'campos',
                type: sql.TVP,
                value: tvp_filds
            },
        ]
        try {
            const result:OperationPersistenceObject[] = await this.execute(params);
            return result.map(OperationMapperDTO.convertFromPersistenceObject)
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}