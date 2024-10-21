import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { UserId } from "../../../../../Shared/domain/value-object/UserId";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserMapperDTO, UserPersistenceObject } from "../Mappers/UserMapperDTO";
import sql from 'mssql'

export class SQLServerUserRepository extends SQLServerRepository implements UserRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async find(userId: UserId): Promise<User | null> {
        const filtros = Filters.fromValues([
            new Map([
                ['field', 'doc_id'], 
                ['operator', '='], 
                ['value', userId.value]
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
                value: 'vw_gestion_ml_db_proceso_autenticacion_usuario'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const response: UserPersistenceObject[] = await this.execute(params);
            if (response.length === 0) return null;
            return UserMapperDTO.convertFromPersistenceObject(response[0])
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}