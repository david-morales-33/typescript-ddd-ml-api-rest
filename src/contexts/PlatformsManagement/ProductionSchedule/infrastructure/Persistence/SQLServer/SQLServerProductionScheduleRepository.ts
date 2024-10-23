import { Criteria } from "../../../../../Shared/domain/Criteria/Criteria";
import { Filters } from "../../../../../Shared/domain/Criteria/Filters";
import { Order } from "../../../../../Shared/domain/Criteria/Order";
import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFilters } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFilters";
import { ProductionModuleId } from "../../../../ProductionModule/domain/value-objects/ProductionModuleId";
import { ProductionSchedule } from "../../../domain/entities/ProductionSchedule";
import { ProductionScheduleRepository } from "../../../domain/repositories/ProductionScheduleRepository";
import sql from 'mssql';
import { ProductionScheduleMapperDTO, ProductionSchedulePersistenceObject } from "../Mappers/ProductionScheduleMapperDTO";

export class SQLServerProductionScheduleRepository extends SQLServerRepository implements ProductionScheduleRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async searchAll(productionModuleId: ProductionModuleId): Promise<ProductionSchedule[]> {
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
        );
        const params: dbParameters[] = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'vw_gestion_ml_db_proceso_confeccion_horario_produccion'
            },
            {
                name: 'filtros',
                type: sql.TVP,
                value: tvp_filters
            },
        ]
        try {
            const response: ProductionSchedulePersistenceObject[] = await this.execute(params);
            // console.log(response)
            return response.map(ProductionScheduleMapperDTO.convertFromPersistenceObject)
        } catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}