import { dbParameters, SQLServerRepository } from "../../../../../Shared/infrastructure/persistence/SQLServere/SQLServerRepository";
import { TVPSchemeFields } from "../../../../../Shared/infrastructure/persistence/TVPSchemes/TVPSchemeFields";
import { ProductionModule } from "../../../domain/entities/ProductionModule";
import { ProductionModuleRepository } from "../../../domain/repositories/ProductionModuleRepository";
import { TVPSchemeProductionModule } from "../TVPSchemes/SQLServerSchemeProductionModule";
import { ProductionModuleMapperDTO, ProductionOrderPersistenceObject } from "../Mappers/ProductionModuleMapperDTO";
import sql from 'mssql';

export class SQLServerProductionModuleRepository extends SQLServerRepository implements ProductionModuleRepository {
    protected procedureStoreName(): string {
        return 'sp_gestion_ml_db_produccion_criterio_solicitud';
    }
    async search(): Promise<ProductionModule[]> {
        const tvp_fields = this.createTVPTable(
            TVPSchemeProductionModule,
            'tvp_gestion_ml_db_filtro_campo_solicitud',
            TVPSchemeFields
        )
        const params: Array<dbParameters> = [
            {
                name: 'entidad',
                type: sql.VarChar,
                value: 'modulo'
            },
            {
                name: 'campos',
                type: sql.TVP,
                value: tvp_fields
            },
        ]
        try {
            const result: ProductionOrderPersistenceObject[] = await this.execute(params);
            return result.map(ProductionModuleMapperDTO.convertFromPersistenceObject);
        }
        catch (error) { throw (error) }
        finally { this.disconnection() }
    }
}