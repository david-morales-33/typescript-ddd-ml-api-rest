import { Criteria } from "../../../../../Shared/domain/design-patterns/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/design-patterns/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/design-patterns/Criteria/Order";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { UserId } from "../../../../User/domain/value-objects/UserId";
import { UserPermission } from "../../../domain/entities/UserPermission";
import { UserPermissionRepository } from "../../../domain/repositories/UserPermissionRepository";
import sql from 'mssql';
import { UserPermissionMapper, UserPermissionPersistenceObject } from "../Mappers/UserPermissionMapper";

export class SQLServerUserPermission extends SQLServerRepository implements UserPermissionRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }

    async searchAll(userId: UserId): Promise<UserPermission[]> {
        const filtros = Filters.fromValues([
            new Map([['field', 'usuario_id'], ['operator', '='], ['value', userId.value]]),
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
                value: 'vw_gestion_ml_db_plataformas_operacion'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const result: UserPermissionPersistenceObject[] = await this.execute(params);
            return result.map(UserPermissionMapper.convertFromPersistenceObject)
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}